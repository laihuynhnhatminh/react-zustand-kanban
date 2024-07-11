import "./App.css";
import Column from "./components/Column/Column";
import { ColumnStatus } from "./enums/columnStatus";

function App() {
  return <div className="App">
    <Column state={ColumnStatus.PLANNED}/>
    <Column state={ColumnStatus.ONGOING}/>
    <Column state={ColumnStatus.DONE}/>
  </div>;
}

export default App;
