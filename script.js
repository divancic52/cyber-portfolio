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
