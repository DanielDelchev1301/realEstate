import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './Home.css';
import Map from '../Explore/Map';
import { useEffect, useState } from 'react';
import { getAllProperties } from '../../service/propertyService.js';
import { CATEGORIES_OBJECT } from '../../constants/constants';
import Spinner from '../Spinner/Spinner';
import { observer, observerDescriptions, observerTitles } from '../../constants/helperFunctions';
import { typeOptions } from '../Admin/adminConstantsAndHelperFunctions';
import { Helmet } from 'react-helmet-async';

function Home() {
    const [propertiesList, setPropertiesList] = useState([]);
    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [openSpinner, setOpenSpinner] = useState(false)
    
    useEffect(() => {
        const cardsForIntersection = document.querySelectorAll('.exploreCard');
        const homeTitle = document.querySelector('.homeLandscapeTitle');
        const homeDescription = document.querySelector('.homeLandscapeDescription');
        cardsForIntersection.forEach(card => {
            observer.observe(card);
        });
        observerTitles.observe(homeTitle);
        observerDescriptions.observe(homeDescription);
    }, [propertiesList]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setOpenSpinner(true);
        try {
            const properties = await getAllProperties();
            setPropertiesList(properties.data);
            setOpenSpinner(false);
            window.scrollTo({top: 0, behavior: 'smooth'});
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    return (
        <div className="homeContainer">
            <Helmet>
                <title>Евтини, Надеждни и Луксозни Имоти Под Наем и За Продан</title>
                <meta name="description" content="Избери Бързо и Лесно Имот от Богата Гама на Достъпни Цени" />
                <link rel="canonical" href="/"/>
            </Helmet>
            <div className="landscapeImageContainer">
                <img src="images/landscape.png" alt="недвижими имоти снимка" className="landscapeImage" />
                <div className="homeFlexContainer">
                    <h1 className="homeLandscapeTitle">Намери новия си дом</h1>
                    <p className="homeLandscapeDescription">Помагаме на хиляди наематели и купувачи да открият евтин и надежден имот</p>
                </div>
            </div>
            <Spinner open={openSpinner}/>
            <div className="exploreContainer">
                <h2 className="homeExploreTitle colorText">Разгледайте ексклузивните оферти</h2>
                <div className="exploreCards">
                    {propertiesList
                        .filter(property => property.categories.includes(CATEGORIES_OBJECT.EXCLUSIVE_OFFER))
                        .slice(0, 4)
                        .map(property => 
                        <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                    )}
                </div>
            </div>
            <div className="exploreContainer">
                <h2 className="homeExploreTitle colorText">Разгледайте офертите за продажба</h2>
                <div className="exploreCards">
                    {propertiesList
                        .filter(property => property.type === typeOptions[1])
                        .slice(0, 4)
                        .map(property => 
                        <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                    )}
                </div>
                <Link to="/sales">
                    <button className="exploreButton">Виж още</button>
                </Link>
            </div>
            <div className="exploreContainer">
                <h2 className="homeExploreTitle colorText">Разгледайте офертите под наем</h2>
                <div className="exploreCards">
                    {propertiesList
                        .filter(property => property.type === typeOptions[0])
                        .slice(0, 4)
                        .map(property => 
                        <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                    )}
                </div>
                <Link to="/rentals">
                    <button className="exploreButton">Виж още</button>
                </Link>
            </div>
            <div className="mostSoldContainer">
                <h2 className="titleMostContainer colorText">Най-много сключени сделки в България</h2>
                <p className="textMostContainer colorText">С повече от <span className="differentColorInsideText"><strong>две десетилетия</strong></span> опит в сферата, правим всичко необходимо за да получите първокласно обслужване!</p>
                <div className="mostContent">
                    <div className="mostContentText">
                        <h3 className="colorText">Продай имота си лесно и бързо</h3>
                        <p className="colorText">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis illo sit excepturi, explicabo rerum iure?</p>
                    </div>
                    <img src="images/networking.jpg" alt="продажба снимка" className="mostContentImage"/>
                </div>
            </div>
            <Map properties={propertiesList}/>
        </div>
    );
}

export default Home;