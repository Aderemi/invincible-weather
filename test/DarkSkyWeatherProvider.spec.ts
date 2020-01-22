import Axios from 'axios'
import DarknetWeatherProvider from '../src/input-interface/weather-providers/DarknetWeatherProvider'
import Weather from "../src/models/Weather";
import BaseWeatherProvider from "../src/input-interface/weather-providers/BaseWeatherProvider";
import {Injector} from "../src/injection/Injector";

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
        it('returns temperature from scrapped page', async () => {
            const temp = 41;
            const jsonResponse = `{"latitude":3.3601,"longitude":3.0589,"timezone":"Etc/GMT","currently":{"temperature": 81.97}}`;
            const result = await prov.formatWeatherData(jsonResponse);
            expect(result.celsius).toBe(temp)
            expect(result.fahrenheit).toBe(105.8);
        })
    })
});
