<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title}}</title>
  <style>
    body {
      margin: 30px 30px;
    }
    a {
      display: block;
      font-size: 26px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
  {{/each}}
</body>
</html>
