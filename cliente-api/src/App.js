//import React from 'react' 
import { Fragment } from 'react';
// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/** Layout */
import Header from './Componentes/layout/Header'
import Navegacion from './Componentes/layout/Navegacion'

/** Componentes */
import Clientes from './Componentes/clientes/Clientes'
import Productos from './Componentes/productos/Productos'
import Pedidos from './Componentes/pedidos/Pedidos'

function App() {
  return (
    <Router>
      <Fragment>

        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Switch>
                <Route exact path = "/" component = {Clientes} />

                <Route exact path = "/productos" component = {Productos} />

                <Route exact path = "/pedidos" component = {Pedidos} />
            </Switch>
          </main>
        </div>

      </Fragment>
    </Router>
  )
}

export default App;
