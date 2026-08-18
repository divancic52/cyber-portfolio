// ==========================================
// --- INICIJALIZACIJA I THEME TOGGLE ---
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeToggleBtn").textContent = "☀️ Light Mode";
    }
    
    // Inicijalno generiraj SHA-256 i Entropiju za zadane vrijednosti
    calculateEntropy();
    generateHash();
});

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeToggleBtn");

    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        btn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "light");
    } else {
        btn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "dark");
    }
}

// ==========================================
// --- UPRAVLJANJE TABOVIMA ---
// ==========================================
function openTab(evt, tabId) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    const buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// ==========================================
// --- LAB 1: XSS LOGIKA ---
// ==========================================
function testXSS() {
    const input = document.getElementById("xssInput").value;
    const res = document.getElementById("xssResult");
    res.innerHTML = "<strong>Nezaštićeni prikaz:</strong> " + input;
}

function testSanitizedXSS() {
    const input = document.getElementById("xssInput").value;
    const res = document.getElementById("xssResult");
    res.textContent = "Zaštićeni (Sanitizirani) prikaz: " + input;
}

// ==========================================
// --- LAB 2: SECURITY HEADERS ---
// ==========================================
function analyzeHeaders() {
    const res = document.getElementById("headersResult");
    res.innerHTML = `
        <h4>Sigurnosna Analiza Zaglavlja:</h4>
        <ul>
            <li><strong style="color:#2ea043;">Strict-Transport-Security:</strong> Aktivno (Forsira HTTPS)</li>
            <li><strong style="color:#2ea043;">Content-Security-Policy:</strong> Aktivno (Sprječava neovlašteni JS)</li>
            <li><strong style="color:#f85149;">X-Frame-Options:</strong> Nedostaje (Rizik od Clickjacking napada)</li>
        </ul>
    `;
}

// ==========================================
// --- LAB 3: REST API TESTER ---
// ==========================================
function sendApiRequest() {
    const title = document.getElementById("apiTitle").value;
    const body = document.getElementById("apiBody").value;
    const res = document.getElementById("apiResult");

    res.textContent = "Slanje POST zahtjeva...";

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, body: body, userId: 1 })
    })
    .then(response => response.json())
    .then(data => {
        res.innerHTML = `<strong>Status 201 Created!</strong> ID novog resursa: ${data.id}`;
    })
    .catch(err => {
        res.textContent = "Greška u zahtjevu: " + err;
    });
}

// ==========================================
// --- LAB 4: PASSWORD ENTROPY ---
// ==========================================
function calculateEntropy() {
    const pwd = document.getElementById("pwdInput").value;
    const res = document.getElementById("entropyResult");

    if (!pwd) {
        res.textContent = "Upišite lozinku...";
        return;
    }

    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;

    const entropy = Math.round(pwd.length * Math.log2(pool || 1));
    let rating = entropy < 40 ? "Slabo 🔴" : (entropy < 70 ? "Srednje 🟡" : "Jako 🟢");

    res.innerHTML = `Entropija: <strong>${entropy} bita</strong> | Ocjena: <strong>${rating}</strong>`;
}

// ==========================================
// --- LAB 5: SHA-256 HASHER ---
// ==========================================
async function generateHash() {
    const text = document.getElementById("hashInput").value;
    const out = document.getElementById("hashOutput").querySelector("code");

    if (!text) {
        out.textContent = "Unesite tekst...";
        return;
    }

    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    out.textContent = hashHex;
}

// ==========================================
// --- LAB 6: REPORT GENERATOR ---
// ==========================================
function generateReport() {
    const content = "=== CYBER SECURITY AUDIT REPORT ===\nGenerirano: " + new Date().toLocaleString() + "\n\nStatus: Svi labovi uspješno testirani.\nZaključak: Sustav je spreman za produkciju.";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Security_Audit_Report.txt";
    a.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// --- LAB 7: PORT SCANNER LOGIKA ---
// ==========================================
function runPortScan() {
    const ip = document.getElementById("targetIp").value.trim() || "192.168.1.1";
    const profile = document.getElementById("scanProfile").value;
    const progressContainer = document.getElementById("scanProgressContainer");
    const progressBar = document.getElementById("scanProgressBar");
    const statusText = document.getElementById("scanStatusText");
    const resultsDiv = document.getElementById("scanResults");

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    statusText.textContent = "Inicijalizacija skeniranja: " + ip + "...";
    resultsDiv.innerHTML = "";

    const portsToScan = profile === "quick"
        ? [
            { port: 21, service: "FTP", status: "Closed", risk: "Low", tip: "Onemogućite anonimni pristup." },
            { port: 22, service: "SSH", status: "Open", risk: "Medium", tip: "Koristite SSH ključeve i onemogućite root prijavu." },
            { port: 80, service: "HTTP", status: "Open", risk: "High", tip: "Preusmjerite promet na HTTPS (port 443)." },
            { port: 443, service: "HTTPS", status: "Open", risk: "Low", tip: "Provjerite valjanost TLS certifikata." }
          ]
        : [
            { port: 21, service: "FTP", status: "Closed", risk: "Low", tip: "Onemogućite ako se ne koristi." },
            { port: 22, service: "SSH", status: "Open", risk: "Medium", tip: "Aktivirajte fail2ban i promijenite port." },
            { port: 23, service: "Telnet", status: "Open", risk: "CRITICAL", tip: "Kritično! Pređite na SSH odmah." },
            { port: 25, service: "SMTP", status: "Closed", risk: "Low", tip: "Zaštitite od open-relay zloupotrebe." },
            { port: 80, service: "HTTP", status: "Open", risk: "High", tip: "Implementirajte HSTS zaglavlje." },
            { port: 443, service: "HTTPS", status: "Open", risk: "Low", tip: "Redovito obnavljajte SSL/TLS certifikate." },
            { port: 3306, service: "MySQL", status: "Filtered", risk: "High", tip: "Ne izlažite bazu javnom internetu." },
            { port: 3389, service: "RDP", status: "Open", risk: "CRITICAL", tip: "Zaštitite RDP putem VPN-a i MFA." }
          ];

    let step = 0;
    const interval = setInterval(() => {
        step += 25;
        progressBar.style.width = step + "%";
        statusText.textContent = `Skeniranje u tijeku (${step}%)...`;

        if (step >= 100) {
            clearInterval(interval);
            statusText.textContent = "Skeniranje završeno!";
            renderScanResults(ip, portsToScan);
        }
    }, 200);
}

function renderScanResults(ip, ports) {
    const resultsDiv = document.getElementById("scanResults");
    const openCount = ports.filter(p => p.status === "Open").length;

    let html = `
        <div style="margin-top: 15px; padding: 15px; background: var(--bg-color); border-radius: 6px; border: 1px solid var(--border-color); overflow-x: auto;">
            <h4>Izvješće za IP: <span style="color: var(--accent-color);">${ip}</span></h4>
            <p>Pronađeno <strong>${openCount}</strong> otvorenih portova od ukupno ${ports.length}.</p>
            <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 500px;">
                <thead>
                    <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
                        <th style="padding: 8px;">Port</th>
                        <th style="padding: 8px;">Servis</th>
                        <th style="padding: 8px;">Status</th>
                        <th style="padding: 8px;">Rizik</th>
                        <th style="padding: 8px;">Preporuka</th>
                    </tr>
                </thead>
                <tbody>
    `;

    ports.forEach(p => {
        let statusColor = p.status === "Open" ? "#f85149" : (p.status === "Filtered" ? "#d29922" : "#2ea043");
        let riskBadge = p.risk === "CRITICAL" ? "🔴 Kritično" : (p.risk === "High" ? "🟠 Visok" : (p.risk === "Medium" ? "🟡 Srednji" : "🟢 Nizak"));

        html += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 8px; font-weight: bold;">${p.port}</td>
                <td style="padding: 8px;">${p.service}</td>
                <td style="padding: 8px; color: ${statusColor}; font-weight: bold;">${p.status}</td>
                <td style="padding: 8px;">${riskBadge}</td>
                <td style="padding: 8px; font-size: 0.9em; color: var(--text-muted);">${p.tip}</td>
            </tr>
        `;
    });

    html += `</tbody></table></div>`;
    resultsDiv.innerHTML = html;
}

// ==========================================
// --- UNIVERZALNA COPY CODE LOGIKA ---
// ==========================================
function copyCode(elementId, btn) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const textToCopy = el.innerText || el.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "✅ Copied!";
        btn.style.backgroundColor = "#238636";
        btn.style.color = "#ffffff";
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error("Greška pri kopiranju: ", err);
    });
}
