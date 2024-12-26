import React, { useState, useEffect } from 'react';
import style from '../css/ConfigurationsForm.module.css';

export default function ConfigurationsForm() {
    const [configurations, setConfigurations] = useState([]);
    const [formData, setFormData] = useState({
        model_id: '',
        body_id: '',
        fuel_id: '',
        transmission_id: '',
        drive_id: '',
        cost: '',
        img: '', 
    });
    const [options, setOptions] = useState({
        models: [],
        bodies: [],
        fuels: [],
        transmissions: [],
        drives: [],
    });
    const [showForm, setShowForm] = useState(false);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [models, bodies, fuels, transmissions, drives] = await Promise.all([
                    fetch('http://localhost:3000/model/').then((res) => res.json()),
                    fetch('http://localhost:3000/body/').then((res) => res.json()),
                    fetch('http://localhost:3000/fuel/').then((res) => res.json()),
                    fetch('http://localhost:3000/transmission/').then((res) => res.json()),
                    fetch('http://localhost:3000/drive/').then((res) => res.json()),
                ]);
                setOptions({ models, bodies, fuels, transmissions, drives });
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (showTable) {
            fetch('http://localhost:3000/model_configuration/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setConfigurations(data);
                })
                .catch((error) => {
                    console.error('Error fetching configurations:', error);
                });
        }
    }, [showTable]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/model_configuration/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error adding configuration.');
                }
                return response.json(); 
            })
            .then((newConfig) => {
                alert('Configuration added successfully!');
                setConfigurations((prevConfigs) => [...prevConfigs, newConfig]);
                setFormData({
                    model_id: '',
                    body_id: '',
                    fuel_id: '',
                    transmission_id: '',
                    drive_id: '',
                    cost: '',  
                    img: '', 
                });
            })
            .catch((error) => {
                alert(error.message);  
                console.error('Error:', error);
            });
    };

    const handleDelete = (id) => {
        if (!id) {
            console.error('Invalid id for deletion');
            return;
        }

        fetch(`http://localhost:3000/model_configuration/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert(`Configuration ${id} deleted successfully!`);
                    setConfigurations((prevConfigs) =>
                        prevConfigs.filter((config) => config.configuration_id !== id)
                    );
                } else {
                    alert(`Error deleting configuration ${id}.`);
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div>
            <div>{'Конфігуратор'}</div>
            <div className={style.containerBtn}>
                <div className={style.btn} onClick={() => setShowForm(!showForm)}>
                    Добавить
                </div>
                <div className={style.btn} onClick={() => setShowTable(!showTable)}>
                    Все элементы
                </div>
            </div>
            <div className={style.container}>
                {showForm && (
                    <div className={style.containerAdd}>
                        <form onSubmit={handleSubmit} className={style.form}>
                            {[ 
                                { name: 'model_id', label: 'Модель', options: options.models },
                                { name: 'body_id', label: 'Кузов', options: options.bodies },
                                { name: 'fuel_id', label: 'Паливне', options: options.fuels },
                                { name: 'transmission_id', label: 'Трансмісія', options: options.transmissions },
                                { name: 'drive_id', label: 'Привід', options: options.drives },
                            ].map((field) => (
                                <div key={field.name} className={style.checkboxGroup}>
                                    <p>{field.label}:</p>
                                    {field.options.map((option) => (
                                        <label key={option.id} className={style.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={formData[field.name] === option.id}
                                                onChange={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        [field.name]: option.id,
                                                    }))
                                                }
                                                className={style.checkbox}
                                            />
                                            {option.name}
                                        </label>
                                    ))}
                                </div>
                            ))}

                            <div className={style.checkboxGroup}>
                                <p>Цена:</p>
                                <input
                                    type="number"
                                    value={formData.cost}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            cost: e.target.value,
                                        }))
                                    }
                                    className={style.input}
                                />
                            </div>

                            <div className={style.checkboxGroup}>
                                <p>Ссылка на фото:</p>
                                <input
                                    type="text"
                                    value={formData.img}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            img: e.target.value,
                                        }))
                                    }
                                    className={style.input}
                                />
                            </div>

                            <button type="submit" className={style.btn}>
                                Добавить
                            </button>
                        </form>
                    </div>
                )}

                {showTable && (
                    <div className={style.containerAllElements}>
                        {configurations.map((config) => (
                            <div key={config.configuration_id} className={style.row}>
                                <p>
                                    {`Модель: ${config.model_name}, Кузов: ${config.body_name}, Паливне: ${config.fuel_name}, Трансмісія: ${config.transmission_name}, Привід: ${config.drive_name}, Цена: ${config.cost}$`}
                                </p>
                                <button
                                    className={style.btn}
                                    onClick={() => handleDelete(config.configuration_id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
