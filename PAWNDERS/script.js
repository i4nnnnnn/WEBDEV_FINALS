// --- 0. TESTING RESET ---
// localStorage.clear(); 

document.addEventListener('DOMContentLoaded', () => {
    console.log("StraySafe Script Active. Login Status:", localStorage.getItem('isLoggedIn'));

    // --- 1. ELEMENT SELECTORS ---
    const loginOverlay = document.getElementById('loginOverlay');
    const openBtn = document.getElementById('openLogin');
    const closeBtn = document.getElementById('closeLogin');
    const signInView = document.getElementById('signInView');
    const signUpView = document.getElementById('signUpView');
    const toSignUp = document.getElementById('toSignUp');
    const toSignInLinks = document.querySelectorAll('.toSignInLink'); 
    const mainSignInForm = document.getElementById('mainSignInForm');
    const signUpForm = document.getElementById('signUpForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const subscriberEmail = document.getElementById('subscriberEmail');

    // --- 2. MODAL CONTROLS (LOGIN) ---
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            loginOverlay.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            loginOverlay.style.display = 'none';
        });
    }

    // --- 3. VIEW SWITCHING ---
    if (toSignUp) {
        toSignUp.addEventListener('click', () => {
            signInView.classList.add('hidden');
            signUpView.classList.remove('hidden');
        });
    }

    toSignInLinks.forEach(link => {
        link.addEventListener('click', () => {
            signUpView.classList.add('hidden');
            signInView.classList.remove('hidden');
        });
    });

    // --- 4. LOGIN LOGIC ---
    if (mainSignInForm) {
        mainSignInForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const emailInput = document.getElementById('loginEmail')?.value || "User";
            localStorage.setItem('activeUser', emailInput);
            localStorage.setItem('isLoggedIn', 'true');
            alert("Success! You are now logged in.");
            window.location.href = "dashboard.html"; 
        });
    }

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('regEmail')?.value || "User";
            localStorage.setItem('activeUser', emailInput);
            localStorage.setItem('isLoggedIn', 'true');
            alert("Account created successfully! Welcome to the pack.");
            window.location.href = "dashboard.html";
        });
    }

    // --- 5. NEWSLETTER LOGIC ---
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const sessionActive = localStorage.getItem('isLoggedIn');
            if (sessionActive === 'true') {
                const emailValue = subscriberEmail ? subscriberEmail.value : "Friend";
                alert(`Salamat! ${emailValue} is now part of the pack.`);
                newsletterForm.reset();
            } else {
                alert("Oops! You need to join the pack first before you can subscribe.");
                loginOverlay.style.display = 'flex';
            }
        });
    }

    // --- 6. DYNAMIC SERVICE MODAL LOGIC ---
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceBtn = document.getElementById('closeService');
    const serviceCards = document.querySelectorAll('.service-card');
    const mIcon = document.getElementById('modalIcon');
    const mTitle = document.getElementById('modalTitle');
    const mDesc = document.getElementById('modalDescription');
    const serviceForm = document.getElementById('serviceInfoForm');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').innerText;
            mIcon.innerText = card.querySelector('.service-icon').innerText;
            mTitle.innerText = title;
            mDesc.innerText = card.getAttribute('data-details') || card.querySelector('p').innerText;

            const existingExtras = document.getElementById('extraFields');
            if (existingExtras) existingExtras.remove();
            
            const extraFields = document.createElement('div');
            extraFields.id = 'extraFields';
            
            const detailTextarea = serviceForm.querySelector('textarea');
            const detailLabel = detailTextarea.previousElementSibling;

            // Reset visibility in case it was hidden by Food Hub logic
            detailLabel.style.display = 'block';
            detailTextarea.style.display = 'block';

            switch(title.trim()) {
                case "Report Cases":
                    detailLabel.innerText = "Exact Location & Situation";
                    detailTextarea.placeholder = "Describe the animal's condition and landmarks...";
                    extraFields.innerHTML = `
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Upload Photo</label>
                        <input type="file" accept="image/*" style="margin-bottom:15px; width:100%;">
                    `;
                    break;

                case "Donation Hub":
                    detailLabel.innerText = "Donation or Request Details";
                    detailTextarea.placeholder = "e.g., I want to donate 5 sacks of kibble / I need food for 10 strays...";
                    extraFields.innerHTML = `
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Type of Action</label>
                        <select id="foodHubAction" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
                            <option>Donate Food</option>
                            <option>Request Food Support</option>
                            <option>Online Financial Donation</option>
                        </select>

                        <div id="onlineDonationFields" style="display:none; background: #fdf2f0; padding: 15px; border-radius: 10px; border: 1px dashed #d97706; margin-bottom: 15px;">
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Amount (PHP)</label>
                            <input type="number" placeholder="₱ 0.00" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
                            
                            <label style="display:block; margin-bottom:5px; font-weight:bold;">Remarks</label>
                            <input type="text" placeholder="e.g., For the strays in Valenzuela" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">

                            <label style="display:block; margin-bottom:10px; font-weight:bold; text-align: center;">Scan to Donate</label>
                            <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                                <img src="qr.png" alt="Donation QR Codes" style="width: 100%; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            </div>
                        </div>
                    `;

                    // Logic for Online Donation toggle
                    const actionSelect = extraFields.querySelector('#foodHubAction');
                    const donationFields = extraFields.querySelector('#onlineDonationFields');
                    actionSelect.addEventListener('change', (e) => {
                        if (e.target.value === "Online Financial Donation") {
                            donationFields.style.display = 'block';
                            detailLabel.style.display = 'none';
                            detailTextarea.style.display = 'none';
                        } else {
                            donationFields.style.display = 'none';
                            detailLabel.style.display = 'block';
                            detailTextarea.style.display = 'block';
                        }
                    });
                    break;

                case "Safe Fostering":
                    detailLabel.innerText = "Background Info";
                    detailTextarea.placeholder = "Describe your home environment and previous pet experience...";
                    extraFields.innerHTML = `
                        <div style="background:#fff3e0; padding:10px; border-radius:8px; font-size:0.8rem; margin-bottom:15px; border-left:4px solid #d97706;">
                            <strong>Fostering Rules:</strong> By submitting, you agree to provide a safe, indoor environment and follow StraySafe PH's medical guidelines.
                        </div>
                        <label style="display:flex; align-items:center; gap:8px; margin-bottom:15px; font-size:0.85rem;">
                            <input type="checkbox" required> I agree to the terms and consent form.
                        </label>

                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Upload Photo</label>
                        <input type="file" accept="image/*" title="Upload Home Photos" style="margin-bottom:15px; width:100%;">
                    `;
                    break;

                case "Vax & Spay":
                    detailLabel.innerText = "Behavior & Health Notes";
                    detailTextarea.placeholder = "Is the pet aggressive? Any known allergies?";
                    extraFields.innerHTML = `
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                            <div>
                                <label style="font-weight:bold; font-size:0.8rem;">Dog Type/Breed</label>
                                <input type="text" placeholder="e.g. Aspin" style="width:100%; padding:8px; border-radius:5px; border:1px solid #ddd;">
                            </div>
                            <div>
                                <label style="font-weight:bold; font-size:0.8rem;">Sex</label>
                                <select style="width:100%; padding:8px; border-radius:5px; border:1px solid #ddd;">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                    `;
                    break;

                default:
                    detailLabel.innerText = "Location/Details";
                    detailTextarea.placeholder = "Tell us more...";
            }

            detailLabel.parentNode.insertBefore(extraFields, detailLabel);
            serviceModal.style.display = 'flex';
        });
    });

    // --- 7. SERVICE FORM SUBMISSION ---
    if (serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const sessionActive = localStorage.getItem('isLoggedIn');
            const serviceType = mTitle.innerText;

            const isPublicService = (serviceType.trim() === "Report Cases" || serviceType.trim() === "Vax & Spay");
            
            if (sessionActive === 'true' || isPublicService) {
                alert(`Salamat! Your ${serviceType} request has been submitted successfully.`);
                serviceForm.reset();
                serviceModal.style.display = 'none';
            } else {
                alert(`For ${serviceType}, you need to join the pack first so we can coordinate better!`);
                serviceModal.style.display = 'none';
                loginOverlay.style.display = 'flex';
            }
        });
    }

    // Close logic for Service Modal
    if (closeServiceBtn) {
        closeServiceBtn.onclick = () => serviceModal.style.display = 'none';
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) loginOverlay.style.display = 'none';
        if (e.target === serviceModal) serviceModal.style.display = 'none';
    });
});