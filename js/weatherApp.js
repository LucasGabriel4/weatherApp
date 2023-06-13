const apikey = '2i013sURP5KQ66dn8WYZe4SkAlo5at8L'
const searchBtn = document.querySelector('[data-js="search"]')
const input = document.querySelector('[data-js="input"]')
const container = document.querySelector('[data-js="container"]')
const notFound = document.querySelector('[data-js="not-found"]')
const weatherBox = document.querySelector('[data-js="weather-box"]')
const weatherDetails = document.querySelector('[data-js="weather-details"]')
const temperature = document.querySelector('[data-js="temperature"]')
const description = document.querySelector('[data-js="description"]')
const humidity = document.querySelector('[data-js="humidity"]')
const wind = document.querySelector('[data-js="wind"]')
const weatherImg = document.querySelector('[data-js="weather-box"] > img')




const getCityUrl = (cityName) => {
    return `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${cityName}`
}


const getWeatherUrl = (key) => {
    return `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apikey}&language=pt-br&details=true`
}


const fetchWeatherApi = async (url) => {
    try{
       const response = await fetch(url)

       if(!response.ok){
          throw new Error('não foi possivel obter os dados!')
          
       }

       return response.json()
    }
    catch({name, message}){
      console.log(`${name}: ${message}`)
    }
}


const addWeatherData = async (cityName) => {
    const getCityData = async (cityName) => await fetchWeatherApi(getCityUrl(cityName))
    const getCityWeather = async (key) => await fetchWeatherApi(getWeatherUrl(key))
    const [{Key}] = await getCityData(cityName)
    const [{Wind,WeatherIcon,Temperature,WeatherText,RelativeHumidity}] = await getCityWeather(Key)

    if(cityName === ''){
        container.style.height = '500px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        notFound.style.display = 'block';
        notFound.classList.add('active')
        return
    }
    
    weatherImg.src = `images/${WeatherIcon}.png`
    temperature.innerHTML = `${Temperature.Metric.Value}<span>°C</span>`
    description.innerHTML = `${WeatherText}`
    humidity.innerHTML = `${RelativeHumidity}%`
    wind.innerHTML= `${Wind.Speed.Metric.Value}Km/h`
    
    container.style.height = '530px'
    weatherBox.classList.add('active')
    weatherDetails.classList.add('active')
}

const showLocalStorageCity = () => {
    const city = localStorage.getItem('city')
    if(city){
        addWeatherData(city)
    }
    
}

const SearchWeatherInfo = async () => {

const cityName = input.value;
addWeatherData(cityName)
localStorage.setItem('city', cityName)
}


showLocalStorageCity()
searchBtn.addEventListener('click', SearchWeatherInfo)