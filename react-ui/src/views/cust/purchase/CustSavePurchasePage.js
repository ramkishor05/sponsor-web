import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';

// material-ui
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemText,Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography} from '@material-ui/core';
import SupplierOptions from '../../../component/dropdwons/SupplierOptions';
// project imports
import { makeStyles, styled } from '@material-ui/styles';
import ItemOptions from '../../../component/dropdwons/ItemOptions';
import { 
    getCustProductList, getCustSupplierList
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { GridCloseIcon } from '@mui/x-data-grid';
import { Close, LabelImportant } from '@material-ui/icons';
import PaymentFieldGroup from '../../../component/fields/PaymentFieldGroup';
import MainCard from '../../../component/cards/MainCard';
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
        "id": "purchaseDate",
        "key": "purchaseDate",
        "name": "purchaseDate",
        "label": "purchaseDate",
        "type": "text",
        "required" : {
            value : '',
            message: "Date should not be empty."
        }
    },
    {
        "id": "supplier",
        "key": "supplier",
        "name": "supplierId",
        "label": "supplier",
        "type": "text",
        "required" : {
            value : '',
            message: "Supplier should not be empty."
        }
    },
    {
        "id": "items",
        "key": "items",
        "name": "custProductPurchaseItemList",
        "label": "items",
        "type": "text",
        "required" : {
            value : '',
            message: "Items should not be empty."
        }
    }
  ]

  class CustSavePurchasePage extends Component {

    
    state = {
        id:null,
        selectedItems: [],
        custProductPurchaseAdditionalList:[],
        purchaseDate: moment(new Date()).format(DATE_TIME_FORMAT_UI),
        supplierId: 0,
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
        let {data}=this.props;
        let object={
            id:data.id,
            idenNo:data.idenNo,
            selectedItems: [],
            custProductPurchaseAdditionalList:data.custProductPurchaseAdditionalList? data.custProductPurchaseAdditionalList: [],
            custProductPurchasePaymentList:data.custProductPurchasePaymentList? data.custProductPurchasePaymentList: [],
            purchaseDate: data.purchaseDate?  moment(data.purchaseDate).format(DATE_TIME_FORMAT_UI):  moment(new Date()).format(DATE_TIME_FORMAT_UI),
            supplierId: data.supplierId?data.supplierId:0,
            userId: data.userId?data.userId:0,
            discounts : data.discounts? data.discounts:0
        }
        data.custProductPurchaseItemList && data.custProductPurchaseItemList.forEach(custProductPurchaseItem=>{
            custProductPurchaseItem['custProduct']=this.findProduct(custProductPurchaseItem.custProductId);
            let custProductPurchaseItemObj={...custProductPurchaseItem};
            custProductPurchaseItemObj['id']=custProductPurchaseItem.id;
            custProductPurchaseItemObj['type']=custProductPurchaseItem.type;
            custProductPurchaseItemObj['price']=custProductPurchaseItem.custProduct.purchasePrice;
            custProductPurchaseItemObj['discount']=custProductPurchaseItem.discount;
            custProductPurchaseItemObj['qnt']=custProductPurchaseItem.purchaseQnt;
            object.selectedItems.push(custProductPurchaseItemObj)
        })
        this.state={...this.state, ...object};
    }

    findProduct = (id)=>{
        return this.props.custProductList.find(custProduct=>custProduct.id===id);
    }

    findField = (id)=>{
        return model.find(field=>field.id===id);
    }

    componentDidMount() {
        this.props.getCustSupplierList();
        this.props.getCustProductList(); 
    }

    isError = (name)=>{
        return this.state.validationMap[name]!=null;
    }

    errorMessage = (name)=>{
        return this.state.validationMap[name];
    }

    changePurchaseDate = (event) => {
        this.checkValidation(this.findField("purchaseDate"), event.target.value)
        this.setState({purchaseDate: event.target.value});
    };

    setDiscounts = (event) => {
        this.setState({discounts: event.target.value});
    };

     itemAction=(custProduct)=>{
        if(custProduct){
            const newSelectedItems = [...this.state.selectedItems];
            let itemObject = {};
            itemObject['custProduct']=custProduct;
            itemObject['qnt']=1;
            itemObject['discount']=0;
            itemObject['isWholePurchase']=false;
            itemObject['price']=custProduct.purchasePrice;
            newSelectedItems.push(itemObject);
            this.checkValidation(this.findField("items"), newSelectedItems)
            this.setState({selectedItems: newSelectedItems});
            
        }
        
    }

    supplierAction=(supplier)=>{
        if(supplier){
            this.checkValidation(this.findField("supplier"), supplier.id)
            this.setState({supplierId: supplier.id});
           
        } else{
            this.checkValidation(this.findField("supplier"), null)
            this.setState({supplierId: null});
           
        }
    }

     itemQnt=(item, qnt)=>{
        item['qnt']=qnt;
        let newSelectedItems = [...this.state.selectedItems];
        if(qnt<=0){
            newSelectedItems= newSelectedItems.filter((newitem) => newitem.id !== item.id);
        }
        this.setState({selectedItems: newSelectedItems});
    }

    toggleWholePurchase=(custProduct)=>{
        custProduct.isWholePurchase=!custProduct.isWholePurchase;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems});
    }
    
    addProductAdditionalList=(formValues)=>{
        this.setState({custProductPurchaseAdditionalList:formValues});
    }

    addProductPaymentList=(formValues)=>{
        this.setState({custProductPurchasePaymentList:formValues});
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
            return previousValue + currentValue.qnt * currentValue.price.price;
        }, 0)
     }

     
     getTotalPurchase = () =>{
        let subTotal=  this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * currentValue.price.price;
        }, 0);
        let otherItemTotal= this.state.custProductPurchaseAdditionalList && this.state.custProductPurchaseAdditionalList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        let discountTotal= this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0);
        return subTotal+otherItemTotal-discountTotal;
    }

    checkValidation = (field, value)=>{
        const validationMap=this.state.validationMap;
        let status=true;
        if(field.required && (value=='' || undefined==value || value==0 || null===value || !value || value.length==0) ){
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
        
        console.log("status,", status, value)
        console.log("this.state.validationMap=",validationMap)
        this.setState({...this.state, validationMap:{...validationMap}});
        return status;
    }

    addPurchase = (type) =>{
       
        let custProductPurchase = {
            id:this.state.id,
            idenNo:this.state.idenNo,
            purchaseDate: moment(this.state.purchaseDate).format(DATE_TIME_FORMAT_UI),
            supplierId: this.state.supplierId,
            discounts: this.state.discounts,
            totalPrice: 0,
            totalQnt: 0,
            custProductPurchaseItemList: [],
            custProductPurchaseAdditionalList:this.state.custProductPurchaseAdditionalList,
            custProductPurchasePaymentList:[]
        }
    

        this.state.selectedItems.forEach((item)=>{
            custProductPurchase.totalQnt+=item.qnt;
            custProductPurchase.totalPrice+=(item.qnt * item.price.price);
            let custProductWholePurchase={
                id:item.id,
                name: item.name,
                desc: item.desc,
                discount:item.discount,
                purchasePrice: item.price,
                purchaseQnt: item.qnt,
                custProductId: item.custProduct.id
            }
            custProductPurchase.custProductPurchaseItemList.push(custProductWholePurchase);
        })

        this.state.custProductPurchasePaymentList.forEach((custProductPurchasePaymentObj)=>{
            let custTransaction={
                transactionAmount: custProductPurchase.totalPrice,
                transactionStatus: 'Paid',
                transactionType:  'Debit',
                transactionMode: 'Online',
                transactionReciverId: this.state.supplierId,
                transactionSenderId: this.props.userDetail.id,
                transactionMakerId: this.props.userDetail.id,
            };

            let custProductPurchasePayment= {};
            custProductPurchasePayment['suuplierId']= this.state.supplierId;
            custProductPurchasePayment['custTransaction']=custTransaction;
            custProductPurchasePayment['primaryPayment'] =true
            custProductPurchase.custProductPurchasePaymentList.push(custProductPurchasePayment);
        })
        const fields=model;
        for(var fieldIndex in  fields){
            let field= fields[fieldIndex];
            if(field.prefix){
              this.checkValidation(field.prefix,getValue(custProductPurchase,field.prefix.name));
            }
            this.checkValidation(field,getValue(custProductPurchase,field.name));
            if(field.postfix){
              this.checkValidation(field.postfix,getValue(custProductPurchase,field.postfix.name));
            }
        };

        if(Object.keys(this.state.validationMap).length === 0){
            this.props.saveAction(type,custProductPurchase);
        }
    }

     getSelectedItems=()=>{
        return (
            this.state.selectedItems && this.state.selectedItems.length>0 &&
            (
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
                    this.state.selectedItems.map(selectedItem=>
                        <TableRow key={'selectedItem_'+selectedItem.custProduct.id}>
                            <TableCell key={'selectedItem_'+selectedItem.id+'_image'}>
                                <Avatar alt="Remy Sharp" src={selectedItem.custProduct.image} />
                            </TableCell>
                            <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_title'} >
                                {selectedItem.custProduct.title}
                            </TableCell>
                            <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_price'}>
                                {selectedItem.price.price}
                            </TableCell>
                            <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_discount'}>
                                <TextField type='number' value={selectedItem.discount} variant='standard' onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                            </TableCell>
                            <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_qnt'} sx={{  textAlign: 'center'}}>
                                <ShoppingCartButton  
                                    counter={selectedItem.qnt} 
                                    updateCounter={(counter)=> this.itemQnt(selectedItem, counter )}>
                                </ShoppingCartButton>                        
                            </TableCell>
                            <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_switch'} sx={{ textAlign: 'right'}}>
                            Whole Purchase <ToggleSwitch name="Whole Purchase" label="Whole Purchase" value={selectedItem.isWholePurchase} checked={selectedItem.isWholePurchase} onClick={()=>this.toggleWholePurchase(selectedItem)} ></ToggleSwitch>
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
                            <DynamicField list={this.state.custProductPurchaseAdditionalList} onSave={this.addProductAdditionalList} type="number"></DynamicField>
                            
                            <List>
                            {
                            this.state.custProductPurchaseAdditionalList && this.state.custProductPurchaseAdditionalList.map((addAdditionalCharge,i)=>
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
                        <PaymentFieldGroup list={this.state.custProductPurchasePaymentList} onSave={this.addProductPaymentList}></PaymentFieldGroup>
                        <List>
                            {
                            this.state.custProductPurchasePaymentList && this.state.custProductPurchasePaymentList.map((custProductPayment, i)=>
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
        )
    }


    render() {

    const { open, close, title, type} = this.props;
    
    return (
        <MainCard title={title} 
            button ={
            
            <Tooltip title="Close" aria-label="close">
                <Button variant='outlined' color="error" onClick={close}>
                    <Close/>
                </Button>
            </Tooltip>
        }
        content={true}
                    >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3} spacing={2}>
                        <TextField
                            id="datetime-local"
                            label="Purchase Date"
                            variant='standard'
                            type="datetime-local"
                            defaultValue={this.state.purchaseDate}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.changePurchaseDate}
                           
                            helperText={this.errorMessage('purchaseDate')}
                            error={this.isError('purchaseDate')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} spacing={2}>
                        <SupplierOptions 
                        label="Purchase to" 
                        name="supplierId" 
                        value={this.props.data.supplierId} 
                        supplierList = {this.props.custSupplierList} 
                        supplierAction={this.supplierAction}
                        errorMessage={this.errorMessage}
                        isError={this.isError}
                        ></SupplierOptions>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} spacing={2}>
                        <ItemOptions 
                        label="Items" 
                        name="custProductPurchaseItemList"
                        items={this.props.custProductList} 
                        itemAction={this.itemAction}
                        errorMessage={this.errorMessage}
                        isError={this.isError}
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
                {
                    this.state.selectedItems && this.state.selectedItems.length>0 &&
                    (
                        <Grid container spacing={2} padding={2}>
                            <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                                <Button variant='text'>Total Purchase : {this.getTotalPurchase()}</Button>
                            </Grid>
                            <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                                <Button variant='contained' onClick={()=>this.addPurchase(type)}>{type}</Button>
                            </Grid>
                        </Grid>
                    )
                }
                
            
         </MainCard>
    );
};
  }



const styles = {
    addPurchaseButton: {
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
    const { userDetail } = state.userReducer;

    const { custProductList } = state.custProductReducer;

    const { custSupplierList } = state.custSupplierReducer;

    return { custProductList, custSupplierList, userDetail };
}

export default connect(mapStateToProps, { getCustProductList, getCustSupplierList})(CustSavePurchasePage);