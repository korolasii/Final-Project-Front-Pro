import React from 'react'
import style from '../css/ConfMainBlock.module.css'

export default function ConfMainBlock() {
    return (
        <div className={style.container}>
            <div className={style.containerText}>
                <div className={style.text}>
                    Створіть Porsche своєї мрії
                </div>
                <div className={style.btn}>
                    Конфігуратор
                    <i class={style.arrow}></i>
                </div>
            </div>
        </div>
    )
}
