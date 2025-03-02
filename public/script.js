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
        console.log(data.data);


    } catch (error) {
        console.log(error);
    }
}
getHijriDate()
// Obtenir les Heures de prières
const api = "https://api.aladhan.com/v1/hijriCalendarByAddress/1446/9?address=Dakar,Senegal"
const prayerTimes = document.getElementById("prayer_times")
async function getPrayerTimes() {
    try {
        const response = await fetch(api)
        const data = await response.json()

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


