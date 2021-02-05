import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Route, Redirect } from "react-router-dom";

const Dictaphone = () => {
  const [message, setMessage] = useState('')

  const [module, setModule] = useState(null)

  const redirectModule = (moduleName) => {
    setMessage(`Redirigiendo al módulo: ${moduleName}`)

    if (audioFinish){
        
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
    <Route >
        <Redirect exact to={module} />
    </Route>
    )
  }

  return (
    <div>
        <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone