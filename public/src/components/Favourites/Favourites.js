import { useEffect, useState } from 'react';
import './Favourites.css';
import { getPropertiesById } from '../../service/propertyService';
import Card from '../Card/Card';

function Favourites() {
    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [favouritesList, setFavouritesList] = useState([]);

    useEffect(() => {
        fetch();
        console.log('fetch');
    }, [favourites]);

    const fetch = async () => {
        let favList = [];
        for(let key in favourites) {
            if (favourites[key]) {
                favList.push(key);
            }
        }

        if (favList.length) {
            try {
                const properties = await getPropertiesById(favList);
                setFavouritesList(properties.data);
            } catch (error) {
                console.error(error);
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
                    <h2 className="favouritesLandscapeTitle">Search Thru Your Favourite Properties</h2>
                </div>
            </div>
            <div className="favouritesContainer">
                <h3 className="favouritesTitle colorText">Favourites</h3>
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