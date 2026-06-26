// 1. Inizializzazione di EmailJS (Mettila sempre in cima)
emailjs.init({
  publicKey: "LbqkEl2PXIfVYGImW",
});

// 2. Gestione Menu Mobile (Hamburger Menu)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times'; // Icona della X
            } else {
                icon.className = 'fas fa-bars';  // Torna alle tre linee
            }
        }
    });

    // Chiude il menu quando si clicca su un link del menu
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// 3. Gestione invio form con EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Blocca il ricaricamento della pagina

        // Cambiamo il testo del bottone per dare un feedback visivo di caricamento
        const btnSubmit = contactForm.querySelector('.btn-submit');
        let originalBtnText = '';
        
        if (btnSubmit) {
            originalBtnText = btnSubmit.textContent;
            btnSubmit.textContent = 'Invio in corso...';
            btnSubmit.disabled = true;
        }

        // Invia il form a EmailJS
        emailjs.sendForm('service_2t3a2ic', 'template_4t75bro', this)
            .then(() => {
                // Successo
                formStatus.textContent = 'Messaggio inviato con successo! Ti risponderò al più presto.';
                formStatus.className = 'form-status success'; // Classe CSS per farlo verde
                contactForm.reset(); // Svuota i campi del form
            }, (error) => {
                // Errore
                console.error('EmailJS Error:', error);
                formStatus.textContent = 'Ops! Qualcosa è andato storto. Riprova più tardi.';
                formStatus.className = 'form-status error'; // Classe CSS per farlo rosso
            })
            .finally(() => {
                // Ripristina il bottone in ogni caso
                if (btnSubmit) {
                    btnSubmit.textContent = originalBtnText;
                    btnSubmit.disabled = false;
                }
            });
    });
}