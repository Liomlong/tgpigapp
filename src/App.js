import React, { useState, useEffect } from 'react';
import { ThemeProvider, Button, Typography, Grid, Card, CardContent, CardActions, TextField, AppBar, Toolbar, Container, CssBaseline, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Paid as PaidIcon } from '@mui/icons-material';
import { Telegram as TelegramIcon } from '@mui/icons-material';
import theme from './theme';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';

const domains = [
    { name: 'act.tg', status: 'Available', price: 40 },
    { name: 'add.tg', status: 'Sold', price: 50 },
    { name: 'ape.tg', status: 'Sold', price: 60 },
    { name: 'are.tg', status: 'Available', price: 70 },
    { name: 'art.tg', status: 'Sold', price: 80 },
    { name: 'arm.tg', status: 'Available', price: 90 },
    // 添加其他域名
];

// 按首字母排序
domains.sort((a, b) => a.name.localeCompare(b.name));

const handlePurchase = (domainName) => {
    alert(`You have selected domain: ${domainName}`);
    // 这里添加购买逻辑
};

const DomainList = ({ domains, onPurchase }) => (
    <Grid container spacing={2}>
        {domains.map(domain => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={domain.name}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{domain.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            <PaidIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            {domain.price} TON
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            variant="outlined"
                            disabled={domain.status === 'Sold'}
                            style={{ color: domain.status === 'Sold' ? 'gray' : 'inherit' }}
                            onClick={() => onPurchase(domain.name)}
                        >
                            {domain.status === 'Sold' ? 'Sold' : 'Buy'}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
);

const TransactionStatus = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogContent style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
            <Typography variant="h6" style={{ marginTop: '20px' }}>Recording in the blockchain...</Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                The budget of the Telegram Ads account will be topped up as soon as the transaction is successfully recorded in the blockchain.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
    </Dialog>
);

const CloseConfirmation = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Exit</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to exit the application?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button onClick={onConfirm} color="secondary">Exit</Button>
        </DialogActions>
    </Dialog>
);

function App() {
    const [sortOrder, setSortOrder] = React.useState('price-high-to-low');
    const [transactionOpen, setTransactionOpen] = React.useState(false);
    const [closeConfirmOpen, setCloseConfirmOpen] = React.useState(false);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        // 添加排序逻辑
    };

    const handlePurchase = (domainName) => {
        setTransactionOpen(true);
        // 这里添加购买逻辑
    };

    const handleTransactionClose = () => {
        setTransactionOpen(false);
    };

    const handleCloseRequest = () => {
        setCloseConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setCloseConfirmOpen(false);
        // 执行关闭操作，例如 window.close();
    };

    const handleError = (error) => {
        console.error('TonConnect Error:', error);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            handleCloseRequest();
            return (event.returnValue = 'Are you sure you want to exit?');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json" onError={handleError}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>My TON App</Typography>
                        <Button
                            variant="contained"
                            startIcon={<TelegramIcon />}
                            style={{ backgroundColor: '#2A2A2A', color: 'white', marginRight: '10px' }}
                            onClick={() => alert('Connect Telegram')}
                        >
                            Connect Telegram
                        </Button>
                        <TonConnectButton />
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" style={{ marginTop: '20px' }}>
                    <Typography variant="h4" gutterBottom>Buy and Sell Domain Names</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter a domain name..."
                        style={{ marginBottom: '20px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Typography variant="h6">Auctions</Typography>
                        <Select
                            value={sortOrder}
                            onChange={handleSortChange}
                            variant="outlined"
                            style={{ width: '200px' }}
                        >
                            <MenuItem value="price-high-to-low">Price high to low</MenuItem>
                            <MenuItem value="price-low-to-high">Price low to high</MenuItem>
                            <MenuItem value="time-left">Time left</MenuItem>
                        </Select>
                    </div>
                    <DomainList domains={domains} onPurchase={handlePurchase} />
                </Container>
                <TransactionStatus open={transactionOpen} onClose={handleTransactionClose} />
                <CloseConfirmation open={closeConfirmOpen} onClose={() => setCloseConfirmOpen(false)} onConfirm={handleCloseConfirm} />
            </TonConnectUIProvider>
        </ThemeProvider>
    );
}

export default App;
