# Общии правила разработки trolleyniy-ru

- Этот файл — основной источник правил разработки проекта.
- Стек: Next.js App Router, TypeScript strict, Tailwind CSS; пакетный менеджер npm.
- БД, ORM и интеграции добавлять только по отдельному запросу.
- Маршруты — src/app, общие компоненты — src/components, настройки — src/config.
- Использовать Server Components по умолчанию.
- Интерфейс и документация на русском. Не выдумывать коммерческие сведения и контакты.
- Соблюдать адаптивность, семантику и доступность с клавиатуры.
- Исходные макеты в ../external сохранять.
- Перед сдачей запускать npm run lint, npm run typecheck и npm run build.

---

# Technology Stack

Использовать исключительно:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Не использовать:

- Redux
- MobX
- Zustand без необходимости
- CSS Modules

---

# Data Strategy

Сайт должен работать на базе данных MySQL.

Все данные которые возможно должны храниться в БД.

Использовать:

- Prisma

Статические данные отделять от компонентов по следующим правилам:

- контентные и справочные массивы размещать в `/src/data` с группировкой по странице или предметной области;
- общие настройки приложения размещать в `/src/config`;
- переиспользуемые TypeScript-типы размещать в `/src/types`;
- небольшие массивы, относящиеся только к внутренней логике одного компонента, вычисляемые значения, JSX и обработчики оставлять рядом с компонентом;
- не создавать отдельный файл для каждого небольшого массива: связанные данные группировать по странице или предметной области;
- перед созданием нового файла данных проверять существующие файлы в `/src/data` и `/src/config`, чтобы не создавать дубликаты.

---

# Component Rules

Перед созданием нового компонента:

1. Проверить shared/ui
2. Проверить components
3. Проверить существующие секции

Не создавать дубликаты.

Максимально переиспользовать компоненты.

При создании новых страниц весь контент, разметку и загрузку данных страницы размещать только в `/src/components`.

В `/src/app` должны находиться только файлы маршрутов, метаданные и подключение компонентов страницы. Не размещать контент страницы непосредственно в `page.tsx`.

---

# Encoding Rules

Все исходные файлы проекта должны сохраняться в UTF-8 без BOM.

При массовых заменах запрещено использовать PowerShell `Get-Content` / `Set-Content` без явного контроля кодировки, так как это может повредить кириллицу.

Для массовых текстовых замен использовать инструменты, которые сохраняют UTF-8 корректно:

- Node.js `fs.readFileSync(path, 'utf8')` / `fs.writeFileSync(path, text, 'utf8')`
- редактор с явным UTF-8
- скрипты с проверкой кодировки

После массовых замен обязательно проверить отсутствие mojibake-паттернов:
`Рљ|Рџ|РЅ|Р°|Рµ|Рё|Рѕ|СЃ|С‚|СЊ|С‹|СЂ|СЏ|вЂ|В«|В»|пїЅ|�`

Если в файле есть кириллица, нельзя перезаписывать его командой, которая может использовать системную ANSI/Windows-1251 кодировку.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
