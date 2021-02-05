import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Button } from 'primereact/button';

export default class FooterButtons extends Component {

    
    render() {
        
        const buttons = this.props.btns || [];

        return (
            
            <div className="p-d-flex p-p-3">

               {buttons.map((button, key) => {
                   return  <Button label={button.label} icon={button.icon} disabled={button.disabled} className={button.className} iconPos="right" />
               })} 

                
           </div>
        )
    };
}

                
const rootElement = document.getElementById("root");
ReactDOM.render(<FooterButtons />, rootElement);