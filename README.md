# Stickers DYMO 2025

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-4.1.14-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
</div>

---

## 🇺🇸 English

Web application for generating and printing license stickers using DYMO printers.

### 🚀 Local Installation

#### Option 1: Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```
Application will be available at: `http://localhost:5173`

#### Option 2: Local Production
```bash
# Install dependencies
npm install

# Build for production
npm run build:stickers

# Serve the built application
npm run serve
```
Application will be available at: `http://localhost:3000/stickers`

### 🌐 Server Deployment

#### For Apache
1. Build the application:
   ```bash
   npm run build:stickers
   ```

2. Upload the contents of the `dist/` folder to `/var/www/html/stickers/` (or your web directory)

3. The `.htaccess` file is already included to handle routes correctly

#### For Nginx
Add this configuration to your Nginx configuration file:

```nginx
location /stickers {
    alias /var/www/html/stickers;
    try_files $uri $uri/ /stickers/index.html;
    
    # Cache for static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 📁 Project Structure

```
src/
├── components/
│   ├── PrintForm.vue          # Main component
│   └── ui/
│       ├── PlanosComponent.vue
│       └── SelectComponent.vue
├── composables/
│   └── useDymo.js            # DYMO logic
├── assets/
│   └── styckers/             # Sticker XML files
└── main.js
```

### 🔧 Configuration

- **Base path**: `/stickers/`
- **Development port**: 5173
- **Production port**: 3000
- **Build directory**: `dist/`

### 📝 Notes

- The application requires connected DYMO printers
- Sticker XML files are located in `src/assets/styckers/`
- Vite configuration is in `vite.config.js`

---

## 🇪🇸 Español

Aplicación web para generar e imprimir stickers de licencias usando impresoras DYMO.

### 🚀 Instalación Local

#### Opción 1: Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

#### Opción 2: Producción Local
```bash
# Instalar dependencias
npm install

# Construir para producción
npm run build:stickers

# Servir la aplicación construida
npm run serve
```
La aplicación estará disponible en: `http://localhost:3000/stickers`

### 🌐 Despliegue en Servidor

#### Para Apache
1. Construir la aplicación:
   ```bash
   npm run build:stickers
   ```

2. Subir el contenido de la carpeta `dist/` a `/var/www/html/stickers/` (o tu directorio web)

3. El archivo `.htaccess` ya está incluido para manejar las rutas correctamente

#### Para Nginx
Agregar esta configuración a tu archivo de configuración de Nginx:

```nginx
location /stickers {
    alias /var/www/html/stickers;
    try_files $uri $uri/ /stickers/index.html;
    
    # Cache para assets estáticos
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── PrintForm.vue          # Componente principal
│   └── ui/
│       ├── PlanosComponent.vue
│       └── SelectComponent.vue
├── composables/
│   └── useDymo.js            # Lógica de DYMO
├── assets/
│   └── styckers/             # Archivos XML de stickers
└── main.js
```

### 🔧 Configuración

- **Ruta base**: `/stickers/`
- **Puerto desarrollo**: 5173
- **Puerto producción**: 3000
- **Directorio de build**: `dist/`

### 📝 Notas

- La aplicación requiere impresoras DYMO conectadas
- Los archivos XML de stickers están en `src/assets/styckers/`
- La configuración de Vite está en `vite.config.js`

---

## 👨‍💻 Developed by / Desarrollado por

[Fernando E. Cueto](https://fernandocueto.com)

---

<div align="center">
  <p>Made with ❤️ using Vue.js, Vite, and TailwindCSS</p>
  <p>Hecho con ❤️ usando Vue.js, Vite, y TailwindCSS</p>
</div>