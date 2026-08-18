// --- LAB 1: XSS FUNKCIJA ---
function testirajUnos() {
    let unos = document.getElementById("userInput").value;
    document.getElementById("vulnerableOutput").innerHTML = unos;
    document.getElementById("safeOutput").textContent = unos;
}

// --- LAB 2: HTTP HEADERS BAZA & FUNKCIJA ---
const headersInfo = {
    hsts: {
        title: "Strict-Transport-Security (HSTS)",
        desc: "Prisiljava preglednik da koristi isključivo HTTPS enkriptiranu vezu, čak i ako korisnik utipka http://.",
        protection: "Man-in-the-Middle (MitM) & SSL Striping napadi",
        example: "Strict-Transport-Security: max-age=31536000; includeSubDomains"
    },
    csp: {
        title: "Content-Security-Policy (CSP)",
        desc: "Definira dopuštene izvore s kojih se smiju učitavati skripte, stilovi i medijski sadržaj.",
        protection: "Cross-Site Scripting (XSS) & Data Injection napadi",
        example: "Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com"
    },
    xfo: {
        title: "X-Frame-Options",
        desc: "Određuje smije li se web stranica prikazati unutar iframe okvira na drugim web stranicama.",
        protection: "Clickjacking napadi (zavaravanje korisnika nevidljivim gumbima)",
        example: "X-Frame-Options: DENY"
    },
    xcto: {
        title: "X-Content-Type-Options",
        desc: "Sprečava preglednik da sam samovoljno interpretira tip datoteke ako poslužitelj pošalje pogrešan MIME-type.",
        protection: "MIME-sniffing napadi i izvršavanje zlonamjernog koda",
        example: "X-Content-Type-Options: nosniff"
    }
};

function analizirajHeader() {
    let odabir = document.getElementById("headerSelect").value;
    let rezultatBox = document.getElementById("headerResult");

    if (odabir && headersInfo[odabir]) {
        let info = headersInfo[odabir];
        document.getElementById("headerTitle").textContent = info.title;
        document.getElementById("headerDesc").textContent = info.desc;
        document.getElementById("headerProtection").textContent = info.protection;
        document.getElementById("headerExample").textContent = info.example;
        
        rezultatBox.style.display = "block";
    } else {
        rezultatBox.style.display = "none";
    }
}

// --- LAB 3: POST FETCH REQ SIMULATOR ---
async function posaljiIncident(event) {
    event.preventDefault();

    const btn = document.getElementById("submitBtn");
    const resultBox = document.getElementById("postResult");
    const statusText = document.getElementById("postStatus");
    const outputCode = document.getElementById("postOutput");

    const podaciZaSlanje = {
        prijavio: document.getElementById("reporterName").value,
        tipIncidenta: document.getElementById("incidentType").value,
        opis: document.getElementById("incidentDesc").value,
        vrijemePrijave: new Date().toISOString()
    };

    btn.disabled = true;
    btn.textContent = "Šaljem podatke...";

    try {
        const odgovor = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(podaciZaSlanje)
        });

        if (!odgovor.ok) {
            throw new Error(`Pogreška sa poslužiteljem: Status ${odgovor.status}`);
        }

        const odgovorPodaci = await odgovor.json();

        statusText.style.color = "#00ff66";
        statusText.textContent = `Uspješno poslano! (HTTP Status: ${odgovor.status} Created)`;
        outputCode.textContent = JSON.stringify(odgovorPodaci, null, 2);
        resultBox.style.display = "block";

    } catch (greska) {
        statusText.style.color = "#ff5555";
        statusText.textContent = `Greška: ${greska.message}`;
        outputCode.textContent = "Nije moguće poslati podatke na poslužitelj.";
        resultBox.style.display = "block";
    } finally {
        btn.disabled = false;
        btn.textContent = "Šalji Prijavu (POST Request)";
    }
}

// --- LAB 4: PASSWORD STRENGTH & ENTROPY ANALYZER ---
function prikaziLozinku() {
    const input = document.getElementById("passInput");
    input.type = input.type === "password" ? "text" : "password";
}

function analizirajLozinku() {
    const pass = document.getElementById("passInput").value;
    const box = document.getElementById("passAnalysis");

    if (!pass) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";

    let poolSize = 0;
    let suggestions = [];

    // Određivanje veličine skupa znakova (Pool Size)
    if (/[a-z]/.test(pass)) poolSize += 26; else suggestions.push("Dodajte mala slova (a-z)");
    if (/[A-Z]/.test(pass)) poolSize += 26; else suggestions.push("Dodajte velika slova (A-Z)");
    if (/[0-9]/.test(pass)) poolSize += 10; else suggestions.push("Dodajte brojeve (0-9)");
    if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 32; else suggestions.push("Dodajte specijalne znakove (!@#$%...)");

    if (pass.length < 12) {
        suggestions.push("Preporučena duljina je minimalno 12 znakova.");
    }

    // Izračun entropije: E = L * log2(R)
    const entropy = poolSize > 0 ? pass.length * Math.log2(poolSize) : 0;
    const roundedEntropy = Math.round(entropy);

    document.getElementById("entropyBits").textContent = roundedEntropy;
    document.getElementById("poolSize").textContent = poolSize;

    // Procjena vremena probijanja (pretpostavka: 10 milijardi pokušaja u sekundi)
    const combinations = Math.pow(poolSize, pass.length);
    const seconds = combinations / 10000000000;
    document.getElementById("crackTime").textContent = formatirajVrijeme(seconds);

    // Vizualni indikator i kategorizacija
    const meter = document.getElementById("strengthMeter");
    const label = document.getElementById("strengthLabel");

    if (roundedEntropy < 28) {
        meter.style.width = "20%";
        meter.style.backgroundColor = "#ff4d4d";
        label.textContent = "VRLO SLABA";
        label.style.color = "#ff4d4d";
    } else if (roundedEntropy < 36) {
        meter.style.width = "40%";
        meter.style.backgroundColor = "#ffa64d";
        label.textContent = "SLABA";
        label.style.color = "#ffa64d";
    } else if (roundedEntropy < 60) {
        meter.style.width = "65%";
        meter.style.backgroundColor = "#ffff4d";
        label.textContent = "UMJERENA";
        label.style.color = "#ffff4d";
    } else if (roundedEntropy < 80) {
        meter.style.width = "85%";
        meter.style.backgroundColor = "#73e600";
        label.textContent = "JAKA";
        label.style.color = "#73e600";
    } else {
        meter.style.width = "100%";
        meter.style.backgroundColor = "#00ff66";
        label.textContent = "IZUZETNO JAKA";
        label.style.color = "#00ff66";
    }

    // Prikaz preporuka
    const sugList = document.getElementById("passSuggestions");
    sugList.innerHTML = "";
    if (suggestions.length === 0) {
        sugList.innerHTML = "<li style='color: #00ff66;'>Lozinka ispunjava sve visoke sigurnosne preporuke!</li>";
    } else {
        suggestions.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            sugList.appendChild(li);
        });
    }
}

function formatirajVrijeme(sekunde) {
    if (sekunde < 1) return "Trenutačno (< 1 sekunda)";
    if (sekunde < 60) return `${Math.round(sekunde)} sekundi`;
    const minute = sekunde / 60;
    if (minute < 60) return `${Math.round(minute)} minuta`;
    const sati = minute / 60;
    if (sati < 24) return `${Math.round(sati)} sati`;
    const dani = sati / 24;
    if (dani < 365) return `${Math.round(dani)} dana`;
    const godine = dani / 365;
    if (godine < 1000) return `${Math.round(godine)} godina`;
    if (godine < 1000000) return `${(godine / 1000).toFixed(1)} tisuća godina`;
    if (godine < 1000000000) return `${(godine / 1000000).toFixed(1)} milijuna godina`;
    return "Više od milijardu godina";
}
