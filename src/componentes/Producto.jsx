import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {connect} from 'react-redux';
import {borrarProducto} from '../actions/productosActions';

class Producto extends Component {
    
    eliminarProducto = () => {
        const {id} = this.props.info;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                try {
                    this.props.borrarProducto(id);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
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
            }
          })
    }

    render() { 

        const {id, nombre, precio} = this.props.info;

        return (  
            <li className="list-group-item">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <p className="text-dark m-0">
                            {nombre}
                        </p>

                        <span className="badge badge-warning text-dark">$ {precio}</span>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end acciones">
                        <Link to={`/productos/editar/${id}`} className="btn btn-primary">Editar</Link>
                        <button onClick={this.eliminarProducto} type="button" className="btn btn-danger ml-2">Eliminar</button>
                    </div>
                </div>
            </li>
        );
    }
}
 
export default connect(null, {borrarProducto})(Producto);