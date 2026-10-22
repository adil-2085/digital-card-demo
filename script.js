document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Audio Toggle Logic
    const audioToggle = document.getElementById('audioToggle');
    const bgAudio = document.getElementById('bgAudio');
    const audioSlash = document.getElementById('audioSlash');
    let isPlaying = false;

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            audioToggle.classList.remove('playing');
            audioSlash.style.display = 'block';
        } else {
            bgAudio.play().catch(e => console.log("Audio play blocked by browser:", e));
            audioToggle.classList.add('playing');
            audioSlash.style.display = 'none';
        }
        isPlaying = !isPlaying;
    });

    // 3. Countdown Timer (Set to Nov 22, 2026, 11:00 AM)
    const weddingDate = new Date("Nov 22, 2026 11:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            document.getElementById("cd-days").innerText = "00";
            document.getElementById("cd-hours").innerText = "00";
            document.getElementById("cd-mins").innerText = "00";
            document.getElementById("cd-secs").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-days").innerText = String(days).padStart(2, '0');
        document.getElementById("cd-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("cd-mins").innerText = String(mins).padStart(2, '0');
        document.getElementById("cd-secs").innerText = String(secs).padStart(2, '0');
    };

    updateCountdown(); 
    setInterval(updateCountdown, 1000);
});