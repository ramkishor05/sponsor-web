import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { addCustSupplier } from '../../actions';
import { useDispatch } from 'react-redux';
import { ListItem } from '@material-ui/core';

const filter = createFilterOptions();

export default function SupplierOptions(props) {
  const {supplierList,supplierAction, errorMessage, isError, name, label}=props;

  const dispatch = useDispatch();

  
  const findSupplier=(id)=>{
    if(id){
       let supplier= supplierList.find((supplier) => supplier.id === id);
       return !supplier? "" : supplier;
    } 
     return "";
  }


  const [value, setValue] = React.useState(findSupplier(props.value));
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      name: '',
      phoneNumber: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    phoneNumber: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let supplier={
      name: dialogValue.name,
      phoneNumber: parseInt(dialogValue.phoneNumber, 10),
    };
    setValue(supplier);
    dispatch(addCustSupplier(supplier));
    supplierAction(supplier);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        defaultValue={props.value}
        variant='standard'
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                phoneNumber: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              phoneNumber: '',
            });
          } else {
            setValue(newValue);
            supplierAction(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="supplier-list-options"
        options={supplierList}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <ListItem value={option.name} {...props}>{option.name}</ListItem>}
        freeSolo
        renderInput={(params) => 
        <TextField 
        {...params} 
        label={label} 
        name={name} 
        variant='standard' 
        helperText={errorMessage(name)}
        error={isError(name)}
        />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new supplier</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any supplier in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.phoneNumber}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  phoneNumber: event.target.value,
                })
              }
              label="phoneNumber"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
