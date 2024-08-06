import React, { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Container, Typography } from '@mui/material';

const App = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log('Telegram WebApp initDataUnsafe:', window.Telegram.WebApp.initDataUnsafe);
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setUsername(user.username);
                console.log('Username set to:', user.username);
            }
        }
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome, {username ? username : 'User'}!
            </Typography>
            <TonConnectButton />
        </Container>
    );
};

export default App;
