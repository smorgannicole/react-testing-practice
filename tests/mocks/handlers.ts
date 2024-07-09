// this is where request handlers are defined
import { http, HttpResponse } from "msw";
// http: defines request handlers
// HttpResponse: provides methods to create diff types of responses

export const handlers = [
  http.get("/categories", () => {
    // .post, .patch, etc methods also available
    // first arg is a path to an endpoint
    // 2nd arg is response resolver (fxn for handling requests sent to this endpoint)
    return HttpResponse.json([
      {
        id: 1,
        name: "Electronics",
      },
      {
        id: 2,
        name: "Arts and Crafts",
      },
      {
        id: 3,
        name: "Gardening",
      },
    ]);
  }),

  http.get("/products", () => {
    return HttpResponse.json([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ]);
  }),
];
// arr of request handlers- each handler defines how to respond to a specific type of request to a specific endpoint
