require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bcrypt = require('bcrypt');
const dbAdapter = require('./adapterDB/mysql');
const userQueries = require('./querys/user');
const checkJWT = require('./middleware/verificarJWT');
const responseFormatter = require('./middleware/response');
const createToken = require('./utils/jwt');
const cookieParser = require('cookie-parser');

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(responseFormatter);
app.use(cookieParser());


app.post('/user/login', async (req, res) => {
  const { email, contraseña } = req.body;
  const query = userQueries.LoginUser;
  try {
    const result = await dbAdapter.executeQuery(query, [email]);
    if (result.length > 0) {
      const contraseñaValida = await bcrypt.compare(contraseña, result[0].contraseña);
      if (contraseñaValida) {
        const token = createToken(result[0], res);
        res.standardSend({ message: "login success", isLogged: true , token});
        return
      }
    }
    res.standardSend(null, {
      statusCode: 401,
      message: 'Error credentials invalid',
      errorCode: 'CREDENTIALS_INVALID'
    }, 401);
  } catch (err) {
    console.log(err)
    res.standardSend(null, {
      statusCode: 500,
      message: 'Error logging in',
      errorCode: 'INTERNAL_SERVER_ERROR'
    }, 500);
  }
});

// Crear un usuario
app.post('/user/register', async (req, res) => {
  const { nombre, email, contraseña, direccion, telefono } = req.body;
  const hashedPassword = await bcrypt.hash(contraseña, 10);
  const query = userQueries.RegisterUser;

  try {
    const data = await dbAdapter.executeQuery(query, [nombre, email, hashedPassword, direccion, telefono]);
    const token = createToken({
      id: data.insertId,
      email
    }, res);
    res.standardSend({ message: "User created", isLogged: true, token });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.standardSend(null, {
        statusCode: 400,
        message: 'Email already exists',
        errorCode: 'USER_EXISTS'
      }, 400);
    } else {
      res.standardSend(null, {
        statusCode: 500,
        message: 'Error creating user',
        errorCode: 'INTERNAL_SERVER_ERROR'
      }, 500);
    }
  }
});

app.delete('/user/delete', checkJWT, async (req, res) => {
  const { user } = req;
  const { id } = user;
  const queryDeleteDetallePedidos = "DELETE FROM DetallesPedidos WHERE pedido_id IN(SELECT id FROM Pedidos WHERE usuario_id = ?);"
  const queryDeletePedidos = "DELETE FROM Pedidos WHERE usuario_id = ?;"
  const query = userQueries.DeleteUser;
  try {

    await dbAdapter.executeQuery(queryDeleteDetallePedidos, [id]);

    await dbAdapter.executeQuery(queryDeletePedidos, [id]);

    await dbAdapter.executeQuery(query, [id]);
    res.standardSend({ message: "User Delete", isLogged: false });
  } catch (err) {
    res.standardSend(null, {
      statusCode: 500,
      message: 'Error deleting user',
      errorCode: 'INTERNAL_SERVER_ERROR'
    }, 500);
  }
});

// Consultar la información de un usuario
app.get('/user/profile', checkJWT, async (req, res) => {
  const { user } = req;
  const { id } = user;
  const query = userQueries.GetUser;

  try {
    const result = await dbAdapter.executeQuery(query, [id]);
    if (result.length > 0) {
      const usuario = result[0];
      delete usuario.contraseña;
      delete usuario.id;
      res.json(usuario);
    } else {
      res.status(404).json({
        error: {
          statusCode: 404,
          message: 'Error getting user data',
          errorCode: 'USER_NOT_FOUND'
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        statusCode: 500,
        message: 'Error getting user data',
        errorCode: 'INTERNAL_SERVER_ERROR'
      }
    });
  }
});

app.put('/user/profile/update', checkJWT, async (req, res) => {
  const { user } = req;
  const { id } = user;
  const { direccion, telefono } = req.body;
  const query = userQueries.UpdateUser;

  try {
    await dbAdapter.executeQuery(query, [direccion, telefono, id]);
    res.json({ isUpdate: true });
  } catch (err) {
    res.status(500).json({
      error: {
        statusCode: 500,
        message: 'Error updating user data',
        errorCode: 'INTERNAL_SERVER_ERROR'
      }
    });
  }
});


app.get('/pedidos', checkJWT, async (req, res) => {
  const { user } = req;
  const { id } = user;

  const query = `SELECT * FROM Pedidos WHERE usuario_id = ?`;

  try {
    const pedidos = await dbAdapter.executeQuery(query, [id]);
    res.standardSend(pedidos);
  } catch (err) {
    res.standardSend(null, {
      statusCode: 500,
      message: 'Error al consultar los pedidos del usuario',
      errorCode: 'INTERNAL_SERVER_ERROR'
    }, 500);
  }
});

app.get('/productos', async (req, res) => {
  const query = `SELECT * FROM Productos`;
  try {
    const productos = await dbAdapter.executeQuery(query);
    res.standardSend(productos);
  } catch (err) {
    res.standardSend(null, {
      statusCode: 500,
      message: 'Error al consultar los productos',
      errorCode: 'INTERNAL_SERVER_ERROR'
    }, 500);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});