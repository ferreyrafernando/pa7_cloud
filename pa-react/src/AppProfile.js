import React, { Component } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';
import { userActions } from './_actions';

//const AppProfile = () => {
class AppProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            userName:''
        };

       

        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ expanded: !this.state.expanded });  

         
    }

    handleLogout(){
        this.props.logout();
    }

    componentDidMount(){
       if(typeof this.props.userLogged.data !== "undefined"){
            this.setState({ userName: this.props.userLogged.data.user_data.Nombre });  
       }
    }
  
    render(){

        return (
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/avatar_4.png" alt="Profile" />
                </div>
                
                <button className="p-link layout-profile-link" onClick={this.handleClick}>
                <span className="username">{this.state.userName}</span>
                    <i className="pi pi-fw pi-cog" />
                </button>
                <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={this.state.expanded} unmountOnExit>
                    <ul className={classNames({ 'layout-profile-expanded': this.state.expanded })}>
                        <li><button type="button" className="p-link"><i className="pi pi-fw pi-user" /><span>Account</span></button></li>
                        <li><button type="button" className="p-link"><i className="pi pi-fw pi-inbox" /><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                        <li><button type="button" onClick={this.handleLogout}  className="p-link"><i className="pi pi-fw pi-power-off" /><span>Logout</span></button></li>
                    </ul>
                </CSSTransition>
            </div>
        );
    }

}

function mapState(state) {
    //const { loggingIn } = state.authentication;
    return { loggingIn: state.authentication.loggingIn,
             userLogged: state.authentication.user
     };
}

const actionCreators = {
    logout: userActions.logout
}

const connectedAppProfile = connect(mapState, actionCreators)(AppProfile);
export { connectedAppProfile as AppProfile };
