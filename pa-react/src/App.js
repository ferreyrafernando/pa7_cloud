import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


import { connect } from 'react-redux';
import { store } from "./_helpers/store";

import { itemsMenuOperaciones } from "./_helpers/jsondata/side-menu/operaciones-menu"; 
import { itemsMenuMora } from "./_helpers/jsondata/side-menu/mora-menu"; 
import { itemsMenuMesaPlanes } from "./_helpers/jsondata/side-menu/mesa-planes";

import { itemsMenuContabilidad } from "./_helpers/jsondata/side-menu/contabilidad-menu"; 
import { itemsMenuDatosGenerales } from "./_helpers/jsondata/side-menu/datos-generales-menu"; 
import { itemsMenuUsados } from "./_helpers/jsondata/side-menu/usados-menu"; 


import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';


import { LoginPage } from './_components/propios/auth/LoginPage';

import { Dashboard } from './_components/Dashboard';
import { ButtonDemo } from './_components/ButtonDemo';
import { ChartDemo } from './_components/ChartDemo';
import { Documentation } from './_components/Documentation';
import { FileDemo } from './_components/FileDemo';
import { FloatLabelDemo } from './_components/FloatLabelDemo';
import { FormLayoutDemo } from './_components/FormLayoutDemo';
import { InputDemo } from './_components/InputDemo';
import { ListDemo } from './_components/ListDemo';
import { MenuDemo } from './_components/MenuDemo';
import { MessagesDemo } from './_components/MessagesDemo';
import { MiscDemo } from './_components/MiscDemo';
import { OverlayDemo } from './_components/OverlayDemo';
import { PanelDemo } from './_components/PanelDemo';
import { TableDemo } from './_components/TableDemo';
import { TreeDemo } from './_components/TreeDemo';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';
import { Vendedores } from './pages/Vendedores';
import { GridPage } from './pages/GridPage';

import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { GridDemo } from './utilities/GridDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';

import PrimeReact from 'primereact/utils';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';

const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();
    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

   let menuIt = [];

    const sideMenuItems = menuIt.concat(itemsMenuOperaciones, itemsMenuMesaPlanes, 
        itemsMenuMora, itemsMenuContabilidad, itemsMenuUsados, itemsMenuDatosGenerales);

    
    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }

        return true;
    }

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });

    const authStore = store.getState();
   

    if (!authStore.authentication.loggedIn) {
        return(<div><LoginPage /></div>);
    } else {
        return (
            
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenu={onToggleMenu} />

                <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                    <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo">
                            <img alt="Logo" src={logo} />
                        </div>
                        <AppProfile />
                        <AppMenu model={sideMenuItems} onMenuItemClick={onMenuItemClick} />
                    </div>
                </CSSTransition>

                <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                    layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />



                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} /> 
                    <Route path="/formlayout" component={FormLayoutDemo} />
                    <Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/file" component={FileDemo} />
                    <Route path="/chart" component={ChartDemo} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/display" component={DisplayDemo} />
                    <Route path="/elevation" component={ElevationDemo} />
                    <Route path="/flexbox" component={FlexBoxDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/grid" component={GridDemo} />
                    <Route path="/spacing" component={SpacingDemo} />
                    <Route path="/typography" component={TypographyDemo} />
                    <Route path="/text" component={TextDemo} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/vendedores" component={Vendedores} />
                    <Route path="/gridpage" component={GridPage} />
                    <Route path="/documentation" component={Documentation} />
                </div>

                <AppFooter />

            </div>
            
        );
    }
}

const mapSateToProps = state => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapSateToProps)(App);
