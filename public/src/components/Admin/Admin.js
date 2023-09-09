import { Alert, Collapse, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './Admin.css';
import { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const isAdmin = JSON.parse(window.localStorage.getItem('user'))?.admin;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    const handleLoginButton = () => {
        if (username === 'admin' && password === 'admin') {
            console.log('Login successful!');
            window.localStorage.setItem('user', JSON.stringify({admin: "true"}));
        } else {
            console.log('Login failed!');
            setOpen(true);
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
                            <Collapse in={open}>
                                <Alert 
                                    severity="error"
                                    onClose={() => setOpen(false)}
                                >
                                    Wrong Username or Password!
                                </Alert>
                            </Collapse>
                            <div className="inputRow">
                                <AccountBoxIcon className="inputIcon"/>
                                <TextField
                                    id="standard-basic-username"
                                    label="Username"
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
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    className="inputField"
                                    color="warning"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="loginButton" onClick={handleLoginButton}>Login</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Admin;