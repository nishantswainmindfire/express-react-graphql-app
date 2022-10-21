const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        post_id: { type: GraphQLInt },
        post_title: { type: GraphQLString },
        post_description: { type: GraphQLString },
        post_rating: { type: GraphQLString },
    }),
});

module.exports = PostType;