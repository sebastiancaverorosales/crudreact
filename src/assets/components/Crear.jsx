import React from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
class Crear extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = { 
    nombre: "", 
    correo: "",
    errores:[]
  };

  checkError(element){
    return this.state.errores.indexOf(element) !== 1;
  }

  sendData = (e) => {
    const { nombre, correo } = this.state;
    e.preventDefault();

    var errores=[];

    // VALIDANDP ESPACIOS
    if (!nombre)errores.push("error_nombre");
    if (!correo)errores.push("error_correo");
    this.setState({errores:errores});
    if (errores.length>0)return false;


    var dataSend = { nombre: nombre, correo: correo };
    
    fetch(Api+"?insertar=1", {
      method: "POST",
      body: JSON.stringify(dataSend)
    })
      .then(Response => Response.json())
      .then((dataResponse) => {
        window.location.href="/";
      })
      .catch(console.log())
  };
  changeValue = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, errores:[] });
  };
  render() {
    const { nombre, correo } = this.state;

    return (
      <div className="card">
        <div className="card-header">EMPLEADOS</div>
        <div className="card-body">
          <form onSubmit={this.sendData}>
            <div className="form-group">
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={this.changeValue}
                value={nombre}
                className={((this.checkError("error_nombre"))?"is-valid ":"")+"form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
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
                value={correo}
                className={((this.checkError("error_correo"))?"is-valid ":"")+"form-control"}
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el correo del empleado.
              </small>
            </div>
            <br />
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar Nuevo Empleado
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

export default Crear;
