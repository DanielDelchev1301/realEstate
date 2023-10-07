import FmdGoodIcon from '@mui/icons-material/FmdGood';
import "./Map.css";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observerMap } from "../../constants/helperFunctions";
import { GOOGLE_MAP_API_KEY, defaultProps } from '../../constants/constants';

function Map({properties}) {
    const [previewCardVisible, setPreviewCardVisible] = useState({});

    const isAdmin = JSON.parse(window.localStorage.getItem('user'));

    useEffect(() => {
        const mapContainer = document.querySelector('.mapContainer');
        observerMap.observe(mapContainer);
    });

    useEffect(() => {
        const previewCardVisible = {};
        properties.forEach(property => {
            previewCardVisible[property._id] = false;
        });
        setPreviewCardVisible(previewCardVisible);
    }, [properties]);

    return(
        <div className="mapContainer">
            <h2 className="mapTitle colorText">Намери ни на картата</h2>
            <div className="googleMap">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY, libraries: ['places']}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                >
                    <div className="headPin"
                        lat={defaultProps.center.lat}
                        lng={defaultProps.center.lng}
                        onClick={() => console.log('Office building')}
                    >
                        <FmdGoodIcon className="pinIcon" color="primary"/>
                        <p className="pinText">Офис</p>
                    </div>
                    {isAdmin && isAdmin.admin && properties && properties.map(property => (
                        <div className="pin"
                            key={property._id}
                            lat={property.address.lat}
                            lng={property.address.lng}
                            onClick={() => setPreviewCardVisible({...previewCardVisible, [property._id]: !previewCardVisible[property._id]})}
                        >
                            {previewCardVisible[property._id] &&
                                <div className="previewCard">
                                    <img src={`https://realestatebulgariaserver.onrender.com/${property.images[0].destination}${property.images[0].filename}`} alt="снимка на имота" className="previewImageCard" />
                                    <div className="previewCardContent">
                                        <h3 className="previewCardTitle colorText">{property.title}</h3>
                                        <Link to={`/properties/details/${property._id}`} className="previewCardButtonContainer">
                                            <button className="previewCardButton">Виж повече</button>
                                        </Link>
                                    </div>
                                </div>
                            }
                            <FmdGoodIcon className="pinIcon" color="success"/>
                        </div>
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default Map;