import React from 'react';
import Header from "../components/Header";
import CarouselMain from "../components/CarouselMain";
import ModelRow from "../components/ModelRow";
import Footer from "../components/Footer";
import ConfMainBlock from '../components/ConfMainBlock';
import PorscheWorld from '../components/PorscheWorld'
import BottomNav from '../components/BottomNav';

export default function Main() {

    return (
        <div>
            <Header />
            <CarouselMain />
            <ModelRow />
            <ConfMainBlock />
            <PorscheWorld />
            <BottomNav />
            <Footer />
        </div>
    );
}
