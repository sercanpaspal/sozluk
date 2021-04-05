## About

A simple dictionary clone with live discussion under the topic and other features.

[https://sozluk.paspal.net](https://sozluk.paspal.net)

## Installation

`composer install` for laravel packages and dependencies.

Copy `.env.example` to `.env` and change app url, app api url and database info.

`php artisan key:generate` for generate app key.

`php artisan jwt:secret` for generate jwt authenticate key.

`php artisan migrate --seed` for generate database.

`npm install` and `npm run dev` for generate first time mix manifest, javascript and css files.

### Laravel Echo Server and Redis

[Laravel Echo Server](https://github.com/tlaverdure/laravel-echo-server) and [Redis](https://github.com/redis/redis) must be installed for broadcasting.

Up redis and run `laravel-echo-server start` in project directory. Laravel echo server configs in `laravel-echo-server.json`

## Postman REST Documentation

https://documenter.getpostman.com/view/5483166/TzCQbmct

## Features

- Notification

## Contributing

Feel free.

## License

[MIT license](https://opensource.org/licenses/MIT).
