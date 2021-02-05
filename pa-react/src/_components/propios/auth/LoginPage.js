import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { connect } from 'react-redux';
import { userActions } from '../../../_actions';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            empresa: null,
            submitted: false
        };

        this.empresas = [
            {name: 'AutoCervo', code: 1},
            {name: 'Car Group', code: 2},
            {name: 'AutoNet', code: 3},
            {name: 'RB', code: 4}
        ];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, empresa } = this.state;
        if (username && password && empresa) {
            this.props.login(username, password, empresa);
        }
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, empresa, submitted } = this.state;
   
    return (
   
        
            <div className="p-grid p-justify-center ">
            <div className="p-grid p-align-center vertical-container" style={{height:'500px'}}> 
            

                <Panel header="Login" style={{width:'450px'}} className="p-ac-center">

                <div className="p-field p-grid">
                    <label htmlFor="username" className="p-col-fixed" style={{width:'100px'}}>Usuario</label>
                    <div className="p-col" >
                        <InputText id="username" name="username" value={username} onChange={this.handleChange} style={{width:'200px'}} type="text" placeholder="Usuario" />
                        {submitted && !username &&
                            <div className="help-block">Nombre de Usuario Requerido</div>
                        }
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="password" className="p-col-fixed" style={{width:'100px'}}>Contraseña</label>
                    <div className="p-col">
                    <InputText id="password" type="text" name="password" value={password} onChange={this.handleChange}  style={{width:'200px'}} placeholder="Contraseña"/>
                    {submitted && !password &&
                            <div className="help-block">Contraseña Requerida</div>
                        }
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="cboEmpresa" className="p-col-fixed" style={{width:'100px'}}>Empresa</label>
                    <div className="p-col">
                    <Dropdown id="cboEmpresa" style={{width:'200px'}}  name="empresa" value={empresa} onChange={this.handleChange}  options={this.empresas}  optionLabel="name" placeholder="Empresa" />
                    {submitted && !empresa &&
                            <div className="help-block">Empresa Requerida</div>
                        }
                    </div>
                </div>
                <div className="p-d-flex p-jc-between">
                    <Button label="Login" onClick={this.handleSubmit} icon="pi pi-check" style={{marginRight: '.25em'}}/>
                    <Button label="Cancelar" icon="pi pi-times" className="p-ml-auto p-button-secondary"/>
                </div>
               
                </Panel>
                </div>
            </div>
        )
    }

}


function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
