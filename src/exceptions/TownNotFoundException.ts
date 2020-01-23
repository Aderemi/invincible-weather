export class TownNotFoundException extends Error{
  constructor(town:string){
    const msg = isNaN(parseInt(town)) ? `The town '${town}' can not be found` : `The town with '${town}' postal code can not be found`;
    super(msg);
  }
}