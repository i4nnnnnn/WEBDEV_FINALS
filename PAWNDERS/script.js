// --- 0. TESTING RESET ---
// This clears the 'isLoggedIn' status every time you refresh.
// REMOVE THIS LINE once you are done testing the "Oops!" alert.
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

    // --- 2. MODAL CONTROLS ---
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

    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.style.display = 'none';
        }
    });

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
            
            // SAVE EMAIL FROM LOGIN INPUT
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
            
            // SAVE EMAIL FROM SIGNUP INPUT
            const emailInput = document.getElementById('regEmail')?.value || "User";
            localStorage.setItem('activeUser', emailInput);
            
            localStorage.setItem('isLoggedIn', 'true');
            alert("Account created successfully! Welcome to the pack.");
            window.location.href = "dashboard.html";
        });
    }

    // --- 5. NEWSLETTER LOGIC (THE BOUNCER) ---
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
});