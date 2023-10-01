
const Hello = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
//   throw Error('Hello Error');
  return <div>Hi</div>;
};

export default Hello;
