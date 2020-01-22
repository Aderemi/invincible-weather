import {GenericClassDecorator, Type} from "./IType";


/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
const Service = () : GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {};
};

export default Service;