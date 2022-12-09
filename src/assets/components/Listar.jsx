import React from "react";
import Api from "../services/Api";
import { Link } from "react-router-dom";

class Listar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    dataLoaded: false,
    empleados: [],
  };

  borrarRegistros = (id) => {
    fetch("http://localhost/empleados/?borrar=" + id)
      .then((Response) => Response.json())
      .then((dataResponse) => {
        this.cargarDatos();
      })
      .catch(console.log());
  };

  cargarDatos() {
    fetch(Api)
      .then((Response) => Response.json())
      .then((dataResponse) => {
        // console.log(dataResponse);
        this.setState({ dataLoaded: true, empleados: dataResponse });
      })
      .catch(console.log());
  }
  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { dataLoaded, empleados } = this.state;
    if (!dataLoaded) {
      return <div>Cargando...</div>;
    }
    return (
      <div className="card">
        <div className="card-header">
          <Link className="btn btn-success" to={"/crear"}>
            Crear Nuevo Empleado
          </Link>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.id}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.correo}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="">
                      <Link
                        className="btn btn-warning"
                        to={"/editar/" + empleado.id}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.borrarRegistros(empleado.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Listar;
