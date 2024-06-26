import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />);

    const noUserText = screen.getByText(/no users/i);
    // the chances of "no users" not being displayed in the future is minimal which makes the test less fragile
    expect(noUserText).toBeInTheDocument();
  });

  it("should render a list of users when the users array is not empty", () => {
    const users: User[] = [
      {
        id: 1,
        name: "Morgan",
      },
      { id: 2, name: "Dustin" },
    ];
    render(<UserList users={users} />);

    // to verify tester has correct hyperlink for each user, they can iterate over arr and for each user, they can look for link with user's name and verify that link has the correct href attribute
    users.forEach((user) => {
      const userLink = screen.getByRole("link", { name: user.name });
      // all query methods have an optional 2nd arg- the options obj...
      // here we are passing the options obj and applying a filter
      expect(userLink).toBeInTheDocument();

      // now check to make sure it has the correct href attr
      expect(userLink).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
