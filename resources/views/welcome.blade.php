<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>edwill task manager</title>
    </head>
    <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet">
    <body>
      <div id="app">
          <App />
      </div>
      <div id="supervisor-user-task-modal"></div> <!-- supervisor adds task for subordinates -->
      <div id="supervisor-update-task-modal"></div><!-- supervisor updates -->
      <div id="update-task"></div><!-- user add task for himself or herself -->
      <div id="add-task"></div><!-- user updates task for himself or herself -->
      @vite(['resources/js/app.js'])
    </body>
</html>
