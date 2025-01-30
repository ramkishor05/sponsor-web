import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
export default function PaymentFieldGroup(props) {
  //const classes = makeStyles();
  const [open, setOpen] = React.useState(false);
  let list=props.list? props.list:[];
  const [formValues, setFormValues] = React.useState([...list]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onSave(formValues);
  };

  
  const handleChange = (i, e) => {
    let newformValues = [...formValues];
    if(!newformValues[i]){
      newformValues[i]={ mode: "Unpaid", amount: "" };
    }
    newformValues[i][e.target.name] = e.target.value;
    setFormValues(newformValues);
  }

  const  addFormFields= ()=> {
    setFormValues([...formValues, { mode: "Unpaid", amount: "" }])
  }

  const removeFormFields=(i) =>{
    let newformValues = [...formValues];
    newformValues.splice(i, 1);
    setFormValues(newformValues);
  }

  const renderFormValues =()=>{
    return (
        <>{
            formValues.length===0 ?
                <Box variant='standard'>
                     <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Payment {'#0'}</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="mode"
                            value={formValues[0] && formValues[0]?.mode} onChange={e => handleChange(0, e)}
                        >
                            <FormControlLabel value="Unpaid" control={<Radio  />} label="Unpaid" />
                            <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                            <FormControlLabel value="Online" control={<Radio />} label="Online" />
                        </RadioGroup>
                   
                        {
                        formValues[0] && formValues[0]?.mode==='Cash' || formValues[0]?.mode==='Online'?
                        <TextField type='number' label="Amount" variant='standard'  name='amount'  onChange={e => handleChange(0, e)}></TextField>
                        :''
                        }
                    </FormControl>
                </Box>
            :
            formValues && formValues.length>0 && formValues.map((element, index) => (
                <Box variant='standard'>
                         <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Payment {'#'+index}</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="mode"
                            value={element?.mode} onChange={e => handleChange(index, e)}
                        >
                            <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                            <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                            <FormControlLabel value="Online" control={<Radio />} label="Online" />
                        </RadioGroup>
                   
                        {
                         element?.mode==='Cash' || element?.mode==='Online'?
                        <TextField type='number' value={element?.amount} label="Amount" variant='standard' name='amount'  onChange={e => handleChange(index, e)}></TextField>
                        :''
                        }
                    </FormControl>
                        {
                        index ? 
                            <Button type="button"  className="button remove" onClick={(event) => removeFormFields(index)}>Remove</Button> 
                        : null
                        }
                </Box>
            ))
        }
        </>
    )
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <PaymentsOutlinedIcon></PaymentsOutlinedIcon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Payments
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {
             renderFormValues()
           }
          
          <div className="button-section">
              <Button type="button" onClick={() => addFormFields()}>Add more</Button>
          </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}