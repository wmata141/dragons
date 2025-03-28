import React, { useState, useEffect, useRef } from 'react';
import './Dragon.css';

const colors = [
    'linear-gradient(20deg, #d7b5c3, #6e93a5, #f8e2d0, #e74c3c, #ff6f61)',
    'linear-gradient(20deg, #4a6b67, #e6c29b, #8abe88, #88d2a6, #47b7c4)',
    'linear-gradient(20deg, #a75b50, #f3c1a1, #3c1d1f, #d8c2b3, #c39aaf)',
    'linear-gradient(20deg, #5c3d31, #f1c05d, #b78a4e, #b8b59e, #c7a9a9)',
    'linear-gradient(20deg, #545454, #e8b79a, #a76e63, #b2c5c5, #a8c2c5)',
    'linear-gradient(20deg, #3a2926, #e0c89c, #9e7a54, #a6b5b4, #9fa7b3)',
    'linear-gradient(20deg, #5e8c9a, #e3f0f1, #a3d1d7, #1c2b3a, #90c4d6)',
    'linear-gradient(20deg, #4c5854, #e5e6b8, #96d1a3, #78a99e, #7cb2c1)',
    'linear-gradient(20deg, #434735, #e6cd84, #988a5d, #a2b598, #94a29c)',
    'linear-gradient(20deg, #384e5f, #e4b6a9, #7d9e9a, #94d3d2, #7dc4c7)',
    'linear-gradient(20deg, #54603b, #f9d68c, #b3a55c, #a8c4a4, #a0b6af)',
    'linear-gradient(20deg, #000000, #000000, #000000, #000000, #000000)'
];

const DragonBanner = () => {
    const itemCount = 11;
    const [color, setColor] = useState('#FFFFFF');
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isAutoRotating, setIsAutoRotating] = useState(true); // Nuevo estado para controlar la rotación automática
    const sliderRef = useRef(null);
    const animationRef = useRef(null);
    
    useEffect(() => {
        if (!isAutoRotating || isDragging) return;

        const animate = () => {
            setRotation(prev => prev + 0.1); // Ajusta la velocidad cambiando este valor
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isAutoRotating, isDragging]);

    const handleMouseDown = (e, index) => {
        setIsDragging(true);
        setStartX(e.pageX);
        setColor(colors[index] || '#FFFFFF');
        setIsAutoRotating(false); // Pausa la rotación automática al interactuar
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const diff = (e.pageX - startX) * 0.2;
        setRotation(prev => prev + diff);
        setStartX(e.pageX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsAutoRotating(true); // Reanuda la rotación automática
    };

    const handleTouchStart = (e, index) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        setColor(colors[index] || '#FFFFFF');
        setIsAutoRotating(false);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const diff = (e.touches[0].pageX - startX) * 0.6;
        setRotation(prev => prev + diff);
        setStartX(e.touches[0].pageX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setIsAutoRotating(true);
    };

    return (
        <div
            className="banner"
            style={{ background: color }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                ref={sliderRef}
                className="slider"
                style={{
                    '--quantity': itemCount,
                    transform: `perspective(1000px) rotateX(-16deg) rotateY(${rotation}deg)`
                }}
            >
                {Array.from({ length: itemCount }, (_, index) => (
                    <div
                        className="item"
                        style={{ '--position': index + 1 }}
                        key={index}
                        onMouseDown={(e) => handleMouseDown(e, index)}
                        onTouchStart={(e) => handleTouchStart(e, index)}
                    >
                        <img
                            src={`images/dragon_${index + 1}.jpg`}
                            alt={`Dragon ${index + 1}`}
                        />
                    </div>
                ))}
                <div
                    className="item"
                    style={{ '--position': 11 }}
                    key={11}
                    onMouseDown={(e) => handleMouseDown(e, 11)}
                    onTouchStart={(e) => handleTouchStart(e, 11)}
                >
                    <video
                        src={`images/dragon_11.mp4`} // Ajusta la extensión según tus archivos
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls={false}
                        onContextMenu={(e) => e.preventDefault()} // Evita clic derecho
                        onPause={(e) => e.target.play()} // Forzar reproducción si intentan pausar
                    />
                </div>
            </div>
            <div className="content">
                <div
                    className="author"
                    onMouseDown={(e) => handleMouseDown(e, 11)}
                    onTouchStart={(e) => handleTouchStart(e, 11)}
                >
                    <h3>Dragones de Betania</h3>
                    <p>Profesor William Mata</p>
                </div>
            </div>
        </div>
    );
};

export default DragonBanner;