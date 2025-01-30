import {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const SearchBox=(props) =>{

  const [searchTxt, setSearchTxt]= useState("");

  const handleKeyUp= (event) =>{
    console.log("event.target.value=",event.target.value)
    setSearchTxt(event.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        name='searchTxt'
        placeholder={props.placeholder}
        inputProps={{ 'aria-label': props.placeholder }}
        onKeyUp={handleKeyUp}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
        <SearchIcon onClick={props.action ? props.action(searchTxt):'' } />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBox;