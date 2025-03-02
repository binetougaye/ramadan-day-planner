const API_BASE_URL = "https://api.quran.com/api/v4";

async function randomAyah() {
    showLoader();

    const lastUpdated = localStorage.getItem("lastUpdated");
    const today = new Date().toLocaleDateString();

    if (lastUpdated === today) {
        displaySavedAyah();
        return;
    }

    try {
        const verseData = await getRandomVerse();
        const arabicText = await getArabicText(verseData.verse_key);
        const translationText = await getTranslation(verseData.verse_key);
        const suraVerseInfo = `(${verseData.verse_key})`;

        displayAyah(arabicText, translationText, suraVerseInfo);

        saveToLocalStorage(arabicText, translationText, suraVerseInfo);

    } catch (error) {
        console.error("Erreur lors de la récupération du verset :", error);
        handleError();
    }
}

async function getRandomVerse() {
    const verseResponse = await fetch(`${API_BASE_URL}/verses/random`);
    const verseData = await verseResponse.json();
    return verseData.verse;
}

async function getArabicText(verseKey) {
    const arabicResponse = await fetch(`${API_BASE_URL}/quran/verses/imlaei?verse_key=${verseKey}`);
    const arabicData = await arabicResponse.json();
    return arabicData.verses[0].text_imlaei;
}

async function getTranslation(verseKey) {
    const translationResponse = await fetch(`${API_BASE_URL}/verses/by_key/${verseKey}?translations=136`);
    const translationData = await translationResponse.json();
    return removeFootNotes(translationData.verse.translations[0].text);
}

function displayAyah(arabicText, translationText, suraVerseInfo) {
    document.getElementById("dua-verse").innerText = arabicText;
    document.getElementById("dua-translation").innerText = translationText;
    document.getElementById("sura-verse-info").innerText = suraVerseInfo;
}

function saveToLocalStorage(arabicText, translationText, suraVerseInfo) {
    const today = new Date().toLocaleDateString();
    localStorage.setItem("savedAyah", arabicText);
    localStorage.setItem("savedTranslation", translationText);
    localStorage.setItem("savedSuraVerseInfo", suraVerseInfo);
    localStorage.setItem("lastUpdated", today);
}

function displaySavedAyah() {
    document.getElementById("dua-verse").innerText = localStorage.getItem("savedAyah");
    document.getElementById("dua-translation").innerText = localStorage.getItem("savedTranslation");
    document.getElementById("sura-verse-info").innerText = localStorage.getItem("savedSuraVerseInfo");
}

function handleError() {
    document.getElementById("dua-verse").innerText = "Erreur lors de la récupération du verset.";
    document.getElementById("dua-translation").innerText = "";
    document.getElementById("sura-verse-info").innerText = "";
}

function showLoader() {
    document.getElementById("dua-verse").innerText = "Chargement du verset...";
    document.getElementById("dua-translation").innerText = "";
    document.getElementById("sura-verse-info").innerText = "";
}

function removeFootNotes(text) {
    return text.replace(/<sup.*?>.*?<\/sup>/g, ''); 
}

randomAyah();
