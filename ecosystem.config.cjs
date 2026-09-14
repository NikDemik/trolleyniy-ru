module.exports = {
  apps: [
    {
      name: "trolleyniy-ru",
      cwd: "/var/www/trolleyniy-ru",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
  ],
};
