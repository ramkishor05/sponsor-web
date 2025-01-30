  
  export const findTargetObject=(data, keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split(".");
    let val=data;
    for (let i = 0; i < keys.length-1; i++){
      if(val==null){
        val={};
      }
      if( typeof val === 'object'){
        if(!val[keys[i]]){
          val[keys[i]]={};
        }
        val=val[keys[i]];
      }
    }
    return val;
  }

  export const findTargetKey=(keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split(".");
    let key=keyStr;
    for (let i = 0; i < keys.length; i++){
      key=keys[i];
    }
    return key;
  }
  

  export const setValue= (value, name, field, data, setData, checkValidation)=>{
    let newdata={...data}
    let targetObject= findTargetObject(newdata,name);
     let targetKey= findTargetKey(name);
    targetObject[targetKey]=value;
    checkValidation && checkValidation(field, value);

    if(setData ){
        setData(newdata)
    }
  }

  export const getValue=(data, name, type)=>{
    if(!name){
      return '';
    }
    let targetObject= findTargetObject(data,name);
    let targetKey= findTargetKey(name);
    return targetObject[targetKey]? targetObject[targetKey]: 'color'===type ? null: '';
  }

  export const setField= (value, name,  field, data, props, setData, checkValidation)=>{
     let val = field.find ?  field.find(value, data, field, props) : value;
     checkValidation && checkValidation(field, val);
     setValue(val, name,  data, setData )
  }
 
   export const setChecked= (event, name, data, setData)=>{
     let newdata={...data}
     newdata[name]=event.target.checked;
     if(setData )
     setData(newdata)
   }
 
