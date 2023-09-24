import "./App.css";
import SteplineChart, { DataPoint } from "./charts/stepline";

const datas: DataPoint[] = [
  {
    status: "driving",
    time: 1, //для line
    from: 1, // для box при hover
    to: 2,
    day: "10 avgust",
  },
  {
    status: "on duty",
    time: 2,
    from: 2,
    to: 5,
    day: "10 avgust",
  },
  {
    status: "sleep",
    time: 5,
    from: 5,
    to: 9,
    day: "10 avgust",
  },
  {
    status: "driving",
    time: 9,
    from: 9,
    to: 14.6,
    day: "10 avgust",
  },
  {
    status: "on duty",
    time: 14.6,
    from: 14.6,
    to: 17,
    day: "10 avgust",
  },
  {
    status: "sleep",
    time: 17,
    from: 17,
    to: 18,
    day: "10 avgust",
  },
  {
    status: "off duty",
    time: 18,
    from: 18,
    to: 20,
    day: "10 avgust",
  },
  {
    status: "off duty",
    time: 20,
    from: 20,
    to: 24,
    day: "11 avgust",
  },
  {
    status: "on duty",
    time: 24,
    from: 24,
    to: 25,
    day: "11 avgust",
  },
];

function App() {
  return (
    <div className="App">
      <div className="statuses">
        {[...new Set(datas.map((item) => item.status).reverse())]?.map(
          (item) => (
            <b className="statuses__status">{item}</b>
          )
        )}
      </div>
      <div className="chart" style={{ overflowX: "scroll" }}>
        <SteplineChart height="225px" data={datas}></SteplineChart>
      </div>
    </div>
  );
}

export default App;
