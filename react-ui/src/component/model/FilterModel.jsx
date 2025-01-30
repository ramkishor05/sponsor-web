import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, ButtonGroup, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import AmountField from '../fields/AmountField';
import QuantityField from '../fields/QuantityField';
import { connect } from 'react-redux';
import { getValue, setChecked, setValue } from '../utils/ReflectionUtil';
import CountryOptions from '../dropdwons/CountryOptions';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

class FilterModel extends React.Component {

  state={
    data:{},
    validationMap : {}
  }

  constructor(props){
    super(props);
    let {data}=this.props;
    this.state={ data:data, validationMap : {}};
  }

  setData=(newData)=>{
    this.setState({...this.state, data:newData})
  }

  checkValidation = (field, value)=>{
    const validationMap=this.state.validationMap;
    let status=true;
    if(field.required && (value==='' || undefined===value|| null===value) ){
      validationMap[field.name]=field.required.message;
      status= false;
    } else{
      if(field.format && field.format.regex ){
        if(!new RegExp(field.format.regex).test(value)){
          validationMap[field.name]=field.format.message;
        } else{
          delete validationMap[field.name];
          status= false;
        }
      } else{
        delete validationMap[field.name];
        status= true;
      }
     
    }
    this.setState({...this.state, validationMap:{...validationMap}});
    return status;
  }

  saveForm=(fields, type, data)=>{
    for(var fieldIndex in  fields){
      let field= fields[fieldIndex];
      if(field.prefix){
        this.checkValidation(field.prefix,getValue(data,field.prefix.name));
      }
      this.checkValidation(field,getValue(data,field.name));
      if(field.postfix){
        this.checkValidation(field.postfix,getValue(data,field.postfix.name));
      }
    };
    if(Object.keys(this.state.validationMap).length === 0){
      this.props.saveAction(type, data);
    }
  }

  isError = (field)=>{
    return this.state.validationMap[field.name]!=null;
  }

  errorMessage = (field)=>{
    return this.state.validationMap[field.name];
  }


  renderSwitch(field, data, props) {
    
    switch(field.type) {
      case 'label':
        return <Box 
        >{field.label}</Box>;
      case 'select':
        return  <FormControl fullWidth 
        error={this.isError(field)}>
        <InputLabel htmlFor={field.name} id={field.name+"-label"}>{field.label}</InputLabel>
        <Select
          variant='standard'
          labelId={field.name+"-label"}
          id={field.name}
          value={getValue(data,field.key? field.key: field.name )}
          defaultValue={getValue(data,field.key? field.key: field.name)}
          label="{field.label}"
          onChange={(event)=>setValue(event.target.value, field.name, field, data, 
            this.setData, this.checkValidation)}
        >
          {
            field.onItems ? 
            field.onItems (getValue(data,field.name),data, field, props ).
            map(item=> 
            
              <MenuItem key={field.itemKey ? item[field.itemKey]: item} value={field.itemKey ? item[field.itemKey]: item}>{field.itemVal? item[field.itemVal]: item}</MenuItem>
            )
            :
            field.items.map(item=> 
            <MenuItem key={field.itemKey ? item[field.itemKey]: item} value={field.itemKey ? item[field.itemKey]: item}>{ field.itemVal? item[field.itemVal]: item}</MenuItem>
            )
          }
        </Select>
        {
        this.isError(field) && 
        <FormHelperText >{this.errorMessage(field)}</FormHelperText>
        }
      </FormControl>;
      case 'switch':
         return <FormControlLabel
         control={
           <Switch 
            helperText={this.errorMessage(field)}
            error={this.isError(field)}
            checked={getValue(data,field.name)}
            onChange={(event)=>setChecked(event, field.name, data, props , this.setData)}
            name={field.name} 
            {...props }
            />
         }
         label={field.label}
       />
      case 'qnt':
        return <QuantityField 
        field={field} {...props  } 
        setData={this.setData} 
        errorMessage={this.errorMessage}
        isError={this.isError}
        checkValidation={this.checkValidation}
        >
        </QuantityField>
      case 'amount':
        return <FormControl  fullWidth><AmountField 
        field={field} {...props} 
        setData={this.setData}  
        errorMessage={this.errorMessage}
        isError={this.isError}
        checkValidation={this.checkValidation}
        ></AmountField></FormControl> 
      case 'country':
        return <FormControl  fullWidth><CountryOptions 
        field={field} {...props} 
        setData={this.setData}  
        errorMessage={this.errorMessage}
        isError={this.isError}
        checkValidation={this.checkValidation}
        ></CountryOptions></FormControl> 
     
      case 'date':
       return <FormControl  fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          helperText={this.errorMessage(field)}
          error={this.isError(field)}
          key={field.id}
          variant={ 'standard'}
          id={field.id}
          label={field.required ?  field.label + " ( * )" : field.label+ " ( optional )" }
          name={field.name}
          value={dayjs(getValue(data,field.name).replace(", 12:00 AM",""))}
          defaultValue={dayjs(getValue(data,field.name).replace(", 12:00 AM",""),field.format)}
          onChange={(event)=>{
            setValue(event.format(field.format)+", 12:00 AM" , field.name, field, data, this.setData, this.checkValidation)}
          }
          format= { field.format? field.format: ""}
          sx={'date'===field.type ? {border:0, borderStyle: 'groove'}:{}}
          >
        </DatePicker>
        </LocalizationProvider>
        </FormControl>
      default:
        return <FormControl  fullWidth>
          <TextField
          helperText={this.errorMessage(field)}
          error={this.isError(field)}
          key={field.id}
          variant={ 'standard'}
          id={field.id}
          label={field.required ?  field.label + " ( * )" :  field.label }
          name={field.name}
          type={'textarea'===field.type? 'text':  field.type}
          multiline={'textarea'===field.type}
          rows={'textarea'===field.type ? field.rows ? field.rows : 5 : 1}
          value={getValue(data,field.name)}
          defaultValue={getValue(data,field.name)}
          onChange={(event)=>
            setValue(event.target.value, field.name, field, data, this.setData, this.checkValidation)}
           sx={'textarea'===field.type ? {border:1, borderStyle: 'groove'}:{}}
           format= { field.format? field.format: ""}
          >
        </TextField></FormControl>
    }
  }
  
  rendorFields = (fields, data, props)=>{
    return (
      <Grid container spacing={2} >
        {
          fields.map(field=>
            <Grid key={field.name} item
            xs={field.grid? field.grid: 12} 
            xl={field.grid? field.grid: 12} 
            sm={field.grid? field.grid: 12} 
            >
            
              {
                field.fields ? 
                <Grid container spacing={2}>
                  {
                    field.fields.map(gridField=>
                      <Grid item
                      key={gridField.name}  
                      xs={gridField.grid? gridField.grid: 12} 
                      xl={gridField.grid? gridField.grid: 12} 
                      sm={gridField.grid? gridField.grid: 12} >
                        <Box component="section" width={gridField.width} height={gridField.height}>
                          {
                            this.renderSwitch(gridField, data, props)
                          }
                          </Box>
                      </Grid>
                    )
                  }
                </Grid>
                : 
                this.renderSwitch(field, data, props)
              }
              
        </Grid>
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields, loader } = this.props;
    const { data } = this.state;
    return (
        <Dialog
          open={this.props.openAction}
          onClose={this.props.closeAction}
          aria-labelledby="form-dialog-title"
           maxWidth={'sm'}
           fullWidth={true}
        >
          <DialogTitle id="form-dialog-title"><h2>{title}</h2></DialogTitle>
          <DialogContent>
            <DialogContentText>
            <Box component="section" sx={{ m: 0, mt: 3}}>
                 {this.rendorFields(fields, this.state.data, this.props)}
                 </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{padding:'25px'}}>
              <ButtonGroup>
                <Button variant='outlined' size='small' color="error"
                 onClick={this.props.closeAction} >
                  Cancel
                </Button>
                <Button variant='outlined' size='small' color="secondary"
                 onClick={this.props.clearAction} >
                  Clear
                </Button>
                <Button variant='outlined' size='small' color="primary" disabled={loader} 
                  onClick={(event)=>this.saveForm(fields, type, data)} >
                  {type}
                </Button>
              </ButtonGroup>
          </DialogActions>
        </Dialog>
    );
  }
}


const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { loader } =  state.loaderReducer
  const { custBusinessList, show_business_loader } = state.custBusinessReducer;
  return { user, custBusinessList, show_business_loader , loader};
};

export default connect(mapStateToProps, { })(FilterModel);
