import React, { useEffect, useState } from "react";
import style from '../css/MenuSearch.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearRedirect, redirect } from '../services/NavigationSlice';
import { toggleMenu } from '../services/MenuStatusSlice';

export default function MenuSearch() {
    const [menuItems, setMenuItems] = useState([]);
    const [isItemsVisible, setIsItemsVisible] = useState(false);
    const isVisible = useSelector((state) => state.menuStatus.isVisible);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseMenu = () => {
        if (isVisible) {
            dispatch(toggleMenu());
        }
        console.log(isVisible);
    };

    const handleToggleItems = () => {
        setIsItemsVisible(prevState => !prevState);
    };

    const handleClick = (modelId) => {
        navigate(`/shop`);
    };

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

    return (
        <div className={`${style.MenuSearchContainer} ${isVisible ? style.visible : style.hidden}`}>
            <div className={`${style.MenuSearch} ${isVisible ? style.visible : style.hidden}`}>
                <div className={style.category}>
                    <div className={style.modelNav} onClick={handleClick}>
                        Конфігуратор
                        <div className={style.arrow}></div>
                    </div>
                </div>

                {/* {isItemsVisible && (
                    <div className={style.itemsMenuSearch}>
                        {menuItems.map((item) => (
                            <div key={item.id} className={style.menuItem} onClick={() => handleClick(item.id)}>
                                <img src={item.url} alt={item.model} className={style.menuItemImage} />
                            </div>
                        ))}
                    </div>
                )} */}

                <div className={style.closeMenu} onClick={handleCloseMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fbfcff" viewBox="0 0 24 24" width="24px" height="50px">
                        <path d="M4.91 19h1.5L12 12.83 17.59 19h1.5l-6.34-7 6.34-7h-1.5L12 11.17 6.41 5h-1.5l6.34 7-6.34 7z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
