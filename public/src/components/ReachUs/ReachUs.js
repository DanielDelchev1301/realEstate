import './ReachUs.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CommentIcon from '@mui/icons-material/Comment';
import { Alert, Collapse, TextField } from '@mui/material';
import Map from "../Explore/Map";
import { getAllProperties } from "../../service/propertyService";
import { useEffect, useState } from "react";
import { sendMail } from "../../service/adminService";
import Badge from "../Badge/Badge";
import Spinner from '../Spinner/Spinner';
import { observer, observerBadge } from '../../constants/helperFunctions';
import { Helmet } from 'react-helmet-async';

function ReachUs() {
    const [propertiesList, setPropertiesList] = useState([]);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState({
        error: false,
        helperText: ''
    });
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openSpinner, setOpenSpinner] = useState(false);

    useEffect(() => {
        const reachUsForm = document.querySelector('.reachUsForm');
        const badgesForIntersection = document.querySelectorAll('.badgeContainer');
        observer.observe(reachUsForm);
        badgesForIntersection.forEach(badge => {
            observerBadge.observe(badge);
        });
    }, []);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const path = window.location.pathname;
        try {
            const properties = await getAllProperties(path);
            setPropertiesList(properties.data);
            window.scrollTo({top: 100, behavior: 'smooth'});
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMail = async () => {
        setOpenSpinner(true);
        try {
            await sendMail({name, email, message});
            setEmail('');
            setName('');
            setMessage('');
            setOpen(true);
            setOpenSpinner(false);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    const emailValidation = (email) => {
        setEmail(email);
        if (/^[A-Za-z0-9._%+-]+@\S[a-zA-Z0-9.-]+\.[a-z]{1,4}\S$/.test(email)) {
            setEmailError({
                error: false,
                helperText: ''
            });
            return null;
        }
        setEmailError({
            error: true,
            helperText: 'Въведи валиден имейл адрес, пример: (example@gmail.com)!'
        });
        return null;
    };

    const isButtonDisabled = () => {
        return !email.length || !name.length || !message.length || emailError.error;
    };

    return (
        <div className="reachUsMainContainer">
            <Helmet>
                <title>Ще Ви Помогнем да Изберете Най-Добрия Имот за Вас</title>
                <meta name="description" content="При Всякакви Въпроси не се Колебайте да се Свържете с Нас, Ще Отделим Време да Ви Помогнем с Всичко Необходимо" />
            </Helmet>
            <div className="reachUsContainer">
                <div className="reachUsContent">
                    <div className="reachUsForm">
                        <Collapse in={open}>
                            <Alert 
                                severity="success"
                                onClose={() => setOpen(false)}
                            >
                                Съобщението е изпратено успешно!
                            </Alert>
                        </Collapse>
                        <h2 className="reachUsTitle">Пиши ни</h2>
                        <Spinner open={openSpinner}/>
                        <div className="inputRow reachUsInputRow">
                            <AlternateEmailIcon className="inputIcon reachUsInputIcon"/>
                            <TextField
                                id="standard-basic-email"
                                label="Имейл"
                                variant="standard"
                                className="inputField"
                                error={emailError.error}
                                helperText={emailError.helperText}
                                value={email}
                                onChange={(e) => emailValidation(e.target.value)}
                            />
                        </div>
                        <div className="inputRow reachUsInputRow">
                            <AccountBoxIcon className="inputIcon reachUsInputIcon"/>
                            <TextField
                                id="standard-basic-name"
                                label="Име"
                                variant="standard"
                                className="inputField"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="inputRow reachUsInputRow">
                            <CommentIcon className="inputIcon reachUsInputIcon"/>
                            <TextField
                                id="standard-basic-message"
                                label="Съобщение"
                                variant="standard"
                                className="inputField"
                                multiline
                                maxRows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <button
                            className={`reachUsButton ${isButtonDisabled() ? '' : 'reachUsButtonCanHover'}`}
                            disabled={isButtonDisabled()}
                            onClick={handleSendMail}
                        >
                            Изпрати
                        </button>
                    </div>
                    <div className="reachUsInfo">
                        <h2 className="reachUsTitle">Брокери</h2>
                        <div className="badgesContainer">
                            <Badge phoneNumber={'0894443846'}/>
                            <Badge phoneNumber={'0894443846'}/>
                            <Badge phoneNumber={'0894443846'}/>
                            <Badge phoneNumber={'0894443846'}/>
                        </div>
                    </div>
                </div>
            </div>
            <Map properties={propertiesList}/>
        </div>
    );
}

export default ReachUs;