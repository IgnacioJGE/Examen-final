import { GraphQLError } from "graphql";
import{Modelocontacto,contactotipo} from "../db/contactos.ts"
import { contacto, numero } from "../types.ts";
import {country} from "../types.ts"
import { hora } from "../types.ts";
export const Query = {
getContact: async (_:unknown,args:{id:string}):Promise<contacto> =>{
const contactoencontrado=  await contactotipo.findById(args.id).exec()
if(!contactoencontrado){
    throw new GraphQLError(`Contacto no encontrado`)
}
const options={
    method:'GET',
    headers:{'x-api-key':'cYoysYJsZ7R+BkyemEw+lA==Eet23H5Ki9guOsLz'}
}
const URLnumero= `https://api.api-ninjas.com/v1/validatephone?number=${contactoencontrado.telefono}`//valido el telefono y tomo el pais
const datosnum= await fetch (URLnumero,options);
const mivalidate:numero= await datosnum.json();
if(mivalidate.is_valid==false){
    throw new GraphQLError(`Numero no valido`)
}
const URLCiudad=`https://api.api-ninjas.com/v1/country?name=${mivalidate.country}`//con el pais encuentro la capital
const datospais= await fetch (URLCiudad,options);
const miciudad:country[]= await datospais.json();
const urltimezone=`https://api.api-ninjas.com/v1/worldtime?city=${miciudad[0].capital}`//con la capital saco la hora
const datoshora= await fetch (urltimezone,options);
const mihora:hora= await datoshora.json();
const contactonuevo={
    nombre:contactoencontrado.nombre,
    telefono:contactoencontrado.telefono,
    paisresidencia:mivalidate.country,
    hora:mihora.datetime
}
console.log(miciudad[0].capital)
return(contactonuevo);

}
};
