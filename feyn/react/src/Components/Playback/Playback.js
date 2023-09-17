import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js";
import { FaPlay, FaPause, FaTrash } from 'react-icons/fa';
import MicRecorder from 'mic-recorder-to-mp3';
import "./Playback.css"
import "../index.css"

const Mp3Recorder = new MicRecorder({ bitRate: 500 });

const Playback = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const audioRef = useRef(null);

    const startRecording = () => {
        Mp3Recorder.start().then(() => {
            setIsRecording(true);
        }).catch((e) => console.error(e));
    }

    const stopRecording = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                setBlobURL(blobURL);
                setIsRecording(false);
            }).catch((e) => console.error(e));
    };

    const playAudio = () => {
        audioRef.current.play();
    };

    const pauseAudio = () => {
        audioRef.current.pause();
        setIsPaused(true);
    };

    const resumeAudio = () => {
        audioRef.current.play();
        setIsPaused(false);
    };

    const deleteAudio = () => {
        setBlobURL('');
    };

    return (
        <div>
            <Header />
            <div className="center-container">

                {/* Audio visualizer */}
                <div className="visualizer" style={{ width: `${isRecording ? '100%' : '0%'}`, transition: 'width 0.3s' }} />

                {/* Record button */}
                {/* <button className={`record-button ${isRecording ? 'active' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? '' : ''}
                </button> */}

                <div className="control-buttons">
                    <button onClick={deleteAudio}><FaTrash /></button>
                    
                    <button className={`record-button ${isRecording ? 'active' : ''}`} onClick={isRecording ? stopRecording : startRecording}></button>
                    
                    {!isPaused ? (
                        <button onClick={pauseAudio}><FaPause /></button>
                    ) : (
                        <button onClick={resumeAudio}><FaPlay /></button>
                    )}
                </div>

                {blobURL && <audio ref={audioRef} src={blobURL} controls={false} style={{ width: '100%' }} />}
                <br/><br/><br/>
                <Link to="/Results" className="main-button">Next</Link>
            </div>
            <Link to="/Pages" className="back-button">&lt;</Link>
        </div>
    );
};

export default Playback;