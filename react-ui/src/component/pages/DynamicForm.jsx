import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Box, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, Switch, Tooltip } from '@material-ui/core';
import AmountField from '../fields/AmountField';
import QuantityField from '../fields/QuantityField';
import ImageUploadCard from '../image/ImageUploadCard';
import { connect } from 'react-redux';
import MainCard from '../cards/MainCard';

import { getValue, setChecked, setValue } from '../utils/ReflectionUtil';
import CountryOptions from '../dropdwons/CountryOptions';
import { Close } from '@material-ui/icons';


class DynamicForm extends React.Component {

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
    if(field.required && (value=='' || undefined==value|| null===value) ){
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
    
    console.log("status, field.name, value ", status, field.name,  value)
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
    }else{
      console.log("this.state.validationMap=",this.state.validationMap)
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
          value={getValue(data,field.name)}
          defaultValue={getValue(data,field.name)}
          label="{field.label}"
          onChange={(event)=>setValue(event.target.value, field.name, field, data, 
            this.setData, this.checkValidation)}
        >
          {
            field.onItems ? 
            field.onItems(getValue(data,field.name),data, field, props ).
            map(item=> 
            
              <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{
                field.onDisplay? field.onDisplay(item):
                item[field.itemVal]
                
                }</MenuItem>
            )
            :
            field.items.map(item=> 
            <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{
              field.onDisplay? field.onDisplay(item):
                item[field.itemVal]
              }</MenuItem>
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
      case 'img':
        return <ImageUploadCard name={field.name}
        image={getValue(data,field.name)} 
        setImge={(value)=> 
           field.onchange ? 
           field.onchange(value, data, field, props) :
           setValue(value,field.name,field, data, this.setData, this.checkValidation)
        }
        >
        </ImageUploadCard>
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
        <FormControl  fullWidth><CountryOptions 
        field={field} {...props} 
        setData={this.setData}  
        errorMessage={this.errorMessage}
        isError={this.isError}
        checkValidation={this.checkValidation}
        ></CountryOptions></FormControl> 
      default:
        return <FormControl  fullWidth>
          <TextField
          helperText={this.errorMessage(field)}
          error={this.isError(field)}
          key={field.id}
          variant={ 'standard'}
          id={field.id}
          label={field.required ?  field.label + " ( * )" : field.label+ " ( optional )" }
          name={field.name}
          type={'textarea'===field.type? 'text':  field.type}
          multiline={'textarea'===field.type}
          rows={'textarea'===field.type ? field.rows ? field.rows : 5 : 1}
          value={getValue(data,field.name)}
          defaultValue={getValue(data,field.name)}
          onChange={(event)=>
            setValue(event.target.value, field.name, field, data, this.setData, this.checkValidation)}
           sx={'textarea'===field.type ? {border:1, borderStyle: 'groove'}:{}}
          >
        </TextField></FormControl>
    }
  }
  

  rendorFields = (fields, data, props)=>{
    return (
      <Grid container spacing={2}>
        {
          fields.map(field=>
              (
                <Grid key={field.name} item xs={12} xl={field.grid? field.grid: 4} sm={field.grid? field.grid: 4} >
                  {
                    this.renderSwitch(field, data, props)
                  }
              </Grid>)
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields, loader, closeAction} = this.props;
    const {data} = this.state;
    return (
             <MainCard title={title}
                  button ={
                      <Tooltip title="Close" aria-label="close">
                        <Button variant='outlined' color="error" onClick={closeAction}>
                            <Close/>
                        </Button>
                     </Tooltip>
                  }
                  content={true}

                  actions = {
                    <Grid container spacing={2}>
                      <Grid key={'action'} item xs={12} textAlign={'right'}>
                        <Button variant='outlined' color="primary" disabled={loader} onClick={(event)=>this.saveForm(fields, type, data)} >
                          {type}
                        </Button>
                      </Grid>
                    </Grid>
                  }
              >
                {this.rendorFields(fields, data, this.props)}
                
         </MainCard>
        );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { loader } =  state.loaderReducer
  const { custBusinessList, show_business_loader } = state.custBusinessReducer;
  return { user, custBusinessList, show_business_loader , loader};
};

export default connect(mapStateToProps, { })(DynamicForm);
