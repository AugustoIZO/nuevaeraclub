// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (typeof AuthSystem !== 'undefined' && !AuthSystem.isSessionValid()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Initialize the admin panel
    initializeAdmin();
    
    // Load data
    loadEvents();
    loadActivities();
    loadConfiguration();
    
    // Set up event listeners
    setupEventListeners();
    
    // Setup user menu
    setupUserMenu();
});

// Data Storage (usando localStorage para persistencia)
const AdminData = {
    events: JSON.parse(localStorage.getItem('clubEvents')) || [],
    activities: JSON.parse(localStorage.getItem('clubActivities')) || [],
    config: JSON.parse(localStorage.getItem('clubConfig')) || {
        name: 'Nueva Era Club',
        description: 'Un espacio para compartir, disfrutar y crecer en comunidad',
        phone: '+34 123 456 789',
        email: 'info@nuevaeraclub.com',
        address: 'Av. Principal 123, Ciudad'
    },
    
    saveEvents() {
        localStorage.setItem('clubEvents', JSON.stringify(this.events));
        this.updateMainSite();
    },
    
    saveActivities() {
        localStorage.setItem('clubActivities', JSON.stringify(this.activities));
        this.updateMainSite();
    },
    
    saveConfig() {
        localStorage.setItem('clubConfig', JSON.stringify(this.config));
        this.updateMainSite();
    },
    
    updateMainSite() {
        // Esta función actualiza el sitio principal con los nuevos datos
        // En una implementación real, esto sería una llamada al servidor
        console.log('Datos actualizados en el sitio principal');
    }
};

// Inicializar panel de administración
function initializeAdmin() {
    // Configurar navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces y secciones
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botones para agregar nuevos elementos
    document.getElementById('add-event-btn').addEventListener('click', () => openEventModal());
    document.getElementById('add-activity-btn').addEventListener('click', () => openActivityModal());
    
    // Modales
    setupModals();
    
    // Formulario de configuración
    document.getElementById('save-config-btn').addEventListener('click', saveConfiguration);
    
    // Formularios de eventos y actividades
    document.getElementById('event-form').addEventListener('submit', saveEvent);
    document.getElementById('activity-form').addEventListener('submit', saveActivity);
}

// Configurar modales
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    const cancelButtons = document.querySelectorAll('[id$="-cancel-btn"], [id^="cancel-"]');
    
    // Cerrar modales al hacer click en X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modales al hacer click en cancelar
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Cerrar modales al hacer click fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Gestión de Eventos
function loadEvents() {
    const eventsGrid = document.getElementById('events-grid');
    
    if (AdminData.events.length === 0) {
        eventsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-calendar-times"></i>
                <h3>No hay eventos programados</h3>
                <p>Agrega tu primer evento haciendo click en "Agregar Evento"</p>
            </div>
        `;
        return;
    }
    
    eventsGrid.innerHTML = AdminData.events.map(event => `
        <div class="admin-card">
            <h3>${event.title}</h3>
            <div class="meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(event.date)}</span>
                <span><i class="fas fa-clock"></i> ${event.time}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            </div>
            <p>${event.description || 'Sin descripción'}</p>
            <div class="actions">
                <button class="btn btn-warning" onclick="editEvent('${event.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" onclick="deleteEvent('${event.id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function openEventModal(eventId = null) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    const title = document.getElementById('event-modal-title');
    
    form.reset();
    
    if (eventId) {
        const event = AdminData.events.find(e => e.id === eventId);
        if (event) {
            title.textContent = 'Editar Evento';
            document.getElementById('event-title').value = event.title;
            document.getElementById('event-date').value = event.date;
            document.getElementById('event-time').value = event.time;
            document.getElementById('event-location').value = event.location;
            document.getElementById('event-description').value = event.description || '';
            document.getElementById('event-image').value = event.image || '';
            form.dataset.eventId = eventId;
        }
    } else {
        title.textContent = 'Agregar Evento';
        delete form.dataset.eventId;
    }
    
    modal.style.display = 'block';
}

function saveEvent(e) {
    e.preventDefault();
    
    const form = e.target;
    const eventData = {
        id: form.dataset.eventId || generateId(),
        title: document.getElementById('event-title').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
        image: document.getElementById('event-image').value
    };
    
    if (form.dataset.eventId) {
        // Actualizar evento existente
        const index = AdminData.events.findIndex(e => e.id === form.dataset.eventId);
        AdminData.events[index] = eventData;
    } else {
        // Agregar nuevo evento
        AdminData.events.push(eventData);
    }
    
    AdminData.saveEvents();
    loadEvents();
    
    document.getElementById('event-modal').style.display = 'none';
    showNotification('Evento guardado correctamente', 'success');
}

function editEvent(eventId) {
    openEventModal(eventId);
}

function deleteEvent(eventId) {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
        AdminData.events = AdminData.events.filter(e => e.id !== eventId);
        AdminData.saveEvents();
        loadEvents();
        showNotification('Evento eliminado correctamente', 'success');
    }
}

// Gestión de Actividades
function loadActivities() {
    const activitiesGrid = document.getElementById('activities-grid');
    
    if (AdminData.activities.length === 0) {
        activitiesGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-futbol"></i>
                <h3>No hay actividades registradas</h3>
                <p>Agrega tu primera actividad haciendo click en "Agregar Actividad"</p>
            </div>
        `;
        return;
    }
    
    activitiesGrid.innerHTML = AdminData.activities.map(activity => `
        <div class="admin-card">
            <h3><i class="${activity.icon}"></i> ${activity.name}</h3>
            <p>${activity.description || 'Sin descripción'}</p>
            <div class="actions">
                <button class="btn btn-warning" onclick="editActivity('${activity.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" onclick="deleteActivity('${activity.id}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function openActivityModal(activityId = null) {
    const modal = document.getElementById('activity-modal');
    const form = document.getElementById('activity-form');
    const title = document.getElementById('activity-modal-title');
    
    form.reset();
    
    if (activityId) {
        const activity = AdminData.activities.find(a => a.id === activityId);
        if (activity) {
            title.textContent = 'Editar Actividad';
            document.getElementById('activity-name').value = activity.name;
            document.getElementById('activity-icon').value = activity.icon;
            document.getElementById('activity-description').value = activity.description || '';
            form.dataset.activityId = activityId;
        }
    } else {
        title.textContent = 'Agregar Actividad';
        delete form.dataset.activityId;
    }
    
    modal.style.display = 'block';
}

function saveActivity(e) {
    e.preventDefault();
    
    const form = e.target;
    const activityData = {
        id: form.dataset.activityId || generateId(),
        name: document.getElementById('activity-name').value,
        icon: document.getElementById('activity-icon').value,
        description: document.getElementById('activity-description').value
    };
    
    if (form.dataset.activityId) {
        // Actualizar actividad existente
        const index = AdminData.activities.findIndex(a => a.id === form.dataset.activityId);
        AdminData.activities[index] = activityData;
    } else {
        // Agregar nueva actividad
        AdminData.activities.push(activityData);
    }
    
    AdminData.saveActivities();
    loadActivities();
    
    document.getElementById('activity-modal').style.display = 'none';
    showNotification('Actividad guardada correctamente', 'success');
}

function editActivity(activityId) {
    openActivityModal(activityId);
}

function deleteActivity(activityId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
        AdminData.activities = AdminData.activities.filter(a => a.id !== activityId);
        AdminData.saveActivities();
        loadActivities();
        showNotification('Actividad eliminada correctamente', 'success');
    }
}

// Gestión de Configuración
function loadConfiguration() {
    document.getElementById('club-name').value = AdminData.config.name;
    document.getElementById('club-description').value = AdminData.config.description;
    document.getElementById('contact-phone').value = AdminData.config.phone;
    document.getElementById('contact-email').value = AdminData.config.email;
    document.getElementById('contact-address').value = AdminData.config.address;
}

function saveConfiguration() {
    AdminData.config = {
        name: document.getElementById('club-name').value,
        description: document.getElementById('club-description').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        address: document.getElementById('contact-address').value
    };
    
    AdminData.saveConfig();
    showNotification('Configuración guardada correctamente', 'success');
}

// Funciones de utilidad
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para generar JSON exportable
function exportData() {
    const data = {
        events: AdminData.events,
        activities: AdminData.activities,
        config: AdminData.config,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `club-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Función para importar datos
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.events) AdminData.events = data.events;
            if (data.activities) AdminData.activities = data.activities;
            if (data.config) AdminData.config = data.config;
            
            AdminData.saveEvents();
            AdminData.saveActivities();
            AdminData.saveConfig();
            
            loadEvents();
            loadActivities();
            loadConfiguration();
            
            showNotification('Datos importados correctamente', 'success');
        } catch (error) {
            showNotification('Error al importar los datos', 'error');
        }
    };
    reader.readAsText(file);
}

// User Menu Functions
function setupUserMenu() {
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    const changePasswordLink = document.getElementById('change-password-link');
    const logoutLink = document.getElementById('logout-link');
    
    // Toggle dropdown
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            userDropdown.classList.remove('show');
        });
        
        // Prevent dropdown from closing when clicking inside
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Change password
    if (changePasswordLink) {
        changePasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdown.classList.remove('show');
            openAdminChangePasswordModal();
        });
    }
    
    // Logout
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Está seguro de que desea cerrar sesión?')) {
                if (typeof AuthSystem !== 'undefined') {
                    AuthSystem.logout();
                } else {
                    window.location.href = 'login.html';
                }
            }
        });
    }
    
    // Setup change password modal for admin
    setupAdminChangePasswordModal();
}

// Setup change password modal in admin panel
function setupAdminChangePasswordModal() {
    const modal = document.getElementById('admin-change-password-modal');
    const closeBtn = document.getElementById('admin-close-change-password');
    const cancelBtn = document.getElementById('admin-cancel-change-password');
    const form = document.getElementById('admin-change-password-form');
    
    if (!modal) return;
    
    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeAdminModal(modal));
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeAdminModal(modal));
    }
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAdminModal(modal);
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', handleAdminChangePassword);
    }
}

// Open change password modal in admin
function openAdminChangePasswordModal() {
    const modal = document.getElementById('admin-change-password-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close admin modal
function closeAdminModal(modal) {
    modal.style.display = 'none';
    // Clear form
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
    }
}

// Handle change password in admin
function handleAdminChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('admin-current-password').value;
    const newPassword = document.getElementById('admin-new-password').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    
    // Check if AuthSystem is available
    if (typeof AuthSystem === 'undefined') {
        showNotification('Sistema de autenticación no disponible', 'error');
        return;
    }
    
    // Validate current password
    const credentials = AuthSystem.getCredentials();
    if (currentPassword !== credentials.password) {
        showNotification('Contraseña actual incorrecta', 'error');
        return;
    }
    
    // Validate new password
    if (newPassword.length < 6) {
        showNotification('La nueva contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    // Validate password confirmation
    if (newPassword !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    // Save new credentials
    AuthSystem.saveCredentials(credentials.username, newPassword);
    
    // Close modal and show success
    const modal = document.getElementById('admin-change-password-modal');
    closeAdminModal(modal);
    showNotification('Contraseña cambiada exitosamente. Por seguridad, cierre sesión y vuelva a iniciar sesión.', 'success');
}
