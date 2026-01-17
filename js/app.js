// Questo file può contenere la logica del Service Worker e altre funzionalità PWA/di gioco
// Per ora, la registrazione del Service Worker è stata spostata in `wheel.js` temporaneamente per facilitare il test iniziale.
// Idealmente, andrebbe qui, e `sw.js` sarebbe un file separato.

// Esempio di gestione dei limiti di giro (da implementare completamente)
let spinsToday = 0;
const MAX_SPINS_PER_DAY = 3;

function checkSpinLimits() {
    // Implementa la logica per salvare/recuperare i giri dal LocalStorage o da un server
    // Per ora, è una semplice variabile.
    if (spinsToday >= MAX_SPINS_PER_DAY) {
        spinButton.disabled = true;
        resultMessage.textContent = "Hai raggiunto il limite di giri giornalieri! Riprova domani.";
        return false;
    }
    return true;
}

// Chiamata all'inizio per disabilitare il pulsante se il limite è raggiunto
// checkSpinLimits();

// Esempio di come potresti incrementare i giri dopo una rotazione
// (Questo andrebbe all'interno della funzione `spinWheel` dopo un giro riuscito)
/*
    if (checkSpinLimits()) {
        spinsToday++;
        // Salva `spinsToday` nel LocalStorage
    }
*/

// Potresti aggiungere qui la logica per mostrare un messaggio di installazione PWA, ecc.
