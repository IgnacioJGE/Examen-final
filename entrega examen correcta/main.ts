import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import {Query} from "./resolvers/query.ts"
import{Mutation} from "./resolvers/mutation.ts"
import { contacto } from "./types.ts";
import { typeDefs } from "./gql/schema.ts";

//import { load } from "../../C:/Users/igarciae1/AppData/Local/deno/npm/registry.npmjs.org/@apollo/protobufjs/1.2.7/index.d.ts";
// Data
//const env=await load();
const MONGO_URL= "mongodb+srv://examen:eIJMH9x6ePnYHboz@cluster0.mwqkjcg.mongodb.net/Contacto?retryWrites=true&w=majority"||Deno.env.get("MONGO_URL")
await mongoose.connect(MONGO_URL)
console.log("Mongo conectado")
const server = new ApolloServer({
  typeDefs,
  resolvers:{
    Query,
    Mutation,
  },
});

const { url } = await startStandaloneServer(server,{listen:{port:3000,},});
console.log(`🚀 Server ready at ${url}`);