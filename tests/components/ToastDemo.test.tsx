import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import { Toaster } from "react-hot-toast";
import userEvent from "@testing-library/user-event";

describe("ToastDemo", () => {
  it("should render a toast", async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    const showToastButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(showToastButton);

    // bc toast notifications appear asynchronously, must use one of the find queries
    // the async flow: User clicks show toast btn => onClick handler calls toast.success("Success") => (async notification creation:) once toast.success is called, a toast notification is created => toaster immediately renders toast notification on the screen without blocking main thread => toast notification with the message "Success" appears asynchronously => the notification automatically disappears after a bit
    const toastNotification = await screen.findByText(/success/i);
    expect(toastNotification).toBeInTheDocument();
    // get error matchMedia is not a fxn bc our tests aren't run inside browser env, but rather a node env. in that env, the window obj doesn't have matchMedia property and it must be added
  });
});
