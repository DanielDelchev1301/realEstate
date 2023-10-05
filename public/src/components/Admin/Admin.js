import { Alert, Collapse, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './Admin.css';
import { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';
import { loginAsAdmin } from '../../service/adminService';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const isAdmin = JSON.parse(window.localStorage.getItem('user'))?.admin;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    const handleLoginButton = async () => {
        try {
            const isAdmin = await loginAsAdmin({username, password});
            if (isAdmin.status === 200) {
                window.localStorage.setItem('user', JSON.stringify({admin: "true"}));
                setOpenSuccess(true);
            }
        } catch (error) {
            console.error(error);
            setOpenError(true);
        }
        setUsername('');
        setPassword('');
    }

    return(
        <div className="adminMainContainer">
            <div className="adminContainer">
                {isAdmin
                    ? <AdminPanel />
                    : <div className="loginFlex">
                        <div className="loginForm">
                            <AccountBalanceIcon className="accountBalanceIcon"/>
                            <Collapse in={openSuccess}>
                                <Alert 
                                    severity="success"
                                    onClose={() => setOpenSuccess(false)}
                                >
                                    Успешен логин!
                                </Alert>
                            </Collapse>
                            <Collapse in={openError}>
                                <Alert 
                                    severity="error"
                                    onClose={() => setOpenError(false)}
                                >
                                    Невалидно потребителско име или парола!
                                </Alert>
                            </Collapse>
                            <div className="inputRow">
                                <AccountBoxIcon className="inputIcon"/>
                                <TextField
                                    id="standard-basic-username"
                                    label="Потребителско име"
                                    variant="standard"
                                    className="inputField"
                                    color="warning"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="inputRow">
                                <LockIcon className="inputIcon"/>
                                <TextField
                                    id="standard-basic-password"
                                    label="Парола"
                                    variant="standard"
                                    type="password"
                                    className="inputField"
                                    color="warning"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="loginButton" onClick={handleLoginButton}>Логин</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Admin;