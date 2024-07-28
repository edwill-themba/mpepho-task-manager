<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>edwill task manager</title>
   </head>
   <style>
       .container{
           width: 90%;
           height: 100%;
           margin: 0px auto;
       }
       .message{
           display: flex;
           flex-direction: column;
           justify-content: flex-start;
           align-items: flex-start;
           flex-wrap: wrap;
           width: 100%;
           height: 100%;
       }
   </style>
    <body>
      <div class="container">
        <div class="message">
           <h3>Hello {{ $data["user_name"] }} </h3>
           <p>Hope you are ok</p>
           <p>We inform you that supervisor <strong>{{ $data["supervisor"]}}</strong>
            have given you a task <strong>{{ $data["task_name"] }}</strong> on the 
            <strong>{{ $data["task_date"] }}</strong>
          </p>
          <p>Have a nice day</p>
         </div>
      </div>
    </body>
</html>