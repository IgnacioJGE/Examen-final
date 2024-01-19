import mongoose from "mongoose";
import { contacto } from "../types.ts";
const Schema = mongoose.Schema;

const contactoSchema = new Schema({
    nombre:{type:String, required:true},
    telefono:{type:String,required:true,unique:true},
},
{timestamps:true}
);

export type Modelocontacto = mongoose.Document&(contacto);
export const contactotipo = mongoose.model<Modelocontacto>("Contactos",contactoSchema);