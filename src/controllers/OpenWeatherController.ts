import TimeService from "../services/TimeService";
import OpenWeatherProvider from "../input-interface/weather-providers/OpenWeatherProvider";
import GeoLocationConverterService from "../services/GeoLocationConverterService";
import BaseController from "./BaseController";
import Service from "../injection/ServiceDecorator";

@Service()
export default class OpenWebController extends BaseController{
  constructor(
    protected timeService: TimeService,
    protected geoConverter: GeoLocationConverterService,
    protected openWebService: OpenWeatherProvider
  ){
    super(timeService, geoConverter, openWebService);
  }
}