import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";
import { 
    Link
    } from 'react-router-dom';

//App imports
import { getPPMProducts, 
         deletePPMProduct } from '../actions/actions';
import { WaitSpinner } from '../components/waitSpinner';


class ProductList extends Component {
    constructor(props) {
        super(props);

        this.mapProductObjectForDisplay = this.mapProductObjectForDisplay.bind(this);
    }

    componentDidMount() {
        console.log("Entering componentDidMount"); //debug
        this.props.loadProductsList();
        console.log("Leaving componentDidMount"); //debug
    }

    mapProductObjectForDisplay = (productObject, arrayIndex) => {
        let localPath = this.props.match.path;

        return (
            <div className="card" style={{width: "300px", margin: "10px", display: "inline-block"}} key={"productItem" + arrayIndex}>
                <div>
                    {   //if the image field contains HTTP, display the image, otherwise dispaly placeholder
                        productObject.imageUrl.includes("http") ? 
                        <img alt={productObject.name + " image"} src={productObject.imageUrl} ></img> : 
                        <img alt={productObject.name + " image"} src="https://via.placeholder.com/218x218.jpg"></img>
                    }
                </div>
                <h3>{productObject.name}</h3>
                <p>${productObject.price}</p>
                <div>
                    <div><Link to={localPath + "/edit/" + productObject.id}><button className="button btn-cta expand">Edit</button></Link></div>
                    <div><button onClick={() => this.props.deleteProduct(productObject.id)} className="button btn-cta expand alert">Delete</button></div>
                </div>
            </div>
        );
    } //end of mapProductObjectForDisplay

    render() {

        //console.log("Entering Users - props: ", props); //debug
        console.log("Create ProductsList Props: ", this.props);
        let localPath = this.props.match.path;
        console.log(localPath);

        return (
            <div>
                <div className="row">
                    <h2>Product List</h2>
                    { this.props.productsAreLoading ?
                        <WaitSpinner isWaiting={this.props.productsAreLoading} />
                    :
                        <div>{this.props.listOfProducts.map(this.mapProductObjectForDisplay)}</div>
                    }
                </div>
            </div>
        ); //end return
    } //end render
} //end class

const mapStateToProps = (state) => {
    return {
        listOfProducts: state.productList,
        productsAreLoading: state.productListLoadInProgress
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
        loadProductsList: () => {
              dispatch(getPPMProducts());
        },
        deleteProduct: (productId) => {
            dispatch(deletePPMProduct(productId))
        }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);