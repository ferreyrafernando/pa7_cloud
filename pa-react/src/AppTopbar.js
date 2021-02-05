import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Route, Redirect } from "react-router-dom";

export const AppTopbar = (props) => {

    const [message, setMessage] = useState('')

    const [module, setModule] = useState(null)
  
    const redirectModule = (moduleName) => {
      setMessage(`Redirigiendo al módulo: ${moduleName}`)
  
      if (audioFinish){
          console.log(moduleName);
          setModule(`/${moduleName}`)
      }
      
    }
  
    const audioFinish = () => {
      SpeechRecognition.onaudioend = function() { 
          return true; 
        };
    }

    const commands = [
        {
          command: 'Quiero pedir *',
          callback: (food) => setMessage(`Your order is for: ${food}`)
        },
        {
          command: 'El clima está :condition hoy',
          callback: (condition) => setMessage(`Hoy, el clima está ${condition}`)
        },
        {
          command: 'Mi nombre es * ',
          callback: (name1) => setMessage(`Nombre: ${name1}`)
        },
        {
          command: 'Pass the salt (please)',
          callback: () => setMessage('My pleasure')
        },
        {
          command: 'Hola',
          callback: () => setMessage('Hi there!'),
          matchInterim: true
        },
    
        {
            command: 'Nombre de usuario *',
            callback: (username) => setMessage(`Hi there! ${username}`),
            matchInterim: true
          },
    
        {
            command: 'Ir al módulo :moduleDetected',
            callback: (moduleDetected) => redirectModule(moduleDetected) ,
      
            matchInterim: false
        },
    
        {
          command: 'Beijing',
          callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
          // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
          isFuzzyMatch: true,
          fuzzyMatchingThreshold: 0.2
        },
        {
          command: 'clear',
          callback: ({ resetTranscript }) => resetTranscript()
        }
      ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    if (module) {
        return (
  
        <Redirect push to={module} exact />
        )
    }

    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">
                <span className="layout-topbar-search">
                    <InputText type="text" value={transcript} placeholder="Search" />
                    <span className="layout-topbar-search-icon pi pi-search" />
                </span>
                <button type="button" className="p-link" onClick={SpeechRecognition.startListening}>
                    <span className="layout-topbar-item-text">Voice</span>
                    <span className="layout-topbar-icon pi pi-comment" />
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Events</span>
                    <span className="layout-topbar-icon pi pi-calendar" />
                    <span className="layout-topbar-badge">5</span>
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon pi pi-cog" />
                </button>
                <button type="button" className="p-link">
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-user" />
                </button>
            </div>
        </div>
    );
}
