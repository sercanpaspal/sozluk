#!/bin/bash
set -e

echo "Creating SQLite database if missing..."
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    touch /var/www/html/database/database.sqlite
fi

echo "Generating application key if missing..."
if [ -z "${APP_KEY}" ] || [ "${APP_KEY}" = "" ]; then
    php artisan key:generate --force --ansi
fi

echo "Running migrations..."
php artisan migrate --force

echo "Running storage link..."
php artisan storage:link --force 2>/dev/null || true

echo "Caching config..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Setting permissions..."
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

echo "Starting services..."
exec /usr/bin/supervisord -c /etc/supervisord.conf