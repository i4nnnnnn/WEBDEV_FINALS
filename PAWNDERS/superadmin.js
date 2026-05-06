// MAP INITIALIZATION
function initMap() {
    const mapElement = document.getElementById('admin-live-map');
    if (mapElement) {
        // Initialize map centered on Valenzuela
        const map = L.map(mapElement).setView([14.7011, 120.9830], 13);
        
        // Corrected tile layer URL
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([14.7011, 120.9830]).addTo(map).bindPopup('Paso de Blas Node');
        L.marker([14.6750, 120.9800]).addTo(map).bindPopup('Marulas Hub');
    }
}

// RESCUE CHART LOGIC
function initChart() {
    const ctx = document.getElementById('rescueChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Rescues Completed',
                    data: [45, 52, 38, 65, 48],
                    backgroundColor: '#e67e22'
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false 
            }
        });
    }
}

// DATA PRIVACY CONTROL FUNCTIONALITY
const savePrivacyBtn = document.getElementById('save-privacy-btn');
const exportDataBtn = document.getElementById('export-data-btn');

if (savePrivacyBtn) {
    savePrivacyBtn.addEventListener('click', function() {
        const settings = {
            encryption: document.getElementById('encryption-toggle').checked,
            anonymousReporting: document.getElementById('anon-toggle').checked,
            retention: document.getElementById('retention-select').value,
            twoFactor: document.getElementById('2fa-toggle').checked,
            gdpr: document.getElementById('gdpr-toggle').checked
        };
        
        this.innerHTML = '<i class="ph-bold ph-check"></i> Saved!';
        this.style.background = '#10b981';
        
        setTimeout(() => {
            this.innerHTML = '<i class="ph-bold ph-floppy-disk"></i> Save Settings';
            this.style.background = '#0f172a';
        }, 2000);
        
        console.log('Privacy settings saved:', settings);
    });
}

if (exportDataBtn) {
    exportDataBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="ph-bold ph-spinner"></i> Exporting...';
        
        setTimeout(() => {
            this.innerHTML = '<i class="ph-bold ph-check"></i> Downloaded!';
            setTimeout(() => {
                this.innerHTML = '<i class="ph-bold ph-download"></i> Export Data';
            }, 2000);
        }, 1500);
    });
}

// SYSTEM MONITORING FUNCTIONALITY
function updateSystemMetrics() {
    const metrics = {
        cpu: Math.floor(Math.random() * 40) + 30,
        memory: Math.floor(Math.random() * 30) + 50,
        storage: Math.floor(Math.random() * 20) + 45,
        network: Math.floor(Math.random() * 50) + 10
    };

    const updateMetric = (id, value, barId) => {
        const element = document.getElementById(id);
        const bar = document.getElementById(barId);
        if (element && bar) {
            element.textContent = value + '%';
            bar.style.width = value + '%';
            bar.style.background = value > 80 ? '#ef4444' : value > 60 ? '#f59e0b' : '#10b981';
        }
    };

    updateMetric('cpu-value', metrics.cpu, 'cpu-bar');
    updateMetric('memory-value', metrics.memory, 'memory-bar');
    updateMetric('storage-value', metrics.storage, 'storage-bar');
    updateMetric('network-value', metrics.network, 'network-bar');

    const lastCheck = document.getElementById('last-check-time');
    if (lastCheck) lastCheck.textContent = 'Just now';
}

const refreshBtn = document.getElementById('refresh-system-btn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="ph-bold ph-spinner"></i> Refreshing...';
        setTimeout(() => {
            updateSystemMetrics();
            this.innerHTML = '<i class="ph-bold ph-arrows-clockwise"></i> Refresh Metrics';
        }, 1000);
    });
}

// Activity log auto-update simulation
const activityLogs = [
    { icon: 'ph-user-check', color: '#10b981', text: 'Admin login: Kaitleen Carulla' },
    { icon: 'ph-paw-print', color: '#f59e0b', text: 'New stray report: Paso de Blas' },
    { icon: 'ph-first-aid-kit', color: '#3b82f6', text: 'Rescue completed: Dog #247' },
    { icon: 'ph-shield-check', color: '#10b981', text: 'Security scan completed' },
    { icon: 'ph-database', color: '#8b5cf6', text: 'Data sync with LGU servers' },
    { icon: 'ph-calendar-plus', color: '#ec4899', text: 'New event created: Adoption Day' }
];

function addNewLogEntry() {
    const logsContainer = document.getElementById('activity-logs');
    if (!logsContainer) return;

    const randomLog = activityLogs[Math.floor(Math.random() * activityLogs.length)];
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(-10px)';
    newEntry.innerHTML = `
        <span><i class="ph-bold ${randomLog.icon}" style="color: ${randomLog.color};"></i> ${randomLog.text}</span>
        <span class="log-time">Just now</span>
    `;
    
    logsContainer.insertBefore(newEntry, logsContainer.firstChild);
    
    setTimeout(() => {
        newEntry.style.transition = 'all 0.3s ease';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 10);
    
    while (logsContainer.children.length > 5) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initChart();
    updateSystemMetrics();
    // Auto-refresh intervals
    setInterval(updateSystemMetrics, 30000);
    setInterval(addNewLogEntry, 45000);
});