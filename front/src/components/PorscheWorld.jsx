import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../css/PorscheWorld.module.css';

export default function PorscheWorld() {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/items-porsche-world');
            setItems(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <div className={style.container}>
            <h2 className={style.header}>Світ Porsche</h2>
            {items.length === 0 ? (
                <p>No items available</p>
            ) : (
                <div className={style.divCard}>
                    {items.map(item => (
                            <div className={style.card} style={{ backgroundImage: `url(${item.img})` }}>
                                <div className={style.text}>
                                    {item.text}
                                </div>
                            </div>
                    ))}
                </div>
            )}
        </div>
    )
}
