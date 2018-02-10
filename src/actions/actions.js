//package imports
import axios from 'axios';

//App imports
import {CREATE_PPM_STORE_ITEM, 
        UPDATE_PPM_STORE_ITEM,
        DELETE_PPM_STORE_ITEM,
        DISPLAY_ALL_PRODUCTS, 
        PPM_PRODUCT_IS_UPDATING,
        PPM_PRODUCT_LIST_LOADING, 
        CREATING_PPM_PRODUCT } from '../actions/types';

export function createPPMStoreItem(productObject) {

    return {
        type: CREATE_PPM_STORE_ITEM,
        payload: productObject
    }
}

export function updatePPMStoreItem(productObject) {

    return {
        type: UPDATE_PPM_STORE_ITEM,
        payload: productObject
    }
}

export function deletePPMStoreItem(productList) {
    
    return {
        type: DELETE_PPM_STORE_ITEM,
        payload: productList
    }
}

export function showAllProducts(productList) {
    //Send updated 
    return {
        type: DISPLAY_ALL_PRODUCTS,
        payload: productList
    }
}

export function loadingPPMProducts(productsAreLoading) {
    return {
        type: PPM_PRODUCT_LIST_LOADING,
        payload: productsAreLoading
    }
}

export function getPPMProducts(waitCallBackFunction, redirectCallBackFunction) {
    console.log("Entering getPPMProducts");
    return (dispatch) => {
        //send dispatch to store to let store know we're loading
        dispatch(loadingPPMProducts(true)); 

        //make axios call to get a list of ghibli people
        axios.get('http://5a7c96504c1e2d00124a5e3a.mockapi.io/Product')
            .then((response) => {
                console.log("getPPMProducts response: ", response);

                //update data in store with the fresh Product list
                dispatch(showAllProducts(response.data));
                
                //let store know we got the data back (hide wait spinner)
                dispatch(loadingPPMProducts(false));                 
            })
            .catch((error) => {
                console.log(error);
                //getGhibliPeopleError(true);
            })
    } //end return
} //end getPPMProducts 

export function deletePPMProduct(productId) {
    console.log("Entering deletePPMProduct - Product ID: " + productId);
    return (dispatch) => {

        //make axios call to delete the product with the supplied ID
        axios.delete('http://5a7c96504c1e2d00124a5e3a.mockapi.io/Product/' + productId)
            .then((response) => {
                console.log("deletePPMProduct response: ", response);

                //make call to get the updated list of products
                dispatch(getPPMProducts());
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export function updatingPPMProduct(isProductUpdating) {
    return {
        type: PPM_PRODUCT_IS_UPDATING,
        payload: isProductUpdating
    }
}

export function updatePPMProduct(productObject, redirectFunction) {
    console.log("Entering updatePPMProduct - Product Object: ", productObject);
    return (dispatch) => {
        //send dispatch to store to let store know we're loading
        dispatch(updatingPPMProduct(true)); //<-- This is used to flip the flag to show the spinner on the Edit page

        //make axios call to update the product
        axios.put('http://5a7c96504c1e2d00124a5e3a.mockapi.io/Product/' + productObject.id, productObject)
            .then((response) => {
                console.log("updatePPMProduct response: ", response);

                //get new/fresh data to display to product list
                getPPMProducts();

                //product created, let store know we have the data
                dispatch(updatingPPMProduct(false)); //<-- This is used to flip the flag to show the spinner on the Edit page

                //execute redirect call back function to take user back to the product list page
                redirectFunction();
                
            })
            .catch((error) => {
                console.log(error);
            })
    } //end return
}//end updatePPMProduct

export function addingPPMProduct(productCreationInProgress) {
    return {
        type: CREATING_PPM_PRODUCT,
        payload: productCreationInProgress
    }
}

export function createPPMProduct(productObject, redirectFunction) {
    console.log("Entering updatePPMProduct - Product Object: ", productObject);
    return (dispatch) => {
        //send dispatch to store to let store know we're loading
        dispatch(addingPPMProduct(true)); //<-- This is used to flip the flag to show the spinner on the Add page

        //make axios call to create a new product
        axios.post('http://5a7c96504c1e2d00124a5e3a.mockapi.io/Product/', productObject)
            .then((response) => {
                console.log("createPPMProduct response: ", response);

                //get new/fresh data to display to product list
                getPPMProducts();

                //product created, let store know we have the data
                dispatch(addingPPMProduct(false)); //<-- This is used to flip the flag to hide the spinner on the Add page

                //invoke redirect function now that the Add has completed
                redirectFunction();
                
            })
            .catch((error) => {
                console.log(error);
            })
    } //end return
}//end createPPMProduct


/// can export functions at the bottom
// export {names of functions, func 1, func 2}
