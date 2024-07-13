INSERT INTO
  Usuarios (nombre, email, contraseña, direccion, telefono)
VALUES
  (
    'Juan Perez',
    'juan.perez@example.com',
    '$2b$10$3NVGgFtAUNpxJpU3VUibgeTm9EoJATFP92jbpN7IEbfU75w3ENByC',
    'Calle Falsa 123',
    '555-1234'
  );

INSERT INTO
  Productos (
    nombre,
    descripcion,
    precio,
    stock,
    categoria,
    url_imagen
  )
VALUES
  (
    'Producto 1',
    'Descripción del producto 1',
    100.00,
    10,
    'Categoría 1',
    'https://images.unsplash.com/photo-1598759310798-18f8497d9858?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'
  ),
  (
    'Producto 2',
    'Descripción del producto 2',
    150.00,
    20,
    'Categoría 2',
    'https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_1468962.jpg?w=1600&h=900'
  ),
  (
    'Producto 3',
    'Descripción del producto 3',
    200.00,
    30,
    'Categoría 3',
    'https://img.freepik.com/vector-gratis/personaje-dibujos-animados-gatito-ojos-dulces_1308-135596.jpg'
  );

INSERT INTO
  Pedidos (usuario_id, total, estado)
VALUES
  (1, 250.00, 'Pendiente'),
  (1, 350.00, 'Pendiente');

INSERT INTO
  DetallesPedidos (pedido_id, producto_id, cantidad, precio)
VALUES
  (1, 1, 1, 100.00),
  (1, 2, 1, 150.00);

INSERT INTO
  DetallesPedidos (pedido_id, producto_id, cantidad, precio)
VALUES
  (2, 2, 1, 150.00),
  (2, 3, 1, 200.00);