import React, { useEffect, useState } from 'react';
import style from '../css/NotFoundPage.module.css';

export default function NotFoundPage() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setPosition({ x: event.pageX, y: event.pageY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={style.body}>
            <div className={style.text}>
                <h1>404</h1>
                <h2>Uh, Ohh</h2>
                <h3>Sorry we can't find what you are looking for 'cause it's so dark in here</h3>
            </div>
            <div
                className={style.torch}
                style={{
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                }}
            ></div>
        </div>
    );
}
