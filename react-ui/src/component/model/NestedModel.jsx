import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Card, Collapse, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import AmountField from '../fields/AmountField';
import QuantityField from '../fields/QuantityField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default class NestedModel extends React.Component {
  state =  {open : {}};

  setOpen=(key,value)=>{
    let newopen={...this.state.open}
    for(let key of Object.keys(newopen)) {
      newopen[key]=false;
   }
    newopen[key]=value;
    this.setState({open:newopen});
  }

  getOpen=(key)=>{
    return this.state.open[key]? this.state.open[key] : false
  }

  getValue=(data, keyStr)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if( typeof val === 'object')
      val=val[keys[i]];
    }
    return val;
  }

  setField= (event, keyStr, data)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length-1; i++){
      if(!val){
        val={};
      }
      if( typeof val === 'object'){
        if(!val[keys[i]]){
          val[keys[i]]={};
        }
        val=val[keys[i]];
      }
    }
    val[keys.length]=event.target.value;
  }

  renderSwitch(field, data) {
    switch(field.type) {
      case 'select':
        return  <FormControl>
        <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.getValue(data,field.key)}
          defaultValue={this.getValue(data,field.key)}
          label="{field.label}"
          onChange={(event)=>this.setField(event, field.name, data)}
        >
          {
            field.items.map(item=> <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>)
          }
        </Select>
      </FormControl>;
      case 'qnt':
        return <QuantityField field={field} data={data}></QuantityField>
      case 'amount':
        return <AmountField field={field} data={data}></AmountField>
      default:
        return <TextField
        key={field.id}
        variant='standard'
        id={field.id}
        label={field.label}
        type={field.type}
        value={data[field.name]}
        defaultValue={data[field.name]}
        onChange={(event)=>this.setField(event, field.name, data)}
        fullWidth>
        </TextField>;
    }
  }

 getChildrenLoad = (row, children, props) =>{
    let childrenRow = children.onLoad(row[children.name], row, props);
    if(!childrenRow){
      childrenRow=row[children.name];
    } 
    if(!childrenRow){
      childrenRow={}
    }
    row[children.name] =childrenRow;
    return this.rendorFields(children.headers, row[children.name]);
  }
  

  rendorFields = (fields, data)=>{
    return (
      <Grid container spacing={2}>
        {
          fields.map(field=>
              (
                <Grid key={field.name} item xs={6}>
                  {
                    this.renderSwitch(field, data)
                  }
              </Grid>)
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields, data } = this.props;
    const row=data;
    return (
      <div>
        <Dialog
          open={this.props.openAction}
          onClose={this.props.closeAction}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"><h2>{title}</h2></DialogTitle>
          <DialogContent>
            <DialogContentText>
              
                 {
                   <>
                   <Box sx={{ margin: 2, padding:2 }}>
                     {
                       this.rendorFields(fields.headers, row)
                     }
                    </Box>
                   {
                      fields.childrens.map(children=>
                        <>
                       
                          <Typography variant="h6" gutterBottom component="div" style={{border:1, borderStyle: 'groove'}}>
                          <IconButton
                        aria-label="expand"
                        size="small" 
                        onClick={() => this.setOpen(children.name, !this.getOpen(children.name))}
                        >
                            {this.getOpen(children.name) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                           
                            {children.label}
                          </Typography>
                          <Collapse key={row.id+'_data_child_collapse'+children.name} in={this.getOpen(children.name)} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 2, padding:2 }}>
                              {
                                this.getChildrenLoad(row, children, this.props)
                              }
                              </Box>
                          </Collapse>
                        </>
                      )
                    }
                    </>
                 }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction} color="primary">
              Cancel
            </Button>
            <Button onClick={(event)=>this.props.saveAction(type, data)} color="primary">
              {type}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}