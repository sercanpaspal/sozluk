FROM php:8.0-cli

RUN apt-get update -y && apt-get install -y libmcrypt-dev

ENV COMPOSER_VERSION 2.1.5

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=$COMPOSER_VERSION

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get install -y nodejs

WORKDIR /app

COPY . /app

RUN composer install --ignore-platform-reqs

RUN npm install

RUN npm run prod

EXPOSE 80

CMD php artisan serve --host=0.0.0.0 --port=80
