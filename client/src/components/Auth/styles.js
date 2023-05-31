

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => {
  const themeInstance = useTheme();

  return {
    paper: {
      // marginTop: themeInstance.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      padding: themeInstance.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        
        margin: themeInstance.spacing(1),
      },
    },
    avatar: {
      margin: themeInstance.spacing(1),
      backgroundColor: themeInstance.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: themeInstance.spacing(3),
    },
    // submit: {
    //   margin: themeInstance.spacing(3, 0, 2),
    // },
    // googleButton: {
    //   marginBottom: themeInstance.spacing(2),
    // },
  };
});

export default useStyles;
