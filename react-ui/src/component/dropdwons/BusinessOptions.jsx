import React, { useEffect } from 'react';

// material-ui
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import { getCustDashboardList, getCustProductList, getCustPurchaseList, getCustSaleList, getCustBusinessList, getCustCustomerList, getCustEmployeeList, getCustSupplierList, getCustUserList } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUSSINESS_ACCOUNT } from '../../store/actions';

const BusinessOptions= (props) =>  {
    
  const { custBusinessList} = useSelector(state => state.custBusinessReducer);

  const {businessId}= useSelector(state => state.accountReducer);

  const dispatch=useDispatch();

  const onSeach = async (event)=>{
      dispatch({ type: SET_BUSSINESS_ACCOUNT, payload: event.target.value});
      dispatch(getCustDashboardList());
      // vendors
      dispatch(getCustBusinessList());
      dispatch(getCustEmployeeList());
      dispatch(getCustCustomerList());
      dispatch(getCustSupplierList());
      dispatch(getCustUserList());

      // order 
      dispatch(getCustSaleList());
      dispatch(getCustPurchaseList());

      // items
      dispatch(getCustProductList());
  }

  useEffect(()=>{
     dispatch(getCustBusinessList());
  },[getCustBusinessList])

  return (
    
      custBusinessList && custBusinessList.length>0 &&
      <Select variant='standard'
    value={businessId?businessId : ''}
    onChange={onSeach} sx={{width: '20%', borderStyle:'hidden'}}
  >
    {
        custBusinessList.map((vendorBusiness, index)=><MenuItem key={index} value={vendorBusiness?.id}>{vendorBusiness.name}</MenuItem>)
    }
  </Select>
    
    
  );
}

export default BusinessOptions;