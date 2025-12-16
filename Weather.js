let searchBtn = document.querySelector("#search-btn")
let result = document.querySelector("#result")
let API_KEY ="2f337511d1774b914693cbafbe0189e2";


const getWeatherData = async () => {
    try{
        let cityName =  document.querySelector("#city-name").value.trim();

        if(!cityName) {
            result.innerHTML = 
            `<p class ="text-red-700 text-center mt-4 front-semibold">Please Enter a city Name..</p>`;
        }
         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    console.log(response);

    if(!response.ok){
        result.innerHTML =`<p class ="text-red-700 text-center mt-4 front-semibold">City Not found</p>`;
        return;
    }
    let data = await response.json();
    console.log(data);

    result.innerHTML = `<h1 class ="text-xl font-bold mt-3 text-green-600"> ${data.name}j,${data.sys.country}</h1>
    <p class ="text-green-600 font-semibold">Temperature : ${data.main.temp}°C </p>
    <p class ="text-green-600 font-semibold">Wind Speed: ${data.wind.speed}m/s </p>`;
    }catch(error) {
        console.log(error,"Error in Fetching Weather Details");
    }

};

searchBtn.addEventListener("click", getWeatherData);