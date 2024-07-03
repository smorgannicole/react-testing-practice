import OrderStatusSelector from "../components/OrderStatusSelector";

const PlaygroundPage = () => {
  return <OrderStatusSelector onChange={console.log} />;
  // when an arrow fxn takes a value and passes it to another fxn, code can be simplified as shown above (as opposed to: value => console.log(value))
  // we're simply passing a reference to the fxn, not calling it
};

export default PlaygroundPage;
