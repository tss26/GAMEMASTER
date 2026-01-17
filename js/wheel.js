const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultMessage = document.getElementById('resultMessage');

const segments = [
    { text: "Premio Super!", color: "#FF6347" }, // Rosso Pomodoro
    { text: "Niente, riprova!", color: "#87CEEB" }, // Azzurro Cielo
    { text: "Un Bonus!", color: "#FFD700" },      // Oro
    { text: "Spiacente...", color: "#98FB98" },    // Verde Menta
    { text: "Mega Premio!", color: "#BA55D3" },   // Viola Medio
    { text: "Giro Extra!", color: "#FF4500" },   // Arancione Rosso
    { text: "Riprova!", color: "#ADD8E6" },      // Blu Chiaro
    { text: "Buona Fortuna!", color: "#FF8C00" },  // Arancione Scuro
    { text: "Peccato!", color: "#7CFC00" },      // Verde Prato
    { text: "Regalo!", color: "#DA70D6" },      // Orchidea
    { text: "Niente, dai!", color: "#00CED1" },   // Turchese Scuro
    { text: "Che Peccato!", color: "#F0E68C" },   // Cachi
    { text: "Vinci Qui!", color: "#FF69B4" },    // Rosa Caldo
    { text: "Forse la prossima!", color: "#FFA07A" }, // Salmone Chiaro
    { text: "Premio Minore!", color: "#40E0D0" }, // Turchese
    { text: "Non questa volta!", color: "#EE82EE" }, // Viola
    { text: "Complimenti!", color: "#6A5ACD" },   // Blu Ardesia
    { text: "Ritenta!", color: "#F4A460" },      // Sabbia
    { text: "Gran Premio!", color: "#DC143C" },   // Rosso Cremisi
    { text: "Zero Punti...", color: "#20B2AA" }   // Azzurro Chiaro
];

const numSegments = segments.length;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = centerX - 20; // Un po' di margine per il bordo

let currentRotation = 0; // Gradi di rotazione attuale
let isSpinning = false;

// Funzione per disegnare la ruota
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas

    for (let i = 0; i < numSegments; i++) {
        const angle = (i * 2 * Math.PI) / numSegments;
        const endAngle = ((i + 1) * 2 * Math.PI) / numSegments;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, endAngle);
        ctx.closePath();

        ctx.fillStyle = segments[i].color;
        ctx.fill();
        ctx.strokeStyle = '#333'; // Bordo nero tra gli spicchi
        ctx.lineWidth = 2;
        ctx.stroke();

        // Disegna il testo
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + (Math.PI / numSegments)); // Ruota il testo per allinearlo allo spicchio
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff'; // Testo bianco per contrasto
        ctx.font = 'bold 16px Arial';
        ctx.fillText(segments[i].text, radius - 10, 0); // Posiziona il testo
        ctx.restore();
    }
}

// Funzione per animare la ruota
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;
    resultMessage.textContent = "Gira la ruota...";

    // Logica di selezione dello spicchio
    // Per ora, selezioniamo uno spicchio casuale.
    // In futuro, qui potrai implementare la logica di probabilità.
    const winningSegmentIndex = Math.floor(Math.random() * numSegments);

    // Calcola la rotazione necessaria per fermarsi sullo spicchio vincente
    // Aggiungiamo un numero di giri completi (es. 5) per un'animazione più realistica
    const degreesPerSegment = 360 / numSegments;
    const targetRotation = (360 * 5) + (360 - (winningSegmentIndex * degreesPerSegment + degreesPerSegment / 2)); // Si ferma al centro dello spicchio

    canvas.style.transform = `rotate(${targetRotation}deg)`;

    // Dopo che l'animazione è finita (dopo 4 secondi, come da CSS transition)
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;

        // Normalizza la rotazione per calcolare lo spicchio finale visibile
        // Questo è importante se vuoi determinare lo spicchio *visibile* dal CSS transform
        // Per una determinazione più robusta, l'indice è già `winningSegmentIndex`
        const finalSegment = segments[winningSegmentIndex];
        resultMessage.textContent = `Hai vinto: ${finalSegment.text}!`;

        // Reset della rotazione del canvas per il prossimo giro (opzionale, per evitare accumulo di gradi)
        // O lo lasci così e la prossima rotazione partirà da dove è finita
        // currentRotation = targetRotation % 360; // Mantieni la rotazione nell'intervallo 0-359
        // canvas.style.transform = `rotate(${currentRotation}deg)`; // Applica la rotazione normalizzata se vuoi
    }, 4000); // 4 secondi, deve corrispondere alla durata della transition in CSS
}

// Event Listener per il pulsante
spinButton.addEventListener('click', spinWheel);

// Inizializza la ruota al caricamento
drawWheel();

// Assicurati che il service worker sia registrato dopo che il DOM è caricato
// Questo è più appropriato in `app.js` ma lo metto qui per completezza temporanea
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registrato!', reg))
            .catch(err => console.log('Errore Service Worker:', err));
    });
}
