import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import style from '../css/CarouselMain.module.css';
import axios from 'axios';


export default function CarouselMain() {

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/items-carousel');
            const activeItems = response.data.filter(item => item.active === 1);
            setItems(activeItems);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className={style.container}>
            {items.length === 0 ? (
                <p>No items available</p>
            ) : (
                <Carousel autoplay arrows infinite={true} className={style.carousel}>
                    {items.map(item => (
                        <div key={item.id} className={style.carouselItem}>
                            <img src={item.img} alt={item.title} className={style.carouselImage} />
                            <div className={style.textOverlay}>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    )
}
