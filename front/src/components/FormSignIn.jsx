import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../services/formSignIn';
import { setUser } from '../services/userSlice';
import style from "../css/FormSignIn.module.css";

const FormSignIn = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        password: ''
    });

    const isVisible = useSelector((state) => state.formSignIn.isVisible);
    const dispatch = useDispatch();

    const handleCloseMenu = () => {
        if (isVisible) {
            dispatch(toggleMenu());
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            const data = await response.json();

            console.log(data)

            if (response.ok) {
                dispatch(setUser(data)); 
                dispatch(toggleMenu());
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div className={`${style.back} ${isVisible ? style.visible : style.hidden}`}>
            <div className={`${style.container} ${isVisible ? style.visible : style.hidden}`}>
                <h2>Login</h2>
                <div onClick={handleCloseMenu} className={style.closeBtn}>X</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text" 
                        name="firstName" 
                        placeholder="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={style.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={style.input}
                    />
                    <button type="submit" className={style.btn}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default FormSignIn;
