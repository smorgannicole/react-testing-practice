import { Toaster } from "react-hot-toast";
// Toaster component is responsible for displaying the toast notifications
import ToastDemo from "../components/ToastDemo";

const PlaygroundPage = () => {
  return (
    <>
      <ToastDemo />
      <Toaster />
    </>
  );
  // in order for ToastDemo to work, also need Toaster component bc it's the container where the toast notifications are shown
};

export default PlaygroundPage;
