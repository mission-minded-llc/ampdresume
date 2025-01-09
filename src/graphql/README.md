# OpenResume GraphQL

In order to query data via GraphQL, there are a few steps to take for each type of query or
mutation.

## Initial Setup

In the `src/app/api/graphql/` folder, there are query and mutation definitions and accompanying
resolvers.

The first step to add a new query or mutation is to add the definition and associated types and
variables.

Then, add the resolver necessary to actually fetch/update the data.

## GraphQL Query Template

Once you have the definition and accompanying resolver set up, you'll want to head to the
`src/graphql/` folder to add a GraphQL query.

## Query/Mutation Function

Then, add the function that relies on the previously-mentioned query to process the request to the
server. This function can live next to the GraphQL query itself.

## Tanstack Query

This repo uses Tanstack Query to handle the GraphQL requests via Apollo. Use the previously-noted
function as the callback for the Tanstack Query call.
