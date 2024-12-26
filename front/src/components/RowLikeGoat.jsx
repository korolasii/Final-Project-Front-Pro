import React from 'react';
import { useDispatch } from 'react-redux';
import style from "../css/RowLikeGoat.module.css";
import { updateUserData } from '../services/userSlice'; 
import axios from 'axios';

export default function RowLikeGoat({ item, index, field }) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            console.log(item.configuration_id)
            const response = await axios.delete(`http://localhost:3000/user/delete-item/${item.configuration_id}`, {
                data: {          
                    itemId: item.configuration_id,
                    field: field,
                    id: JSON.parse(localStorage.getItem('user')).id
                },
            });
    
            if (response.status === 200) {
                alert('Item deleted successfully');
                let userData = JSON.parse(localStorage.getItem('user')) || {};
    
                if (field === 'goat') {
                    userData.goat = userData.goat ? userData.goat.filter(goatItem => goatItem.configuration_id !== item.configuration_id) : [];
                } else if (field === 'like') {
                    userData.like = userData.like ? userData.like.filter(likeItem => likeItem.configuration_id !== item.configuration_id) : [];
                }
    
                localStorage.setItem('user', JSON.stringify(userData));
    
                dispatch(updateUserData(userData));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item');
        }
    };
    

    return (
        <div className={style.row}>
            <div className={style.containerRowId}>
                {index}
            </div>
            <div className={style.containerRowModel}>
                <img src={item.img} alt={item.model_name} />
            </div>
            <div className={style.containerRowConf}>
                {item.model_name}, {item.body_name}, {item.drive_name}, {item.fuel_name}, {item.transmission_name} 
            </div>
            <div className={style.containerRowCost}>
                {item.cost}
            </div>
            <div className={style.containerRowDelete}>
                <div className={style.btn} onClick={handleDelete} >Удалить</div>
            </div>
        </div>
    );
}
