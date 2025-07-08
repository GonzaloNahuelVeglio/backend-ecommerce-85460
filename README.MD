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
/src
  config/
  controllers/
  models/
  routes/
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