import React, { Component } from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

//package imports
import { connect } from "react-redux";

//App Imports
import { createPPMProduct } from '../actions/actions';
import { WaitSpinner } from '../components/waitSpinner';

class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localName: '',
            localPrice: '',
            localImageURL: ''
        }

        //bindings
        this.handleInputDidChange = this.handleInputDidChange.bind(this);
    }


    handleInputDidChange (event) {
        //console.log("Entering handleInputDidChange");
        let localInputChange = event.target.value;
        let localInputName = event.target.name;
        //console.log("handleInputDidChange for " + localInputName + " | Updated Value: " + localInputChange);
        this.setState({[localInputName]: localInputChange});
        //console.log("Leaving handleInputDidChange");
    }

    handleCreateClick () {
        console.log("Entering handleCreateClick");

        //let localPath = this.props.match.path;
        //console.log(localPath);

        //create new product object to send to MockAPI
        let localProductObject = {
            name: this.state.localName,
            price: this.state.localPrice,
            imageUrl: this.state.localImageURL
        }
        console.log("New Products Object to Send to MockAPI: ", localProductObject);

        //Call createProduct action to send the add to MockAPI, 
        //  send the redirect down as a callback to redirect AFTER the add (POST)
        //  has completed
        this.props.createProduct(localProductObject,
                                 () => this.props.history.push("/Products"));

        console.log("Leaving handleCreateClick");
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
        //console.log("Create Products Props: ", this.props);

        //get local path for links
        //let localPath = this.props.match.path;
        //console.log(localPath);

        return (
            <div>
                { this.props.productCreationInProgress ?
                    <WaitSpinner isWaiting={this.props.productCreationInProgress} />
                :
                <div className="row">
                    <h2>Create New Product!</h2>
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
                            <button onClick={() => this.handleCreateClick()} className="button btn-cta success">Create</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        ); //end return
    } //end render
} //end class

const mapStateToProps = (state) => {
    return {
        productCreationInProgress: state.productCreationInProgress
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return {
        createProduct: (productObject, addRedirectFunction) => {
            dispatch(createPPMProduct(productObject, addRedirectFunction))
        }
      };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);