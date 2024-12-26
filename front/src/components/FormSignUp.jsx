import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../services/formSignUp';
import style from "../css/FormSignUp.module.css";

const FormSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const isVisible = useSelector((state) => state.formSignUp.isVisible);
    const dispatch = useDispatch();

    const handleCloseMenu = () => {
        if (isVisible) {
            dispatch(toggleMenu());
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
        if (!formData.password.trim()) newErrors.password = 'Password is required.';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (formData.phone && !/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Phone must contain only digits.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setFormData({
                    firstName: '',
                    lastName: '',
                    password: '',
                    email: '',
                    phone: ''
                });
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
                <h2>Create User</h2>
                <div onClick={handleCloseMenu} className={style.closeBtn} role="button" tabIndex={0}>
                    X
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={style.input}
                    />
                    <span className={style.error}>{errors.firstName}</span>

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={style.input}
                    />
                    <span className={style.error}>{errors.lastName}</span>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={style.input}
                    />
                    <span className={style.error}>{errors.password}</span>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={style.input}
                    />
                    <span className={style.error}>{errors.email}</span>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={style.input}
                    />
                    <span className={style.error}>{errors.phone}</span>

                    <button type="submit" className={style.btn}>Create User</button>
                </form>
            </div>
        </div>
    );
};

export default FormSignUp;
