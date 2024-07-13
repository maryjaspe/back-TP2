const mysql = require('mysql2');

class DatabaseAdapterMySQL {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
      }
      console.log('Conectado a la base de datos MySQL');
    });
  }

  executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (err, results) => {
        if (err) {
          console.error('Error ejecutando la consulta:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}


const dbAdapter = new DatabaseAdapterMySQL();

module.exports = dbAdapter;