import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { deletePPMProduct, 
         updatePPMProduct } from '../actions/actions';
import { WaitSpinner } from '../components/waitSpinner';


class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localProductID: '',
            localName: '',
            localPrice: '',
            localImageURL: ''
        }

        //bindings
        this.filterForThisProduct = this.filterForThisProduct.bind(this);
        this.handleInputDidChange = this.handleInputDidChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount () {

        //figure out what's in props
        console.log("Edit Products Props: ", this.props);
        let localProductForEdit = this.props.productList.find(this.filterForThisProduct);

        if (localProductForEdit !== undefined)
        {
            //populate state based on current product
            this.setState({
                localProductID: localProductForEdit.id,
                localName: localProductForEdit.name,
                localPrice: localProductForEdit.price,
                localImageURL: localProductForEdit.imageUrl
            })
        }
    } //end componentDidMount
    
    filterForThisProduct (productObject) {
        console.log("Entering filterForThisProduct");
        let localProductId = this.props.match.params.productId;
        console.log("Product Object ID is: " + productObject.id + " | Local Product ID is: ", localProductId);
        return productObject.id === localProductId ? true : false;
        //could also return do just; return productObject.id === localProductId
        //conversion of this: this.props.productList.find((productObject) => productObject.id === this.props.match.params.productId)
    }

    handleInputDidChange (event) {
        //console.log("Entering handleInputDidChange");
        let localInputChange = event.target.value;
        let localInputName = event.target.name;
        //console.log("handleInputDidChange for " + localInputName + " | Updated Value: " + localInputChange);
        this.setState({[localInputName]: localInputChange});
        //console.log("Leaving handleInputDidChange");
    }

    handleDeleteClick (localProductID) {
        console.log("Entering handleDeleteClick");
        
        //let localPath = this.props.match.path;
        //console.log(localPath);

        this.props.deleteProduct(localProductID);
        this.props.history.push("/Products");

        console.log("Leaving handleDeleteClick");
    }

    handleEditClick () {
        console.log("Entering handleEditClick");

        let localPath = this.props.match.path;
        console.log(localPath);

        //create updated product object to send to MockAPI
        let localProductObject = {
            id: this.state.localProductID,
            name: this.state.localName,
            price: this.state.localPrice,
            imageUrl: this.state.localImageURL
        }
        console.log("Updated Object to Send to MockAPI: ", localProductObject);

        //Call editProduct action to send the edit to MockAPI, 
        //  send the redirect down as a callback to redirect AFTER the edit
        //  has completed
        this.props.editProduct(localProductObject,
                                () => this.props.history.push("/Products"));

        console.log("Leaving handleEditClick");
    }

    priceValidation() {
        return this.state.localPrice.length < 1 ? false : true;
        //can also write as just: return this.state.localPrice.length
    }

    nameValidation() {
        return this.state.localName.length < 4 ? false : true;
        //can also write as just: this.state.localName.length < 4 
    }

    render() {
        //figure out what's in props
        //console.log("Edit Products Props: ", this.props);
        //let localProductForEdit = this.props.productList.find(this.filterForThisProduct);
        //console.log(this.localProductForEdit);

        //before attempting to populate state, make sure there is an actual product object
        if (this.state.localName.trim() === "" &&
            this.state.localImageURL.trim() === "")
        {
            return (
                <div>
                    <h3>No product with matching ID</h3>
                </div>
            ); 
        }

        //get local path for links
        let localPath = this.props.match.path;
        console.log(localPath);

        return (
            <div>
                { this.props.productUpdating ?
                    <WaitSpinner isWaiting={this.props.productUpdating} />
                :
                    <div className="row">
                        <h2>Edit Product</h2>
                        <div>
                            <div className="row">
                                <div className="columns small-3 padding-top-medium">Title:</div>
                                <div className="columns small-9 padding-top-medium md-text-field">
                                    <input type="text" placeholder="Title" name="localName" value={this.state.localName} onChange={this.handleInputDidChange} />
                                    <span className="error" style={this.nameValidation() ? {display: "none"} : {} }>Invalid entry - 4 character minimum</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="columns small-3 padding-top-medium">Price:</div>
                                <div className="columns small-9 padding-top-medium md-text-field">
                                    <input type="number" placeholder="Price" name="localPrice" value={this.state.localPrice} onChange={this.handleInputDidChange} />
                                    <span className="error" style={this.priceValidation() ? {display: "none"} : {} }>Invalid entry - price required</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="columns small-3 padding-top-medium">Image URL:</div>
                                <div className="columns small-9 padding-top-medium md-text-field">
                                    <input type="text" placeholder="Image URL" name="localImageURL" value={this.state.localImageURL} onChange={this.handleInputDidChange} />
                                </div>
                            </div>
                            <div>
                                <button onClick={() => this.handleDeleteClick(this.state.localProductID)} className="button btn-cta alert">Delete</button>&nbsp;&nbsp;&nbsp;<button onClick={() => this.handleEditClick()} className={"button btn-cta"}>Update</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        ); //end return
    } //end Render
} //end EditProduct class

const mapStateToProps = (state) => {
    return {
        productList: state.productList,
        productUpdating: state.ppmProductIsUpdating
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
        deleteProduct: (productId) => {
            dispatch(deletePPMProduct(productId));
        },
        editProduct: (productObject, someFunction) => {
            dispatch(updatePPMProduct(productObject, someFunction))
        }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);