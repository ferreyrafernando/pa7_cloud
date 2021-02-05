import ReactDOM from 'react-dom';

import React, { Component } from 'react';
//import Login from '../_components/propios/auth/Login';

import Login from '../_components/propios/auth/LoginPage'

import Dictaphone from '../_components/propios/Dictaphone';

//export const EmptyPage = () => {
export  class EmptyPage extends Component {  
    
    constructor(props) {
        super(props);


    }



    render() {
       

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h2>Empty Page</h2>
                    <p></p>
                    <Dictaphone />
             
                </div>
            </div>
        </div>
    )
   };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<EmptyPage />, rootElement);