import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@material-ui/core';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
export default function DynamicField(props) {
  const {type, label}=props
  const [open, setOpen] = React.useState(false);
  let list=props.list? props.list:[];
  const [formValues, setFormValues] = React.useState([...list]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    setOpen(false);
    props.onSave(formValues);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleChange = (i, e) => {
    let newformValues = [...formValues];
    if(!newformValues[i]){
      newformValues[i]={ field: "", value: "" };
    }
    newformValues[i][e.target.name] = e.target.value;
    setFormValues(newformValues);
  }

  const  addFormFields= ()=> {
    setFormValues([...formValues, { field: "", value: "" }])
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
                    <TextField variant='standard' required label="Field" type="text" name="field" value={""} onChange={e => handleChange(0, e)} />
                    <TextField variant='standard'  label="Value" type={type} name="value" value={""} onChange={e => handleChange(0, e)} />
                </Box>
            :
            formValues && formValues.length>0 && formValues.map((element, index) => (
                <Box variant='standard'>
                        <TextField variant='standard' required label="Field" type="text" name="field" value={element.field || ""} onChange={e => handleChange(index, e)} />
                        <TextField variant='standard'  label="Value" type={type} name="value" value={element.value || ""} onChange={e => handleChange(index, e)} />
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
      <Button  variant="outlined" onClick={handleClickOpen}>
      {label} <PlaylistAddIcon></PlaylistAddIcon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {label}
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
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}