import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header.js";
import { FaTrash } from 'react-icons/fa';
import MicRecorder from 'mic-recorder-to-mp3';
import "./Playback.css"
import "../index.css"
import Visualizer from './Visualizer';

const Mp3Recorder = new MicRecorder({ bitRate: 320 });

const Playback = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [blobURL, setBlobURL] = useState('');
    const audioRef = useRef(null);
    const [audioData, setAudioData] = useState(new Array(100).fill(0).map(() => Math.random() * 255));
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setAudioData(prevData => prevData.map(() => Math.random() * 255));
        }, 100); // Updates every 100ms for demonstration
    
        return () => clearInterval(interval); // Cleanup
    }, []);

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

    // const playAudio = () => {
    //     audioRef.current.play();
    // };

    // const pauseAudio = () => {
    //     audioRef.current.pause();
    //     setIsPaused(true);
    // };

    // const resumeAudio = () => {
    //     audioRef.current.play();
    //     setIsPaused(false);
    // };

    const deleteAudio = () => {
        setBlobURL('');
    };

    const sendAudioToServer = async () => {
        if (!blobURL) {
            console.error("No audio to send");
            return;
        }
    
        const formData = new FormData();
        formData.append('filename', 'YOUR_ORIGINAL_PDF_NAME.pdf'); // Replace with your PDF filename
        formData.append('mp3', blobURL, 'recorded_audio.mp3');
    
        try {
            const response = await fetch('http://localhost:8000/api/recording/', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Server Response:', data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    return (
        <div>
            <Header />
            <div className="center-container">

                {/* Audio visualizer */}
                {/* <div className="visualizer" style={{ width: `${isRecording ? '100%' : '0%'}`, transition: 'width 0.3s' }} /> */}
                {/* <Visualizer audioData={audioData} /> */}

                {/* Record button */}
                {/* <button className={`record-button ${isRecording ? 'active' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? '' : ''}
                </button> */}

                <div className="control-buttons">                    
                    <button className={`record-button ${isRecording ? 'active' : ''}`} onClick={isRecording ? stopRecording : startRecording}></button>
                    <button onClick={deleteAudio}><FaTrash /></button>
                    
                    {/* {!isPaused ? (
                        <button onClick={pauseAudio}><FaPause /></button>
                    ) : (
                        <button onClick={resumeAudio}><FaPlay /></button>
                    )} */}
                </div>
                <br/><br/>
                <div className="audio-container">
                    <div className="spacer"></div>
                    {blobURL && <audio ref={audioRef} src={blobURL} controls style={{ width: '100%' }} />}
                    <div className="spacer"></div>
                </div>
                <br/><br/><br/>
                <Link 
                    className="main-button" 
                    onClick={async (e) => {
                        e.preventDefault(); 
                        await sendAudioToServer();
                        navigate("/Results");
                    }}
                >
                Next
                </Link>
            </div>
            <Link to="/Pages" className="back-button">&lt;</Link>
        </div>
    );
};

export default Playback;