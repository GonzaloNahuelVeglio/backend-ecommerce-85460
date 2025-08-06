# 📦 Ecommerce Backend — Comisión 85460

**Pre-Entrega N°1 — Backend 2 (Coderhouse)**  
Desarrollado por: [**Gonzalo Veglio**](https://www.linkedin.com/in/gonzalo-nahuel-veglio/)

---

## 🚀 Descripción

Este proyecto implementa un **CRUD de usuarios** junto con un sistema de **autenticación y autorización** utilizando **Passport** y **JWT**, siguiendo la estructura de un backend para ecommerce.

Incluye:
- Modelo `User` con campos requeridos y referencia a `Cart`.
- Contraseña encriptada con **bcrypt**.
- Estrategia **passport-local** para login.
- Estrategia **passport-jwt** para rutas protegidas.
- Sistema de login que genera un **token JWT**.
- Endpoint `/api/sessions/current` protegido.
- **Vistas frontend**: login, registro y usuario actual, desarrolladas en HTML y CSS moderno.

---
 
## ⚙️ Tecnologías utilizadas

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) **Node.js**
- ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white) **Express**
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) **MongoDB** + **Mongoose**
- ![Passport](https://img.shields.io/badge/-Passport.js-34E27A?logo=passport&logoColor=white) **Passport**, **passport-local**, **passport-jwt**
- 🔒 **bcrypt**, **jsonwebtoken**
- ⚙️ **dotenv**
- 🎨 **HTML5** y **CSS3** para las vistas de login, registro y usuario actual

---

## 📁 Estructura base

```
/public
  index.html
  login.html
  register.html
  current.html
  users.html
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
  models/
    Users.js
  routes/
    user.routes.js
    session.routes.js
  utils/
  server.js
.env
README.MD
package.json
```

Las vistas principales incluidas son:
- **login.html**: formulario de inicio de sesión
- **register.html**: formulario de registro de usuario
- **current.html**: muestra los datos del usuario autenticado
- **users.html**: muestra todos los usuario de la base de datos



## 🛠️ Cambios realizados y mejoras

### Refactorizaciones y arquitectura
- Implementación completa de los patrones DAO y Repository para todas las entidades principales (User, Product, Cart, Ticket), desacoplando la lógica de acceso a datos de los controladores.
- Refactorización de todos los controladores para utilizar los repositorios y DTOs, mejorando la mantenibilidad y seguridad.
- Centralización de la lógica de autorización por roles mediante middlewares reutilizables (`adminOnly`, `userOnly`).
- Validaciones manuales de entrada en los endpoints críticos para asegurar integridad de datos.

### Funcionalidades nuevas
- Lógica de compra completa: validación de stock, generación de ticket, actualización automática del carrito y registro de la compra.
- **Envío automático del ticket por email** al usuario al finalizar la compra, usando Nodemailer.
- Recuperación de contraseña vía email con token seguro y expiración, usando Nodemailer.
- Asociación automática de carrito al momento de registro de usuario.
- Endpoint `/api/sessions/current` protegido y que retorna un DTO seguro del usuario autenticado.
 
### Seguridad
- Encriptación de contraseñas con bcrypt.
- Uso de JWT para autenticación y autorización en endpoints protegidos.
- Filtrado de datos sensibles mediante DTOs.

### Frontend
- Se incluyeron vistas HTML/CSS básicas únicamente para visualizar información y probar el flujo de autenticación/registro. No es un frontend productivo ni responsivo.

---

## 🚀 Mejoras sugeridas a futuro

- Implementar DTOs para productos y tickets para mayor control de la salida de datos.
- Mejorar el manejo de errores y mensajes personalizados en todas las rutas.
- Agregar tests automatizados (unitarios/integración) para endpoints y lógica de negocio.
- Internacionalización de mensajes y respuestas.
- Mejorar el frontend con un framework moderno (React, Vue, etc.) y consumir la API de manera real.
- Implementar paginación, filtros y ordenamiento en endpoints de productos y usuarios.
- Agregar logs centralizados y monitoreo de errores.
- Permitir al usuario descargar el ticket en PDF o visualizarlo desde el frontend.

---

## 📦 Instalación

1. Cloná el repositorio:  
   `git clone https://github.com/GonzaloNahuelVeglio/backend-ecommerce-85460`

2. Instalá dependencias:  
   `npm install`

3. Configurá tu archivo `.env`:
   ```
   MONGO_URI=<TU_URI_DE_MONGO>
   JWT_SECRET=<TU_SECRETO>
   PORT=8080
   ```

4. Para correr el servidor:  
   `npm run dev`

---

## 🔑 Pruebas principales (Postman)

### Crear usuario (registro)
- **POST** `/api/users`
- Body: `{ first_name, last_name, email, age, password }`

### Login de usuario
- **POST** `/api/sessions/login`
- Body: `{ email, password }`
- Respuesta: `{ token }`

### Obtener usuario actual (requiere JWT)
- **GET** `/api/sessions/current`
- Header: `Authorization: Bearer <token>`

### CRUD de usuarios (requiere JWT)

- **GET** `/api/users`  
  Lista todos los usuarios (protegido).

- **GET** `/api/users/:uid`  
  Obtiene un usuario por ID (no protegido).

- **PUT** `/api/users/:uid`  
  Actualiza un usuario por ID (protegido).

- **DELETE** `/api/users/:uid`  
  Elimina un usuario por ID (protegido).

---

## ⚡ Autor

[Gonza Veglio](https://github.com/GonzaloNahuelVeglio)
Comisión 85460 — Backend 2 — Coderhouse

---
