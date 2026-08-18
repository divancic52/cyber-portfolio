// --- LOGIKA ZA TABOVE ---
function otvoriTab(tabId, event) {
    // 1. Sakrij sve tab sadržaje
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // 2. Deaktiviraj sve gumbe
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Prikaz odabranog taba
    if (tabId === 'all') {
        allContents.forEach(content => {
            content.style.display = 'block';
        });
    } else {
        const targetContent = document.getElementById('tab-' + tabId);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active');
        }
    }

    // 4. Označi gumb kao aktivan
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Inicijalno učitavanje pri otvaranju stranice
window.addEventListener('DOMContentLoaded', () => {
    otvoriTab('about', null);
});


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

    if (/[a-z]/.test(pass)) poolSize += 26; else suggestions.push("Dodajte mala slova (a-z)");
    if (/[A-Z]/.test(pass)) poolSize += 26; else suggestions.push("Dodajte velika slova (A-Z)");
    if (/[0-9]/.test(pass)) poolSize += 10; else suggestions.push("Dodajte brojeve (0-9)");
    if (/[^a-zA-Z0-9]/.test(pass)) poolSize += 32; else suggestions.push("Dodajte specijalne znakove (!@#$%...)");

    if (pass.length < 12) {
        suggestions.push("Preporučena duljina je minimalno 12 znakova.");
    }

    const entropy = poolSize > 0 ? pass.length * Math.log2(poolSize) : 0;
    const roundedEntropy = Math.round(entropy);

    document.getElementById("entropyBits").textContent = roundedEntropy;
    document.getElementById("poolSize").textContent = poolSize;

    const combinations = Math.pow(poolSize, pass.length);
    const seconds = combinations / 10000000000;
    document.getElementById("crackTime").textContent = formatirajVrijeme(seconds);

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


// --- LAB 5: SHA-256 HASH GENERATOR & VERIFIER ---
async function generirajHash() {
    const tekst = document.getElementById("hashInput").value;
    const box = document.getElementById("hashResult");
    const output = document.getElementById("hashOutput");

    if (!tekst) {
        box.style.display = "none";
        document.getElementById("matchStatus").style.display = "none";
        document.getElementById("expectedHash").value = "";
        return;
    }

    box.style.display = "block";

    const encoder = new TextEncoder();
    const data = encoder.encode(tekst);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    output.textContent = hashHex;
    provjeriHashMatch();
}

function provjeriHashMatch() {
    const trenutniHash = document.getElementById("hashOutput").textContent.toLowerCase().trim();
    const ocekivaniHash = document.getElementById("expectedHash").value.toLowerCase().trim();
    const matchStatus = document.getElementById("matchStatus");

    if (!ocekivaniHash) {
        matchStatus.style.display = "none";
        return;
    }

    matchStatus.style.display = "block";

    if (trenutniHash === ocekivaniHash) {
        matchStatus.textContent = "✔ MATCH: Hash vrijednosti se POTPUNO PODUDARAJU! Podatak je autentičan.";
        matchStatus.style.color = "#00ff66";
    } else {
        matchStatus.textContent = "✖ MISMATCH: Hash vrijednosti se NE PODUDARAJU! Podatak je izmijenjen ili pogrešan.";
        matchStatus.style.color = "#ff5555";
    }
}


// --- LAB 6: SECURITY REPORT GENERATOR ---
function preuzmiTxtIzvjesce() {
    const analiticar = document.getElementById("repAnalyst").value || "Nije navedeno";
    const meta = document.getElementById("repTarget").value || "Nije navedeno";
    const kriticnost = document.getElementById("repSeverity").value;
    const opis = document.getElementById("repSummary").value || "Bez unesenog opisa.";
    const datum = new Date().toLocaleString("hr-HR");

    const sadrzajTxt = 
`==================================================
        SIGURNOSNO IZVJEŠĆE / SECURITY REPORT
==================================================
Datum i vrijeme: ${datum}
Analitičar:       ${analiticar}
Ciljani sustav:   ${meta}
Kritičnost:      ${kriticnost}
==================================================

SAŽETAK I NALAZI ANALIZE:
--------------------------------------------------
${opis}

--------------------------------------------------
Preporuka: Provesti hitnu sanitizaciju unosa, 
primijeniti preporučena HTTP sigurnosna zaglavlja 
te provjeriti integritet podataka.

==================================================
Generirano putem: Cyber Security Portfolio Lab 6
==================================================`;

    const blob = new Blob([sadrzajTxt], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Security_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function preuzmiPrintPDF() {
    const analiticar = document.getElementById("repAnalyst").value || "Nije navedeno";
    const meta = document.getElementById("repTarget").value || "Nije navedeno";
    const kriticnost = document.getElementById("repSeverity").value;
    const opis = document.getElementById("repSummary").value || "Bez unesenog opisa.";
    const datum = new Date().toLocaleString("hr-HR");

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
        alert("Molimo dopustite skočne prozore (pop-up) u pregledniku kako bi se otvorio PDF!");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Security Report - ${meta}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
                h1 { color: #0366d6; border-bottom: 2px solid #0366d6; padding-bottom: 10px; }
                .meta-box { background: #f6f8fa; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #e1e4e8; }
                .meta-item { margin-bottom: 8px; }
                .badge { font-weight: bold; padding: 4px 8px; border-radius: 4px; color: #fff; background: #d73a49; }
                .content { background: #fff; padding: 15px; border: 1px solid #e1e4e8; border-radius: 6px; white-space: pre-wrap; }
                .footer { margin-top: 40px; font-size: 0.85em; color: #586069; border-top: 1px solid #e1e4e8; padding-top: 10px; }
            </style>
        </head>
        <body>
            <h1>🛡️ Security Incident Report</h1>
            <div class="meta-box">
                <div class="meta-item"><strong>Datum i vrijeme:</strong> ${datum}</div>
                <div class="meta-item"><strong>Analitičar:</strong> ${analiticar}</div>
                <div class="meta-item"><strong>Ciljani sustav:</strong> ${meta}</div>
                <div class="meta-item"><strong>Kritičnost:</strong> <span class="badge">${kriticnost}</span></div>
            </div>
            <h2>Nalazi i Opis</h2>
            <div class="content">${opis}</div>
            <div class="footer">Generirano putem Cyber Security Portfolio Testing Laba.</div>
            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
// --- DARK / LIGHT MODE LOGIKA ---
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeToggleBtn");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        btn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    } else {
        btn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    }
}

// Učitavanje spremljene teme pri pokretanju stranice
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const btn = document.getElementById("themeToggleBtn");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (btn) btn.textContent = "🌙 Dark Mode";
    }
});
