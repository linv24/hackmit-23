import "./Playback.css"
import "../index.css"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from "../Header/Header.js"

const Playback = () => {
    const [recording, setRecording] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [drawing, setDrawing] = useState(false);  // Add this line
    const [audioURL, setAudioURL] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const audioRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
        requestAnimationFrame(draw);
        
        if (!drawing) return;

        analyser.getByteTimeDomainData(dataArray);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00ff00';
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

    useEffect(() => {
        if (recording) {
            draw();
        }
        return () => {
            if (mediaRecorder) {
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
            analyser.disconnect();
            audioContext.close();
        };
    }, [recording]);

    const startRecording = () => {
        if (drawing) return;

        const constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                
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
                    const newAudioURL = URL.createObjectURL(audioBlob);
                    setAudioURL(newAudioURL);
                };
    
                newMediaRecorder.start();
                setRecording(true);
                
                setDrawing(true);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            setRecording(false);
        }
        setDrawing(false);
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
            <div className="center-container">
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
                <Link to="/Results" className="main-button">Next</Link>
            </div>
            <Link to="/Pages" className="back-button">&lt;</Link>
        </div>
    );
};

export default Playback;