export class TownNotFoundException extends Error{
    constructor(town:string){
        super(`The '${town}' can not be found`);
    }
}