# 🛡️ Interactive Cyber Security Portfolio & Testing Labs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![Cybersecurity](https://img.shields.io/badge/Focus-Web%20%26%20Network%20Security-red.svg)]()

Projekt predstavlja interaktivni web portfolio i radno okruženje s 6 samostalnih praktičnih labova namijenjenih vizualizaciji, testiranju i analizi ključnih koncepta kibernetičke sigurnosti, enkripcije te mrežnih protokola.

🌐 **Demo uživo:** [Pregledaj Portfolio na GitHub Pages](https://tvoj-korisnik.github.io/tvoj-repozitorij)

---

## 🛠️ Pregled Labova i Funkcionalnosti

| Modul / Lab | Opis i Sigurnosni Koncept | Primijenjene Tehnologije |
| :--- | :--- | :--- |
| **O Meni & Profil** | Prikaz tehničkih vještina, alata (Wireshark, Burp Suite, Nmap) i kontakt informacija. | HTML5, CSS Grid |
| **Lab 1: XSS Analysis** | Demonstracija ranjivosti na Reflected XSS i implementacija sanitizacije unosa koda. | JavaScript, DOM Manipulation |
| **Lab 2: HTTP Headers** | Edukativni inspekcijski alat za analizu sigurnosnih zaglavlja (`HSTS`, `CSP`, `XFO`, `XCTO`). | JavaScript Objects & UI State |
| **Lab 3: REST API POST** | Asinkrono slanje mrežnih zahtjeva i prijava incidenata uz provjeru statusnih kodova. | Fetch API, Async/Await |
| **Lab 4: Password Entropy** | Izračun Shannonove entropije u bitovima i procjena brute-force vremena probijanja. | Mathematics, JS Regex |
| **Lab 5: SHA-256 Hasher** | Računanje SHA-256 kriptografskog sažetka u realnom vremenu i verifikacija integriteta. | Browser Web Crypto API |
| **Lab 6: Report Generator** | Generiranje i preuzimanje službenih sigurnosnih izvješća u TXT i PDF formatu. | Blob API, Window Print API |

---

## 🎨 Značajke Korisničkog Sučelja

- **Single Page Application (SPA) Arhitektura:** Brzo prebacivanje između tabova bez osvježavanja stranice.
- **Dark / Light Mode:** Integrirani preklopnik tema s automatskim spremanjem postavki u lokalnu memoriju preglednika (`localStorage`).
- **Responzivan Dizajn:** Prilagođeno svim veličinama zaslona (mobiteli, tableti, stolna računala).

---

## 🧰 Tehnološki Stog (Tech Stack)

* **Frontend:** HTML5, CSS3 (Custom Variables, Flexbox, Grid), JavaScript (ES6+)
* **Sigurnosni API-ji:** Web Crypto API (`crypto.subtle`), Blob API
* **Mrežni API-ji:** Fetch API
* **Verzioniranje & Hosting:** Git, GitHub, GitHub Pages

---

## 🚀 Lokalno Pokretanje Projekta

Za pokretanje projekta na lokalnom računalu nije potrebno instalirati nikakve dodatne zavisnosti (dependencies) niti `node_modules`:

1. Klonirajte repozitorij:
   ```bash
   git clone [https://github.com/tvoj-korisnik/tvoj-repozitorij.git](https://github.com/tvoj-korisnik/tvoj-repozitorij.git)
