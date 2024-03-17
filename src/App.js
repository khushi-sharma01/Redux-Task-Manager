import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./Component/AddTask";
import DisplayTask from "./Component/DisplayTask";
function App() {
  return (
<div><Router>
  <Routes>
    <Route element ={<AddTask/>} path={'/addtask'}> </Route>
    <Route element ={<DisplayTask/>} path={'/displaytask'}/>
 
  </Routes>
  </Router></div>
  );
}

export default App;
