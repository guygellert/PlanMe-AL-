import { useState,useRef } from "react";
import {Search,Mic,MicOff} from '@mui/icons-material';
import {TextField,IconButton} from "@mui/material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./SpeechButton.css";

interface SearchButtonProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SpeechButton:React.FC<SearchButtonProps> = ({setSearchQuery}) => { 
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef<HTMLButtonElement>(null);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return (
        <div className="mircophone-container">
          Browser is not Support Speech Recognition.
        </div>
      );
    }
    const handleListing = () => {
      if(!microphoneRef.current?.classList)
       return; 
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        resetTranscript();
        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US',

        });
      };

      const stopHandle = () => {
        if(!microphoneRef.current?.classList)
        return; 
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
        setSearchQuery(transcript);
      };

      const handleReset = () => {
        stopHandle();
        resetTranscript();
      };

      const onClick = () => {
        if(isListening){
          stopHandle();
        } else {
          handleListing();
        }
      }
      
    return (
            <IconButton aria-label="speech" onClick={onClick} ref={microphoneRef}>
                {!isListening && (<Mic style={{ fill: "blue" }} />) }
                {isListening && (<MicOff style={{ fill: "blue" }} />) }
            </IconButton>
  )
    }
export default SpeechButton