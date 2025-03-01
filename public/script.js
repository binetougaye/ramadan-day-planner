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