import { useEffect, useState } from 'react';
import './PropertyDetails.css';
import { deleteProperty, editProperty, getAllProperties, getPropertyById } from '../../service/propertyService.js';
import Carousel from 'react-material-ui-carousel';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BedIcon from '@mui/icons-material/Bed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CallIcon from '@mui/icons-material/Call';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Map from '../Explore/Map.js';
import Card from '../Card/Card.js';
import { Alert, Collapse, TextField } from '@mui/material';

function PropertyDetails() {
    const isAdmin = JSON.parse(window.localStorage.getItem('user'));

    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [property, setProperty] = useState(null);
    const [propertyForEdit, setPropertyForEdit] = useState(null);
    const [propertiesList, setPropertiesList] = useState([]);
    const [isFavourite, setIsFavourite] = useState(favourites && favourites[property && property._id]);
    const [rerender, setRerender] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [openAlert, setOpenAlert] = useState({
        shouldDelete: false,
        deleted: false,
        edited: false
    });

    useEffect(() => {
        setIsFavourite(favourites[property && property._id]);
    }, [property, favourites]);

    useEffect(() => {
        fetch();
    }, [favourites, rerender]);

    const fetch = async () => {
        try {
            const propertyData = await getPropertyById(window.location.pathname.split('/').pop());
            const properties = await getAllProperties();
            setProperty(propertyData.data);
            setPropertiesList(properties.data);
            setPropertyForEdit(propertyData.data);
        } catch (error) {
            console.error(error);
        }
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

    const handleChange = (value, key) => {
        if (key === 'price') {
            setPropertyForEdit({...propertyForEdit, price: {...propertyForEdit.price, number: value}});
        } else if (key === 'address') {
            setPropertyForEdit({...propertyForEdit, address: {...propertyForEdit.address, address: value}});
        } else {
            setPropertyForEdit({...propertyForEdit, [key]: value});
        }
    };

    const handleEdit = async (property) => {
        try {
            const editedProperty = await editProperty(property);
            setProperty(editedProperty.data);
            setPropertyForEdit(editedProperty.data);
            setOpenAlert({...openAlert, edited: true});
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (property) => {
        try {
            await deleteProperty(property._id);
            window.location.replace(`/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mainDetailsContainer">
            <h1 className="detailsTitle colorText">Check More Detailed Info About This Property</h1>
            <div className="detailsContainer">
                <Carousel
                    className="carouselBox"
                >
                    {property && property.images.map(image => (
                        <img src={`http://localhost:5000/${image.destination}${image.filename}`} alt="" className="propertyImage" />
                    ))}
                </Carousel>
                <div className="detailsInfo">
                    <div className="detailsCategories">
                        {property && property.categories.map((category, index) => (
                            <p key={category + '&&&' + index} className="detailsCategory">{category}</p>
                        ))}
                        <p className="detailsType">{property && property.type}</p>
                        {isFavourite
                            ? <FavoriteIcon className="favIconDetails" onClick={() => handleClickFav(false, property._id)}/>
                            : <FavoriteBorderIcon className="favIconDetails" onClick={() => handleClickFav(true, property._id)}/>
                        }
                    </div>
                    <Collapse in={openAlert.shouldDelete}>
                            <Alert 
                                severity="warning"
                                action={
                                    <>
                                        <CheckIcon className="adminButton" onClick={() => handleDelete(property)}/>
                                        <ClearIcon className="adminButton" onClick={() => setOpenAlert({...openAlert, shouldDelete: false})}/>
                                    </>
                                }
                            >
                                Are you sure you want to delete this property?
                            </Alert>
                    </Collapse>
                    <Collapse in={openAlert.deleted}>
                            <Alert 
                                severity="success"
                                onClose={() => setOpenAlert({...openAlert, deleted: false})}
                            >
                                Property is deleted successfully!
                            </Alert>
                    </Collapse>
                    <Collapse in={openAlert.edited}>
                            <Alert 
                                severity="success"
                                action={
                                    <ClearIcon className="adminButton" onClick={() => setOpenAlert({...openAlert, edited: false})}/>
                                }
                            >
                                Property is edited successfully!
                            </Alert>
                    </Collapse>
                    <div className="detailsHeader colorText">
                        {editMode
                            ? <>
                                <TextField 
                                    value={propertyForEdit.title}
                                    onChange={(event) => handleChange(event.target.value, 'title')}
                                    id="standard-basic-title"
                                    className="inputFieldDetails"
                                    label="Title"
                                    variant="standard"
                                />
                                <TextField 
                                    value={propertyForEdit.price.number}
                                    onChange={(event) => handleChange(event.target.value, 'price')}
                                    id="standard-basic-price"
                                    type="number"
                                    className="inputFieldDetails"
                                    label="Price"
                                    variant="standard"
                                />
                            </>
                            : <>
                                <h1>{property && property.title}</h1>
                                <p>Price: <span>{property && property.price.number}</span> {property && property.price.currency ? 'EUR' : 'BGN'}</p>
                            </>
                        }
                        {isAdmin && isAdmin.admin && 
                            <div className="adminButtons">
                                {editMode 
                                    ? <>
                                        <CheckIcon className="adminButton" onClick={() => handleEdit(propertyForEdit)}/>
                                        <ClearIcon className="adminButton" onClick={() => {
                                            setEditMode(false);
                                            setPropertyForEdit(property);
                                        }}/>
                                    </>
                                    : <>
                                        <EditIcon className="adminButton" onClick={() => setEditMode(true)}/>
                                        <DeleteIcon className="adminButton" onClick={() => setOpenAlert({...openAlert, shouldDelete: true})}/>
                                    </>
                                }
                            </div>
                        }
                    </div>
                    {isAdmin && isAdmin.admin &&
                        <div className="detailsAdminInfo">
                            {editMode
                                ? <>
                                    <TextField 
                                        value={propertyForEdit.address.address}
                                        onChange={(event) => handleChange(event.target.value, 'address')}
                                        id="standard-basic-address"
                                        className="inputFieldDetails"
                                        label="Address"
                                        variant="standard"
                                    />
                                    <TextField 
                                        value={propertyForEdit.ownerName}
                                        onChange={(event) => handleChange(event.target.value, 'ownerName')}
                                        id="standard-basic-ownerName"
                                        className="inputFieldDetails"
                                        label="Owner Name"
                                        variant="standard"
                                    />
                                    <TextField 
                                        value={propertyForEdit.ownerPhoneNumber}
                                        onChange={(event) => handleChange(event.target.value, 'ownerPhoneNumber')}
                                        id="standard-basic-ownerPhoneNumber"
                                        type="number"
                                        className="inputFieldDetails"
                                        label="Owner Phone Number"
                                        variant="standard"
                                    />
                                </>
                                : <>
                                    <p className="addressInfo colorText">Address: {property && property.address.address}</p>
                                    <p className="ownerNameInfo colorText">Owner Name: {property && property.ownerName}</p>
                                    <p className="ownerPhoneInfo colorText">Owner Phone: {property && property.ownerPhoneNumber}
                                        <a href={`tel:${property && property.ownerPhoneNumber}`}>
                                            <CallIcon />
                                        </a>
                                    </p>
                                </>
                            }
                        </div>
                    }
                    <div className="detailsMainInfo">
                        <div className="detailsRows">
                            <div className="detailsRow">
                                <p className="colorText">{property && property.rooms}</p>
                                <BedIcon className="detailsRowIcon"/>
                            </div>
                            <div className="detailsRow">
                                <p className="colorText">{property && property.squareMeters}</p>
                                <SquareFootIcon className="detailsRowIcon"/>
                            </div>
                            <div className="detailsRow">
                                <p className="colorText">{property && property.builtIn}</p>
                                <CalendarMonthIcon className="detailsRowIcon"/>
                            </div>
                        </div>
                        <div className="detailsDescription colorText">
                            {editMode
                                ? <>
                                    <TextField 
                                        value={propertyForEdit.description}
                                        onChange={(event) => handleChange(event.target.value, 'description')}
                                        id="standard-basic-description"
                                        className="inputFieldDetailsDescription"
                                        label="Description"
                                        variant="standard"
                                        multiline
                                        maxRows={10}
                                    />
                                </>
                                : <>
                                    <p>{property && property.description}</p>
                                </>
                            }
                        </div>
                    </div>
                    {property && 
                        <Map properties={[property]}/>
                    }
                </div>
            </div>
            <h2 className="homeExploreTitleDetails colorText">More Similar Offers</h2>
            <div className="exploreCardsInDetails">
                {propertiesList.length && property && propertiesList
                    .filter(_property => _property.categories.some(category => property.categories.includes(category)))
                    .slice(0, 4)
                    .map(property => 
                        <Card
                            key={property._id}
                            propertyInfo={property}
                            favourites={favourites}
                            setFavourites={setFavourites}
                            rerender={() => setRerender(!rerender)}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default PropertyDetails;