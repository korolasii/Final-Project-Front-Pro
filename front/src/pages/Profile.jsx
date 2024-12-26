import React, { useState } from 'react';
import style from "../css/Profile.module.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../services/userSlice';
import { redirect } from '../services/NavigationSlice';
import { toggleEditProfileForm } from '../services/editProfileFormStatusSlice';
import EditProfileForm from '../components/EditProfileForm';
import RowLikeGoat from '../components/RowLikeGoat'

export default function Profile() {
    const user = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(redirect("/"));
    };

    const handleChange = () => {
        dispatch(toggleEditProfileForm());
    };

    const handleAdminPanel = () => {
        dispatch(redirect("/admin-panel"));
    };

    const goat = Array.isArray(user.goat) ? user.goat : [];
    const like = Array.isArray(user.like) ? user.like : [];

    return (
        <div className={style.container}>
            <Header />
            <div className={style.containerProfile}>
                <div className={style.profile}>
                    <div className={style.profileImgChange}>
                        <div className={style.profileImgContainer}>
                            <div className={style.profileImg}></div>
                        </div>
                        <div className={style.profileChangeContainer}>
                            <div className={style.profileName}>
                                {user.firstName}
                            </div>
                            <div className={`${style.logOutBtn} ${style.btn}`} onClick={handleLogout}>
                                Log Out
                            </div>
                            {user.firstName === 'Admin' ? (
                                <div
                                    className={`${style.addToMarket} ${style.btn}`}
                                    onClick={handleAdminPanel}
                                >
                                    Admin Panel
                                </div>
                            ) : (
                                <div
                                    className={`${style.profileChangeBtn} ${style.btn}`}
                                    onClick={handleChange}
                                >
                                    Change
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.profileDate}>
                        <div className={style.profileGoat}>
                            <div className={style.head}>Goat</div>
                            <div className={style.containerTable}>
                                <div className={style.containerHeadTable}>
                                    <div className={style.containerHeadTableId}>id</div>
                                    <div className={style.containerHeadTableModel}>Модель</div>
                                    <div className={style.containerHeadTableConf}>Конфігурация</div>
                                    <div className={style.containerHeadTableCost}>Ціна</div>
                                    <div className={style.containerHeadTableDelete}></div>
                                </div>
                                <div className={style.scrollableContainer}>
                                    {goat.map((item, index) => (
                                        <RowLikeGoat key={index} item={item} index={index + 1} field={"goat"} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={style.profileLike}>
                            <div className={style.head}>Like</div>
                            <div className={style.containerTable}>
                                <div className={style.containerHeadTable}>
                                    <div className={style.containerHeadTableId}>id</div>
                                    <div className={style.containerHeadTableModel}>Модель</div>
                                    <div className={style.containerHeadTableConf}>Конфігурация</div>
                                    <div className={style.containerHeadTableCost}>Ціна</div>
                                    <div className={style.containerHeadTableDelete}></div>
                                </div>
                                <div className={style.scrollableContainer}>
                                    {like.map((item, index) => (
                                        <RowLikeGoat key={index} item={item} index={index + 1} field={"like"} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <EditProfileForm />
        </div>
    );
}
