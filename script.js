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
    // Spriječimo klasično osvježavanje stranice prilikom slanja forme
    event.preventDefault();

    const btn = document.getElementById("submitBtn");
    const resultBox = document.getElementById("postResult");
    const statusText = document.getElementById("postStatus");
    const outputCode = document.getElementById("postOutput");

    // Pročitamo vrijednosti iz forme
    const podaciZaSlanje = {
        prijavio: document.getElementById("reporterName").value,
        tipIncidenta: document.getElementById("incidentType").value,
        opis: document.getElementById("incidentDesc").value,
        vrijemePrijave: new Date().toISOString()
    };

    // Priprema sučelja za slanje
    btn.disabled = true;
    btn.textContent = "Šaljem podatke...";

    try {
        // Slanje POST zahtjeva
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

        // Prikaz rezultata korisniku
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
        // Vrati gumb u početno stanje
        btn.disabled = false;
        btn.textContent = "Šalji Prijavu (POST Request)";
    }
}
