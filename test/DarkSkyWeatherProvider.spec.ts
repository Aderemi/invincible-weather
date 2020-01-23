import Axios from 'axios'
import DarknetWeatherProvider from '../src/input-interface/weather-providers/DarknetWeatherProvider'
import BaseWeatherProvider from "../src/input-interface/weather-providers/BaseWeatherProvider";
import {Injector} from "../src/injection/Injector";
import {darkSkyWeatherResponseMock} from "./MockJSON";

describe('Request', () => {
  const prov = Injector.resolve<BaseWeatherProvider>(DarknetWeatherProvider);
  describe('Dependency injection tests', () => {
    it('Injected is instance of DarknetWeatherProvider', () => {
      expect(prov).toBeInstanceOf(DarknetWeatherProvider);
    });
    it('formatWeatherData is defined', () => {
      expect(prov.formatWeatherData).toBeDefined()
    });
    it('getInfo is defined', () => {
      expect(prov.getInfo).toBeDefined()
    });
    it('fetchWeather is defined', () => {
      expect(prov.fetchWeather).toBeDefined()
    });
  });
  describe('get', () => {
    it('is defined', () => {
      expect(prov.fetchWeather).toBeDefined()
    });
    it('calls request-promise \'get()\'', () => {
      spyOn(Axios, 'get');
      prov.fetchWeather(0,0);
      expect(Axios.get).toHaveBeenCalled()
    });
    it('returns a Promise', () => {
      spyOn(Axios, 'get').and.returnValue(Promise.resolve('promise'));
      const val = prov.fetchWeather(0,0);
      expect(val instanceof Promise).toBeTruthy()
    })
  });
   describe('returned json is correctly processed', () => {
    it('returns temperature from processed JSON', async () => {
      const jsonResponse = JSON.parse(darkSkyWeatherResponseMock);
      const result = await prov.formatWeatherData(jsonResponse);
      expect(result.celsius).toBe(81);
      expect(result.forecast).toBe("frosty");
    })
  })
});
