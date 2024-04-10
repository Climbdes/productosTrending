const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bbddangular'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});
app.get('/productos', (req, res) => {
  const query = `
    SELECT p.*, i.url_imagen
    FROM producto p
    LEFT JOIN imagenes i ON p.reference = i.referencia_producto
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



