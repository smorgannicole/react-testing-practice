import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  it("should render new as the default value", () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn} />
      </Theme>
    );
    // Theme component provides styling/theming context needed by components from radix ui library. Without this context, OrderStatusSelector component may not render with correct styles/may not function properly

    const selectorButton = screen.getByRole("combobox");
    // there is no native html "select" element so we have to query for combobox (despite the element itself being a button) bc this component was pulled from a component library and has property of role="combobox"
    expect(selectorButton).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    // to verify this behavior, need to click select component. bc the options only appear after select component is clicked, they aren't rendered in dom ahead of time
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn} />
      </Theme>
    );

    const selectorButton = screen.getByRole("combobox");
    const user = userEvent.setup();
    await user.click(selectorButton);

    // now to find all the options... those options appear asynchronously so they have to be looked up using find method

    const options = await screen.findAllByRole("option");
    // test knows the elements are options by use of ARIA roles (options are typically given the role="option")
    expect(options).toHaveLength(3);
    // now to make sure these options have correct labels...
    // these options are html elements and html elements have a property called textContent which holds the label title...
    // we can iterate over them and map them to their textContent
    const labels = options.map((option) => option.textContent);
    // returns arr of labels
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
    // unlikely that staus names will change in future
  });
});
