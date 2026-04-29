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
            window.location.href = 'index.html';
        }
    });

    // --- 4. THE SWAP SWITCH (Fixed with Added Animation) ---
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

            // Start text fade-out animation
            overlayTitle.style.opacity = "0";
            overlayText.style.opacity = "0";
            overlayTitle.style.transform = "translateY(-10px)";

            setTimeout(() => {
                if (isSwapped) {
                    // Slide to LEFT
                    slidingOverlay.style.left = "0%";
                    
                    // Update Text
                    overlayTitle.innerText = "Become a Member?";
                    overlayText.innerText = "Switch back to the membership application form.";
                    switchBtn.innerText = "VIEW VOLUNTEER";

                    // Dim the hidden side
                    formRight.style.opacity = "1";
                    formLeft.style.opacity = "0.2";
                } else {
                    // Slide to RIGHT
                    slidingOverlay.style.left = "50%";
                    
                    // Update Text
                    overlayTitle.innerText = "Ready to Help?";
                    overlayText.innerText = "Switch to the concern form to report an incident or make a donation.";
                    switchBtn.innerText = "SWITCH VIEW";

                    // Dim the hidden side
                    formLeft.style.opacity = "1";
                    formRight.style.opacity = "0.2";
                }

                // Fade text back in
                overlayTitle.style.opacity = "1";
                overlayText.style.opacity = "1";
                overlayTitle.style.transform = "translateY(0)";
            }, 300); // Wait for half the slide time to swap text
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
});