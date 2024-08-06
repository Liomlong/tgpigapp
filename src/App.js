import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Container, Typography, TextField, Select, MenuItem, Card, CardContent, Button } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import domains from './domains';

const App = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                My TON App
            </Typography>
            <TonConnectButton />
            <TextField label="Enter a domain name..." variant="outlined" fullWidth margin="normal" />
            <Typography variant="h6" gutterBottom>
                Auctions
            </Typography>
            <Select defaultValue="price-high-to-low" fullWidth>
                <MenuItem value="price-high-to-low">Price high to low</MenuItem>
                <MenuItem value="price-low-to-high">Price low to high</MenuItem>
            </Select>
            {domains.sort((a, b) => a.name.localeCompare(b.name)).map((domain, index) => (
                <Card key={index} variant="outlined" style={{ margin: '16px 0' }}>
                    <CardContent>
                        <Typography variant="h6">{domain.name}</Typography>
                        <Typography variant="body2">{domain.status}</Typography>
                        <Button
                            variant="contained"
                            color={domain.status === 'Sold' ? 'default' : 'primary'}
                            disabled={domain.status === 'Sold'}
                        >
                            {domain.status === 'Sold' ? 'Sold' : 'Buy'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default App;
