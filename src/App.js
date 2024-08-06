import React, { useEffect, useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import domains from './domains';

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
            <TonConnectButton />
            <Typography variant="h6" gutterBottom>
                Domains for Sale
            </Typography>
            {domains.sort((a, b) => a.name.localeCompare(b.name)).map((domain, index) => (
                <Card key={index} variant="outlined" style={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardContent>
                        <Typography variant="h6">{domain.name}</Typography>
                        <Typography variant="body2">{domain.status}</Typography>
                    </CardContent>
                    <Button
                        variant="contained"
                        color={domain.status === 'Sold' ? 'default' : 'primary'}
                        disabled={domain.status === 'Sold'}
                        style={{ marginRight: '16px' }}
                    >
                        {domain.status === 'Sold' ? 'Sold' : 'Buy'}
                    </Button>
                </Card>
            ))}
        </Container>
    );
};

export default App;
