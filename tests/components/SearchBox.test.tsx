import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SeachBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    // need to set onChange to a mock fxn. can do this using vi.fn() (a method provided by vitest)
    // vi.fn() creates a fxn whose calls can be tracked, including the args passed to it, how many times it was called, etc. By default, vi.fn() returns undefined when called
    render(<SearchBox onChange={onChange} />);

    return {
      inputField: screen.getByPlaceholderText(/search/i),
      // the benefit of placeholder querying over role querying in this scenario is that in one go, tester can also check that input field has correct placeholder text (in addition to input field being in dom)
      user: userEvent.setup(),
      // so that tester doesn't have to create user event twice
      onChange,
    };
  };

  it("should render an input field for searching", () => {
    const { inputField } = renderSearchBox();

    expect(inputField).toBeInTheDocument();
  });

  it("should call onChange when when Enter is pressed and input is populated", async () => {
    const { inputField, user, onChange } = renderSearchBox();
    // before assertions can be made against this, user typing into the input field must be simulated

    const searchTerm = "SearchTerm";
    await user.type(inputField, searchTerm + "{enter}");
    // user.type takes 2 args: target element (input) and text to type ("SearchTerm")
    // "SearchTerm": these chars are typed into the input field one by one
    // {enter}: special key notation indicating that the enter key should be pressed after typing the chars

    expect(onChange).toHaveBeenCalledWith(searchTerm);

    // now to test if input field is empty and user presses enter that callback fxn isn't called
  });

  it("should not call onChange if input field is empty", async () => {
    const { inputField, user, onChange } = renderSearchBox();

    await user.type(inputField, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
