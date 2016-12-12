const express = require('express');
const app = express();

app.use(express.static('public'))

let port = process.env.PORT || 3000
app.listen(port, function () {
  console.log( "Flow UI running on :" + port )
});