import Axios from 'axios'
import DarknetWeatherProvider from '../src/input-interface/weather-providers/DarknetWeatherProvider'
import BaseWeatherProvider from "../src/input-interface/weather-providers/BaseWeatherProvider";
import {Injector} from "../src/injection/Injector";
import OpenWeatherProvider from "../src/input-interface/weather-providers/OpenWeatherProvider";
import {openWeatherProviderMock} from "./MockJSON";

describe('Request', () => {
  const prov = Injector.resolve<BaseWeatherProvider>(OpenWeatherProvider);
  describe('Dependency injection tests', () => {
    it('Injected is instance of OpenWeatherProvider', () => {
      expect(prov).toBeInstanceOf(OpenWeatherProvider);
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
   describe('returned json is correctly formatted', () => {
    it('returns temperature from json processed', async () => {
      const temp = 0;
      const jsonResponse = JSON.parse(openWeatherProviderMock);
      const result = await prov.formatWeatherData(jsonResponse);
      expect(result.celsius).toBe(temp);
      expect(result.forecast).toBe("Raining");
    })
  })
});
