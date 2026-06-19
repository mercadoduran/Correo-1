const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola desde Correo-1!');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
