// 2 test cases needed here...
// 1) provide a name and assert there is a heading with this content in the dom
// 2) don't provide a name and assert there is a login btn in the dom

const Greet = ({ name }: { name?: string }) => {
  if (name) return <h1>Hello {name}</h1>;

  return <button>Login</button>;
};

export default Greet;
