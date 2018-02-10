import React, { Component } from 'react';

//custom css imports
import './ui-toolkit/css/nm-cx/main.css';
import './custom.css';

//package imports
import { 
  BrowserRouter,
  Route
  } from 'react-router-dom';

  import { Home } from "./components/home";
  import ProductList from "./containers/productList";
  import CreateProduct from "./containers/createProduct";
  import { NavigationBar } from './components/navBar';
  import EditProduct from './containers/editProduct';

  class App extends Component {
    render() {
      return (
        <BrowserRouter>
          <div className="bg-off-white padding-medium">
            <h1 className="padding-bottom-medium">PPM - Project Product Management</h1>
            <NavigationBar />
            <div className="card padding-medium">
              <Route exact path='/' component={ Home } />
              <Route exact path='/products' component={ ProductList } />
              <Route exact path='/products/new' component={ CreateProduct } />
              <Route exact path='/products/edit/:productId' component={ EditProduct } />
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }

export default App;
