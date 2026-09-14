#!/usr/bin/env bash

set -Eeuo pipefail

APP_DIR="${APP_DIR:-/var/www/trolleyniy-ru}"
PM2_APP="${PM2_APP:-trolleyniy-ru}"
LOCK_FILE="${LOCK_FILE:-$APP_DIR/.deploy.lock}"
DEPS_STAMP_FILE="${DEPS_STAMP_FILE:-$APP_DIR/.deploy-deps.sha256}"

log() {
    printf '[deploy] %s\n' "$*"
}

fail() {
    printf '[deploy] ERROR: %s\n' "$*" >&2
    exit 1
}

on_error() {
    local exit_code=$?
    printf '[deploy] ERROR: command failed at line %s (exit code %s). Deployment stopped.\n' \
        "${BASH_LINENO[0]}" "$exit_code" >&2
    exit "$exit_code"
}

trap on_error ERR

command -v git >/dev/null 2>&1 || fail 'git is not installed'
command -v npm >/dev/null 2>&1 || fail 'npm is not installed'
command -v pm2 >/dev/null 2>&1 || fail 'pm2 is not installed'
command -v curl >/dev/null 2>&1 || fail 'curl is not installed'
command -v flock >/dev/null 2>&1 || fail 'flock is not installed (install util-linux)'

cd "$APP_DIR"

[[ -f package.json ]] || fail "package.json was not found in $APP_DIR"
[[ -f package-lock.json ]] || fail 'package-lock.json is required for npm ci'
[[ -f ecosystem.config.cjs ]] || fail 'ecosystem.config.cjs was not found'

exec 9>"$LOCK_FILE"
flock -n 9 || fail 'another deployment is already running'

[[ -z "$(git status --porcelain --untracked-files=no)" ]] || \
    fail 'the working tree contains tracked changes; commit or stash them first'

old_commit="$(git rev-parse HEAD)"

log 'Updating the current branch'
git pull --ff-only
new_commit="$(git rev-parse HEAD)"

dependency_fingerprint="$(git hash-object package.json package-lock.json | git hash-object --stdin)"
installed_fingerprint=''
if [[ -f "$DEPS_STAMP_FILE" ]]; then
    IFS= read -r installed_fingerprint < "$DEPS_STAMP_FILE" || true
fi

if [[ ! -d node_modules || "$dependency_fingerprint" != "$installed_fingerprint" ]]; then
    log 'Dependency files changed (or node_modules is missing); running npm ci'
    npm ci
    printf '%s\n' "$dependency_fingerprint" > "$DEPS_STAMP_FILE"
else
    log 'Dependency files are unchanged; skipping npm ci'
fi

log "Building commit $new_commit"
npm run build

log "Starting or reloading PM2 process '$PM2_APP'"
pm2 startOrReload ecosystem.config.cjs --only "$PM2_APP" --update-env
pm2 save

log 'Checking the local application'
curl --fail --silent --show-error --head --retry 5 --retry-connrefused --retry-delay 2 \
    http://127.0.0.1:3001/ >/dev/null

log "Deployment completed: $old_commit -> $new_commit"
