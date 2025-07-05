// Pole pro uložení všech pojištěných
let pojistenci = [];

// Funkce pro uložení dat do localStorage
function ulozData() {
    localStorage.setItem('pojistenci', JSON.stringify(pojistenci));
}

// Funkce pro načtení dat z localStorage
function nactiData() {
    const ulozenaData = localStorage.getItem('pojistenci');
    if (ulozenaData) {
        pojistenci = JSON.parse(ulozenaData);
    } else {
        // Pokud nejsou žádná data, přidáme ukázková data
        pojistenci = [
            { jmeno: "Jan", prijmeni: "Novák", vek: 31, telefon: "731 584 972" },
            { jmeno: "Josef", prijmeni: "Nový", vek: 25, telefon: "725 458 414" },
            { jmeno: "Hanka", prijmeni: "Blatná", vek: 42, telefon: "603 417 895" }
        ];
        ulozData();
    }
}

// Funkce pro zobrazení notifikace
function zobrazNotifikaci(zprava, typ = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = zprava;
    notification.className = `notification ${typ}`;
    notification.classList.add('show');
    
    // Skrytí notifikace po 3 sekundách
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Funkce pro přidání nového pojištěného
function pridejPojisteneho(jmeno, prijmeni, vek, telefon) {
    // Vytvoření nového pojištěného
    const novyPojistenec = {
        jmeno: jmeno,
        prijmeni: prijmeni,
        vek: parseInt(vek),
        telefon: telefon
    };
    
    // Přidání do pole
    pojistenci.push(novyPojistenec);
    
    // Uložení do localStorage
    ulozData();
    
    // Aktualizace zobrazení
    zobrazPojistence();
    
    // Zobrazení úspěšné zprávy
    zobrazNotifikaci(`${jmeno} ${prijmeni} byl úspěšně přidán!`);
    
    return true;
}

// Funkce pro zobrazení všech pojištěných v tabulce
function zobrazPojistence() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    // Pokud nejsou žádní pojištěnci
    if (pojistenci.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = 'Žádní pojištěnci nejsou evidováni';
        cell.style.textAlign = 'center';
        cell.style.color = '#a0aec0';
        cell.style.fontStyle = 'italic';
        cell.style.padding = '2rem';
        return;
    }
    
    // Zobrazení všech pojištěných
    for (let i = 0; i < pojistenci.length; i++) {
        const pojistenec = pojistenci[i];
        const row = tableBody.insertRow();
        
        // Buňka pro jméno
        const cellJmeno = row.insertCell(0);
        cellJmeno.textContent = `${pojistenec.jmeno} ${pojistenec.prijmeni}`;
        cellJmeno.style.fontWeight = '500';
        
        // Buňka pro telefon
        const cellTelefon = row.insertCell(1);
        cellTelefon.textContent = pojistenec.telefon;
        
        // Buňka pro věk
        const cellVek = row.insertCell(2);
        cellVek.textContent = `${pojistenec.vek} let`;
    }
}

// Funkce pro validaci formuláře
function validujFormular(jmeno, prijmeni, vek, telefon) {
    // Kontrola prázdných polí
    if (!jmeno.trim() || !prijmeni.trim() || !vek || !telefon.trim()) {
        zobrazNotifikaci('Všechna pole musí být vyplněna!', 'error');
        return false;
    }
    
    // Kontrola věku
    const vekCislo = parseInt(vek);
    if (vekCislo < 1 || vekCislo > 120) {
        zobrazNotifikaci('Věk musí být mezi 1 a 120 lety!', 'error');
        return false;
    }
    
    return true;
}

// Funkce pro vymazání formuláře
function vymazFormular() {
    document.getElementById('jmeno').value = '';
    document.getElementById('prijmeni').value = '';
    document.getElementById('vek').value = '';
    document.getElementById('telefon').value = '';
    
    // Focus na první pole
    document.getElementById('jmeno').focus();
}

// Obsluha formuláře
function inicializujFormular() {
    const form = document.getElementById('pojistenecForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Získání hodnot z formuláře
        const jmeno = document.getElementById('jmeno').value.trim();
        const prijmeni = document.getElementById('prijmeni').value.trim();
        const vek = document.getElementById('vek').value;
        const telefon = document.getElementById('telefon').value.trim();
        
        // Validace
        if (!validujFormular(jmeno, prijmeni, vek, telefon)) {
            return;
        }
        
        // Přidání pojištěného
        if (pridejPojisteneho(jmeno, prijmeni, vek, telefon)) {
            vymazFormular();
        }
    });
}

// Inicializace aplikace
function inicializujAplikaci() {
    console.log('Spouštím aplikaci...');
    
    // Načtení dat z localStorage
    nactiData();
    
    // Zobrazení pojištěných
    zobrazPojistence();
    
    // Inicializace formuláře
    inicializujFormular();
    
    // Focus na první pole formuláře
    document.getElementById('jmeno').focus();
    
    console.log('Aplikace byla úspěšně spuštěna!');
    console.log(`Aktuálně evidováno: ${pojistenci.length} pojištěných`);
}

// Spuštění aplikace po načtení stránky
document.addEventListener('DOMContentLoaded', inicializujAplikaci);