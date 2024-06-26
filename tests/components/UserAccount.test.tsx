import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render the user name", () => {
    // start by creating user obj
    const user: User = { id: 1, name: "Morgan Smith" };

    render(<UserAccount user={user} />);

    const userName = screen.getByText(user.name);
    expect(userName).toBeInTheDocument();
  });

  it("should render the edit button when user is admin", () => {
    const user: User = { id: 1, name: "Morgan Smith", isAdmin: true };

    render(<UserAccount user={user} />);

    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent(/edit/i);
  });

  it("should not render the edit button when user is not admin", () => {
    const user: User = { id: 1, name: "Morgan Smith" };

    render(<UserAccount user={user} />);

    const editButton = screen.queryByRole("button");
    expect(editButton).not.toBeInTheDocument();
  });
});
