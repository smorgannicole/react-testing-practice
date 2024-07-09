import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("ProductList", () => {
  it("should render the list of products", async () => {
    render(<ProductList />);

    const items = await screen.findAllByRole("listitem");
    // find method rather than get bc async operation
    expect(items.length).toBeGreaterThan(0);
    // shouldn't exert exact length of items bc likely to change (the same reason we wouldn't look up products by name)
  });

  it("should render no products available if no product is found", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));
    // defining a temporary request handler for the /products endpoint
    // .use() method allows addition or override of request handlers for duration of test
    // HttpResponse.json([]) fxn call creates a json response with an empty arr which simulates scenario where no products are returned from server

    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    // again, using find bc message is rendered async
    expect(message).toBeInTheDocument();
  });
});
