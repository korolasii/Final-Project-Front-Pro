import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setLike, setGoat } from '../services/userSlice';
import style from '../css/Shop.module.css';

export default function Shop() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        models: [],
        fuels: [],
        drives: [],
        bodies: [],
        transmissions: [],
        cost: { min: 0, max: 100000 }
    });
    const [configurations, setConfigurations] = useState([]);
    const [filteredConfigurations, setFilteredConfigurations] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [menuItems, setMenuItems] = useState([]);
    const [modelId, setModelId] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [models, fuels, drives, bodies, transmissions] = await Promise.all([
                    fetch('http://localhost:3000/model').then(res => res.json()),
                    fetch('http://localhost:3000/fuel').then(res => res.json()),
                    fetch('http://localhost:3000/drive').then(res => res.json()),
                    fetch('http://localhost:3000/body').then(res => res.json()),
                    fetch('http://localhost:3000/transmission').then(res => res.json()),
                ]);

                setFilters({
                    models,
                    fuels,
                    drives,
                    bodies,
                    transmissions,
                    cost: { min: 0, max: 1000000 }
                });
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:3000/menu_search/');
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                } else {
                    console.error('Failed to fetch menu items');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const modelIdFromUrl = searchParams.get('modelId');
        if (modelIdFromUrl) {
            setModelId(modelIdFromUrl);
        }
    }, [location]);

    useEffect(() => {
        const fetchConfigurations = async () => {
            try {
                const response = await fetch('http://localhost:3000/model_configuration');
                const data = await response.json();
                setConfigurations(data);
                setFilteredConfigurations(data);
            } catch (error) {
                console.error('Error fetching model configurations:', error);
            }
        };

        fetchConfigurations();
    }, []);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: parseInt(value)
        }));
    };

    const handleApplyFilters = () => {
        const isModelSelected = filters.models.some(model => model.selected);
        const isFuelSelected = filters.fuels.some(fuel => fuel.selected);
        const isDriveSelected = filters.drives.some(drive => drive.selected);
        const isBodySelected = filters.bodies.some(body => body.selected);
        const isTransmissionSelected = filters.transmissions.some(transmission => transmission.selected);

        const filtered = configurations.filter(config => {
            const isInPriceRange = config.cost >= priceRange.min && config.cost <= priceRange.max;

            const isSelectedModel = isModelSelected
                ? filters.models.some(model => model.selected && model.name === config.model_name)
                : true;

            const isSelectedFuel = isFuelSelected
                ? filters.fuels.some(fuel => fuel.selected && fuel.name === config.fuel_name)
                : true;

            const isSelectedDrive = isDriveSelected
                ? filters.drives.some(drive => drive.selected && drive.name === config.drive_name)
                : true;

            const isSelectedBody = isBodySelected
                ? filters.bodies.some(body => body.selected && body.name === config.body_name)
                : true;

            const isSelectedTransmission = isTransmissionSelected
                ? filters.transmissions.some(transmission => transmission.selected && transmission.name === config.transmission_name)
                : true;

            return isInPriceRange &&
                isSelectedModel &&
                isSelectedFuel &&
                isSelectedDrive &&
                isSelectedBody &&
                isSelectedTransmission;
        });

        setFilteredConfigurations(filtered);
    };
    const handleFilterChange = (e, filterType) => {
        const { value, checked } = e.target;
        const updatedFilters = filters[filterType].map(item =>
            item.id === parseInt(value) ? { ...item, selected: checked } : item
        );

        setFilters(prev => ({
            ...prev,
            [filterType]: updatedFilters
        }));
    };

    const filteredMenuItems = modelId
        ? menuItems.filter(item => item.id === modelId)
        : menuItems;


    const generateUniqueIdWithDate = () => {
        const timestamp = Date.now();
        const randomPart = Math.floor(Math.random() * 1000);
        return `${timestamp}-${randomPart}`;
    };

    const handleLike = (config) => {
        const userId = JSON.parse(localStorage.getItem('user')).id;

        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        const uniqueLikeId = generateUniqueIdWithDate();

        const { configuration_id, ...restConfig } = config;
        const updatedLikeConfig = { ...restConfig, configuration_id: uniqueLikeId };

        dispatch(setLike(updatedLikeConfig));
        console.log(updatedLikeConfig);

        fetch(`http://localhost:3000/user/${userId}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ like: updatedLikeConfig }),
        })
            .then(response => response.json())
            .then(data => console.log('Like updated:', data))
            .catch(error => console.error('Error updating like:', error));
    };

    const handleGoat = (config) => {
        const userId = JSON.parse(localStorage.getItem('user')).id;

        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const uniqueGoatId = generateUniqueIdWithDate();

        const { configuration_id, ...restConfig } = config;
        const updatedGoatConfig = { ...restConfig, configuration_id: uniqueGoatId };

        dispatch(setGoat(updatedGoatConfig));

        fetch(`http://localhost:3000/user/${userId}/goat`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goat: updatedGoatConfig }),
        })
            .then(response => response.json())
            .then(data => console.log('Goat updated:', data))
            .catch(error => console.error('Error updating goat:', error));
    };



    return (
        <div className={style.page}>
            <Header />
            <div className={style.container}>
                <div className={style.header}>
                    Конфігуратор
                </div>
                <div className={style.filtersCards}>
                    <div className={style.filters}>
                        <div className={style.models}>
                            <h4>Моделі</h4>
                            {filters.models.map((model) => (
                                <label key={model.id}>
                                    <input
                                        type="checkbox"
                                        value={model.id}
                                        checked={model.selected || false}
                                        onChange={(e) => handleFilterChange(e, 'models')}
                                    />
                                    {model.name}
                                </label>
                            ))}
                        </div>

                        <div className={style.fuel}>
                            <h4>Паливо</h4>
                            {filters.fuels.map((fuel) => (
                                <label key={fuel.id}>
                                    <input
                                        type="checkbox"
                                        value={fuel.id}
                                        checked={fuel.selected || false}
                                        onChange={(e) => handleFilterChange(e, 'fuels')}
                                    />
                                    {fuel.name}
                                </label>
                            ))}
                        </div>

                        <div className={style.drive}>
                            <h4>Привід</h4>
                            {filters.drives.map((drive) => (
                                <label key={drive.id}>
                                    <input
                                        type="checkbox"
                                        value={drive.id}
                                        checked={drive.selected || false}
                                        onChange={(e) => handleFilterChange(e, 'drives')}
                                    />
                                    {drive.name}
                                </label>
                            ))}
                        </div>

                        <div className={style.body}>
                            <h4>Кузов</h4>
                            {filters.bodies.map((body) => (
                                <label key={body.id}>
                                    <input
                                        type="checkbox"
                                        value={body.id}
                                        checked={body.selected || false}
                                        onChange={(e) => handleFilterChange(e, 'bodies')}
                                    />
                                    {body.name}
                                </label>
                            ))}
                        </div>

                        <div className={style.transmission}>
                            <h4>Трансмісія</h4>
                            {filters.transmissions.map((transmission) => (
                                <label key={transmission.id}>
                                    <input
                                        type="checkbox"
                                        value={transmission.id}
                                        checked={transmission.selected || false}
                                        onChange={(e) => handleFilterChange(e, 'transmissions')}
                                    />
                                    {transmission.name}
                                </label>
                            ))}
                        </div>

                        <div className={style.cost}>
                            <h4>Ціна</h4>
                            <div className={style.range}>
                                <label>
                                    {priceRange.max} $
                                    <input
                                        type="range"
                                        name="max"
                                        min={filters.cost.min}
                                        max={filters.cost.max}
                                        value={priceRange.max}
                                        step={1000}
                                        onChange={handlePriceChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div onClick={handleApplyFilters} className={style.btn}>
                            Застосувати
                        </div>
                    </div>
                    <div className={style.cards}>
                        {filteredConfigurations.map((config) => (
                            <div key={config.configuration_id} className={style.card}>
                                <div className={style.img}>
                                    <img src={config.img} alt={config.model_name} />
                                </div>
                                <div className={style.model}>
                                    {config.model_name}
                                </div>
                                <div className={style.cost}>
                                    {config.cost} $
                                </div>
                                <div className={style.fuel}>
                                    {config.fuel_name}
                                </div>
                                <div className={style.drive}>
                                    {config.drive_name}
                                </div>
                                <div className={style.body}>
                                    {config.body_name}
                                </div>
                                <div className={style.transmission}>
                                    {config.transmission_name}
                                </div>
                                <div className={style.containerBtn}>
                                    <div className={`${style.like} ${style.btnCard}`} onClick={() => handleLike(config)}>
                                        Сподобалась
                                    </div>
                                    <div className={`${style.goat} ${style.btnCard}`} onClick={() => handleGoat(config)}>
                                        До кошика
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
