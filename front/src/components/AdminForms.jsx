import React, { useState } from 'react';
import style from '../css/AdminForms.module.css';

export default function AdminForms({ name, url }) {
    const [formData, setFormData] = useState({ name: '' });
    const [showForm, setShowForm] = useState(false);
    const [showElements, setShowElements] = useState(false);
    const [elements, setElements] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/${url}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('Item added successfully');
                setFormData({ name: '' });
                fetchElements();
            } else {
                console.error('Error adding item');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const toggleForm = () => {
        setShowForm((prev) => !prev);
    };

    const toggleElements = async () => {
        setShowElements((prev) => !prev);
        if (!showElements) {
            await fetchElements();
        }
    };

    const fetchElements = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${url}/`);
            if (response.ok) {
                const data = await response.json();
                setElements(data);
            } else {
                console.error('Error fetching elements');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const deleteElement = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/${url}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Item deleted successfully');
                fetchElements();
            } else {
                console.error('Error deleting item');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className={style.containerPage}>
            <div>{name}</div>
            <div className={style.containerBtn}>
                <div className={style.btn} onClick={toggleForm}>
                    Додати
                </div>
                <div className={style.btn} onClick={toggleElements}>
                    Всі елементи
                </div>
            </div>
            <div className={style.container}>
                {showForm && (
                    <div className={style.containerAdd}>
                        <div className={style.form}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={style.input}
                                />
                                <button type="submit" className={style.btn}>
                                    Додати
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {showElements && (
                    <div className={style.containerAllElements}>
                        {elements.map((element) => (
                            <div key={element.id} className={style.elementRow}>
                                <span>{element.name}</span>
                                <button
                                    className={`${style.btnDelete} ${style.btn}`}
                                    onClick={() => deleteElement(element.id)}
                                >
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
