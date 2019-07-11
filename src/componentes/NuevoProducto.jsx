import React, { Component } from 'react'
import Swal from 'sweetalert2'

// Redux
import {connect} from 'react-redux';
import {agregarProducto} from '../actions/productosActions';

class NuevoProducto extends Component {

    state = {  
        nombre: '',
        precio: '',
        error: false
    }

    nombreProducto = e => {
        this.setState({
            nombre: e.target.value
        })
    }

    precioProducto = e => {
        this.setState({
            precio: e.target.value
        })
    }

    nuevoProducto = e => {
        e.preventDefault()

        const {nombre, precio} = this.state;

        if(nombre === '' || precio === '') {
            this.setState({
                error: true
            }) 
            return;
        } 
        this.setState({error: false}) 

        // Crear el objeto
        const infoProducto = {
            nombre,
            precio
        }
        
        // Crear el nuevo producto
        try {
            this.props.agregarProducto(infoProducto);
            document.getElementById('create-form').reset();
            Swal.fire(
                'Created!',
                'Your file has been created.',
                'success'
            )
        } catch (error) {
            console.log(error)
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        }

        // Redireccionar
    }
    
    render() { 

        let error = '';

        (this.state.error) ? error = <div class="alert alert-danger" role="alert">
                                        Debes llenar todos los campos.
                                    </div>
        : error = null;

        return (  
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                {error}
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form id="create-form" onSubmit={this.nuevoProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input onChange={this.precioProducto} type="number" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default connect(null, {agregarProducto})(NuevoProducto);