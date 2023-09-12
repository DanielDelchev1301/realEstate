import { Link } from 'react-router-dom';
import './Card.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

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
            <Carousel className="exploreCardCarousel" interval={10000}>
                {propertyInfo && propertyInfo.images.map(image => (
                    <img src={`http://localhost:5000/${image.destination}${image.filename}`} alt="" className="exploreCardImage" />
                ))}
            </Carousel>
            <div className="exploreCardInfo">
                <div className="exploreCardHead">
                    {isFavourite 
                        ? <FavoriteIcon className="favIcon" onClick={() => handleClickFav(false, propertyInfo._id)}/>
                        : <FavoriteBorderIcon className="favIcon" onClick={() => handleClickFav(true, propertyInfo._id)}/>
                    }
                    <h3 className="exploreCardTitle colorText">{propertyInfo.title}</h3>
                </div>
                <div>
                    <p className="exploreCardDescription colorText">{getDescription(propertyInfo.description)}</p>
                    <p className="exploreCardPrice colorText"><strong>{new Intl.NumberFormat( "bg-BG", { style: "currency", currency: propertyInfo.price.currency ? "EUR" : "BGN" }).format(propertyInfo.price.number)}</strong></p>
                    <Link to={`/properties/details/${propertyInfo._id}`} className="exploreCardButtonContainer">
                        <button className="exploreCardButton" onClick={() => rerender && rerender()}>Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;