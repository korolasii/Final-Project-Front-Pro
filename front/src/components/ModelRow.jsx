import React, { useState, useEffect } from 'react';
import style from '../css/ModelRow.module.css';
import { Col, Row } from 'antd';
import axios from 'axios';

export default function ModelRow() {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/items-model-row');
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
            <div className={style.header}>
                <h2>
                    Модельний Ряд
                </h2>
            </div>
            <div className={style.grid}>
                {items.length === 0 ? (
                    <p>No items available</p>
                ) : (
                    <Row >
                        {items.map(item => (
                            <Col span={8} key={item.id} className={style.col}>
                                <img src={item.img} alt={item.model} className={style.img} />
                                <div className={style.modelNameContainer}>
                                    {item.model}
                                </div>
                                <div className={style.actions}>
                                    <div className={style.conf}>
                                        Конфігуратор
                                    </div>
                                    <div className={style.show}>
                                        Огляд
                                    </div>
                                    <div className={style.testDrive}>
                                        Тест-драйв
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}
