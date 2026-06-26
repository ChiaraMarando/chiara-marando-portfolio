const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times'; // Icona della X
    } else {
        icon.className = 'fas fa-bars';  // Torna alle tre linee
    }
});

const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// Gestione invio form con EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Blocca il ricaricamento della pagina

        // Cambiamo il testo del bottone per dare un feedback visivo di caricamento
        const btnSubmit = contactForm.querySelector('.btn-submit');
        const originalBtnText = btnSubmit.textContent;
        btnSubmit.textContent = 'Invio in corso...';
        btnSubmit.disabled = true;

        // Invia il form a EmailJS
        // Sostituisci 'YOUR_SERVICE_ID' e 'YOUR_TEMPLATE_ID' con i tuoi codici di EmailJS
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
                btnSubmit.textContent = originalBtnText;
                btnSubmit.disabled = false;
            });
    });
}