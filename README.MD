
# 📦 Ecommerce Backend — Comisión 85460

Desarrollado por: [**Gonzalo Veglio**](https://www.linkedin.com/in/gonzalo-nahuel-veglio/)

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [DTOs](#dtos)
- [Roles y Middlewares](#roles-y-middlewares)
- [Endpoints](#endpoints)
- [Instalación y Configuración](#instalación-y-configuración)
- [Pruebas principales](#pruebas-principales)
- [Mejoras futuras](#mejoras-futuras)
- [Autor](#autor)

---

## Descripción

Backend profesional para ecommerce, implementando arquitectura por capas, patrones DAO/Repository, autenticación y autorización con Passport (estrategias local y JWT), manejo de roles, lógica de compra, tickets y mailing. Incluye vistas HTML/CSS para pruebas manuales.

---

## Tecnologías

- **Node.js**
- **Express**
- **MongoDB** + **Mongoose**
- **Passport** (local, jwt)
- **bcrypt**, **jsonwebtoken**
- **dotenv**
- **Nodemailer**
- **HTML5** y **CSS3** (vistas de prueba)

---

## Estructura del Proyecto

```
/public
  index.html
  login.html
  register.html
  current.html
  users.html
  products.html
  cart.html
  tickets.html
  forgot-password.html
  reset-password.html
  css/
    style.css
  img/
    favicon.svg
/src
  config/
    db.js
    passport.config.js
  controllers/
    user.controller.js
    session.controller.js
    product.controller.js
    cart.controller.js
    ticket.controller.js
    password.controller.js
    purchase.controller.js
  daos/
    user.dao.js
    product.dao.js
    cart.dao.js
    ticket.dao.js
  repositories/
    user.repository.js
    product.repository.js
    cart.repository.js
    ticket.repository.js
  DTO/
    user.dto.js
  middlewares/
    roleAuth.js
  models/
    Users.js
    Product.js
    Cart.js
    Ticket.js
  routes/
    user.routes.js
    session.routes.js
    product.routes.js
    cart.routes.js
    ticket.routes.js
    password.routes.js
  services/
    register.service.js
  server.js
.env
README.MD
package.json
```

---

## DTOs

Un DTO (Data Transfer Object) es un objeto que transfiere datos entre capas, evitando exponer información sensible o innecesaria. En este proyecto, los DTOs se usan especialmente en endpoints como `/current` para retornar solo los datos necesarios del usuario autenticado (por ejemplo, ocultando la contraseña y otros campos privados). Esto mejora la seguridad y la claridad de la API.

---

## Roles y Middlewares

El sistema implementa roles de usuario:

- **admin**: puede crear, actualizar y eliminar productos.
- **user**: puede listar productos y gestionar su propio carrito.

Los middlewares `adminOnly` y `userOnly` (en `src/middlewares/roleAuth.js`) protegen los endpoints según el rol del usuario autenticado. Ejemplo: solo los administradores pueden acceder a rutas de creación, edición y borrado de productos, mientras que los usuarios solo pueden agregar productos a su carrito y finalizar compras.

---

## Endpoints

### Usuarios y sesiones

- **POST** `/api/users` — Crear usuario (registro)
- **POST** `/api/sessions/login` — Login de usuario
- **GET** `/api/sessions/current` — Obtener usuario actual (requiere JWT)
- **GET** `/api/users` — Lista todos los usuarios (protegido)
- **GET** `/api/users/:uid` — Obtiene un usuario por ID (no protegido)
- **PUT** `/api/users/:uid` — Actualiza un usuario por ID (protegido)
- **DELETE** `/api/users/:uid` — Elimina un usuario por ID (protegido)

### Productos

- **GET** `/api/products` — Lista todos los productos
- **GET** `/api/products/:pid` — Obtiene un producto por ID
- **POST** `/api/products` — Crea un producto (solo admin)
- **PUT** `/api/products/:pid` — Actualiza un producto (solo admin)
- **DELETE** `/api/products/:pid` — Elimina un producto (solo admin)

### Carritos

- **POST** `/api/carts` — Crea un carrito
- **GET** `/api/carts/:cid` — Obtiene un carrito
- **POST** `/api/carts/:cid/products` — Agrega producto al carrito (solo user)
- **DELETE** `/api/carts/:cid/products/:productId` — Elimina producto del carrito (solo user)
- **POST** `/api/carts/:cid/purchase` — Finaliza compra y genera ticket (solo user)

### Tickets

- **GET** `/api/tickets` — Lista todos los tickets (protegido)
- **GET** `/api/tickets/:tid` — Obtiene un ticket por ID (protegido)

### Recuperación de contraseña

- **POST** `/api/password/request-reset` — Solicita email de recuperación
- **POST** `/api/password/reset` — Cambia la contraseña usando el token recibido

---

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/GonzaloNahuelVeglio/backend-ecommerce-85460
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura tu archivo `.env`:
   ```env
   MONGO_URI=<tu_uri_mongodb>
   JWT_SECRET=<tu_clave_secreta_jwt>
   PORT=8080
   EMAIL_USER=<tu_email>
   EMAIL_PASS=<tu_contraseña>
   # EMAIL_HOST y EMAIL_PORT solo si no usas Gmail
   # EMAIL_HOST=smtp.example.com
   # EMAIL_PORT=587
   ```
   > ⚠️ Reemplaza los valores por tus datos reales. No compartas tu archivo `.env` ni tus credenciales. Si usas Gmail, EMAIL_HOST y EMAIL_PORT no son necesarios.
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

## Pruebas principales

Puedes probar los endpoints con Postman o cualquier cliente HTTP. Ejemplos:

- **Crear usuario:**
  - POST `/api/users`
  - Body: `{ "first_name": "Juan", "last_name": "Pérez", "email": "juan@mail.com", "age": 30, "password": "123456" }`
- **Login:**
  - POST `/api/sessions/login`
  - Body: `{ "email": "juan@mail.com", "password": "123456" }`
  - Respuesta: `{ "token": "..." }`
- **Obtener usuario actual:**
  - GET `/api/sessions/current`
  - Header: `Authorization: Bearer <token>`

---

## Mejoras futuras

- Implementar DTOs para productos y tickets para mayor control de la salida de datos.
- Mejorar el manejo de errores y mensajes personalizados en todas las rutas.
- Agregar tests automatizados (unitarios/integración) para endpoints y lógica de negocio.
- Internacionalización de mensajes y respuestas.
- Mejorar el frontend con un framework moderno (React, Vue, etc.) y consumir la API de manera real.
- Implementar paginación, filtros y ordenamiento en endpoints de productos y usuarios.
- Agregar logs centralizados y monitoreo de errores.
- Permitir al usuario descargar el ticket en PDF o visualizarlo desde el frontend.

---

## Autor

[Gonza Veglio](https://github.com/GonzaloNahuelVeglio)  
Comisión 85460 — Backend 2 — Coderhouse

---
