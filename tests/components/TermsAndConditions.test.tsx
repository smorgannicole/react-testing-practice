import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

// describe("TermsAndCondition", () => {
//   it("should render with correct text and initial state", () => {
//     render(<TermsAndConditions />);
//     // not testing for <p> text bc that could easily change in the future...
//     // instead should test for heading's presence and content
//     const termsHeading = screen.getByRole("heading");
//     expect(termsHeading).toBeInTheDocument();
//     expect(termsHeading).toHaveTextContent("Terms & Conditions");
//     // chances of this text changing in the future is minimal

//     // to test initial state, tester needs to verify there's an unchecked check box in document
//     const checkBox = screen.getByRole("checkbox");
//     expect(checkBox).toBeInTheDocument();
//     // now tester should make sure it's initally unchecked via matcher method called .toBeChecked()
//     expect(checkBox).not.toBeChecked();

//     // also need to verify there's a disabled btn
//     const submitButton = screen.getByRole("button");
//     // if there were to be multiple btns on this page, would need to use option obj to filter by name and pass as 2nd arg like: .getByRole("button", { name: /submit/i })
//     expect(submitButton).toBeInTheDocument();
//     // expect(submitButton).toHaveTextContent(/submit/i);
//     // a chance that this text could very well change in the future and we're focused on testing behavior/fxnality here so ok to omit
//     expect(submitButton).toBeDisabled();
//   });

//   // now to test user interaction
//   it("should enable the button when the checkbox is checked", async () => {
//     render(<TermsAndConditions />);
//     // to simulate user interaction, a library called user event is used

//     const checkBox = screen.getByRole("checkbox");
//     const user = userEvent.setup();
//     // userEvent.setup method creates an instance of userEvent that is configured to interact with the dom in a way that simulates user interaction
//     // returns an obj
//     await user.click(checkBox);
//     // .click returns promise so must await it

//     // time for the assertion
//     const submitButton = screen.getByRole("button");
//     expect(submitButton).toBeEnabled();
//   });
// });

// simplifying this test...

describe("TermsAndCondition", () => {
  // defining a helper fxn for rendering a component and returning common elements we want to query
  const renderComponent = () => {
    // start by rendering component
    render(<TermsAndConditions />);

    // then we return an obj and add the elements we want to query ie heading, checkbox, and btn as properties
    return {
      termsHeading: screen.getByRole("heading"),
      checkBox: screen.getByRole("checkbox"),
      submitButton: screen.getByRole("button"),
    };
  };

  it("should render with correct text and initial state", () => {
    // instead of calling render fxn from react testing library, we use our own render fxn
    const { termsHeading, checkBox, submitButton } = renderComponent();
    // this returns an obj, so we destructure it and grab the elements we need

    // can also remove the .toBeInTheDocument() matchers bc the .getByRole() query method will throw an error if the element isn't in the dom
    expect(termsHeading).toHaveTextContent("Terms & Conditions");
    expect(checkBox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  it("should enable the button when the checkbox is checked", async () => {
    const { checkBox, submitButton } = renderComponent();

    const user = userEvent.setup();
    await user.click(checkBox);

    expect(submitButton).toBeEnabled();
  });
});
