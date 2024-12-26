import React from 'react'
import style from '../css/BottomNav.module.css'

export default function BottomNav() {
    return (
        <div className={style.container}>
            <div className={style.bottomNav}>
                <div className={`${style.containerConfAndSearch} ${style.containerChild}`}>
                    <div className={`${style.confAndSearch} ${style.headerText}`}>
                        Конфігуратор та пошук
                    </div>
                    <div className={style.conf}>
                        Porsche Конфігуратор
                    </div>
                    <div className={style.same}>
                        Порівняти авто
                    </div>
                    <div className={style.search}>
                        Пошук автомобілів з пробігом
                    </div>
                </div>
                <div className={`${style.containerNews} ${style.containerChild}`}>
                    <div className={`${style.news} ${style.headerText}`}>
                        Новини
                    </div>
                    <div className={style.newsInUkraine}>
                        Новини Porsche в Україні
                    </div>
                </div>
                <div className={`${style.containerConnect} ${style.containerChild}`}>
                    <div className={`${style.connect} ${style.headerText}`}>
                        Зв'язатись з нами
                    </div>
                    <div className={style.testdrive}>
                        Запис на тест-драйв
                    </div>
                    <div className={style.questionToServer}>
                        Запис на сервіс
                    </div>
                    <div className={style.calc}>
                        Сервіс калькулятор
                    </div>
                    <div className={style.gatewayLink}>
                        Зворотній зв'язок
                    </div>
                </div>
            </div>
            <div className={style.containerIcon}>
                <div className={style.headerIcon}>
                    Зв'язатися з Porsche
                </div>
                <div>
                    <div className={style.icon}>
                        <a href="https://www.facebook.com/Porscheua/" target="_blank" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M7.5 12.44h2.42V21h3.27v-8.56H16l.51-3.21h-3.32V7a.71.71 0 0 1 .38-.68 1.6 1.6 0 0 1 .77-.21h2.12V3H14a5.38 5.38 0 0 0-2 .36 2.84 2.84 0 0 0-1.3 1 4.16 4.16 0 0 0-.59 1.2 4.51 4.51 0 0 0-.17 1.23v2.44H7.5v3.21z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className={style.icon}>
                        <a href="https://www.instagram.com/porscheua/" target="_blank" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M12 4.62c-2.4 0-2.69 0-3.64.06A4.8 4.8 0 0 0 6.7 5a2.81 2.81 0 0 0-1 .68 2.74 2.74 0 0 0-.67 1 5 5 0 0 0-.31 1.67v7.27A5.06 5.06 0 0 0 5 17.3a2.74 2.74 0 0 0 .67 1 2.81 2.81 0 0 0 1 .68 5.05 5.05 0 0 0 1.66.3c1 .05 1.24.06 3.64.06s2.69 0 3.64-.06a4.92 4.92 0 0 0 1.67-.3A3 3 0 0 0 19 17.3a5 5 0 0 0 .31-1.67c0-1 .05-1.23.05-3.64s0-2.68-.05-3.63A5.06 5.06 0 0 0 19 6.69 3 3 0 0 0 17.31 5a5.13 5.13 0 0 0-1.67-.3c-.95-.07-1.24-.08-3.64-.08zM12 3c2.45 0 2.75 0 3.71.06a6.61 6.61 0 0 1 2.19.41 4.64 4.64 0 0 1 2.63 2.63 6.66 6.66 0 0 1 .41 2.19c0 1 .06 1.26.06 3.71s0 2.75-.06 3.71a6.61 6.61 0 0 1-.41 2.19 4.64 4.64 0 0 1-2.63 2.63 6.61 6.61 0 0 1-2.19.41c-1 0-1.26.06-3.71.06s-2.75 0-3.71-.06a6.66 6.66 0 0 1-2.19-.41 4.64 4.64 0 0 1-2.63-2.63 6.61 6.61 0 0 1-.41-2.19C3 14.75 3 14.45 3 12s0-2.75.06-3.71a6.54 6.54 0 0 1 .41-2.18 4.37 4.37 0 0 1 1-1.6 4.42 4.42 0 0 1 1.59-1 6.93 6.93 0 0 1 2.19-.41C9.25 3 9.55 3 12 3zm0 4.38A4.62 4.62 0 1 1 7.38 12 4.62 4.62 0 0 1 12 7.38zM12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm5.89-7.81a1.08 1.08 0 1 1-1.08-1.08 1.08 1.08 0 0 1 1.08 1.08z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className={style.icon}>
                        <a href="https://www.youtube.com/c/PorscheinUkraine" target="_blank" title="Youtube">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M20.82 8.59a3.56 3.56 0 0 0-.72-1.69 2.66 2.66 0 0 0-1.8-.73C15.78 6 12 6 12 6s-3.78 0-6.3.17a2.69 2.69 0 0 0-1.81.73 3.51 3.51 0 0 0-.71 1.69A24.46 24.46 0 0 0 3 11.35v1.29a24.75 24.75 0 0 0 .18 2.77 3.6 3.6 0 0 0 .72 1.69 3.13 3.13 0 0 0 2 .73C7.32 18 12 18 12 18s3.78 0 6.3-.18a2.63 2.63 0 0 0 1.8-.72 3.6 3.6 0 0 0 .72-1.69 24.52 24.52 0 0 0 .18-2.77v-1.29a24.46 24.46 0 0 0-.18-2.76zm-10.68 5.62V9.42l4.86 2.4z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className={style.icon}>
                        <a href="https://www.pinterest.com/porsche/" target="_blank" title="Pinterest">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M5.25 9.47a5.47 5.47 0 0 0 .52 2.44 3 3 0 0 0 1.54 1.5.32.32 0 0 0 .5-.24 2.44 2.44 0 0 1 .08-.44 2 2 0 0 1 .12-.4.56.56 0 0 0-.16-.56 3.13 3.13 0 0 1-.66-2 4.88 4.88 0 0 1 1.38-3.5 4.67 4.67 0 0 1 3.55-1.45 4.19 4.19 0 0 1 3.08 1.1 3.9 3.9 0 0 1 1.11 2.88 7.76 7.76 0 0 1-.9 3.88 2.6 2.6 0 0 1-2.28 1.59 1.61 1.61 0 0 1-1.3-.58 1.52 1.52 0 0 1-.3-1.39c.08-.32.2-.75.35-1.27s.29-1 .39-1.39a4 4 0 0 0 .16-1 1.74 1.74 0 0 0-.35-1.09 1.23 1.23 0 0 0-1-.44 1.69 1.69 0 0 0-1.38.77 3.14 3.14 0 0 0-.56 1.89 4.91 4.91 0 0 0 .08.86 1.43 1.43 0 0 0 .19.58l.08.2Q8.36 16.15 8.16 17a11.2 11.2 0 0 0 0 3.94.09.09 0 0 0 .08.1.16.16 0 0 0 .15 0 10.54 10.54 0 0 0 1.79-3.41c.49-1.75.74-2.69.74-2.82a2.19 2.19 0 0 0 .95.9 2.93 2.93 0 0 0 1.49.39 4.65 4.65 0 0 0 3.88-2 8.25 8.25 0 0 0 1.51-5.11A5.64 5.64 0 0 0 17 4.77 6.19 6.19 0 0 0 12.43 3a6.92 6.92 0 0 0-5.26 2 6.33 6.33 0 0 0-1.92 4.47z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className={style.icon}>
                        <a href="https://twitter.com/Porsche/" target="_blank" title="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M3 17.82a10.88 10.88 0 0 0 5.81 1.68 9.9 9.9 0 0 0 7.55-3.27 10.45 10.45 0 0 0 2.86-7.84v-.14a6.26 6.26 0 0 0 1.78-2 5.31 5.31 0 0 1-2.06.62 3.35 3.35 0 0 0 .91-.87 3.36 3.36 0 0 0 .64-1.2 5.91 5.91 0 0 1-1.15.55 3.52 3.52 0 0 1-1.15.26 3.7 3.7 0 0 0-2.72-1.11 3.53 3.53 0 0 0-2.6 1.11 3.63 3.63 0 0 0-1.1 2.69 4.12 4.12 0 0 0 .09.86 10.4 10.4 0 0 1-4.33-1.1A9.6 9.6 0 0 1 4 5.22a4.17 4.17 0 0 0-.31 2.93 3.52 3.52 0 0 0 1.43 2.07 1.9 1.9 0 0 1-1.59-.43 3.86 3.86 0 0 0 .63 2.26 3.72 3.72 0 0 0 2.23 1.49 2.38 2.38 0 0 1-1.55.09 2.72 2.72 0 0 0 1.1 1.76 3.41 3.41 0 0 0 2.23.84 5.31 5.31 0 0 1-2 1.3 5.71 5.71 0 0 1-3.17.29z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className={style.icon}>
                        <a href="https://www.linkedin.com/company/porsche-ag/" target="_blank" title="Linkedin">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M3.3 9H7v12H3.3zm1.86-6A2.17 2.17 0 1 1 3 5.17 2.16 2.16 0 0 1 5.16 3zm4.21 6H13v1.64a3.9 3.9 0 0 1 3.53-1.94c3.77 0 4.47 2.49 4.47 5.73V21h-3.73v-5.85c0-1.39 0-3.18-1.94-3.18s-2.23 1.51-2.23 3.08V21H9.37V9z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
