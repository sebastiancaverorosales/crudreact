import "./assets/css/App.css";
import Listar from "./assets/components/Listar";
import Crear from "./assets/components/Crear";
import Editar from "./assets/components/Editar";


import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>
            Sistema<span className="sr-only"></span>
          </Link>
          <Link className="nav-item nav-link" to={"/crear"}>
            Crear Empleado
          </Link>
          <Link className="nav-item nav-link" to={"/editar"}>
            Editar Empleado
          </Link>
        </div>
      </nav>
      <br></br>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Listar></Listar>}></Route>
          <Route path="/crear" element={<Crear></Crear>}></Route>
          <Route path="/editar/:id" element={<Editar></Editar>}></Route>
          {/* <Route path="/editar/:id"  render={props => <Editar {...props} key={this.props.location.key} />} ></Route> */}
          <Route exact path="*" element={<>Error 404</>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
