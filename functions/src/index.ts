// import {initializeApp} from "firebase-admin/app";
// initializeApp();
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import {Server} from "./infrastructure/server/server";
import {ServerRoutes} from "./infrastructure/server/routes";

// Set the maximum instances to 10 for all functions
setGlobalOptions({maxInstances: 10});

// initialize server
const server = new Server({
  port: process.env.PORT || 8080,
  routes: ServerRoutes.getRoutes(),
});

export const app = onRequest(server.getInstance());
