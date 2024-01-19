import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import{Modelocontacto,contactotipo} from "../db/contactos.ts"
import { numero } from "../types.ts";
import {country} from "../types.ts"
import { hora } from "../types.ts";
import { contacto } from "../types.ts";

export const Mutation = {
addContact: async(_:unknown,args:{nombre:string, numero:string}): Promise<contacto> =>{
    const options={
        method:'GET',
        headers:{'x-api-key':'cYoysYJsZ7R+BkyemEw+lA==Eet23H5Ki9guOsLz'}
    }
    const URLnumero= `https://api.api-ninjas.com/v1/validatephone?number=${args.numero}`//valido el telefono y tomo el pais
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

const newcontact= new contactotipo({nombre:args.nombre,telefono:args.numero})
 await newcontact.save();
    const contactonuevo={
        nombre:args.nombre,
        telefono:args.numero,
        paisresidencia:mivalidate.country,
        hora:mihora.datetime
    }
return contactonuevo;
},
deleteContact: async(_:unknown,args:{id:string}): Promise<boolean> =>{
const contaoaborrar=  await contactotipo.findByIdAndDelete(args.id);
if(!contaoaborrar){
   // throw new GraphQLError(`Contacto no encontrado`)
    return false;
}
return true;
},
updateContact: async(_:unknown,args:{id:string,nombre:string,numero:string}): Promise<boolean> =>{
    if(!args.numero){
        const contactoactualizar=  await contactotipo.findByIdAndUpdate(args.id,{nombre:args.nombre})
    }
    if(!args.nombre){
        const contactoactualizar=  await contactotipo.findByIdAndUpdate(args.id,{telefono:args.numero})
    }
    const contactoactualizar=  await contactotipo.findByIdAndUpdate(args.id,{nombre:args.nombre,telefono:args.numero})
    if(!contactoactualizar){
       throw new GraphQLError(`Contacto no encontrado`)
    }
    return true;
    }
};
