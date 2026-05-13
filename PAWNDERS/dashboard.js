document.addEventListener('DOMContentLoaded', () => {
    console.log("StraySafe Script Active: Terracotta Swap Mode.");

    // --- 1. USER DISPLAY ---
    const introText = document.querySelector('.dashboard-intro p');
    if (introText) {
        const userEmail = localStorage.getItem('activeUser') || "Iana";
        introText.innerHTML = `Welcome back, <span style="color: var(--terracotta); font-weight: bold;">${userEmail}</span>. Monitoring live rescue data for Valenzuela City.`;
    }

    // --- 2. MAP INITIALIZATION ---
    const mapBox = document.getElementById('map-container');
    if (mapBox) {
        const map = L.map('map-container').setView([14.7011, 120.9830], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO'
        }).addTo(map);

        const addRedMarker = (lat, lng, isHQ = false) => {
            const marker = L.marker([lat, lng]).addTo(map);
            marker._icon.style.filter = "hue-rotate(150deg) saturate(300%)";
            
            const btn = document.createElement('button');
            btn.innerHTML = `<b>${isHQ ? 'HQ Location' : 'Incident Point'}</b><br>Remove Pin ✕`;
            btn.style = "margin-top:5px; background:var(--terracotta); color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px; font-family:inherit;";
            
            btn.onclick = () => map.removeLayer(marker);
            marker.bindPopup(btn);
            if(isHQ) marker.openPopup();
        };

        addRedMarker(14.7011, 120.9830, true);
        map.on('click', (e) => addRedMarker(e.latlng.lat, e.latlng.lng));
        setTimeout(() => map.invalidateSize(), 500);
    }

    // --- 3. AUTH & LOGOUT ---
    document.querySelector('.ph-sign-out')?.parentElement.addEventListener('click', () => {
        if(confirm("Logout from StraySafe?")) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('activeUser');
            localStorage.removeItem('userActivities');
            window.location.href = 'index.html';
        }
    });

    // --- 4. THE SWAP SWITCH ---
    const authContainer = document.getElementById('authContainer');
    const switchBtn = document.getElementById('switchBtn');
    const slidingOverlay = document.getElementById('slidingOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayText = document.getElementById('overlayText');
    const formLeft = document.querySelector('.side-left');
    const formRight = document.querySelector('.side-right');

    if (switchBtn && authContainer) {
        let isSwapped = false;

        switchBtn.onclick = () => {
            isSwapped = !isSwapped;
            overlayTitle.style.opacity = "0";
            overlayText.style.opacity = "0";
            overlayTitle.style.transform = "translateY(-10px)";

            setTimeout(() => {
                if (isSwapped) {
                    slidingOverlay.style.left = "0%";
                    overlayTitle.innerText = "Become a Member?";
                    overlayText.innerText = "Switch back to the membership application form.";
                    switchBtn.innerText = "VIEW VOLUNTEER";
                    formRight.style.opacity = "1";
                    formLeft.style.opacity = "0.2";
                } else {
                    slidingOverlay.style.left = "50%";
                    overlayTitle.innerText = "Ready to Help?";
                    overlayText.innerText = "Switch to the concern form to report an incident or make a donation.";
                    switchBtn.innerText = "SWITCH VIEW";
                    formLeft.style.opacity = "1";
                    formRight.style.opacity = "0.2";
                }
                overlayTitle.style.opacity = "1";
                overlayText.style.opacity = "1";
                overlayTitle.style.transform = "translateY(0)";
            }, 300);
        };
    }

    // --- 5. FORM SUBMISSIONS ---
    const handleForm = (id, message) => {
        document.getElementById(id)?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(message);
            e.target.reset();
        });
    };

    handleForm('newsletterForm', "Salamat! You are now part of the pack.");
    handleForm('volunteerForm', "Application submitted successfully!");
    handleForm('concernForm', "Your concern has been sent to our team.");

    // --- 6. SERVICE MODAL INITIALIZATION ---
    // This connects your service cards to the modal
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').innerText;
            const icon = card.querySelector('.service-icon').innerText;
            const desc = card.querySelector('p').innerText;
            
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalIcon').innerText = icon;
            document.getElementById('modalDescription').innerText = desc;
            document.getElementById('serviceModal').style.display = 'flex';
        });
    });

    document.getElementById('closeService')?.addEventListener('click', () => {
        document.getElementById('serviceModal').style.display = 'none';
    });
});

// --- ACTIVITY LOG LOGIC ---

let activities = JSON.parse(localStorage.getItem('userActivities')) || [];

// Defined on window so HTML onclick can find it
window.logActivity = function(itemName, type) {
    const now = new Date();
    const timestamp = now.toLocaleDateString() + ' | ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let newEntry = {
        id: Date.now(),
        time: timestamp
    };

    if (type === 'liked') {
        newEntry.icon = '❤️';
        newEntry.title = `You liked ${itemName}`;
        newEntry.status = 'SAVED'; 
    } else if (type === 'wishlist') {
        newEntry.icon = '➕';
        newEntry.title = `Added ${itemName} to wishlist`;
        newEntry.status = 'PENDING REQUEST';
    } else if (type === 'service') {
        newEntry.icon = '🚑';
        newEntry.title = `Requested Service: ${itemName}`;
        newEntry.status = 'PENDING';
    }

    activities.unshift(newEntry);
    localStorage.setItem('userActivities', JSON.stringify(activities));
    alert(`${itemName} updated in your Activity Log!`);
}

function renderActivities() {
    const container = document.querySelector('.activity-list');
    if (!container) return;
    
    container.innerHTML = ''; 

    if (activities.length === 0) {
        container.innerHTML = '<p style="text-align:center; opacity:0.5; padding: 20px;">No recent activity found.</p>';
        return;
    }

    activities.forEach(act => {
        const itemHtml = `
            <div class="activity-item glass" style="padding: 15px; margin-bottom: 12px; border-radius: 12px; display: flex; align-items: center; gap: 15px;">
                <div class="activity-icon" style="background: rgba(217, 119, 6, 0.1); padding: 10px; border-radius: 50%;">${act.icon}</div>
                <div style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 0.9rem;">${act.title}</h4>
                    <small style="opacity: 0.6;">${act.time}</small>
                </div>
                <span class="status-tag" style="font-size: 0.7rem; background: #fff3e0; color: #d97706; padding: 4px 8px; border-radius: 20px; font-weight: 800; border: 1px solid orange;">
                    ${act.status}
                </span>
            </div>
        `;
        container.innerHTML += itemHtml;
    });
}

// Activity Modal Toggles
const activityModal = document.getElementById('activityModal');
const openBtn = document.getElementById('openActivity');
const closeBtn = document.getElementById('closeActivity');

if (openBtn) {
    openBtn.onclick = (e) => {
        e.preventDefault();
        renderActivities(); 
        activityModal.style.display = 'flex';
    }
}

if (closeBtn) {
    closeBtn.onclick = () => {
        activityModal.style.display = 'none';
    }
}

window.addEventListener('click', (event) => {
    if (event.target == activityModal) {
        activityModal.style.display = "none";
    }
    if (event.target == document.getElementById('serviceModal')) {
        document.getElementById('serviceModal').style.display = "none";
    }
});

// Service Form Submission
const serviceForm = document.getElementById('serviceInfoForm');
if (serviceForm) {
    serviceForm.onsubmit = (e) => {
        e.preventDefault();
        const serviceName = document.getElementById('modalTitle').innerText;
        logActivity(serviceName, 'service');
        document.getElementById('serviceModal').style.display = 'none';
        serviceForm.reset();
    };
}

// Clear activities when the user closes the tab or navigates away
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('userActivities');
});