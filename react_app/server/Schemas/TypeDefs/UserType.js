const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLInt },
      userName: { type: GraphQLString },
      // lastName: { type: GraphQLString },
      // email: { type: GraphQLString },
      password: { type: GraphQLString },
      token:{type:GraphQLString}
    }),
  });
  
  module.exports = UserType;