import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

export default function QuantityField(props) {
  const {field, data}=props;
  
  const getValue=(data, keyStr)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if( typeof val === 'object')
      val=val[keys[i]];
    }
    return val;
  }
  
  const setField= (event, name, data)=>{
    data[name]=event.target.value;
  }

  return (
      <TextField
          label={field.label}
          id={field.id}
          sx={{ m: 1}}
          InputProps={{
            endAdornment: <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={getValue(data,field.key)}
            defaultValue={getValue(data,field.key)}
            label="{field.label}"
            onChange={(event)=>setField(event, field.name, data)}
          >
            {
              field.items.map(item=> <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>)
            }
          </Select>
          }}
          variant="standard"
        />
  );
}