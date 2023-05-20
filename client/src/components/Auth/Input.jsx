import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({ name, half, label, handleChange, autoFocus, type, handleShowPassword ,pattern}) => {
  const [isValid, setIsValid] = useState(true);

  const handleValidity = (e) => {
    setIsValid(e.target.validity.valid);
  };
  const inputStyle = {
    color: isValid ? "inherit" : "red",
  };
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        onInput={handleValidity}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputProps={{
          pattern: pattern,
          style: inputStyle
        }}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
