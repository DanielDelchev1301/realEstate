import { useEffect, useState } from 'react';
import './FreeEvaluation.css';
import { getAllProperties } from '../../service/propertyService';
import Map from '../Explore/Map';
import { observer } from '../../constants/helperFunctions';
import { Alert, Autocomplete, Collapse, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CommentIcon from '@mui/icons-material/Comment';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BusinessIcon from '@mui/icons-material/Business';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import OpacityIcon from '@mui/icons-material/Opacity';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ChairIcon from '@mui/icons-material/Chair';
import GrassIcon from '@mui/icons-material/Grass';
import Spinner from '../Spinner/Spinner';
import { sendMail } from '../../service/adminService';
import { categoriesInfo, typeMaterial } from '../Admin/adminConstantsAndHelperFunctions';
import { defaultFreeEvaluationInfo } from '../../constants/constants';

function FreeEvaluation() {
    const [propertiesList, setPropertiesList] = useState([]);
    const [freeEvaluationInfo, setFreeEvaluationInfo] = useState(defaultFreeEvaluationInfo);
    const [open, setOpen] = useState(false);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [emailError, setEmailError] = useState({
        error: false,
        helperText: ''
    });

    useEffect(() => {
        const reachUsForm = document.querySelector('.freeEvaluationForm');
        observer.observe(reachUsForm);
    }, []);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const properties = await getAllProperties();
            setPropertiesList(properties.data);
            window.scrollTo({top: 100, behavior: 'smooth'});
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (value, key) => {
        setFreeEvaluationInfo({...freeEvaluationInfo, [key]: value});
    };

    const handleSendMail = async () => {
        setOpenSpinner(true);
        let message = `Name: ${freeEvaluationInfo.name}\nEmail: ${freeEvaluationInfo.email}\nPhone: ${freeEvaluationInfo.phone}\nAddress: ${freeEvaluationInfo.address}\nSquare Meters: ${freeEvaluationInfo.squareMeters}\nType: ${freeEvaluationInfo.type}\nMaterial: ${freeEvaluationInfo.material}\nFurniture: ${freeEvaluationInfo.furniture}\nGarage: ${freeEvaluationInfo.garage}\nYard: ${freeEvaluationInfo.yard}\nMessage: ${freeEvaluationInfo.message}`; 
        try {
            await sendMail({name: freeEvaluationInfo.name, email: freeEvaluationInfo.email, message: message});
            setFreeEvaluationInfo(defaultFreeEvaluationInfo);
            setOpen(true);
            setOpenSpinner(false);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    const emailValidation = (email) => {
        setFreeEvaluationInfo({...freeEvaluationInfo, email: email});
        if (/^[A-Za-z0-9._%+-]+@\S[a-zA-Z0-9.-]+\.[a-z]{1,4}\S$/.test(email)) {
            setEmailError({
                error: false,
                helperText: ''
            });
            return null;
        }
        setEmailError({
            error: true,
            helperText: 'Enter valid email address (e.g. example@gmail.com)'
        });
        return null;
    };

    const isButtonDisabled = () => {
        return !freeEvaluationInfo.email.length ||
            !freeEvaluationInfo.name.length || 
            !freeEvaluationInfo.phone.length || 
            !freeEvaluationInfo.address.length || 
            !freeEvaluationInfo.squareMeters.length || 
            !freeEvaluationInfo.type.length || 
            !freeEvaluationInfo.material.length || 
            !freeEvaluationInfo.garage.length || 
            !freeEvaluationInfo.yard.length || 
            !freeEvaluationInfo.furniture.length || 
            emailError.error
        ;
    };

    return(
        <div className="freeEvaluationMainContainer">
            <div className="freeEvaluationContainer">
                <div className="freeEvaluationContent">
                    <div className="freeEvaluationForm">
                        <Collapse in={open}>
                            <Alert 
                                severity="success"
                                onClose={() => setOpen(false)}
                            >
                                Your message was sent successfully!
                            </Alert>
                        </Collapse>
                        <h2 className="freeEvaluationTitle">Write Us For Free Evaluation</h2>
                        <Spinner open={openSpinner}/>
                        <div className="inputRow freeEvaluationInputRow">
                            <AlternateEmailIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-email-evaluation"
                                label="Email"
                                required
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                error={emailError.error}
                                helperText={emailError.helperText}
                                value={freeEvaluationInfo.email}
                                onChange={(e) => emailValidation(e.target.value)}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <AccountBoxIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-name-evaluation"
                                label="Name"
                                required
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                value={freeEvaluationInfo.name}
                                onChange={(e) => handleChange(e.target.value, 'name')}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <PhoneIphoneIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-phone-evaluation"
                                type="number"
                                required
                                label="Phone"
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                value={freeEvaluationInfo.phone}
                                onChange={(e) => handleChange(e.target.value, 'phone')}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <BusinessIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-address-evaluation"
                                label="Address"
                                required
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                value={freeEvaluationInfo.address}
                                onChange={(e) => handleChange(e.target.value, 'address')}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <SquareFootIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-squareMeters-evaluation"
                                type="number"
                                required
                                label="Square Meters"
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                value={freeEvaluationInfo.squareMeters}
                                onChange={(e) => handleChange(e.target.value, 'squareMeters')}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <MapsHomeWorkIcon className="inputIcon freeEvaluationInputIcon"/>
                            <Autocomplete
                                value={freeEvaluationInfo.type}
                                onChange={(event, value) => handleChange(value, 'type')}
                                options={categoriesInfo.slice(1)}
                                getOptionLabel={(option) => option}
                                className="inputFieldFreeEvaluation"
                                renderInput={(params) => <TextField {...params} label="Property Type" required variant="outlined" />}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <OpacityIcon className="inputIcon freeEvaluationInputIcon"/>
                            <Autocomplete
                                value={freeEvaluationInfo.material}
                                onChange={(event, value) => handleChange(value, 'material')}
                                options={typeMaterial}
                                getOptionLabel={(option) => option}
                                className="inputFieldFreeEvaluation"
                                renderInput={(params) => <TextField {...params} label="Property Material" required variant="outlined" />}
                            />
                        </div>
                        <div className="inputRow freeEvaluationInputRow radioButtonsRow">
                            <div className="radioButtonsTitle">
                                <ChairIcon className="inputIcon freeEvaluationInputIcon"/>
                                <p><bold>Furniture</bold></p>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group-furniture"
                                value={freeEvaluationInfo.furniture}
                                onChange={(event, value) => handleChange(value, 'furniture')}
                            >
                                <FormControlLabel value="Furnished" control={<Radio />} label="Furnished"/>
                                <FormControlLabel value="Unfurnished" control={<Radio />} label="Unfurnished"/>
                                <FormControlLabel value="Semi-furnished" control={<Radio />} label="Semi-furnished"/>
                            </RadioGroup>
                        </div>
                        <div className="inputRow freeEvaluationInputRow radioButtonsRow">
                            <div className="radioButtonsTitle">
                                <WarehouseIcon className="inputIcon freeEvaluationInputIcon"/>
                                <p><bold>Garage</bold></p>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group-garage"
                                value={freeEvaluationInfo.garage}
                                onChange={(event, value) => handleChange(value, 'garage')}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes"/>
                                <FormControlLabel value="No" control={<Radio />} label="No"/>
                            </RadioGroup>
                        </div>
                        <div className="inputRow freeEvaluationInputRow radioButtonsRow">
                            <div className="radioButtonsTitle">
                                <GrassIcon className="inputIcon freeEvaluationInputIcon"/>
                                <p><bold>Yard</bold></p>
                            </div>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group-yard"
                                value={freeEvaluationInfo.yard}
                                onChange={(event, value) => handleChange(value, 'yard')}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes"/>
                                <FormControlLabel value="No" control={<Radio />} label="No"/>
                            </RadioGroup>
                        </div>
                        <div className="inputRow freeEvaluationInputRow">
                            <CommentIcon className="inputIcon freeEvaluationInputIcon"/>
                            <TextField
                                id="standard-basic-message-evaluation"
                                label="Message"
                                variant="standard"
                                className="inputFieldFreeEvaluation"
                                multiline
                                maxRows={6}
                                value={freeEvaluationInfo.message}
                                onChange={(e) => handleChange(e.target.value, 'message')}
                            />
                        </div>
                        <button
                            className={`freeEvaluationButton ${isButtonDisabled() ? '' : 'freeEvaluationButtonCanHover'}`}
                            disabled={isButtonDisabled()}
                            onClick={handleSendMail}
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>
            <Map properties={propertiesList}/>
        </div>
    );
}

export default FreeEvaluation;