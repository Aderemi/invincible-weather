import Weather from "../../models/Weather";
import config from "../../config/Config";
import BaseWeatherProvider from "./BaseWeatherProvider";
import Service from "../../injection/ServiceDecorator";
import WeatherProviderInfo from "../../models/WeatherProviderInfo";

@Service()
export default class OpenWeatherProvider extends BaseWeatherProvider {
   URL = `http://api.openweathermap.org/data/2.5/weather/?APPID=${config.OPEN_WEATHER_API_KEY}&_`;
   getInfo(): WeatherProviderInfo{
    return {
      name: "OpenWeather Weather Information Provider",
      url: "https://openweathermap.org",
      default_temp_unit: "Kelvin"
    };
  }
   getUrl(longitude: number, latitude: number): string {
    const geoLocationUrlParam = `lat=${latitude}&lon=${longitude}`;
    return this.URL.replace('_', `${geoLocationUrlParam}`);
  }
   formatWeatherData(data: string): Weather {
    const weather = new Weather();
    const model: any = data;
    weather.celsius = model.main.temp - 273.15; // OpenWeather returns Kelvin by default
    weather.forecast = model.weather[0].main;
    return weather;
  }
   extractTimeZone(model: any): string {
    return model.timezone;
  }
   extractCityName(model: any): string {
    return model.name;
  }
}