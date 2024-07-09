import { setupServer } from "msw/node";
// setupServer: fxn used to setup a mock server with the defined handlers
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
// spread operator is used to pass the handlers array as individual args to the setupServer fxn. This sets up the server with all the defined request handlers
