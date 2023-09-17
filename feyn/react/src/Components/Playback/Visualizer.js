import React, { useEffect, useRef } from 'react';

const Visualizer = ({ audioData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        context.clearRect(0, 0, width, height);

        const barWidth = (width / audioData.length);
        let x = 0;

        audioData.forEach(item => {
            const y = (item / 255.0) * height;
            context.fillStyle = 'rgba(0,0,255,1)';
            context.fillRect(x, height - y, barWidth, y);
            x += barWidth + 1;
        });
    }, [audioData]);

    return <canvas ref={canvasRef} />;
}

export default Visualizer;