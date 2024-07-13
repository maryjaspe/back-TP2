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
    'Torta de Zanahoria',
    'Descripción del producto 1',
    100.00,
    10,
    'Categoría 1',
    'https://i.pinimg.com/736x/f1/09/d0/f109d009cd7608e903ff8728f0e00bfb.jpg'
  ),
  (
    'Galleta',
    'Descripción del producto 2',
    150.00,
    20,
    'Categoría 2',
    'https://arquivet.com/2408-thickbox_default/galletas-sandwich-hueso-2-kg.jpg'
  ),
  (
    'Donas',
    'Descripción del producto 3',
    200.00,
    30,
    'Categoría 3',
    'https://i.pinimg.com/236x/7a/c9/d6/7ac9d6e08953ed71d9c1ffc25b1b3cd4.jpg'
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