# Деплой trolleyniy.ru на Beget VPS

Проект запускается через PM2 на `127.0.0.1:3001`. Существующий `anneng-shop`
продолжает работать на `127.0.0.1:3000`; Nginx разделяет проекты по доменам.

## Подготовка домена

Установите A-записи `trolleyniy.ru` и `www.trolleyniy.ru` в `85.198.99.82`.
Не добавляйте AAAA-запись без настроенного IPv6 на VPS.

## Первая установка

На сервере уже должны быть Node.js 20, npm, Git, Nginx, PM2 и Certbot.

```bash
git clone https://github.com/NikDemik/trolleyniy-ru.git /var/www/trolleyniy-ru
cd /var/www/trolleyniy-ru
npm ci
cp .env.example .env
npm run build
pm2 start ecosystem.config.cjs
pm2 save
chmod +x deploy.sh
```

Если нужна Яндекс Метрика, заполните `NEXT_PUBLIC_YANDEX_METRIKA_ID` в `.env`
до сборки. Других обязательных переменных окружения сейчас нет.

## Документы

`public/documents` намеренно не хранится в Git. До публикации скопируйте на VPS
три файла, на которые ссылается сайт:

```text
public/documents/catalog-anneng-2026.pdf
public/documents/certificate-conformity-anneng.pdf
public/documents/distributor-authorization-anneng.pdf
```

Пример с локального компьютера:

```bash
scp -r public/documents user@85.198.99.82:/var/www/trolleyniy-ru/public/
```

После загрузки проверьте права чтения файлов для пользователя, запускающего PM2.

## Nginx

Создайте `/etc/nginx/sites-available/trolleyniy.ru`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name trolleyniy.ru www.trolleyniy.ru;

    client_max_body_size 6m;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Включите конфигурацию только после успешной проверки:

```bash
sudo ln -s /etc/nginx/sites-available/trolleyniy.ru /etc/nginx/sites-enabled/trolleyniy.ru
sudo nginx -t
sudo systemctl reload nginx
```

До переключения DNS маршрут можно проверить так:

```bash
curl --resolve trolleyniy.ru:80:85.198.99.82 http://trolleyniy.ru/
```

После обновления DNS подключите HTTPS:

```bash
sudo certbot --nginx -d trolleyniy.ru -d www.trolleyniy.ru
sudo certbot renew --dry-run
```

## Последующие обновления

```bash
/var/www/trolleyniy-ru/deploy.sh
```

Скрипт блокирует параллельные деплои, обновляет текущую Git-ветку только через
fast-forward, устанавливает зависимости при изменении lock-файла, выполняет сборку
до перезапуска PM2 и проверяет ответ приложения на порту 3001.

## Проверка

```bash
pm2 status
pm2 logs trolleyniy-ru --lines 100
curl -I http://127.0.0.1:3001/
curl -I https://trolleyniy.ru/
curl -I https://trolleyniy.ru/robots.txt
curl -I https://trolleyniy.ru/sitemap.xml
```

Форма `/api/inquiry/` пока намеренно возвращает HTTP 503 для корректной заявки:
канал доставки заявок ещё не подключён. Это известный функциональный блокер, а не
ошибка Nginx или PM2.
