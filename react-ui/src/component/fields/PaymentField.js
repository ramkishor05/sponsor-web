import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
export default function PaymentField(props) {

  const [element,setElement]=React.useState(props.element);
  
  const handleChange = (element, e) => {
    let newElement ={...element}
    newElement[e.target.name] = e.target.value;
    setElement(newElement);
    props.setElement(newElement);
  }

  return (
      <Box variant='standard'>
          <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Payment {'#'+props.index}</FormLabel>
              <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="mode"
                  value={element?.mode} onChange={e => handleChange(element, e)}
              >
                  <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
              </RadioGroup>
          
              {
                element?.mode==='Cash' || element?.mode==='Online'?
              <TextField type='number' value={element?.amount} label="Amount" variant='standard' name='amount'  onChange={e => handleChange(element, e)}></TextField>
              :''
              }
        </FormControl>
        {
        props.index ? 
            <Button type="button"  className="button remove" onClick={(event) => props.removeField(props.index)}>Remove</Button> 
        : null
        }
   </Box>
  );
}