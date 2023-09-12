import { useEffect, useState } from 'react';
import './Favourites.css';
import { getPropertiesById } from '../../service/propertyService';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import { observer } from '../../constants/helperFunctions';

function Favourites() {
    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [favouritesList, setFavouritesList] = useState([]);
    const [openSpinner, setOpenSpinner] = useState(false);

    useEffect(() => {
        const cardsForIntersection = document.querySelectorAll('.exploreCard');
        cardsForIntersection.forEach(card => {
            observer.observe(card);
        });
    }, [favouritesList]);

    useEffect(() => {
        window.scrollTo({top: 150, behavior: 'smooth'});
    }, []);

    useEffect(() => {
        fetch();
    }, [favourites]);

    const fetch = async () => {
        let favList = [];
        for(let key in favourites) {
            if (favourites[key]) {
                favList.push(key);
            }
        }

        if (favList.length) {
            setOpenSpinner(true);
            try {
                const properties = await getPropertiesById(favList);
                setFavouritesList(properties.data);
                setOpenSpinner(false);
            } catch (error) {
                console.error(error);
                setOpenSpinner(false);
            }
        } else {
            setFavouritesList([]);
        }
    };
    return (
        <div className="favouritesMainContainer">
            <div className="landscapeImageContainer">
                <img src="images/urbanDarken.png" alt="" className="landscapeImage" />
                <div className="favouritesFlexContainer">
                    <h2 className="favouritesLandscapeTitle">Search Through Your Favourite Properties</h2>
                </div>
            </div>
            <div className="favouritesContainer">
                <h3 className="favouritesTitle colorText">Favourites</h3>
                <Spinner open={openSpinner}/>
                {favouritesList.length 
                    ?   <div className="favouriteCards">
                            {favouritesList.map(property => 
                                <Card key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites} />
                            )}
                        </div>
                    :   <p className="favouritesEmpty colorText">You don't have any favourites yet.</p>
                }
            </div>
        </div>
    );
}

export default Favourites;