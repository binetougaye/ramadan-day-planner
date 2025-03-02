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


async function loadSurahs() {
    try {
        const response = await fetch(`${API_BASE_URL}/chapters?language=fr`);
        const data = await response.json();
        const surahSelect = document.getElementById("surah-select");

        data.chapters.forEach(surah => {
            let option = document.createElement("option");
            option.value = surah.id;
            option.textContent = `${surah.id}. ${surah.name_simple} (${surah.name_arabic})`;
            surahSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des sourates :", error);
    }
}

async function updateVerseSelect() {
    const surahId = document.getElementById("surah-select").value;
    const ayahSelect = document.getElementById("ayah-select");
    
    ayahSelect.innerHTML = '<option value="">Sélectionner un verset</option>';

    if (!surahId) return;

    try {
        const response = await fetch(`${API_BASE_URL}/chapters/${surahId}`);
        const data = await response.json();
        const verseCount = data.chapter.verses_count;

        for (let i = 1; i <= verseCount; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = `Verset ${i}`;
            ayahSelect.appendChild(option);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des versets :", error);
    }
}

//Fonction pour enregistrer la dernière lecture
function saveLastRead() {
    const surahSelect = document.getElementById("surah-select");
    const ayahSelect = document.getElementById("ayah-select");

    const surahText = surahSelect.options[surahSelect.selectedIndex].text;
    const ayahText = ayahSelect.options[ayahSelect.selectedIndex].text;

    if (surahSelect.value && ayahSelect.value) {
        const lastRead = `📖 ${surahText} - ${ayahText}`;
        localStorage.setItem("lastRead", lastRead);
        document.getElementById("last-read").innerText = `Dernière lecture : ${lastRead}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("last-read").innerText =
        localStorage.getItem("lastRead") || "Dernière lecture : Aucune";
    
    loadSurahs();
});