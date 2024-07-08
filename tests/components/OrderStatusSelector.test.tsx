import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn} />
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      // options: screen.findAllByRole("option"),
      // ^^ won't work bc renderComponent is executed when component is initially rendered (at which point there are no options rendered in the dom)...
      // instead must use lazy evaluation which postpones execution of code until it's needed
      getOptions: () => screen.findAllByRole("option"),
      // must 1st be turned into a fxn
    };
  };

  it("should render new as the default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { trigger, getOptions } = renderComponent();

    const user = userEvent.setup();
    await user.click(trigger);

    const options = await getOptions();
    // this code is now executed after trigger is clicked and options are displayed
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });
});
