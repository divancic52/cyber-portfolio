function testirajUnos() {
    // Uzimamo vrijednost koju je korisnik upisao u polje
    let unos = document.getElementById("userInput").value;

    // 🔴 RANJIVI NAČIN (Demonstruje XSS):
    // innerHTML uzima tekst i interpretira ga kao HTML/JS kod!
    document.getElementById("vulnerableOutput").innerHTML = unos;

    // 🟢 SIGURAN NAČIN (Zaštita od XSS-a):
    // textContent tretira SVE isključivo kao običan tekst, sprečavajući pokretanje koda.
    document.getElementById("safeOutput").textContent = unos;
}