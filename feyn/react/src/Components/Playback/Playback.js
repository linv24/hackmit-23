import "./Playback.css"
import "../index.css"
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Playback = () => {
    const [recording, setRecording] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const audioRef = React.useRef(null);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const canvasRef = React.useRef(null);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
        requestAnimationFrame(draw); // Continuously draw the waveform.

        analyser.getByteTimeDomainData(dataArray); // Get audio data

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';  // BACKGROUND COLOR
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.lineWidth = 2; // CHANGE
        ctx.strokeStyle = '#00ff00'; // CHANGE COLOR
        ctx.beginPath();

        const sliceWidth = canvas.width * 1.0 / analyser.frequencyBinCount;
        let x = 0;

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * canvas.height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    };

    const startRecording = () => {
        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                // 1. Create the audio source from the stream.
                const source = audioContext.createMediaStreamSource(stream);
                
                // 2. Connect the source to the analyser.
                source.connect(analyser);
                
                // 3. Initialize the MediaRecorder with the stream.
                const newMediaRecorder = new MediaRecorder(stream);
                setMediaRecorder(newMediaRecorder);
    
                newMediaRecorder.onstart = () => {
                    setAudioChunks([]);
                };
    
                newMediaRecorder.ondataavailable = event => {
                    setAudioChunks(prevAudioChunks => [...prevAudioChunks, event.data]);
                };
    
                newMediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    setAudioURL(URL.createObjectURL(audioBlob));
                };
    
                newMediaRecorder.start();
                setRecording(true);
                
                // 4. Start the visualization.
                draw();
            });
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const playAudio = () => {
        audioRef.current.play();
        setPlaying(true);
    };

    const pauseAudio = () => {
        audioRef.current.pause();
        setPlaying(false);
    };

    const deleteRecording = () => {
        setAudioURL("");
        setAudioChunks([]);
    };

    return (
        <div>
            <Header />
            <div class="center-container">
                <canvas ref={canvasRef} width={600} height={200}></canvas>
                {
                    recording
                        ? <button onClick={stopRecording}>Stop</button>
                        : <button onClick={startRecording}>Record</button>
                }
                {audioURL && (
                    <div>
                        <audio ref={audioRef} controls src={audioURL}></audio>
                        {playing ? (
                            <button onClick={pauseAudio}>Pause</button>
                        ) : (
                            <button onClick={playAudio}>Play</button>
                        )}
                        <button onClick={deleteRecording}>Delete</button>
                    </div>
                )}
                <Link to="/Results" class="main-button">Next</Link>
            </div>

            <Link to="/Pages" class="back-button">&lt;</Link>
        </div>
    )

};

export default Playback;