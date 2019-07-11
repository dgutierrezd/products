import React, { Component } from 'react'
import Swal from 'sweetalert2'

// Redux
import {connect} from 'react-redux';
import {mostrarProducto, editarProducto} from '../actions/productosActions';

class EditarProducto extends Component {

    state = {  
        nombre: '',
        precio: '',
        error: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.mostrarProducto(id);
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {nombre, precio} = nextProps.producto;

        this.setState({
            nombre,
            precio
        })
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

    actualizarProducto = e => {
        e.preventDefault()

        const {nombre, precio} = this.state;

        if(nombre === '' || precio === '') {
            this.setState({
                error: true
            }) 
            return;
        } 
        this.setState({error: false}) 

        // Tomar el id
        const {id} = this.props.match.params;

        // Crear el objeto
        const infoProducto = {
            id,
            nombre,
            precio
        }
        
        // Actualizar el producto
        try {
            this.props.editarProducto(infoProducto);
            Swal.fire(
                'Saved!',
                'Your file has been saved.',
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

        const {nombre, precio} = this.state;

        return (  
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                {error}
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Editar Producto</h2>
                            <form id="create-form" onSubmit={this.actualizarProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input defaultValue={nombre} onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input defaultValue={precio} onChange={this.precioProducto} type="number" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// State
const mapStateToProps = state => ({
    producto: state.productos.producto
})
 
export default connect(mapStateToProps, {mostrarProducto, editarProducto})(EditarProducto);