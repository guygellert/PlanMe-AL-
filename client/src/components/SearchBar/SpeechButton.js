import { useState,useRef } from "react";
import {Search,Mic,MicOff} from '@mui/icons-material';
import {TextField,IconButton} from "@mui/material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./SpeechButton.css";
const SpeechButton = ({setSearchQuery}) => { 
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return (
        <div className="mircophone-container">
          Browser is not Support Speech Recognition.
        </div>
      );
    }
    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        resetTranscript();
        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US',

        });
      };
      const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
        setSearchQuery(transcript);
      };
      const handleReset = () => {
        stopHandle();
        resetTranscript();
      };
      
    return (
            <IconButton aria-label="speech" onClick={(isListening)?stopHandle:handleListing} ref={microphoneRef}>
                {!isListening && (<Mic style={{ fill: "blue" }} />) }
                {isListening && (<MicOff style={{ fill: "blue" }} />) }
            </IconButton>
  )
    }
export default SpeechButton