

const api = {
    key: "beba6a161e07c0c2bd00f8a6769c2c2c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt){  
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather=> {
        return weather.json();}).then(displayResults);

}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let  now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);


    let temp = document.querySelector('.current .temp');
    temp.innerHTML =`${Math.round(weather.main.temp)}<span>°c</span>`;

    let hilow= document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let feelslike= document.querySelector('.feels-like');
    feelslike.innerHTML = `<span>Feels-like&nbsp-&nbsp</span>${Math.round(weather.main.feels_like)}°c`;
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
    
    let days= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    let day= days[d.getDay()];
    let date= d.getDate();
    let month= months[d.getMonth()];
    let year= d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}