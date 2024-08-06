import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0098EA',
        },
        background: {
            default: '#F7F9FB',
        },
    },
    typography: {
        fontFamily: 'Inter, Arial, sans-serif',
    },
});

export default theme;
