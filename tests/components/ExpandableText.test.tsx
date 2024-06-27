import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  // 2 test cases
  // if text is short, full text is rendered
  // otherwise, text should be truncated

  const limit = 255;
  // if requirements change in the future, there's a single place that has to be changed
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 255 characters", () => {
    const shortText = "short text";
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it("should truncate if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    // have to look for the truncated text
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    // in this scenario, tester should also check for the presence of the show more btn
    const showMoreButton = screen.getByRole("button");
    // expect(showMoreButton).toBeInTheDocument();
    // .getByRole() throws an error if there is no element matching the criteria, so technically don't have to check if btn is in the document bc if btn doesn't exist, the test will fail on the line 2 lines above however...
    // if there was no assertion after the .getByRole("button") assertion, test would look unfinished and it would be more correct to have "expect(showMoreButton).toBeInTheDocument();" uncommented out
    expect(showMoreButton).toHaveTextContent(/more/i);

    // rendering tests are complete, time for user interaction tests
  });

  it("should expand text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    //find btn
    const button = screen.getByRole("button");
    // get user obj
    const user = userEvent.setup();
    // make "user" click btn
    await user.click(button);

    // now tester should expect full text to be in document
    expect(screen.getByText(longText)).toBeInTheDocument();
    // label of btn should also change to "show less"
    expect(button).toHaveTextContent(/less/i);

    // now to make the text for collapsing the text
  });

  it("should collapse text when Show Less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    // using option obj to use filter by name
    const user = userEvent.setup();
    await user.click(showMoreButton);
    // "user" clicks "show more" btn and btn text changes to "show less"

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);
    // "user" clicks "show less" btn and btn text changes to "show more" while returning text to original truncated state

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
