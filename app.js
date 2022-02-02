const city = document.querySelector(".city");
const condition = document.querySelector(".condition");
const temp = document.querySelector(".tempreture");
const humidity = document.querySelector(".humidty")
const feelsLike = document.querySelector(".feelslike");
const maxtempreture = document.querySelector(".maxtempreture");
const deg = document.querySelector(".degree");
const img = document.querySelector(".image")
const search = document.querySelector(".search");
const submit = document.querySelector(".add");


async function cityWeather(city) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=8490ae1ba70871b588caff7ac75794c1', {mode: 'cors'})
  const data = await response.json();
  const sehir = data.name;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const desc = data.weather[0].description;
  const hum = data.main.humidity;
  const press = data.main.pressure;
  create(sehir, temp, feels, desc, hum, press);
  gif(desc);
}

const create = (sehir, sicaklik, hissedilen, desc, nem, press) => {
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  city.textContent = sehir;
  condition.textContent = "Condition: "+ desc;
  temp.textContent = Math.round(sicaklik);
  feelsLike.textContent = "Feels Like: " + Math.round(hissedilen) + "°";
  maxtempreture.textContent = "Pressure: " +  press + 'hpa';
  humidity.textContent = "Humidity: " + nem + "%";
};

async function gif (search) {
  try {
    const response = await fetch("https://api.giphy.com/v1/stickers/translate?api_key=0pu9U56VYEkDmioH8ApBupdfJZoYYBmz&s=" + search, {mode: "cors"})
    const sticker = await response.json();
    img.src = sticker.data.images.fixed_height.url;
  } catch (error){
    console.log(error);
  }
};

submit.addEventListener("click", () => {
  cityWeather(search.value)
});

search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submit.click();
  }
});

search.addEventListener("click", () => {
  search.value = ""
});

cityWeather("İstanbul");