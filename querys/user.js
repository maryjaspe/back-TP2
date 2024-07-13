const userQueries = {
  LoginUser: 'SELECT id, contraseña, email FROM Usuarios WHERE email = ?',
  RegisterUser: 'INSERT INTO Usuarios (nombre, email, contraseña, direccion, telefono) VALUES (?, ?, ?, ?, ?)',
  DeleteUser: 'DELETE FROM Usuarios WHERE id = ?',
  GetUser: 'SELECT * FROM Usuarios WHERE id = ?',
  UpdateUser: 'UPDATE Usuarios SET direccion = ?, telefono = ? WHERE id = ?'
};

module.exports = userQueries;