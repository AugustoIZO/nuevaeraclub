# 🏆 Club Nueva Era - Sitio Web

¡Bienvenido al repositorio del sitio web del Club Nueva Era!

## 🌐 Sitio Web
**URL:** https://nuevaeraclub.github.io

## 📋 Características

- ✅ **Página principal** con información del club
- ✅ **Sistema de eventos** con datos compartidos
- ✅ **Sistema de actividades** dinámico
- ✅ **Galería de fotos** interactiva
- ✅ **Panel de administración** completo
- ✅ **Diseño responsive** para móviles
- ✅ **Formulario de contacto**

## 🎯 ¿Cómo agregar un evento?

### Opción 1: Página Simple (Recomendada)
1. Ve a: https://nuevaeraclub.github.io/agregar-evento.html
2. Completa el formulario
3. Copia el código JSON generado
4. Edita el archivo `eventos.json` en GitHub
5. Pega el código al final del array (antes del `]`)
6. ¡Guarda y listo! El evento aparecerá en el sitio

### Opción 2: Editar directamente
1. Abre el archivo `eventos.json`
2. Agrega tu evento siguiendo este formato:
```json
{
  "id": 1234567890,
  "title": "Nombre del Evento",
  "date": "2025-09-15",
  "time": "15:00",
  "location": "Ubicación",
  "description": "Descripción opcional"
}
```

## 📁 Estructura del Proyecto

```
📦 nuevaeraclub.github.io/
├── 📄 index.html              # Página principal
├── 📄 admin.html              # Panel de administración
├── 📄 login.html              # Página de login
├── 📄 agregar-evento.html     # Formulario simple para eventos
├── 📄 eventos.json            # ⭐ Datos de eventos
├── 📄 actividades.json        # ⭐ Datos de actividades
├── 📁 css/                    # Estilos
│   ├── 📄 styles.css
│   ├── 📄 admin-styles.css
│   └── 📄 login-styles.css
├── 📁 js/                     # Scripts
│   ├── 📄 main.js
│   ├── 📄 admin.js
│   └── 📄 login.js
└── 📄 README.md               # Este archivo
```

## 🚀 ¿Cómo funciona?

1. **GitHub Pages** sirve el sitio web estático
2. Los **eventos y actividades** se cargan desde archivos JSON
3. **Cualquier cambio** en los archivos JSON se refleja inmediatamente
4. **Sin base de datos** - todo funciona con archivos estáticos

## 🔧 Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript** - Interactividad
- **GitHub Pages** - Hosting gratuito
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías

## 👥 Para Colaboradores

### Agregar Eventos
- Usa la página: `agregar-evento.html`
- O edita directamente: `eventos.json`

### Agregar Actividades  
- Edita el archivo: `actividades.json`

### Hacer cambios de diseño
- CSS principal: `css/styles.css`
- JavaScript: `js/main.js`

## 📞 Contacto

¿Preguntas? ¿Sugerencias? 
- 📧 Contacta al administrador del sitio
- 🐛 Reporta problemas en GitHub Issues

---

**🎉 ¡Gracias por ser parte del Club Nueva Era!**
