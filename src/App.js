import React, { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Container, Typography, Button } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

const App = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setUsername(user.username);
            }
        }
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome, {username ? username : 'User'}!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<TelegramIcon />}
                style={{ marginRight: '10px' }}
            >
                Log in as {username ? username : 'User'}
            </Button>
            <TonConnectButton />
        </Container>
    );
};

export default App;
