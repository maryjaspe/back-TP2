# Proyecto Node.js,Express con MySQL

## Requisitos

- Node.js instalado
- MySQL instalado

### 1. Clonar el Repositorio

### 2. Instalar dependencias

npm i

### 3. Configurar el Archivo .env

Copia el archivo .env.example y renómbralo a .env.

cp .env.example .env

Edita el archivo .env y configura las variables de entorno para que coincidan con tu configuración de MySQL, y si vas a acceder a este backend desde otro puerto que no sea el localhost:5173 agregalo en la variable ALLOWED_ORIGINS

### 4. Crear la base de datos

Abre tu cliente de MySQL y ejecuta las queries que se encuentran en el archivo createDB.sql dentro de la carpeta queries para crear la base de datos y las tablas necesarias:

queries/createDB.sql

### 5.  Alimentar la Base de Datos

Ejecuta las queries del archivo data.sql dentro de la carpeta queries para insertar datos iniciales en la base de datos:
queries/data.sql

### 6. iniciar el servidor 
 
 npm run start


Nota: si usaste los querys dentro del data.sql
tienes un usuario con 2 pedidos pendientes

El usuario es:
juan.perez@example.com
contraseñaSegura123