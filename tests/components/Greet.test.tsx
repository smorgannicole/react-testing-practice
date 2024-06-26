// import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";
// have to render the Greet component using the render fxn from react testing lib
// import "@testing-library/jest-dom/vitest";
// custom matchers that come with jest-dom testing library

describe("Greet", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Morgan" />);
    // this render fxn renders the component into the virutal dom implemented by jsdom...
    // to see the state of this dom, screen obj can be imported
    screen.debug();
    // debug is a method from screen obj to print out state of dom. can also help visualize the dom tree before writing assertion

    const greetHeading = screen.getByRole("heading");
    // most of the time, getByRole method is preferred bc it makes tests more robust and less prone to breaking when UI is changed...
    // for example, when changing text or classnames of elements, a test using getByRole is less likely to fail compared to one that relies on text or class selectors...
    // also, getByRole encourages tester to interact with their components, just like the end user,
    // here, tester would want to select the role of "heading" which satisfies any type of heading

    // time to write assertions
    expect(greetHeading).toBeInTheDocument();
    // to ensure tester is testing correct behavior and avoiding false positives, may be good to go to production code, make a change, and see if test fails

    // 2nd assertion to ensure heading has correct content
    expect(greetHeading).toHaveTextContent(/hello morgan/i);
    // can pass either string or regular expression (used for pattern matching within strings) to method, but best to use reg expression bc more robust
    // "i" makes reg exp case insensitive
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/login/i);
  });
});
