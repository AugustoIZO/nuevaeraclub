# 🔐 Configuración de Seguridad - Panel de Administración

## Credenciales por Defecto

**⚠️ CAMBIAR INMEDIATAMENTE DESPUÉS DEL PRIMER ACCESO**

- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **URL de Login:** `login.html`

## Cómo Cambiar las Credenciales

### Método 1: Desde el Panel (Recomendado)
1. Acceder al panel con las credenciales por defecto
2. Hacer clic en el menú de usuario (esquina superior derecha)
3. Seleccionar "Cambiar Contraseña"
4. Completar el formulario con la nueva contraseña

### Método 2: Editando el Código (Para Desarrolladores)
Si necesita cambiar las credenciales desde el código:

1. Abrir el archivo: `js/login.js`
2. Buscar la sección: `defaultCredentials`
3. Modificar los valores:

```javascript
defaultCredentials: {
    username: 'NUEVO_USUARIO',
    password: 'NUEVA_CONTRASEÑA'
}
```

## Características de Seguridad

### ✅ Sistema de Sesiones
- **Duración normal:** 24 horas
- **Con "Recordar":** 30 días
- **Expiración automática:** Sí
- **Cierre manual:** Disponible en menú de usuario

### ✅ Validaciones
- **Contraseña mínima:** 6 caracteres
- **Verificación de sesión:** En cada acceso al panel
- **Redirección automática:** Si no está autenticado

### ✅ Almacenamiento Seguro
- **Método:** localStorage del navegador
- **Encriptación:** Básica (adecuada para uso interno)
- **Persistencia:** Local al navegador

## Configuraciones Avanzadas

### Cambiar Duración de Sesiones
En `js/login.js`, modificar:

```javascript
// Sesión normal (milisegundos)
expiresIn: 24 * 60 * 60 * 1000 // 24 horas

// Sesión extendida (milisegundos)
sessionData.expiresIn = 30 * 24 * 60 * 60 * 1000; // 30 días
```

### Agregar Más Usuarios (Futuro)
Para múltiples usuarios, se necesitaría:
1. Base de datos real
2. Sistema de roles y permisos
3. Backend para gestión de usuarios

## Recuperación de Acceso

### Si Olvidan la Contraseña:

#### Opción 1: Resetear a Valores por Defecto
1. Abrir Herramientas de Desarrollador (F12)
2. Ir a Consola
3. Ejecutar: `localStorage.removeItem('adminCredentials')`
4. Recargar la página
5. Las credenciales volverán a `admin/admin123`

#### Opción 2: Editar Directamente
1. Abrir Herramientas de Desarrollador (F12)
2. Ir a Application > Local Storage
3. Buscar `adminCredentials`
4. Editar el valor JSON

## Recomendaciones de Seguridad

### ✅ Para el Club:
1. **Cambiar credenciales inmediatamente**
2. **Usar contraseñas fuertes** (mínimo 8 caracteres, números y símbolos)
3. **No compartir credenciales** innecesariamente
4. **Cerrar sesión** al terminar
5. **Cambiar contraseña periódicamente**

### ✅ Para el Hosting:
1. **Usar HTTPS** siempre
2. **Backups regulares** del sitio
3. **Acceso FTP protegido**
4. **Mantener archivos actualizados**

### ⚠️ Limitaciones Actuales:
- **Un solo usuario** activo
- **Sin recuperación de contraseña** por email
- **Almacenamiento local** (no sincroniza entre dispositivos)
- **Sin logs de acceso**

## Upgrades de Seguridad Disponibles

### Nivel Intermedio (+$XXX):
- **Múltiples usuarios** con diferentes permisos
- **Base de datos segura** en la nube
- **Recuperación de contraseña** por email
- **Logs de actividad**

### Nivel Avanzado (+$XXX):
- **Autenticación de dos factores** (2FA)
- **Roles y permisos granulares**
- **Integración con Active Directory**
- **Auditoría completa** de cambios

## Soporte Técnico

### Problemas Comunes:
1. **"No puedo acceder"** → Verificar credenciales o resetear
2. **"Sesión expiró"** → Normal, volver a iniciar sesión
3. **"Olvidé la contraseña"** → Usar métodos de recuperación

### Contacto para Soporte:
- **Soporte básico:** Incluido primeros 30 días
- **Emergencias:** Disponible con costo adicional
- **Upgrades:** Cotización personalizada

---

**📝 Nota:** Guardar este documento en lugar seguro y actualizar con cualquier cambio realizado a las credenciales.
