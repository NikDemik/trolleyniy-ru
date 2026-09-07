# trolleyniy-ru

Корпоративный сайт ООО «Троллейный шинопровод». Next.js 16 App Router, TypeScript strict,
Tailwind CSS 4, локальные компоненты shadcn/ui и Framer Motion для мобильного меню.
База данных и ORM не подключены согласно текущему этапу проекта.

## Запуск и проверки

Node.js 20.9+ и npm:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run verify
```

Сайт: http://localhost:3000. Проверка verify требует готовую production-сборку и
работающий локальный сервер. Другой адрес задаётся переменной TEST_BASE_URL.
Production: npm run build, затем npm start.

## Реализовано

- 25 публичных страниц: Server Components, предварительная статическая генерация.
- Общие Header, Footer, Breadcrumbs, Container, Section, Hero, CTA,
  ProductDirectionCard, SolutionCard, IndustryCard, Advantages, ProcessSteps,
  ContactForm, FileUpload, FAQ и RelatedLinks.
- Мобильное меню с Escape и возвратом фокуса; адаптивные сетки, семантические формы.
- Metadata API: уникальные title/description, canonical и Open Graph; metadataBase
  https://trolleyniy.ru. Канонический формат URL — с завершающим слешем.
- sitemap.xml только для существующих страниц, robots.txt, 404 для неизвестных адресов.
- Organization, WebSite, BreadcrumbList и FAQPage для реально отображаемого FAQ.
- Обзор продукции и решений; отдельный магазин для товарного интента. Нет товаров,
  цен, корзины и фильтров.
- Реальные проекты не добавлены: подготовлены ProjectCase и ProjectCard.
- Иллюстрации сейчас условные схемы без масштаба. Для согласованных фото используется
  next/image; пути описаны в public/images/README.md.

## Готовые страницы

- / — главная.
- /produkciya/ и дочерние trolleynyy-shinoprovod/, monotrolleynyy-shinoprovod/,
  festonnye-sistemy/.
- /resheniya/ и дочерние mostovye-krany/, kran-balki/, elektrotelfery/,
  monorelsovye-sistemy/, proizvodstvennye-linii/.
- /otrasli/ и дочерние kranostroenie/, mashinostroenie/, metallurgiya/,
  skladskaya-logistika/, promyshlennaya-avtomatizaciya/.
- /brands/ и /brands/anneng/.
- /podbor-oborudovaniya/, /proekty/, /o-kompanii/, /dostavka-i-oplata/,
  /garantiya/, /kontakty/.

/proizvodstvo/ и /blog/ зарезервированы концептуально в data/common.ts.
Пустые страницы не созданы и в sitemap не включены.

## Архитектура и основные файлы

| Путь | Назначение |
| --- | --- |
| src/app/page.tsx, src/app/[...slug]/page.tsx | Только подключение страниц, статические параметры и metadata |
| src/app/layout.tsx, globals.css | Общая оболочка и Tailwind-тема |
| src/app/sitemap.ts, robots.ts, not-found.tsx | SEO-маршруты и 404 |
| src/app/api/inquiry/route.ts | Подключение обработчика формы |
| src/components/pages | Разметка и сборка главной, внутренних страниц, 404 |
| src/components/site-header.tsx, site-footer.tsx, mobile-menu.tsx | Общая навигация |
| src/components/content-blocks.tsx, primitives.tsx, hero.tsx, media.tsx | Переиспользуемые секции и визуальные компоненты |
| src/components/contact-form.tsx, file-upload.tsx, ui | Формы и локальные shadcn/ui-компоненты |
| src/components/breadcrumbs.tsx, structured-data.tsx, company-details.tsx | Крошки, JSON-LD, контакты |
| src/data/products.ts, solutions.ts, industries.ts, pages.ts | Независимый контент страниц |
| src/data/common.ts, inquiry.ts, registry.ts | Общие данные, поля формы и единый реестр |
| src/config/company.ts | Компания, документы, юридические ссылки и коммерческие условия |
| src/config/externalLinks.ts, navigation.ts, inquiry.ts | Внешние адреса, навигация и ограничения формы |
| src/types | Контентные типы и контракт формы |
| src/lib/seo.ts, utils.ts | SEO и утилиты оформления |
| src/lib/inquiry-validation.ts, inquiry-handler.ts | Клиентская/серверная проверка и граница будущей интеграции |
| scripts/verify-site.mjs | Проверка маршрутов, SEO, ссылок, API и кодировки |

Старый src/config/site.ts удалён после переноса в company.ts.
package.json, package-lock.json и next.config.ts обновлены; TypeScript и ESLint
сохранены. AGENTS.md не переписывался. Исходные макеты ../external не изменены.

## Форма: текущее поведение

Краткая форма на главной и тематических страницах, расширенная — на странице подбора.
Имя, тип оборудования и хотя бы один контакт обязательны. Числовые параметры,
длина текста и вложение проверяются на клиенте и сервере.
Допускается один PDF, PNG, JPG, DOCX или XLSX до 5 МБ.

Обработчик:
- ограничивает размер тела до разбора multipart, включая поток без Content-Length;
- проверяет Origin/Sec-Fetch-Site, honeypot, время заполнения и дубликаты полей;
- проверяет значения полей, расширение и начальную сигнатуру файла;
- не сохраняет файлы, не пишет персональные данные в логи и не пересылает их;
- для корректной формы возвращает HTTP 503 и ok:false с честным объяснением.

HTTP 200 / ok:true сейчас недостижим. UI успеха подготовлен под будущий адаптер,
но не имитируется. Клиент не очищает заполненные поля при ошибке.
Между обновлениями страницы черновик не сохраняется.

Перед подключением реальной доставки:
1. Утвердить получателя, серверный email/CRM-адаптер и обработку повторных запросов.
2. Подготовить реальные юридические документы и основание обработки данных.
3. Добавить распределённое ограничение частоты на инфраструктуре сервера.
4. Подключить антивирус/проверку содержимого вложений; проверка сигнатуры не заменяет её.
5. Возвращать успех только после подтверждения приёма интеграцией.

## Данные, которые нужно заполнить

В src/config/company.ts оставлены null с TODO:
телефон, email, адрес, часы работы, ИНН, КПП, ОГРН.
Массивы документов и юридических ссылок пусты.
В commercialTerms не заданы порядок оплаты, способы доставки, перевозчики,
сроки и гарантийный период. Они не выдуманы и не показываются как утверждённые условия.

Нужны утверждённые фотографии, документы о статусе дистрибьютора и реальные кейсы.
Планы собственного производства сформулированы как планы, не как действующая мощность.

## Внешние URL

Домен магазина дан в задании. /catalog и /configurator найдены в исходниках соседнего
проекта shinoprovod-anneng (компонент ConfiguratorBanner и данные popularCategories).
Их доступность на опубликованном сайте в этой среде не подтверждена.

Точные URL категорий trolley, mono и festoon нужно заполнить в
src/config/externalLinks.ts. Пока ссылки подписаны как общий каталог и ведут на
/catalog, а не на выдуманные адреса.

## Верификация

verify проверяет:
- 25 HTML-страниц, уникальные title/description/canonical;
- один H1, корректный домен Open Graph, Organization/WebSite/BreadcrumbList;
- все внутренние ссылки, HTTP 200 маршрутов, HTTP 404 неизвестного пути;
- состав sitemap и robots;
- 12 сценариев API: валидная заглушка, ошибки полей, спам, дубликаты, неверные
  типы файлов, поддельная сигнатура, превышение размера, Origin и методы;
- UTF-8 без BOM.

Проверка мобильной компоновки и взаимодействий проведена в браузере.
Core Web Vitals на реальном хостинге и внешние интеграции требуют проверки после размещения.
На домен trolleyniy.ru сайт этой задачей не развёрнут.

## Технические источники

API сверены с документацией установленной версии Next.js в node_modules/next/dist/docs.
Базовый компонент кнопки следует [shadcn/ui](https://ui.shadcn.com/docs/components/radix/button).
Общие критерии кабельного подвеса сверены с
[техническим каталогом фестонных систем](https://www.conductix.com/sites/default/files/downloads/KAT0230-0002-EN_Festoon_Systems_for_C-Rails_Program_0230.pdf).
Числовые параметры этого производителя на ANNENG не переносились.
