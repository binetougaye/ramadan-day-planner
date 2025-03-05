const button = document.getElementById("changeMode")
const icon = document.querySelector(".fa-sun")
button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (icon.classList.contains("fa-sun")) {
        icon.classList.replace("fa-sun", 'fa-moon')

    } else {
        icon.classList.replace("fa-moon", 'fa-sun')

    }
})
// Recupérer la date grégorienne du jour
const date = document.getElementById("date")
const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).toUpperCase();
date.innerText = today


// Obtenir la date islamique du jour

const hijriDate = document.getElementById("hijri")
const dateDuJour = document.getElementById("date_du_jour")
async function getHijriDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Les mois commencent à 0 en JS, donc +1
    const day = today.getDate();
    const apiUrl = `https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`;
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const month = data?.data.hijri.month.en
        const day = data?.data.hijri.day
        const year = data?.data.hijri.year
        const weekday = data?.data.hijri.weekday.en
        hijriDate.innerText = weekday + " " + day + " " + month + " " + year
        dateDuJour.innerText = day



    } catch (error) {
        console.log(error);
    }
}
getHijriDate()
// Obtenir les Heures de prières
const api = "https://api.aladhan.com/v1/hijriCalendarByAddress/1446/9?address=Dakar,Senegal"
const prayerTimes = document.getElementById("prayer_times")
const fajr = document.getElementById("fajr")
const dhuhr = document.getElementById("dhuhr")
const asr = document.getElementById("asr")
const maghrib = document.getElementById('maghrib')
const isha = document.getElementById("isha")
const sunset = document.getElementById("sunset")
async function getPrayerTimes() {
    try {
        const response = await fetch(api)
        const data = await response.json()
        const getPrayerTimes = data?.data?.slice(0, 7)
        const prayerTimes = getPrayerTimes.map((item) => item.timings)
        fajr.innerText = prayerTimes[0].Fajr
        dhuhr.innerText = prayerTimes[0].Dhuhr
        asr.innerText = prayerTimes[0].Asr
        maghrib.innerText = prayerTimes[0].Maghrib
        isha.innerText = prayerTimes[0].Isha
        sunset.innerText = prayerTimes[0].Sunset
        console.log(test[0]);


    } catch (error) {
        console.log(error);
    }
}
getPrayerTimes()
// Recommandation en fonction de l'humeur
const texte = document.getElementById("text")



// const baseUrl = `https://api.alquran.cloud/v1/surah`

const surah =
{

    sadness: "« À côté de la difficulté est, certes, une facilité ! Oui, à côté de la difficulté, il y a certes une facilité. »",
    surprise: "« Nous leur montrerons Nos signes dans l'univers et en eux-mêmes, jusqu'à ce qu'il leur devienne évident que c'est cela, la vérité. »",
    happy: "« Et lorsque votre Seigneur proclama : 'Si vous êtes reconnaissants, très certainement J'augmenterai (Mes bienfaits) pour vous. Mais si vous êtes ingrats, Mon châtiment sera terrible.' »",
    overthink: "« Cette vie d’ici-bas n’est qu’amusement et jeu. La demeure de l’au-delà est assurément la vraie vie. S’ils savaient ! »"
}
function setTextByMood(mood) {
    if (texte && surah[mood]) {
        texte.innerText = surah[mood];
    }
}
document.getElementById("sad")?.addEventListener("click", () => setTextByMood("sadness"));
document.getElementById("surprise")?.addEventListener("click", () => setTextByMood("surprise"));
document.getElementById("happy")?.addEventListener("click", () => setTextByMood("happy"));
document.getElementById("overthink")?.addEventListener("click", () => setTextByMood("overthink"));


const hydrationMessages = {
    drop1: "Vous avez bu un verre d'eau. Continuez comme ça!",
    drop2: "Deux verres d'eau, vous êtes sur la bonne voie!",
    drop3: "Trois verres, votre corps vous remercie!",
    drop4: "Quatre verres, vous êtes bien hydraté!",
    drop5: "Cinq verres, excellent travail pour votre santé!"
};

function setHydrationText(dropId) {
    const hydrationText = document.getElementById("hydrationText");
    if (hydrationText && hydrationMessages[dropId]) {
        hydrationText.innerText = hydrationMessages[dropId];
    }
}

document.getElementById("drop1")?.addEventListener("click", () => setHydrationText("drop1"));
document.getElementById("drop2")?.addEventListener("click", () => setHydrationText("drop2"));
document.getElementById("drop3")?.addEventListener("click", () => setHydrationText("drop3"));
document.getElementById("drop4")?.addEventListener("click", () => setHydrationText("drop4"));
document.getElementById("drop5")?.addEventListener("click", () => setHydrationText("drop5"));

function saveChecklist() {
    const checkboxes = document.querySelectorAll("#ibadahList input[type='checkbox']");
    const checklistState = {};

    checkboxes.forEach((checkbox, index) => {
        checklistState[`ibadah${index + 1}`] = checkbox.checked;
    });

    localStorage.setItem("ibadahChecklist", JSON.stringify({
        state: checklistState,
        timestamp: new Date().getTime()
    }));
}


function loadChecklist() {
    const savedData = localStorage.getItem("ibadahChecklist");

    if (savedData) {
        const { state, timestamp } = JSON.parse(savedData);

        const now = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - timestamp < twentyFourHours) {

            Object.keys(state).forEach((key) => {
                const checkbox = document.getElementById(key);
                if (checkbox) {
                    checkbox.checked = state[key];
                }
            });
        } else {

            localStorage.removeItem("ibadahChecklist");
        }
    }
}


document.querySelectorAll("#ibadahList input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", saveChecklist);
});


document.addEventListener("DOMContentLoaded", loadChecklist);
// 

function saveGoalsToLocalStorage() {

    const inputs = document.querySelectorAll('.lists input');
    const goals = [];


    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            goals.push(input.value.trim());
        }
    });


    localStorage.setItem('goals', JSON.stringify(goals));
}


document.querySelector('.lists').addEventListener('change', saveGoalsToLocalStorage);


function loadGoalsFromLocalStorage() {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];


    const inputs = document.querySelectorAll('.lists input');
    inputs.forEach((input, index) => {
        if (savedGoals[index]) {
            input.value = savedGoals[index];
        }
    });
}

document.addEventListener('DOMContentLoaded', loadGoalsFromLocalStorage);
