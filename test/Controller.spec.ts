import {Injector} from "../src/injection/Injector";
import BaseController from "../src/controllers/BaseController";
import DarkSkyNetController from "../src/controllers/DarkSkyNetController";
import OpenWeatherController from "../src/controllers/OpenWeatherController";

describe('Request', () => {
    const darkController = Injector.resolve<BaseController>(DarkSkyNetController);
    const openController = Injector.resolve<BaseController>(OpenWeatherController);
    describe('Dependency injection tests', () => {
        it('Injected is instance of ', () => {
            expect(darkController).toBeInstanceOf(DarkSkyNetController);
        });
        it('index() is defined', () => {
            expect(darkController.index).toBeDefined()
        });
        it('Injected is instance of ', () => {
            expect(openController).toBeInstanceOf(OpenWeatherController);
        });
        it('index() is defined', () => {
            expect(openController.index).toBeDefined()
        });
    });
});
