import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from './components/navbar'
import Home from './components/home';
import EditForm from './components/editFiscalia'

function App() {
  return (
    <div className="App">

      <Router>
      <Appbar/>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home/>}
          />
          <Route
            path="/form"
            element={<EditForm />}
          />

          <Route
            path="/form/:pathId"
            element = {<EditForm />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
