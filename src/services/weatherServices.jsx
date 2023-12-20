// import { DateTime } from "luxon";

// const API_KEY = '7ebf798b16a330ee6b155fd2726d04f7';
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';


// const getWeatherData = (infoType, searchParams) => {
//     const url = new URL(BASE_URL + "/" + infoType);
//     url.search = new URLSearchParams({...searchParams, appid:
//     API_KEY });

//     return fetch(url)
//     .then((res) => res.json())
// };

// const formatCurrentWeather = (data) => {
//     const{
//         coord: { lat, lon },
//         main: { temp, feels_like, temp_min, temp_max, humidity },
//         name,
//         dt,
//         sys: { country, sunrise, sunset },
//         weather,
//         wind: { speed } 
//     } = data

//     const { main: details, icon } = weather[0];

//     return {
//         lat, 
//         lon,
//         temp, 
//         temp_min, 
//         temp_max, 
//         humidity, 
//         name, 
//         dt, 
//         country,
//         sunrise, 
//         sunset,
//         details,
//         icon,
//         weather, 
//         speed}
// };


// const formatForecastWeather = (data) => {
//     let { timezone, daily, hourly } = data;
//     daily = daily.slice(1, 6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon
//         }
//     });


//     hourly = hourly.slice(1, 6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon
//         }
//     });

//     return { timezone, daily, hourly };
// }

// const getFormattedWeatherData = async (searchParams) => {
//     const formattedCurrentWeatther = await getWeatherData
//     ('weather',
//      searchParams
//      ).then(formatCurrentWeather);

//      const {lat, lon } = formattedCurrentWeatther;

//      const formattedForecastWeather = await getWeatherData('onecall', {
//         lat, 
//         lon, 
//         exclude: 'current,minutely,alerts',
//         units:searchParams.units,
//         }).then(formatForecastWeather)

//     return { ...formattedCurrentWeatther, ...formattedForecastWeather }
// }

// const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format) 

// export default getFormattedWeatherData



import { DateTime } from "luxon";

const API_KEY = '7ebf798b16a330ee6b155fd2726d04f7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url)
        .then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        weather,
        speed
    };
};

const formatForecastWeather = (data) => {
    if (!data || !data.timezone || !data.daily || !data.hourly) {
        console.error("Invalid data structure for forecasting");
        return null;
    }

    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    try {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

        const { lat, lon } = formattedCurrentWeather;

        const formattedForecastWeather = await getWeatherData('onecall', {
            lat,
            lon,
            exclude: 'current,minutely,alerts',
            units: searchParams.units,
        }).then(formatForecastWeather);

        return { ...formattedCurrentWeather, ...formattedForecastWeather };
    } catch (error) {
        console.error("Error fetching or formatting weather data", error);
        return null;
    }
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;
