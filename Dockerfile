FROM composer:2 AS builder

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist --ignore-platform-reqs

COPY . .
RUN composer dump-autoload --optimize

FROM node:14 AS nodebuilder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY webpack.mix.js ./
COPY resources/ ./resources/
COPY public/index.php ./public/index.php

RUN mkdir -p public/css public/js \
    && sed 's/\.version()//g' webpack.mix.js > webpack.mix.prod.js \
    && mv webpack.mix.prod.js webpack.mix.js \
    && npm run prod

FROM php:8.1-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev \
    sqlite-dev \
    mysql-client \
    postgresql-dev \
    linux-headers \
    bash

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        pdo_sqlite \
        gd \
        zip \
        mbstring \
        intl \
        bcmath \
        opcache \
        pcntl

COPY docker/php/production.ini /usr/local/etc/php/conf.d/production.ini

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY --from=builder /app /var/www/html
COPY --from=nodebuilder /app/public/js /var/www/html/public/js
COPY --from=nodebuilder /app/public/css /var/www/html/public/css
RUN echo '{"js/app.js":"/js/app.js","css/app.css":"/css/app.css"}' > /var/www/html/public/mix-manifest.json

RUN rm -rf /var/www/html/storage/logs/* \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/bootstrap/cache

COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh \
    && mkdir -p /run/nginx \
    && mkdir -p /var/log/supervisor

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]