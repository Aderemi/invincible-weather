import Weather from "../../models/Weather";
import BaseWeatherProvider from "./BaseWeatherProvider";
import Service from "../../injection/ServiceDecorator";
import WeatherProviderInfo from "../../models/WeatherProviderInfo";
import config from "../../config/Config";

@Service()
export default class DarknetWeatherProvider extends BaseWeatherProvider {
  URL = `https://api.darksky.net/forecast/${config.DARK_SKY_NET_API_KEY}/_`;
   getInfo(): WeatherProviderInfo{
    return {
      name: "DarkSky Weather Information Provider",
      url: "https://darksky.net",
      default_temp_unit: "celsius"
    };
  }
   getUrl(longitude: number, latitude: number): string {
    const geoLocationUrlParam = `${latitude},${longitude}`;
    return this.URL.replace('_', `${geoLocationUrlParam}`);
  }
   formatWeatherData(data: string): Weather {
    const weather = new Weather();
    const model: any = data;
    weather.celsius = parseInt(model.currently.temperature);
    weather.forecast = model.currently.summary;
     return weather;
  }
   extractTimeZone(model: any): string {
    return model.timezone;
  }
   extractCityName(model: any): string {
    return "Not Available"; // DarkSky is so dumb the api doesn't return city name
  }
}