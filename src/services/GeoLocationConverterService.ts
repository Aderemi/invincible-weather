import Service from "../injection/ServiceDecorator";
import Axios from "axios";
import {APIErrorException} from "../exceptions/APIErrorException";

@Service()
export default class GeoLocationConverterService{
    GEO_URL = "https://darksky.net/geo?q=_";
    async convert(location:string): Promise<string> {
        try {
            const geo = await Axios.get(this.GEO_URL.replace("_", location));
            if(geo.status == 200){
                return geo.data;
            }
            throw new APIErrorException(geo.statusText, geo.status, this.GEO_URL.replace("_", location));
        }catch (error){
            throw new APIErrorException(error, 500, this.GEO_URL.replace("_", location));
        }
    }
}