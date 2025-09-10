# 🎉 Manual de Usuario - Panel de Administración

## ¡Felicidades por su nueva página web!

Su nueva landing page para el club incluye un **Panel de Administración Seguro** que les permitirá gestionar el contenido de forma fácil y protegida.

## 🔐 Sistema de Seguridad

### Credenciales por Defecto
- **Usuario:** `admin`
- **Contraseña:** `admin123`

⚠️ **IMPORTANTE:** Por seguridad, cambien estas credenciales después del primer acceso.

## 🚀 Cómo Acceder al Panel de Administración

1. **Desde la página principal**: Haga clic en el botón "Admin" en la esquina superior derecha del menú
2. **Directamente**: Visite `login.html` en su navegador
3. **Ingrese las credenciales** y haga clic en "Iniciar Sesión"
4. **¡Ya están dentro del panel de administración!**

### Opciones de Sesión
- ✅ **Recordar sesión**: Mantiene la sesión activa por 30 días
- 🔄 **Sesión normal**: Se cierra automáticamente después de 24 horas
- 🚪 **Cerrar sesión**: Use el menú de usuario en la esquina superior derecha

## 🔑 Cambiar Contraseña (MUY IMPORTANTE)

### Desde el Panel de Administración:
1. **Haga clic en su nombre de usuario** (esquina superior derecha)
2. **Seleccione "Cambiar Contraseña"**
3. **Complete el formulario**:
   - Contraseña actual: `admin123`
   - Nueva contraseña: Mínimo 6 caracteres
   - Confirmar nueva contraseña
4. **Haga clic en "Cambiar Contraseña"**

### ¡Importante!
- Anoten la nueva contraseña en un lugar seguro
- Si olvidan la contraseña, pueden restablecerla editando el archivo `js/login.js`

## 📋 Funcionalidades Principales

### 1. Gestión de Eventos
- **Agregar nuevos eventos** con fecha, hora, ubicación y descripción
- **Editar eventos existentes** para actualizar información
- **Eliminar eventos** que ya no sean relevantes
- Los eventos aparecerán automáticamente en la sección "Próximos Eventos" de la página principal

### 2. Gestión de Actividades
- **Agregar nuevas actividades** que ofrece el club
- **Personalizar iconos** usando Font Awesome (incluye guía de iconos)
- **Editar descripciones** de las actividades
- Las actividades se muestran en la sección "Nuestras Actividades"

### 3. Configuración General
- **Cambiar el nombre del club** en toda la página
- **Actualizar información de contacto** (teléfono, email, dirección)
- **Modificar la descripción** del club
- Los cambios se reflejan automáticamente en toda la página

### 4. Gestión de Galería (próximamente)
- Subir y organizar imágenes del club
- Agregar descripciones a las fotos

## 🎯 Guía Paso a Paso para Agregar un Evento

1. **Acceda al panel de administración**
2. **Asegúrese de estar en la sección "Eventos"** (debería estar seleccionada por defecto)
3. **Haga clic en "Agregar Evento"**
4. **Complete el formulario**:
   - **Título**: Nombre del evento (ej: "Torneo de Fútbol")
   - **Fecha**: Seleccione la fecha del evento
   - **Hora**: Hora de inicio (ej: "10:00")
   - **Ubicación**: Dónde se realizará (ej: "Campo principal")
   - **Descripción**: Detalles adicionales del evento
   - **Imagen** (opcional): URL de una imagen del evento
5. **Haga clic en "Guardar"**
6. **¡El evento aparecerá inmediatamente en la página principal!**

## 🎨 Personalización de Actividades

### Cómo encontrar iconos:
1. Visite [Font Awesome Icons](https://fontawesome.com/icons)
2. Busque el icono que desee (ej: "football", "swimming", "music")
3. Copie el código de clase (ej: "fas fa-futbol")
4. Péguelo en el campo "Icono" del formulario

### Iconos populares para actividades:
- **Fútbol**: `fas fa-futbol`
- **Natación**: `fas fa-swimmer`
- **Tenis**: `fas fa-table-tennis`
- **Música**: `fas fa-music`
- **Ajedrez**: `fas fa-chess`
- **Básquet**: `fas fa-basketball-ball`
- **Gimnasio**: `fas fa-dumbbell`
- **Yoga**: `fas fa-peace`

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el navegador usando **localStorage**. Esto significa:

✅ **Ventajas**:
- Los cambios son instantáneos
- No necesita servidor o base de datos
- Funciona completamente offline
- Es gratuito y fácil de usar

⚠️ **Limitaciones**:
- Los datos se almacenan solo en el navegador donde los creó
- Si borra los datos del navegador, se perderán los eventos/actividades
- No hay sincronización entre diferentes computadoras

## 🔄 Recomendaciones para el Uso

### Para el día a día:
1. **Use siempre la misma computadora** para gestionar el contenido
2. **Mantenga una copia de seguridad** de los eventos importantes
3. **Actualice eventos regularmente** eliminando los que ya pasaron

### Para respaldo:
1. **Anote los eventos importantes** en un documento separado
2. **Tome capturas de pantalla** del panel de administración ocasionalmente

## 🆕 Funcionalidades Futuras (Upgrade Opcional)

Si necesitan funcionalidades más avanzadas, podemos implementar:

### Sistema con Base de Datos:
- **Acceso desde múltiples dispositivos**
- **Usuarios múltiples** con diferentes permisos
- **Respaldo automático** en la nube
- **Sincronización en tiempo real**
- **Subida de imágenes** directa
- **Sistema de notificaciones** por email
- **Estadísticas** de visitantes

### Funcionalidades Adicionales:
- **Blog** para noticias del club
- **Sistema de reservas** para actividades
- **Galería avanzada** con álbumes
- **Calendario interactivo**
- **Integración con redes sociales**
- **Formulario de membresía** online

## 📞 Soporte y Contacto

Si necesitan ayuda o quieren implementar alguna de las funcionalidades adicionales:

- **Soporte básico**: Incluido durante los primeros 30 días
- **Modificaciones menores**: Consultar precios
- **Upgrades mayores**: Cotización personalizada

## 🏆 ¡Consejos para el Éxito!

1. **Mantengan la página actualizada** - Una página con contenido fresco genera más interés
2. **Agreguen eventos regularmente** - Aunque sean pequeños, mantienen la página viva
3. **Usen imágenes de buena calidad** - Las fotos atractivas generan más engagement
4. **Actualicen la información de contacto** si cambia
5. **Promuevan la página** en sus redes sociales y materiales del club

---

## 🎯 Resumen Rápido

| Acción | Pasos |
|--------|-------|
| Agregar evento | Admin → Eventos → Agregar Evento → Completar formulario → Guardar |
| Editar evento | Admin → Eventos → Botón "Editar" en el evento → Modificar → Guardar |
| Cambiar nombre del club | Admin → Configuración → Cambiar "Nombre del Club" → Guardar |
| Agregar actividad | Admin → Actividades → Agregar Actividad → Completar → Guardar |

**¡Su nueva página web está lista para ayudarles a crecer como club!** 🚀
