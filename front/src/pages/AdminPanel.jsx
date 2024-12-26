import React from 'react'
import style from '../css/AdminPanel.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminForms from '../components/AdminForms'
import ConfigurationsForm from '../components/ConfigurationsForm'


export default function AdminPanel() {
    return (
        <div className={style.page}>
            <Header />
            <div className={style.container}>
                <AdminForms  name={'Модель'} url={'model'}/>
                <AdminForms  name={'Кузов'} url={'body'}/>
                <AdminForms  name={'Паливне'} url={'fuel'}/>
                <AdminForms  name={'Трансмісія'} url={'transmission'}/>
                <AdminForms  name={'Привід'} url={'drive'}/>
                <ConfigurationsForm />
            </div>
            <Footer />
        </div>
    )
}
