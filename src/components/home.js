import React from 'react';
import '../ui-toolkit/css/nm-cx/main.css';

export const Home = (props) => {

    console.log("Entering View Products - props: ", props); //debug

    return (
            <div>                
                <h1>Home Page</h1>
                <p>Welcome to the exciting Porfolio Product Management System!  Here we can Management
                    a set of product.  Here you can create new products, remove old products or edit 
                    current products.
                </p>
            </div>
    );
}