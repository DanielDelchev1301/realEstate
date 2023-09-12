import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './Home.css';
import Map from '../Explore/Map';
import { useEffect, useState } from 'react';
import { getAllProperties } from '../../service/propertyService.js';
import { CATEGORIES_OBJECT } from '../../constants/constants';
import Spinner from '../Spinner/Spinner';
import { observer, observerDescriptions, observerTitles } from '../../constants/helperFunctions';

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
            <div className="landscapeImageContainer">
                <img src="images/landscape.png" alt="" className="landscapeImage" />
                <div className="homeFlexContainer">
                    <h1 className="homeLandscapeTitle">Discover Your New Home</h1>
                    <p className="homeLandscapeDescription">Helping Thousands Of Renters To Find Their Perfect Fit.</p>
                </div>
            </div>
            <Spinner open={openSpinner}/>
            <div className="exploreContainer">
                <h2 className="homeExploreTitle colorText">Explore Exclusive Offers</h2>
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
                <h2 className="homeExploreTitle colorText">Explore Properties For Sell</h2>
                <div className="exploreCards">
                    {propertiesList
                        .filter(property => property.type === "Sale")
                        .slice(0, 4)
                        .map(property => 
                        <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                    )}
                </div>
                <Link to="/sales">
                    <button className="exploreButton">View More</button>
                </Link>
            </div>
            <div className="exploreContainer">
                <h2 className="homeExploreTitle colorText">Explore Properties For Rent</h2>
                <div className="exploreCards">
                    {propertiesList
                        .filter(property => property.type === "Rent")
                        .slice(0, 4)
                        .map(property => 
                        <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                    )}
                </div>
                <Link to="/rentals">
                    <button className="exploreButton">View More</button>
                </Link>
            </div>
            <div className="mostSoldContainer">
                <h2 className="titleMostContainer colorText">The Most Sold Out Units</h2>
                <p className="textMostContainer colorText">With More Than Two Decades Of Experience Reaching New Hights</p>
                <div className="mostContent">
                    <div className="mostContentText">
                        <h3 className="colorText">Sell Your Apartment Simple</h3>
                        <p className="colorText">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis illo sit excepturi, explicabo rerum iure?</p>
                    </div>
                    <img src="images/networking.jpg" alt="" className="mostContentImage"/>
                </div>
            </div>
            <Map properties={propertiesList}/>
        </div>
    );
}

export default Home;