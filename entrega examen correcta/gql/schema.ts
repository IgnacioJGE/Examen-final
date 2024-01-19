// The GraphQL schema
export const typeDefs = `#graphql
type contacto{
nombre:String!
telefono:String!
paisresidencia:String!
hora:String!
}
type numero{
country:String!
}
type hora{
datetime:String!
}
type Query{
getContact(id:String!):contacto!,
getContacts:[contacto!]!
}
type Mutation{
addContact(nombre:String!,numero:String!):contacto!
deleteContact(id:String!):Boolean!
updateContact(id:String!,nombre:String,numero:String):contacto!
}

`;
