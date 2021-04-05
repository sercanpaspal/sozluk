<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />

    <title>{{ env('APP_NAME') }}</title>
</head>

<body>
    <div id="root">
    </div>

    <!--
    <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
    -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
