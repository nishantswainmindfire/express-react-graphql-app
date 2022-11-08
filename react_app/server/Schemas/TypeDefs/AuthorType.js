const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: { type: GraphQLInt },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      Friends:{type:GraphQLList(UserType)}
    }),
  });
  
  module.exports = UserType;