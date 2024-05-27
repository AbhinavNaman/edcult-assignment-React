// src/components/ChatInput.jsx
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"


const ChatInput = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState("");



  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
 useEffect(() => {
    if (transcript) {
        setText(transcript);
      console.log("Transcript:", transcript);
    }
  }, [transcript]);
const submitFunction =()=> {
    fetch('https://edcult-assignment-backend.onrender.com/api/send-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text}),
  })
  .then(response => response.text())
  .then(data => {
    console.log('Response from server:', data);
    setData(data);
  })
  .catch(error => {
    console.error('Error:', error);
    setData(error)
  });
}


  return (
    <div className="flex flex-col h-full gap-4">
    <div
      className="chat-input-container border-2 p-4 border-b-2 rounded-xl flex flex-col "
      style={{
        borderBottomColor: "rgb(14 165 233)",
        borderWidth: "2px",
        borderTopColor: "current",
        borderLeftColor: "current",
        borderRightColor: "current",
      }}
    >
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={text}
          onChange={(e)=> {setText(e.target.value)}}
          className="w-full"
          style={{ border: "none", outline: "none" }}
        />
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" onClick={()=>{setText(""); setText("")}}><img src='/reset.png' alt="sent" style={{width:'20px'}}/></Button>
        <Button variant="ghost"><img src='/image.png' alt="sent" style={{width:'20px'}}/></Button>
        {/* <button className="px-4">🎤</button> */}



        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost"><img src='/mic.png' alt="sent" style={{width:'20px'}}/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Click start to speak </AlertDialogTitle>
          <AlertDialogDescription>
            {text}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <Button variant="ghost">{listening ? <img src='/on.png' alt="sent" style={{width:'20px'}}/> : <img src='/off.png' alt="sent" style={{width:'20px'}}/>}</Button>
          <Button onClick={SpeechRecognition.startListening} variant="ghost"><img src='/play.png' alt="sent" style={{width:'20px'}}/></Button>
          <Button onClick={SpeechRecognition.stopListening} variant="ghost"><img src='/stop.png' alt="sent" style={{width:'20px'}}/></Button>
          <Button onClick={() => { resetTranscript(); setText(''); }} variant="ghost"><img src='/reset.png' alt="sent" style={{width:'20px'}}/></Button>

          <AlertDialogCancel><img src='/close.png' alt="sent" style={{width:'20px'}}/></AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>





        <Button onClick={submitFunction} variant="ghost"><img src='/send.png' alt="sent" style={{width:'20px'}}/></Button>

      </div>
    </div>
   
    <Alert className='bg-sky-200 border-2 border-sky-500'>
  <AlertTitle>Response:</AlertTitle>
  <AlertDescription>
  {data && <p>{data}</p>}
  </AlertDescription>
</Alert>

    </div>
  );
};

export default ChatInput;
