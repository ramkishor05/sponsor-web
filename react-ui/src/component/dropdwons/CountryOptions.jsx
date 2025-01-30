import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import { getGlobalCountryList} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const CountryOptions= (props) =>  {
    
  const { globalCountryList} = useSelector(state => state.globalCountryReducer);

  const countryId = props.countryId;

  const dispatch=useDispatch();

  const onSeach = async (event)=>{
      props.setCountry(event.target.value);
  }

  useEffect(()=>{
     dispatch(getGlobalCountryList());
  },[getGlobalCountryList])

  return (
    <Select variant='standard'
    value={countryId?countryId : ''}
    onChange={onSeach} sx={{width: '20%', borderStyle:'hidden'}}
  >
    {
        globalCountryList.map((globalCountry, index)=><MenuItem key={index} value={globalCountry?.id}>{globalCountry.name}</MenuItem>)
    }
  </Select>
  );
}

export default CountryOptions;