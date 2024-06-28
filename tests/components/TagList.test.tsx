import { render, screen, waitFor } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  it("should render tags", async () => {
    render(<TagList />);

    // // 2 ways to solve- waitFor or find query
    // await waitFor(() => {
    //   const listItems = screen.getAllByRole("listitem");
    //   expect(listItems.length).toBeGreaterThan(0);
    // });
    // // waitFor should be given a callback fxn where the assertion lives
    // // waitFor is a utility fxn in react testing lib that repeatedly executes callback fxn until it times out (default is 1s)
    // // after 1s, if the element tester is looking for can't be found, the test will fail
    // // sidenote: since callback is repeatedly called, it's important that there isn't code that could potentially cause side effects in the callback (code that doesn't produce same result if repeated)

    const listItems = await screen.findAllByRole("listitem");
    // .findAllByRole()(not to be mistaken for .getAllByRole()) is a combo of waitFor and get query
    expect(listItems.length).toBeGreaterThan(0);
  });
});
