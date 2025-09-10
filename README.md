# 🏆 Club Nueva Era - Sitio Web

¡Bienvenido al repositorio del sitio web del Club Nueva Era!

## 🌐 Sitio Web
**URL:** https://augustoizo.github.io/nuevaeraclub/

## 📋 Características

- ✅ **Página principal** con información del club
- ✅ **Sistema de eventos** con datos compartidos
- ✅ **Sistema de actividades** dinámico
- ✅ **Galería de fotos** interactiva
- ✅ **Panel de administración** completo
- ✅ **Diseño responsive** para móviles
- ✅ **Formulario de contacto**

## 🎯 ¿Cómo agregar un evento?

### Desde el Panel de Administración
🔧 **Todo se maneja desde el admin - Sin archivos externos**

1. **Inicia sesión** como administrador (`login.html`)
   - Usuario: `admin`
   - Contraseña: `admin123`

2. **Ve a la sección "Eventos"** en el panel

3. **Haz clic en "Agregar Evento"**

4. **Completa el formulario:**
   - Título del evento
   - Fecha y hora
   - Ubicación
   - Descripción (opcional)
   - Imagen (opcional)

5. **Haz clic en "Guardar"**

6. **¡Listo!** El evento aparece inmediatamente en la página principal

### Eliminar Eventos
- Desde la misma sección de eventos en el admin
- Haz clic en el botón "Eliminar" del evento
- Se elimina automáticamente de toda la página

### Filtrado Automático
✨ **Los eventos pasados desaparecen automáticamente**
- Solo se muestran eventos de hoy en adelante
- No necesitas eliminar eventos manualmente
- Si no hay eventos futuros, se muestra un mensaje informativo

## 📁 Estructura del Proyecto

```
📦 nuevaeraclub.github.io/
├── 📄 index.html              # Página principal
├── 📄 admin.html              # Panel de administración ⭐
├── 📄 login.html              # Página de login
├── 📄 eventos.json            # Datos de eventos (backup/fallback)
├── 📄 actividades.json        # Datos de actividades (backup/fallback)
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

1. **Administrador inicia sesión** en el panel de admin
2. **Agrega/edita/elimina eventos** desde la interfaz
3. **Los cambios se guardan** en localStorage del navegador
4. **La página principal se actualiza** automáticamente
5. **Los eventos pasados se ocultan** automáticamente
6. **Sin base de datos** - todo funciona con localStorage

## 🔧 Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript** - Interactividad
- **GitHub Pages** - Hosting gratuito
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías

## 👥 Para Colaboradores

### Agregar/Eliminar Eventos
- **Solo desde el panel de administración**
- Login → Sección Eventos → Agregar/Eliminar
- **Cambios inmediatos** en la página principal

### Agregar Actividades  
- Desde el panel de administración
- Sección "Actividades"

### Hacer cambios de diseño
- CSS principal: `css/styles.css`
- JavaScript: `js/main.js`

## 📞 Contacto

¿Preguntas? ¿Sugerencias? 
- 📧 Contacta al administrador del sitio
- 🐛 Reporta problemas en GitHub Issues

---

**🎉 ¡Gracias por ser parte del Club Nueva Era!**
