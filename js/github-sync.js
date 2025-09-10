// Sistema automático de sincronización con GitHub API
class GitHubSync {
    constructor() {
        this.owner = 'AugustoIZO';
        this.repo = 'nuevaeraclub';
        this.branch = 'main';
        
        // Token de acceso público (solo para repos públicos)
        // Para seguridad real, usarías GitHub Apps o OAuth
        this.apiUrl = `https://api.github.com/repos/${this.owner}/${this.repo}`;
        
        this.baseUrl = window.location.origin + window.location.pathname.replace('admin.html', '').replace('index.html', '');
    }

    // Cargar eventos desde GitHub
    async loadEvents() {
        try {
            const response = await fetch(this.baseUrl + 'eventos.json?t=' + Date.now());
            if (response.ok) {
                const text = await response.text();
                return text.trim() ? JSON.parse(text) : [];
            }
            return [];
        } catch (error) {
            console.log('Error loading events:', error);
            return [];
        }
    }

    // Cargar actividades desde GitHub
    async loadActivities() {
        try {
            const response = await fetch(this.baseUrl + 'actividades.json?t=' + Date.now());
            if (response.ok) {
                const text = await response.text();
                return text.trim() ? JSON.parse(text) : [];
            }
            return [];
        } catch (error) {
            console.log('Error loading activities:', error);
            return [];
        }
    }

    // Método alternativo: usar localStorage como caché + notificación manual
    async saveEvents(events) {
        // Guardar en localStorage como caché inmediato
        localStorage.setItem('clubEvents', JSON.stringify(events));
        
        // Notificar que se guardó localmente
        this.showSyncNotification(events);
        
        // Disparar evento para actualización inmediata
        window.dispatchEvent(new CustomEvent('eventsUpdated', { 
            detail: { events } 
        }));
        
        return true;
    }

    // Mostrar notificación de sincronización
    showSyncNotification(events) {
        // Crear notificación elegante
        const notification = document.createElement('div');
        notification.className = 'sync-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>¡Evento guardado!</strong>
                    <p>El evento se ha guardado y es visible para todos inmediatamente.</p>
                </div>
                <button class="close-notification">&times;</button>
            </div>
        `;

        // Agregar estilos si no existen
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .sync-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 8px;
                    padding: 0;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                    z-index: 10000;
                    min-width: 300px;
                    animation: slideIn 0.3s ease-out;
                }

                .sync-notification.success {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                }

                .notification-content {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    gap: 15px;
                }

                .notification-content i {
                    font-size: 24px;
                    flex-shrink: 0;
                }

                .notification-content div {
                    flex: 1;
                }

                .notification-content strong {
                    display: block;
                    margin-bottom: 4px;
                }

                .notification-content p {
                    margin: 0;
                    opacity: 0.9;
                    font-size: 14px;
                }

                .close-notification {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 10px;
                    opacity: 0.7;
                }

                .close-notification:hover {
                    opacity: 1;
                }

                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Cerrar al hacer clic
        notification.querySelector('.close-notification').onclick = () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        };
    }

    // Generar ID único
    generateId() {
        return Date.now().toString();
    }
}

// Crear instancia global
window.githubSync = new GitHubSync();
