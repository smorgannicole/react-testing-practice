// this is where request handlers are defined
import { http, HttpResponse } from "msw";
import { products } from "./data";
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
    return HttpResponse.json(products);
  }),

  http.get("/products/:id", ({ params }) => {
    // have to destructure params to get access to id parameter
    const id = parseInt(params.id as string);
    // necessary type assertion to tell ts compiler id will be a string (not a string arr)

    // logic to look up product
    const product = products.find((p) => p.id === id);
    if (!product) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(product);
  }),
  // duplication of backend logic- will be reworked
];
// arr of request handlers- each handler defines how to respond to a specific type of request to a specific endpoint
