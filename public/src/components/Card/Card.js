import { Link } from 'react-router-dom';
import './Card.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

function Card({propertyInfo, favourites = {}, setFavourites, rerender}) {
    const [isFavourite, setIsFavourite] = useState(favourites[propertyInfo._id]);

    const getDescription = (description) => {
        return description.length > 100 ? description.slice(0, 100) + '...' : description;
    };

    const handleClickFav = (isFavourite, propertyId) => {
        let favs = {
            ...favourites,
            [propertyId]: isFavourite
        }
        setFavourites && setFavourites(favs);
        window.localStorage.setItem('favourites', JSON.stringify(favs));
        setIsFavourite(isFavourite);
    };

    return(
        <div className="exploreCard">
            <img src={`http://localhost:5000/${propertyInfo.images[0].destination}${propertyInfo.images[0].filename}`} alt="" className="exploreCardImage" />
            <div className="exploreCardInfo">
                <div className="exploreCardHead">
                    {isFavourite 
                        ? <FavoriteIcon className="favIcon" onClick={() => handleClickFav(false, propertyInfo._id)}/>
                        : <FavoriteBorderIcon className="favIcon" onClick={() => handleClickFav(true, propertyInfo._id)}/>
                    }
                    <h3 className="exploreCardTitle colorText">{propertyInfo.title}</h3>
                </div>
                <p className="exploreCardDescription colorText">{getDescription(propertyInfo.description)}</p>
                <p className="exploreCardPrice">&#128178;: {`${propertyInfo.price.number} ${propertyInfo.price.currency ? 'EUR' : 'BGN'}`}</p>
                <Link to={`/properties/details/${propertyInfo._id}`} className="exploreCardButtonContainer">
                    <button className="exploreCardButton" onClick={() => rerender && rerender()}>Details</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;