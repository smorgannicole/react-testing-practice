import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
        {/* currently mock fxn is being passed here, but it needs to be defined so it can be accessed in test cases */}
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      // options: screen.findAllByRole("option"),
      // ^^ won't work bc renderComponent is executed when component is initially rendered (at which point there are no options rendered in the dom)...
      // instead must use lazy evaluation which postpones execution of code until it's needed
      getOptions: () => screen.findAllByRole("option"),
      // must 1st be turned into a fxn
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      // takes a label as a regular expression
      user: userEvent.setup(),
      onChange,
    };
  };

  it("should render new as the default value", () => {
    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { trigger, getOptions, user } = renderComponent();

    await user.click(trigger);

    const options = await getOptions();
    // this code is now executed after trigger is clicked and options are displayed
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onChange with $value when the $label option is selected",
    async ({ label, value }) => {
      // to get access to above properties, the argument must be destructured
      const { trigger, user, onChange, getOption } = renderComponent();
      await user.click(trigger);

      const option = await getOption(label);
      // using a filter to grab this particular option
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );
  // convert this test to parameterized test to reuse...
  // the "it" obj has a property called .each that is called and given an arr of objs
  // when .each method is called, a fxn is returned

  // have to handle "New" option differently bc since it is default value, when clicked, nothing happens...
  // instead, we must select a different option then select "New" option
  it("should call onChange with 'new' when the New option is selected", async () => {
    const { trigger, user, onChange, getOption } = renderComponent();
    await user.click(trigger);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(trigger);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
