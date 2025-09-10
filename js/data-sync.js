// Sistema de sincronización de datos compartidos
class DataSync {
    constructor() {
        this.baseUrl = window.location.origin + window.location.pathname.replace('admin.html', '').replace('index.html', '');
        this.eventosFile = 'eventos.json';
        this.actividadesFile = 'actividades.json';
    }

    // Cargar eventos desde el archivo JSON
    async loadEvents() {
        try {
            const response = await fetch(this.baseUrl + this.eventosFile + '?t=' + Date.now());
            if (response.ok) {
                const text = await response.text();
                return text.trim() ? JSON.parse(text) : [];
            }
            return [];
        } catch (error) {
            console.log('No se pudieron cargar eventos, usando array vacío');
            return [];
        }
    }

    // Cargar actividades desde el archivo JSON
    async loadActivities() {
        try {
            const response = await fetch(this.baseUrl + this.actividadesFile + '?t=' + Date.now());
            if (response.ok) {
                const text = await response.text();
                return text.trim() ? JSON.parse(text) : [];
            }
            return [];
        } catch (error) {
            console.log('No se pudieron cargar actividades, usando array vacío');
            return [];
        }
    }

    // Generar código JSON para que el admin lo copie y pegue
    generateEventCode(eventData) {
        return JSON.stringify(eventData, null, 2);
    }

    // Mostrar instrucciones para actualizar el archivo
    showUpdateInstructions(data, filename, action = 'agregar') {
        const modal = document.createElement('div');
        modal.className = 'sync-modal';
        modal.innerHTML = `
            <div class="sync-modal-content">
                <div class="sync-modal-header">
                    <h3>📝 Actualizar ${filename}</h3>
                    <span class="sync-close">&times;</span>
                </div>
                <div class="sync-modal-body">
                    <p><strong>Para ${action} este elemento:</strong></p>
                    <ol>
                        <li>Ve a <a href="https://github.com/AugustoIZO/nuevaeraclub/edit/main/${filename}" target="_blank">GitHub → ${filename}</a></li>
                        <li>Copia este código:</li>
                    </ol>
                    <div class="code-container">
                        <button class="copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent)">📋 Copiar</button>
                        <pre class="code-block">${this.generateEventCode(data)}</pre>
                    </div>
                    <ol start="3">
                        <li>${action === 'agregar' ? 'Pégalo al final del array (antes del ])' : 'Reemplaza todo el contenido'}</li>
                        <li>Haz clic en "Commit changes"</li>
                        <li>¡Los cambios aparecerán en 1-2 minutos!</li>
                    </ol>
                </div>
                <div class="sync-modal-footer">
                    <button class="btn btn-secondary sync-close">Cerrar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        modal.querySelectorAll('.sync-close').forEach(btn => {
            btn.onclick = () => modal.remove();
        });

        // Cerrar al hacer clic fuera
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
}

// CSS para el modal de sincronización
const syncStyles = `
<style>
.sync-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.sync-modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
}

.sync-modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sync-modal-body {
    padding: 20px;
}

.sync-modal-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    text-align: right;
}

.code-container {
    position: relative;
    margin: 15px 0;
}

.copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.code-block {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    font-family: monospace;
    font-size: 12px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 200px;
    overflow-y: auto;
}

.sync-close {
    cursor: pointer;
    font-size: 24px;
    color: #999;
}

.sync-close:hover {
    color: #333;
}
</style>
`;

// Agregar estilos al documento
if (!document.querySelector('#sync-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'sync-styles';
    styleElement.innerHTML = syncStyles;
    document.head.appendChild(styleElement);
}

// Crear instancia global
window.dataSync = new DataSync();
