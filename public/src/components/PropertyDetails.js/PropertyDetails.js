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
import { Alert, Autocomplete, Collapse, TextField } from '@mui/material';
import Spinner from '../Spinner/Spinner';
import { observer } from '../../constants/helperFunctions';
import { conditionOptions } from '../Admin/adminConstantsAndHelperFunctions';
import ImagesCloseView from '../ImagesCloseView/ImagesCloseView';
import { useNavigate } from 'react-router-dom';

function PropertyDetails() {
    const isAdmin = JSON.parse(window.localStorage.getItem('user'));

    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [property, setProperty] = useState(null);
    const [propertyForEdit, setPropertyForEdit] = useState(null);
    const [propertiesList, setPropertiesList] = useState([]);
    const [isFavourite, setIsFavourite] = useState(favourites && favourites[property && property._id]);
    const [rerender, setRerender] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [haveSymbolsForNewLine, setHaveSymbolsForNewLine] = useState(false);
    const [openAlert, setOpenAlert] = useState({
        shouldDelete: false,
        deleted: false,
        edited: false
    });
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openImagesCloseView, setOpenImagesCloseView] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const cardsForIntersection = document.querySelectorAll('.exploreCard');
        cardsForIntersection.forEach(card => {
            observer.observe(card);
        });
    }, [propertiesList]);

    useEffect(() => {
        window.scrollTo({top: 200, behavior: 'smooth'});
    }, [rerender]);

    useEffect(() => {
        setIsFavourite(favourites[property && property._id]);
    }, [property, favourites]);

    useEffect(() => {
        fetch();
    }, [rerender]);

    const fetch = async () => {
        setOpenSpinner(true);
        try {
            const propertyData = await getPropertyById(window.location.pathname.split('/').pop());
            const properties = await getAllProperties();
            setProperty(propertyData.data);
            setPropertiesList(properties.data);
            setPropertyForEdit(propertyData.data);
            setHaveSymbolsForNewLine(propertyData.data.description.includes('\r\n'));
            setOpenSpinner(false);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
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
        setOpenSpinner(true);
        try {
            let propertyInfo = {...property};
            property.price.currency ? propertyInfo.price.numberInBGN = Number(property.price.number) * 1.95583 : propertyInfo.price.numberInBGN = property.price.number;
            const editedProperty = await editProperty(propertyInfo);
            setProperty(editedProperty.data);
            setPropertyForEdit(editedProperty.data);
            setOpenAlert({...openAlert, edited: true});
            setHaveSymbolsForNewLine(editedProperty.data.description.includes('\r\n'));
            setEditMode(false);
            setOpenSpinner(false);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    const handleDelete = async (property) => {
        setOpenSpinner(true);
        try {
            await deleteProperty(property._id);
            setOpenSpinner(false);
            navigate(`/`);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    return (
        <div className="mainDetailsContainer">
            <h1 className="detailsTitle colorText">Виж По-Детайлна Информация За Имота</h1>
            <Spinner open={openSpinner}/>
            <ImagesCloseView open={openImagesCloseView} images={property && property.images} setOpenImagesCloseView={setOpenImagesCloseView}/>
            <div className="detailsContainer">
                <Carousel
                    className="carouselBox"
                    interval={openImagesCloseView ? '1000000000' : '3000'}
                    navButtonsAlwaysVisible={true}
                >
                    {property && property.images.map(image => (
                        <img src={`https://realestatebulgariaserver.onrender.com/${image.destination}${image.filename}`} alt="снимки на имота" className="propertyImage" onClick={() => setOpenImagesCloseView(true)}/>
                    ))}
                </Carousel>
                <div className="detailsInfo">
                    <div className="detailsCategories">
                        {property && property.categories.map((category, index) => (
                            <p key={category + '&&&' + index} className="detailsCategory">{category}</p>
                        ))}
                        <p className="detailsType">{property && property.type}</p>
                        <p className="squareMetersDetails colorText"><strong>{property && property.squareMeters}</strong> м²</p>
                        <p className="squareMetersDetails colorText"><strong>{new Intl.NumberFormat( "bg-BG", { style: "currency", currency: property && property.price.currency ? "EUR" : "BGN" }).format(property && (property.price.number / property.squareMeters))}</strong>/м²</p>
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
                                Сигурни ли сте, че искате да изтриете имота?
                            </Alert>
                    </Collapse>
                    <Collapse in={openAlert.deleted}>
                            <Alert 
                                severity="success"
                                onClose={() => setOpenAlert({...openAlert, deleted: false})}
                            >
                                Имота е изтрит успешно!
                            </Alert>
                    </Collapse>
                    <Collapse in={openAlert.edited}>
                            <Alert 
                                severity="success"
                                action={
                                    <ClearIcon className="adminButton" onClick={() => setOpenAlert({...openAlert, edited: false})}/>
                                }
                            >
                                Имота е редактиран успешно!
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
                                    label="Заглавие"
                                    variant="standard"
                                />
                                <TextField 
                                    value={propertyForEdit.price.number}
                                    onChange={(event) => handleChange(event.target.value, 'price')}
                                    id="standard-basic-price"
                                    type="number"
                                    className="inputFieldDetails"
                                    label="Цена"
                                    variant="standard"
                                />
                            </>
                            : <>
                                <h1>{property && property.title}</h1>
                                <p>Цена: <strong>{new Intl.NumberFormat( "bg-BG", { style: "currency", currency: property && property.price.currency ? "EUR" : "BGN" }).format(property && property.price.number)}</strong></p>
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
                                        label="Адрес"
                                        variant="standard"
                                    />
                                    <TextField 
                                        value={propertyForEdit.ownerName}
                                        onChange={(event) => handleChange(event.target.value, 'ownerName')}
                                        id="standard-basic-ownerName"
                                        className="inputFieldDetails"
                                        label="Име на собственик"
                                        variant="standard"
                                    />
                                    <TextField 
                                        value={propertyForEdit.ownerPhoneNumber}
                                        onChange={(event) => handleChange(event.target.value, 'ownerPhoneNumber')}
                                        id="standard-basic-ownerPhoneNumber"
                                        type="number"
                                        className="inputFieldDetails"
                                        label="Телефон на собственик"
                                        variant="standard"
                                    />
                                </>
                                : <>
                                    <p className="addressInfo colorText">Адрес: <strong>{property && property.address.address}</strong></p>
                                    <p className="ownerNameInfo colorText">Име на собственик: <strong>{property && property.ownerName}</strong></p>
                                    <p className="ownerPhoneInfo colorText">Телефон на собственик: <strong>{property && property.ownerPhoneNumber}</strong>
                                        <a href={`tel:${property && property.ownerPhoneNumber}`}>
                                            <CallIcon className="callUsIcon"/>
                                        </a>
                                    </p>
                                </>
                            }
                        </div>
                    }
                    <p className="howManyTimePropertyHaveBeenSeen colorText">Видяна <strong>{property && property.seen}</strong> пъти</p>
                    {isAdmin && isAdmin.admin && editMode
                        ?   <Autocomplete
                            value={propertyForEdit.condition}
                            onChange={(event, value) => handleChange(value, 'condition')}
                            options={conditionOptions}
                            getOptionLabel={(option) => option}
                            className="categoriesSelectFilter"
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                        :   <p className={`propertyCondition ${property && property.condition === 'Завършен' ? 'conditionGreen' : 'conditionOrange'} colorText`}>Състояние: <strong>{property && property.condition}</strong></p>
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
                                        label="Описаание"
                                        variant="standard"
                                        multiline
                                        maxRows={10}
                                    />
                                </>
                                : <>
                                    {haveSymbolsForNewLine
                                        ? <pre>{property && property.description}</pre>
                                        : <p>{property && property.description}</p>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <a href="tel:0894443846" className="forMoreInformation">
                        <button>Обади ни се
                                <CallIcon className="callUsIcon"/>
                        </button>
                    </a>
                    {property && 
                        <Map properties={[property]}/>
                    }
                </div>
            </div>
            <h2 className="homeExploreTitleDetails colorText">Подобни Оферти</h2>
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