import React from 'react'
import style from "../css/Menu.module.css"
import { useDispatch} from 'react-redux';
import { toggleMenu } from '../services/MenuStatusSlice';

export default function Menu() {
    const dispatch = useDispatch();


    const handleMenuOpen = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className={style.menuMain}  onClick={handleMenuOpen}>
            <div className={style.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                    <path d="M3 6h18v1H3zM3 16h18v1H3zM3 11h18v1H3z"></path>
                </svg>
            </div>
            <div className={style.menuText}>
                Меню
            </div>
        </div>
    )
}
