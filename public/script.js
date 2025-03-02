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
        console.log(data.data.map((item) => item.timings));
        const test = data.data.map((item) => item.timings)
        test.filter((item, index) => item.length === 7)

        // console.log(data.data.filter((item, index) => item.length <= 7));
        // const teste = test.map((item, index) => item);
        // console.log(teste);
        // console.log(teste.filter((item, index) => item.length <= 7));






    } catch (error) {
        console.log(error);


    }
}
getPrayerTimes()
// Recommandation en fonction de l'humeur
const sadness = document.getElementById("sad")
const texte = document.getElementById("text")
const audio = document.getElementById("audio")
// mettre un numéro qui varie en fonction de la sourate de 1 à 114
const num = 93
const apiSad = `https://api.alquran.cloud/v1/surah/${num}/en.asad`
async function Test() {
    try {
        const response = await fetch(apiSad);
        const data = await response.json();
        return data.data.ayahs[3].text;
    } catch (error) {
        console.log(error);
        return null;
    }
}

sadness.addEventListener("click", async () => {
    const text = await Test();
    if (text) {
        texte.innerText = text
    } else {
        texte.innerText = ""
    }
});