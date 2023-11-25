import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import { FaTrash } from 'react-icons/fa';
import MicRecorder from 'mic-recorder-to-mp3';
import "./Playback.css"
import "../index.css"

const Mp3Recorder = new MicRecorder({ bitRate: 320 });
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Playback = () => {
    const [isRecording, setIsRecording] = useState(false);
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

    const deleteAudio = () => {
        setBlobURL('');
    };

    const sendAudioToServer = async () => {
        if (!blobURL) {
            console.error("No audio to send");
            return;
        }

        // Convert the blobURL to a blob
        const audioBlob = await fetch(blobURL).then(r => r.blob());

        const formData = new FormData();
        // formData.append('audio', audioBlob, `$(sessionId).mp3`);
        formData.append('file', audioBlob);

        // DEBUG: update sessionId to be dynamic
        const SESSION_ID = 'matcha'
        formData.append('sessionId', SESSION_ID)

        try {
            const response = await fetch(`${API_ENDPOINT}/api/recording/`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Server Response:', data);

            // Navigate to the results page or handle the server response
            navigate("/Results", { state: { serverResponse: data } });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };


    return (
        <div>
            <Header />
            <div className="center-container">
                <div className="control-buttons">
                    <button className={`record-button ${isRecording ? 'active' : ''}`} onClick={isRecording ? stopRecording : startRecording}></button>
                    <button onClick={deleteAudio}><FaTrash /></button>
                </div>
                <br/><br/>
                <div className="audio-container">
                    <div className="spacer"></div>
                    {blobURL && <audio ref={audioRef} src={blobURL} controls style={{ width: '100%' }} />}
                    <div className="spacer"></div>
                </div>
                <br/><br/><br/>
                <Link to='/Results'
                    className="main-button"
                    onClick={(e) => {
                        e.preventDefault();
                        sendAudioToServer();
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