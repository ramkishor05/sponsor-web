import * as React from 'react';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { getValue, setValue } from '../utils/ReflectionUtil';
import { useEffect } from 'react';

export default function AmountField(props) {
  const {field, data, errorMessage, isError,setData, checkValidation }=props;

  const init= (field, data)=>{
    let value= null;
    if(field.selected){
      value=field.selected(getValue(data,field.name),data, field, props);
      setValue(value, field.name, field, data, setData, checkValidation );
    } else{
      value=getValue(data,field.name);
    }
    return value;
  }

 useEffect(()=>{
    if(field.prefix){
      init(field.prefix, data);
    }
    if(field.postfix){
      init(field.postfix, data);
    }
  })

  const getInputProps = (field, data)=>{
    let inputprops={};
    if(field.prefix){

      inputprops['startAdornment'] = <Select
                                
                                id={field.id+'_'+field.prefix.id}
                                defaultValue={field.prefix.selected ? 
                                  field.prefix.selected(getValue(data,field.prefix.name),data, field.prefix, props):
                                  getValue(data,field.prefix.name)
                                }
                                value={getValue(data,field.prefix.name)}
                                onChange={(event)=>setValue(event.target.value, field.prefix.name, field, data, setData, checkValidation )}
                                IconComponent={() =>null}
                                error={isError(field.prefix)}
                              >
                                      {
                                        field.prefix.onItems ? 
                                        field.prefix.onItems(getValue(data,field.prefix.name), data, field, props ).
                                        map(item=> 
                                          <MenuItem key={item[field.prefix.key]} value={item[field.prefix.value]}>
                                            {item[field.prefix.label]}</MenuItem>
                                        )
                                        :
                                        field.prefix.items.map(item=> 
                                        <MenuItem key={item[field.prefix.key]} value={item[field.prefix.value]}>
                                          {item[field.prefix.label]}</MenuItem>)
                                      }
                              </Select>
    }
    if(field.postfix){
      inputprops['endAdornment'] = <Select
                                labelId={field.id}
                                sx={{textAlign: 'left', textAlignLast: 'right' , direction : 'rtl'}}
                                id={field.id+'_'+field.postfix.id}
                                defaultValue={getValue(data,field.postfix.name)}
                                value={getValue(data,field.postfix.name)}
                                onChange={(event)=>setValue(event.target.value, field.postfix.name, field, data, setData, checkValidation )}
                                IconComponent={() =><span></span>}
                                error={isError(field.postfix)}
                              >
                                      {
                                        field.postfix.onItems ? 
                                        field.postfix.onItems(getValue(data,field.postfix.name), data, field, props ).
                                        map(item=> 
                                          <MenuItem key={item[field.postfix.key]} value={item[field.postfix.value]}>
                                            {item[field.prefix.label]}</MenuItem>
                                        )
                                        :
                                        field.postfix.items.map(item=> 
                                        <MenuItem key={item[field.postfix.name]} value={item[field.postfix.name]}>
                                          {item[field.prefix.label]}</MenuItem>)
                                      }
                              </Select>
    }
    return inputprops;

  }

  const InputProps = getInputProps(field, data);
  
  const allErrorMsg = (field)=>{
    if(field.prefix){
      let errorMsg=errorMessage(field.prefix)
      if(errorMsg){
        return errorMsg;
      }
    }
    let errorMsg=errorMessage(field)
    if(errorMsg){
      return errorMsg;
    }
    if(field.postfix){
      let errorMsg=errorMessage(field.postfix)
      if(errorMsg){
        return errorMsg;
      }
    }
  }

  return (
        <TextField
          helperText={allErrorMsg(field)}
          error={isError(field)}
          label={field.label}
          id={field.id}
          defaultValue={getValue(data,field.name)}
          value={getValue(data,field.name)}
          InputProps={{...InputProps}}
          onChange={(event)=>setValue(event.target.value, field.name, field, data, setData, checkValidation)}
          variant="standard"
          fullWidth
        />
  );
}