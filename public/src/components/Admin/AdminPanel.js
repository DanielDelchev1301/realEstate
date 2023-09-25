import './AdminPanel.css';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CategoryIcon from '@mui/icons-material/Category';
import ContrastIcon from '@mui/icons-material/Contrast';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BedIcon from '@mui/icons-material/Bed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConstructionIcon from '@mui/icons-material/Construction';
import { DropzoneArea } from 'material-ui-dropzone';
import { Autocomplete, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createProperty } from '../../service/adminService';
import { initialPropertyInfo, categoriesInfo, typeOptions, appendPropertyInfo, isButtonDisabled, conditionOptions } from './adminConstantsAndHelperFunctions.js';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import Spinner from '../Spinner/Spinner';
import { GOOGLE_MAP_API_KEY } from '../../constants/constants';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AdminPanel() {
    const [checked, setChecked] = useState(false);
    const [_formData, setFormData] = useState({});
    const [propertyInfo, setPropertyInfo] = useState(initialPropertyInfo);
    const [googleValue, setGoogleValue] = useState(null);
    const [openSpinner, setOpenSpinner] = useState(false);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    useEffect(() => {
        if (googleValue && googleValue.value && googleValue.value['place_id']) {
            geocodeByPlaceId(googleValue.value['place_id'])
                .then(results => {
                    console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    console.log(results[0].formatted_address);
                    setPropertyInfo({
                        ...propertyInfo,
                        addressInfo: {
                            address: results[0].formatted_address,
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }
                    });
                })
                .catch(error => console.error(error));
        }
    }, [googleValue]);

    useEffect(() => {
       setPropertyInfo({...propertyInfo, price: {...propertyInfo.price, currency: checked ? 1 : 0}});
    }, [checked]);

    const handleChange = (value, key) => {
        if (key === 'price') {
            setPropertyInfo({...propertyInfo, price: {...propertyInfo.price, number: value}});
        } else {
            setPropertyInfo({...propertyInfo, [key]: value});
        }
    }

    const handleCreateProperty = async () => {
        setOpenSpinner(true);
        try {
            let _propertyInfo = {...propertyInfo};
            propertyInfo.price.currency ? _propertyInfo.price.numberInBGN = Number(propertyInfo.price.number) * 1.95583 : _propertyInfo.price.numberInBGN = propertyInfo.price.number;
            const formData = appendPropertyInfo(_formData, _propertyInfo);
            const property = await createProperty(formData);
            setPropertyInfo(initialPropertyInfo);
            setFormData({});
            setOpenSpinner(false);
            window.location.replace(`/properties/details/${property.data._id}`);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    }

    const handleChangeDropzone = (files) => {
        let formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });
        setFormData(formData);
        setPropertyInfo({...propertyInfo, images: files});
    }

    return(
        <div className="adminPanelContainer">
            <div className="adminForm">
                <AddBusinessIcon className="adminFormIcon"/>
                <Spinner open={openSpinner}/>
                <div className="inputRow">
                    <DriveFileRenameOutlineIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.title}
                        onChange={(event) => handleChange(event.target.value, 'title')}
                        id="standard-basic-title"
                        className="inputField"
                        label="Title"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <ArticleIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.description}
                        onChange={(event) => handleChange(event.target.value, 'description')}
                        id="standard-basic-description"
                        className="inputField"
                        label="Description"
                        variant="standard"
                        color="warning"
                        multiline
                        maxRows={4}
                    />
                </div>
                <div className="inputRow">
                    <BadgeIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.ownerName}
                        onChange={(event) => handleChange(event.target.value, 'ownerName')}
                        id="standard-basic-ownerName"
                        className="inputField"
                        label="Owner Name"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <PhoneIphoneIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.ownerPhoneNumber}
                        onChange={(event) => handleChange(event.target.value, 'ownerPhoneNumber')}
                        id="standard-basic-ownerPhoneNumber"
                        className="inputField"
                        type="number"
                        label="Owner Phone Number"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <SquareFootIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.squareMeters}
                        onChange={(event) => handleChange(event.target.value, 'squareMeters')}
                        id="standard-basic-squareMeters"
                        className="inputField"
                        type="number"
                        label="Square Meters"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <BedIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.rooms}
                        onChange={(event) => handleChange(event.target.value, 'rooms')}
                        id="standard-basic-rooms"
                        className="inputField"
                        type="number"
                        label="Rooms"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <CalendarMonthIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.builtIn}
                        onChange={(event) => handleChange(event.target.value, 'builtIn')}
                        id="standard-basic-builtIn"
                        className="inputField"
                        type="number"
                        label="Built In"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className="inputRow inputPrice">
                    <PriceChangeIcon className="inputIcon"/>
                    <TextField 
                        value={propertyInfo.price.number}
                        onChange={(event) => handleChange(event.target.value, 'price')}
                        id="standard-basic-price"
                        type="number"
                        className="inputField"
                        label="Price"
                        variant="standard"
                        color="warning"
                    />
                    <Switch
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        {...label}
                        color="warning"
                    />
                    <p className="colorText">{checked ? "EUR" : "BGN"}</p>
                </div>
                <div className="inputRow">
                    <BusinessIcon className="inputIcon"/>
                    <GooglePlacesAutocomplete 
                        apiKey={GOOGLE_MAP_API_KEY}
                        selectProps={{
                            placeholder: 'Type property address...',
                            googleValue,
                            onChange: setGoogleValue,
                            className: "googlePlacesAutocomplete",
                        }}
                        color="warning"
                    />
                </div>
                <div className="inputRow">
                    <CategoryIcon className="inputIcon"/>
                    <div className="categoriesSelectContainer">
                        <InputLabel id="demo-simple-select-label" >Categories</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined"
                            multiple
                            displayEmpty
                            className="categoriesSelect"
                            color="warning"
                            value={propertyInfo.categories}
                            onChange={(event) => {
                                const { value } = event.target;
                                setPropertyInfo({...propertyInfo, categories: typeof value === 'string' ? value.split(',') : value});
                            }}
                        >
                            {categoriesInfo && categoriesInfo.map((category) => (
                                <MenuItem
                                    key={`${category}-key`}
                                    value={category}
                                >
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="inputRow">
                    <ContrastIcon className="inputIcon"/>
                    <Autocomplete 
                        value={propertyInfo.type}
                        onChange={(event, value) => handleChange(value, 'type')}
                        options={typeOptions}
                        getOptionLabel={(option) => option}
                        className="inputField typeField"
                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" color="warning" />}
                    />
                </div>
                <div className="inputRow">
                    <ConstructionIcon className="inputIcon"/>
                    <Autocomplete 
                        value={propertyInfo.condition}
                        onChange={(event, value) => handleChange(value, 'condition')}
                        options={conditionOptions}
                        getOptionLabel={(option) => option}
                        className="inputField typeField"
                        renderInput={(params) => <TextField {...params} label="Condition" variant="outlined" color="warning" />}
                    />
                </div>
                <DropzoneArea 
                    dropzoneClass="dropzoneArea"
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click."}
                    onChange={(files) => handleChangeDropzone(files)}
                    filesLimit={10}
                    showPreviews={true}
                    showPreviewsInDropzone={false}
                />
                <button
                    disabled={isButtonDisabled(propertyInfo)}
                    className={`createEstateButton ${isButtonDisabled(propertyInfo) ? 'disabledButton' : ''}`}
                    onClick={handleCreateProperty}
                >Create</button>
            </div>
        </div>
    );
}

export default AdminPanel;