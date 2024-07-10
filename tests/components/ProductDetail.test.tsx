import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { products } from "../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("ProductDetail", () => {
  it("should render the list of products", async () => {
    render(<ProductDetail productId={1} />);

    // need to verify the name of the prod is rendered in document
    expect(
      await screen.findByText(new RegExp(products[0].name))
    ).toBeInTheDocument();
    // must use find bc async
    // instead of using //i for a regular expression, here we must create a new instance of the RegExp obj and initialize it with the name

    // 2nd assertion to verify price is rendered
    expect(
      await screen.findByText(new RegExp(products[0].price.toString()))
    ).toBeInTheDocument();
    // by default, price is a number and nums can't be passed to RegExp so toString method must be used
  });

  // want to simulate the scenario in which the product can't be found
  it("should render message if product not found", async () => {
    // override the handler for fetching
    server.use(http.get("/products/1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should render an error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);
    expect(message).toBeInTheDocument();
  });
});
