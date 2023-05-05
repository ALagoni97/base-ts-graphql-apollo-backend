import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { Context } from "@/context/Context.js";
import { typeDefs } from "@graphql-types/index.js";

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError, error) => {
    if (formattedError.message.startsWith("Database Error: ")) {
      return { message: "Internal server error" };
    }

    // Otherwise return the formatted error.
    return formattedError;
  },
});

(async () => {
  // Ensure we wait for our server to start
  await server.start();
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/graphql",
    bodyParser.json({ limit: "10mb" }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({
        database: databaseConnection,
        user: await generateUser(req),
      }),
    })
  );
  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
