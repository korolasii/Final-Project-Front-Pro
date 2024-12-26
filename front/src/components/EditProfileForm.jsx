import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../services/userSlice'; 
import style from '../css/EditProfile.module.css';
import { toggleEditProfileForm } from '../services/editProfileFormStatusSlice';

export default function ProfileChange() {
    const user = useSelector((state) => state.user);
    const isVisible = useSelector((state) => state.editProfileFormStatus.isVisible);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.firstName || !formData.lastName) {
            alert('First Name and Last Name are required.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email, 
                    phone: formData.phone,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                dispatch(setUser(data)); 
                dispatch(toggleEditProfileForm()); 
            } else {
                alert(data.error || 'Failed to update user data.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Something went wrong while updating the user data.');
        }
    };
    
    return (
        <div className={`${style.editProfileForm} ${isVisible ? style.visible : style.hidden}`}>
            <h2>Change Your Profile Information</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}
