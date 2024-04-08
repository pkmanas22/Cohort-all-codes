
import "./App.css";

function App() {
  return (
    <>
      {/* <Assignment2 title='Go to gym' desc='At 9 PM' />    // it gives error as done is missing */}
      <Assignment2 title="Go to gym" desc="At 9 PM" done={false} />
    </>
  );
}

interface TodoProp {
  title: string;
  desc: string;
  done: boolean;
  subTitle?: string; // this is optional so < Assignment2 /> does not gives the error
}

function Assignment2(props: TodoProp) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </div>
  );
}

export default App;
