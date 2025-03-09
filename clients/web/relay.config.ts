module.exports = {
  src: "./src",
  language: "typescript",
  schema: "./schema.graphql", // Path to your GraphQL schema
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  artifactDirectory: "./src/__generated__",
}