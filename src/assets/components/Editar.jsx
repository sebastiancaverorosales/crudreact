import React from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
class Editar extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }
  state = { dataLoaded: false, empleado: [] };

  changeValue = (e) => {
    const state = this.state.empleado;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };
  componentDidMount() {
    var id = window.location.href;
    id = id.substring(29);
    fetch(Api + "?consultar=" + id)
      .then((Response) => Response.json())
      .then((dataResponse) => {
        // console.log(dataResponse);
        this.setState({ dataLoaded: true, empleado: dataResponse[0] });
      })
      .catch(console.log());
  }

  sendData = (e) => {
    e.preventDefault();
    const { id, nombre, correo } = this.state.empleado;
    var dataSend = { id: id, nombre: nombre, correo: correo };
    fetch(Api + "?actualizar=1", {
      method: "POST",
      body: JSON.stringify(dataSend),
    })
      .then((Response) => Response.json())
      .then((dataResponse) => {
        window.location.href = "/";
      })
      .catch(console.log());
  };

  render() {
    const { dataLoaded, empleado } = this.state;
    if (!dataLoaded) {
      return <div>Cargando...</div>;
    }
    return (
      <div className="card">
        <div className="card-header">Editar Empleado</div>
        <div className="card-body">
          <form onSubmit={this.sendData}>
            <div className="form-group">
              <label htmlFor=""></label>
              <input
                type="text"
                value={empleado.id}
                readOnly
                className="form-control"
                name="id"
                id="id"
                aria-describedby="helpId"
                placeholder=""
              />
              <small id="helpId" className="form-text text-muted">
                Clave
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.changeValue}
                value={empleado.nombre}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el nombre del empleado.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="">Correo</label>
              <input
                type="text"
                name="correo"
                id="correo"
                onChange={this.changeValue}
                value={empleado.correo}
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="text-muted">
                Escribe el correo del empleado.
              </small>
            </div>
            <br />
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Editar Empleado
              </button>
              <Link to={"/"} className="btn btn-danger">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Editar;
