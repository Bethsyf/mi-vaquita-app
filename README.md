![Mi Vaquita](https://res.cloudinary.com/dmaviub4l/image/upload/v1711547483/h4mcpdoav6plnxmjbpzx.svg)

# 🐄 Mi Vaquita App

**Aplicación fullstack para dividir gastos entre amigos y grupos de forma simple y transparente.**

> ¿Salieron a comer? ¿Alguien pagó el Airbnb? Mi Vaquita calcula automáticamente cuánto debe reembolsar cada persona y a quién.

🔗 **Demo:** [mi-vaquita-app.vercel.app](https://mi-vaquita-app.vercel.app/auth/login)  
🔗 **API:** [mi-vaquita-api](https://github.com/Bethsyf/mi-vaquita-api)

## 🧪 Test Credentials

Want to try the app without registering? Use these demo accounts:

| User | Email | Password |
|------|-------|----------|
| Demo 1 😍 | demo1@mivaquita.com | Demo-1234 |
| Demo 2 😳 | demo2@mivaquita.com | Demo-1234 |

---

## ✨ Funcionalidades

- 🔐 Autenticación de usuarios (registro e inicio de sesión)
- 👥 Creación de grupos con múltiples participantes
- 💸 Registro de gastos indicando quién pagó y cuánto
- 🧮 Cálculo automático de lo que debe reembolsar cada persona
- 📋 Historial de gastos por grupo
- 📱 Diseño responsive para móvil y escritorio

---

## 🛠️ Tech Stack

### Frontend
| Tecnología | Uso |
|-----------|-----|
| React | Librería de UI |
| Vite | Bundler y entorno de desarrollo |
| Tailwind CSS | Estilos y diseño responsive |
| React Router | Navegación entre vistas |
| Axios | Consumo de la API REST |

### Backend
| Tecnología | Uso |
|-----------|-----|
| Node.js | Entorno de ejecución |
| Express | Framework del servidor |
| PostgreSQL | Base de datos relacional |
| JWT | Autenticación con tokens |

---

## 🏗️ Arquitectura

```
mi-vaquita-app/          ← Frontend (este repo)
│
├── src/
│   ├── components/      ← Componentes reutilizables
│   ├── pages/           ← Vistas principales
│   ├── services/        ← Llamadas a la API
│   └── context/         ← Estado global
│

```
El backend esta en un repo aparte
---

## 🚀 Correr el proyecto localmente

### Prerrequisitos
- Node.js 18+
- PostgreSQL corriendo localmente
- El backend configurado ([ver instrucciones aquí](https://github.com/Bethsyf/mi-vaquita-api))

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Bethsyf/mi-vaquita-app.git
cd mi-vaquita-app

# 2. Instalar dependencias
yarn install

# 3. Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con la URL de tu API local

# 4. Correr en modo desarrollo
yarn dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🌍 Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🎯 Contexto del proyecto

Este proyecto fue construido como parte de un curso enfocado en desarrollo backend, con énfasis en aprender a construir y consumir una API REST propia. El objetivo principal fue entender cómo se conectan el frontend y el backend en una aplicación real con autenticación y base de datos.

**Aprendizajes clave:**
- Diseño e implementación de una API REST desde cero
- Autenticación con JWT (registro, login, rutas protegidas)
- Manejo de estado global en React
- Conexión frontend-backend con variables de entorno

---

## 👩‍💻 Autora

**Bethsy Falcon** — Desarrolladora Frontend  
[LinkedIn](https://www.linkedin.com/in/bethsyfalcon-frontend/) · [GitHub](https://github.com/Bethsyf) · [Portfolio](https://portfolio-bfb.vercel.app)

---

## 📄 Licencia

MIT © [Bethsy Falcon](https://github.com/Bethsyf)
