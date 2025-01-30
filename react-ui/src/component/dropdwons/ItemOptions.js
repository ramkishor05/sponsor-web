import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

const filter = createFilterOptions();

const ItemOptions=(props) =>{
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const {items, errorMessage, isError, name, label}=props;

  const handleClose = () => {
    setDialogValue({
      title: '',
      phoneNumber: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    phoneNumber: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      phoneNumber: parseInt(dialogValue.phoneNumber, 10),
    });
    handleClose();
  };

  const handleSelect = (event, newValue) => {
    if (typeof newValue === 'string') {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          title: newValue,
          phoneNumber: '',
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        title: newValue.inputValue,
        phoneNumber: '',
      });
    } else {
      setValue(newValue);
      props.itemAction(newValue);
    }
  }

  return (
    <React.Fragment>
      <Autocomplete
       
        value={value}
        variant='standard'
        onChange={(event, newValue) => handleSelect(event, newValue)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="item-list-options"
        options={items}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => 
          <ListItem alignItems="flex-start" key={option.title}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={option.image} />
            </ListItemAvatar>
            <ListItemText {...props}>{option.title}</ListItemText>
          </ListItem>
        }
        freeSolo
        renderInput={(params) => 
        <TextField {...params} 
        label={label}
        name={name}
        variant='standard'  
        helperText={errorMessage(name)}
        error={isError(name)}
        />
      }
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any item in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="title"
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
export default ItemOptions;