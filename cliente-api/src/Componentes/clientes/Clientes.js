import React, { useEffect, useState, Fragment } from 'react'

import clienteAxios from '../../Config/axios'

const Clientes  = () => {

    const [clientes, guardarClientes] = useState([])

    const consultarAPI = async () => {
        console.log('Consultando ... ');
        const clientesConsulta = await clienteAxios.get('/clientes')

        console.log(clientesConsulta.data );

        guardarClientes(clientesConsulta.data)
    }

    useEffect ( () => {
        consultarAPI()
    },[])

    return(
        <Fragment>
                <h2>Clientes</h2>
                <ul className="listado-clientes">
                    {clientes.map(cliente => {
                        console.log(cliente);
                    })} 
                </ul>
        </Fragment>
    
    )
}

export default Clientes