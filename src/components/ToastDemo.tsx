import toast from "react-hot-toast";
// react-hot-toast library is used to display toast notifications

const ToastDemo = () => {
  return (
    <button className="btn" onClick={() => toast.success("Success")}>
      {/* toast.success("Success") is a fxn call that displays a success toast notification with message: Success */}
      Show Toast
    </button>
  );
};

export default ToastDemo;
