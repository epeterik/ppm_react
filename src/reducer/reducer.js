//App imports
import {CREATE_PPM_STORE_ITEM, 
        UPDATE_PPM_STORE_ITEM,
        DELETE_PPM_STORE_ITEM,
        DISPLAY_ALL_PRODUCTS, 
        PPM_PRODUCT_IS_UPDATING,
        PPM_PRODUCT_LIST_LOADING, 
        CREATING_PPM_PRODUCT } from '../actions/types';

//reducer 
export const reducer = (state, action) => {

console.log("in reducer"); //debug

    switch(action.type) {
    case CREATE_PPM_STORE_ITEM:
        console.log("reducer - CREATE_PPM_STORE_ITEM"); //debug
        return state;
    //break;
    case UPDATE_PPM_STORE_ITEM: 
        console.log("reducer - UPDATE_PPM_STORE_ITEM"); //debug
        return state;
        //break;
    case DELETE_PPM_STORE_ITEM: 
        console.log("reducer - DELETE_PPM_STORE_ITEM"); //debug
        state = { ...state, 
            productList: action.payload }
        return state;
    case DISPLAY_ALL_PRODUCTS: 
        console.log("reducer - DISPLAY_ALL_PRODUCTS"); //debug
        state = { ...state, 
                productList: action.payload }
        return state;
    case PPM_PRODUCT_IS_UPDATING: 
        console.log("reducer - PPM_PRODUCT_IS_UPDATING")
        state = {...state, 
                ppmProductIsUpdating: action.payload}
        return state;
    case CREATING_PPM_PRODUCT: 
        console.log("reducer - CREATING_PPM_PRODUCT")
        state = {...state, 
                 productCreationInProgress: action.payload}
        return state;
    case PPM_PRODUCT_LIST_LOADING: 
        console.log("reducer - PPM_PRODUCT_LIST_LOADING")
        state = {...state, 
                 productListLoadInProgress: action.payload}
        return state;
    //break;
    default: //should always have - code first - should always return current state
        console.log("reducer - default"); //debug
        return state;
    }//end switch

}// end PPM reducer

//only exporting one element as the default element
export default reducer;