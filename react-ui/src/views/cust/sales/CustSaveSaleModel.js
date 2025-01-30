import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';

// material-ui
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, Radio, RadioGroup, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles, styled } from '@material-ui/styles';
import ItemOptions from '../../../component/dropdwons/ItemOptions';
import { 
    getCustProductList, getCustCustomerList
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { GridCloseIcon } from '@mui/x-data-grid';
import { LabelImportant } from '@material-ui/icons';
import PaymentField from '../../../component/fields/PaymentField';
import PaymentFieldGroup from '../../../component/fields/PaymentFieldGroup';
import { getValue } from '../../../component/utils/CommanUtil';

  const ToggleSwitch = styled((props) => (
    <Switch fullWidth focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

//==============================|| SAMPLE PAGE ||==============================//
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      }
  }));

  const DATE_TIME_FORMAT_UI="YYYY-MM-DD HH:MM";

  
  const model = [
    {
        "id": "saleDate",
        "key": "saleDate",
        "name": "saleDate",
        "label": "saleDate",
        "type": "text",
        "required" : {
            value : '',
            message: "Date should not be empty."
        }
    },
    {
        "id": "customer",
        "key": "customer",
        "name": "customerId",
        "label": "customer",
        "type": "text",
        "required" : {
            value : '',
            message: "Customer should not be empty."
        }
    },
    {
        "id": "items",
        "key": "items",
        "name": "custProductSaleItemList",
        "label": "items",
        "type": "text",
        "required" : {
            value : '',
            message: "Items should not be empty."
        }
    }
  ]

  class CustSaveSaleModel extends Component {

    
    state = {
        id:null,
        selectedItems: [],
        custProductSaleAdditionalList:[],
        saleDate: moment(new Date()).format(DATE_TIME_FORMAT_UI),
        customerId: 0,
        userId: 0,
        discounts : null,
        payment : {
            mode: '',
            amount: null
        },
        validationMap: {}
    }

    constructor (props){
        super(props)
        let {data, custProductList}=this.props;
        let object={
            id:data.id,
            idenNo:data.idenNo,
            selectedItems: [],
            custProductSaleAdditionalList:data.custProductSaleAdditionalList? data.custProductSaleAdditionalList: [],
            custProductSalePaymentList:data.custProductSalePaymentList? data.custProductSalePaymentList: [],
            saleDate: data.saleDate?  moment(data.saleDate).format(DATE_TIME_FORMAT_UI):  moment(new Date()).format(DATE_TIME_FORMAT_UI),
            customerId: data.customerId?data.customerId:0,
            userId: data.userId?data.userId:0,
            discounts : data.discounts? data.discounts:0
        }
        data.custProductSaleItemList && data.custProductSaleItemList.forEach(custProductSaleItem=>{
            let custProductSaleItemObj={...custProductSaleItem};
            custProductSaleItemObj['id']=custProductSaleItem.id;
            custProductSaleItemObj['isWholeSale']=custProductSaleItem.saleType==='Whole Sale';
            custProductSaleItemObj['salePrice']= custProductSaleItem.salePrice;
            custProductSaleItemObj['purchasePrice']= custProductSaleItem.purchasePrice? custProductSaleItem.purchasePrice: custProductSaleItem.custProduct.purchasePrice;
            custProductSaleItemObj['discount']=custProductSaleItem.discount;
            custProductSaleItemObj['saleQnt']=custProductSaleItem.saleQnt;
            object.selectedItems.push(custProductSaleItemObj)
        })
        this.state={...this.state, ...object};
    }

    findField = (id)=>{
        return model.find(field=>field.id===id);
    }

    isError = (name)=>{
        return this.state.validationMap[name]!=null;
    }

    errorMessage = (name)=>{
        return this.state.validationMap[name];
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
        console.log("this.state.validationMap=",this.state.validationMap)
        return status;
    }

    componentDidMount() {
        this.props.getCustProductList()
        this.props.getCustCustomerList();
       
    }

    changeSaleDate = (event) => {
        this.checkValidation(this.findField("saleDate"), event.target.value)
        this.setState({saleDate: event.target.value});
    };

    setDiscounts = (event) => {
        this.setState({discounts: event.target.value});
    };

     itemAction=(custProduct)=>{
        if(custProduct){
            const newSelectedItems = [...this.state.selectedItems];
            let itemObject = {};
            itemObject['custProduct']=custProduct;
            itemObject['saleQnt']=1;
            itemObject['discount']=0;
            itemObject['isWholeSale']=false;
            itemObject['salePrice']=custProduct.retailPrice;
            itemObject['purchasePrice']=custProduct.purchasePrice;
            newSelectedItems.push(itemObject);
            this.checkValidation(this.findField("items"), newSelectedItems)
            this.setState({selectedItems: newSelectedItems});
        }
    }

    customerAction=(customer)=>{
        if(customer){
            this.checkValidation(this.findField("customerId"), customer.id)
            this.setState({customerId: customer.id});
        } else{
            this.checkValidation(this.findField("customerId"), null)
            this.setState({customerId: null});
        }
    }


     itemQnt=(item, saleQnt)=>{
        item['saleQnt']=saleQnt;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems});
    }

    toggleWholeSale=(custSaleProduct)=>{
        custSaleProduct.isWholeSale=!custSaleProduct.isWholeSale;
        if(custSaleProduct.isWholeSale){
            custSaleProduct.salePrice=custSaleProduct.custProduct.wholePrice;
        } else{
            custSaleProduct.salePrice=custSaleProduct.custProduct.retailPrice;
        }
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems});
    }
    
    addProductAdditionalList=(formValues)=>{
        this.setState({custProductSaleAdditionalList:formValues});
    }

    addProductPaymentList=(formValues)=>{
        this.setState({custProductSalePaymentList:formValues});
    }

    setDiscount=(item, amount)=>{
        item['discount']=amount;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems, discounts: this.getDiscounts()});
    }

    getDiscounts=()=>{
        let discountTotal=this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0)
        return discountTotal;
     }

     changePaymentMode=(event)=>{
        let object={...this.state};
        let {payment}=object
        payment.mode=event.target.value;
        this.setState({...object});
     }

     getSubTotal=()=>{
       return this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.saleQnt * currentValue.salePrice.price;
        }, 0)
     }

     
     getTotalSale = () =>{
        let subTotal=  this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.saleQnt * currentValue.salePrice.price;
        }, 0);
        let otherItemTotal= this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        let discountTotal= this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0);
        return subTotal+otherItemTotal-discountTotal;
    }

    addSale = (type) =>{
        let custProductSale = {
            id:this.state.id,
            idenNo:this.state.idenNo,
            saleDate: moment(this.state.saleDate).format(DATE_TIME_FORMAT_UI),
            customerId: this.state.customerId,
            discounts: this.state.discounts,
            totalPrice: 0,
            totalQnt: 0,
            custProductSaleItemList: [],
            custProductSaleAdditionalList:this.state.custProductSaleAdditionalList,
            custProductSalePaymentList:this.state.custProductSalePaymentList
        }
        this.state.selectedItems.forEach((item)=>{
            custProductSale.totalQnt+=item.saleQnt;
            custProductSale.totalPrice+=(item.saleQnt*item.salePrice.price);
            let custProductSaleItem={
                id:item.id,
                name: item.name,
                desc: item.desc,
                discount: item.discount,
                purchasePrice: item.purchasePrice,
                saleQnt: item.saleQnt,
                saleType: item.isWholeSale? "Whole Sale": "Retail Sale",
                salePrice: item.salePrice,
                custProductId: item.custProduct.id
            }
            custProductSale.custProductSaleItemList.push(custProductSaleItem);
        })
        const fields=model;
        for(var fieldIndex in  fields){
            let field= fields[fieldIndex];
            if(field.prefix){
              this.checkValidation(field.prefix,getValue(custProductSale,field.prefix.name));
            }
            this.checkValidation(field,getValue(custProductSale,field.name));
            if(field.postfix){
              this.checkValidation(field.postfix,getValue(custProductSale,field.postfix.name));
            }
        };

        if(Object.keys(this.state.validationMap).length === 0){
            this.props.saveAction(type,custProductSale);
        }
        
    }

     getSelectedItems=()=>{
        return (
       <TableContainer className={useStyles.container}>
        <Table stickyHeader  sx={{border:1, borderStyle: 'groove'}}>
            <TableHead stickyHeader>
                <TableRow alignItems="flex-start" key={'selectedItem_header_row'} >
                    <TableCell key={'selectedItem_header_image'} >
                    Image
                    </TableCell>
                    <TableCell key={'selectedItem_header_title'}>Title</TableCell>
                    <TableCell key={'selectedItem_header_price'}>Price</TableCell>
                    <TableCell key={'selectedItem_header_discount'} >Discount</TableCell>
                    <TableCell key={'selectedItem_header_qnt'}>Qnt</TableCell>
                    <TableCell key={'selectedItem_header_action'}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody sx={{overflowX : true, maxHeight:50}}>
            {
            this.state.selectedItems && this.state.selectedItems.map(selectedItem=>
                <TableRow key={'selectedItem_'+selectedItem.custProduct.id}>
                    <TableCell key={'selectedItem_'+selectedItem.id+'_image'}>
                        <Avatar alt="Remy Sharp" src={selectedItem.custProduct.image} />
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_title'} >
                        {selectedItem.custProduct.title}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_price'}>
                        {selectedItem.salePrice.price}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_discount'}>
                        <TextField type='number' value={selectedItem.discount} variant='standard' onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_qnt'} sx={{  textAlign: 'center'}}>
                        <ShoppingCartButton  
                            counter={selectedItem.saleQnt} 
                            updateCounter={(counter)=> this.itemQnt(selectedItem, counter )}>
                        </ShoppingCartButton>                        
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_switch'} sx={{ textAlign: 'right'}}>
                    Whole Sale <ToggleSwitch name="Whole Sale" label="Whole Sale" value={selectedItem.isWholeSale} checked={selectedItem.isWholeSale} onClick={()=>this.toggleWholeSale(selectedItem)} ></ToggleSwitch>
                    </TableCell>
                </TableRow>
            )}
             <TableRow key={1000}>
             <TableCell colSpan={6} align='right' >
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={12}>
                        <Typography>  
                            
                            Sub Total <LabelImportant></LabelImportant> 
                            {
                                <Button variant='outlined'> {this.getSubTotal()}  </Button>  
                            }
                            
                        </Typography>  
                    </Grid>
                    <Grid item xs={12} xl={12}>
                        <TextField label="Discounts" value={this.getDiscounts()} defaultValue={this.getDiscounts()} onChange={this.setDiscounts} variant='standard'></TextField>
                    </Grid>
                </Grid>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={6} align='right' >
                    <DynamicField list={this.state.custProductSaleAdditionalList} onSave={this.addProductAdditionalList}></DynamicField>
                     
                     <List>
                     {
                       this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.map((addAdditionalCharge,i)=>
                             <ListItem  key={'addAdditionalCharge'+i}>
                                 <ListItemText 
                                 sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.field} : </ListItemText>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.value}</ListItemText>
                             </ListItem>
                         )
                     }
                     </List>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={6} align='right' >
                <PaymentFieldGroup list={this.state.custProductSalePaymentList} onSave={this.addProductPaymentList}></PaymentFieldGroup>
                <List>
                     {
                       this.state.custProductSalePaymentList && this.state.custProductSalePaymentList.map((custProductPayment, i)=>
                             <ListItem key={'custProductPayment'+i}>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{custProductPayment.mode} : </ListItemText>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{custProductPayment.amount?':'+custProductPayment.amount : custProductPayment.amount}</ListItemText>
                             </ListItem>
                         )
                     }
                     </List>
            </TableCell>
            </TableRow>
            
            </TableBody>
        </Table>
        </TableContainer>
        )
    }

    render() {

    const { open, close, title, type} = this.props;
    
    return (
        <BootstrapDialog
            aria-labelledby="Add Sale"
            aria-describedby="Modal for adding sales"
            open={open}
            onClose={close}
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogTitle id="form-dialog-title">
                    <Typography variant="h2" component="h2">                
                    {title}
                    </Typography>
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={close}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <GridCloseIcon />
            </IconButton>
            <Divider></Divider>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={3}>
                        <TextField
                            id="datetime-local"
                            label="Sale Date"
                            variant='standard'
                            type="datetime-local"
                            defaultValue={this.state.saleDate}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.changeSaleDate}
                            errorMessage={this.errorMessage}
                            isError={this.isError}
                            checkValidation={this.checkValidation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <CustomerDropDwon 
                        label="Sale to" 
                        name="customerId"
                        value={this.props.data.customerId} 
                        customerList = {this.props.custCustomerList} 
                        customerAction={this.customerAction}
                        errorMessage={this.errorMessage}
                        isError={this.isError}
                        checkValidation={this.checkValidation}
                        >
                        </CustomerDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ItemOptions 
                        label="Items" 
                        name="custProductSaleItemList"
                        items={this.props.custProductList} 
                        itemAction={this.itemAction}
                        errorMessage={this.errorMessage}
                        isError={this.isError}
                        checkValidation={this.checkValidation}
                        ></ItemOptions>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                            <div >
                            {
                                this.getSelectedItems()
                            }
                            </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider></Divider>
            <DialogActions>
                <Grid container spacing={2} padding={2}>
                    <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                        <Button variant='text'>Total Sale : {this.getTotalSale()}</Button>
                    </Grid>
                    <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                        <Button variant='contained' onClick={()=>this.addSale(type)}>{type}</Button>
                    </Grid>
                </Grid>
            </DialogActions>
         </BootstrapDialog>
    );
};
  }



const styles = {
    addSaleButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20, 
    },
    datepickers: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
    }
};


const mapStateToProps = state => {
    const { custProductList } = state.custProductReducer;

    const { custCustomerList } = state.custCustomerReducer;

    return { custProductList, custCustomerList };
}

export default connect(mapStateToProps, { getCustProductList, getCustCustomerList})(CustSaveSaleModel);