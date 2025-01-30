import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';

// material-ui
import { Avatar, Button, Card, CardContent, Chip, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, Tooltip, Typography} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles} from '@material-ui/styles';
import ItemOptions from '../../../component/dropdwons/ItemOptions';
import { 
    getCustProductList, getCustCustomerList
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { LabelImportant } from '@material-ui/icons';
import PaymentFieldGroup from '../../../component/fields/PaymentFieldGroup';
import MainCard from '../../../component/cards/MainCard';
import { getValue } from '../../../component/utils/CommanUtil';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleSwitch from '../../../component/buttons/ToggleSwitch';
import CustSalePaymentService from '../../../services/CustSalePaymentService';
import CustTransationService from '../../../services/CustTransationService';

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

  const CartItem  = ({ product, itemQnt, setDiscount, setPrice }) =>  {
    return (
        <Card sx={{border:1}} >
            <CardContent style={{padding:5}}>
                <div className="d-flex" style={{width: '100%'}}>
                    <div className="d-flex flex-row align-items-center" style={{width: '60%'}}>
                        <div  style={{width: '20%'}}>
                            <img
                                src={'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'}
                                className="img-fluid rounded-3" alt="" />
                        </div>
                        <div  style={{width: '80%', paddingLeft: 5, paddingRight:5}}>
                            <p className="justify-content">{product.custProduct.title}</p>
                            <p className="small mb-0">{product.custProduct.description}</p>
                            <p className="small mb-0">{product.custProduct.category}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center" style={{width: '40%'}}>
                        <div  style={{width: '25%'}}>
                            <h5 className="mb-0">
                             <TextField type='number' 
                            label="Price"
                            value={product.salePrice.price}
                            size='small'
                            sx={{width:50}}
                            variant='standard' 
                            onChange={(event)=> setPrice(product, event.target.value)}></TextField>
                            </h5>
                        </div>
                        <div  style={{width: '25%'}}>
                            <TextField type='number' 
                            label="discount"
                            value={product.discount} 
                            size='small'
                            sx={{width:50}}
                            variant='standard' 
                            onChange={(event)=> setDiscount(product, event.target.value)}></TextField>
                       </div>
                        <div  style={{width: '50%'}}>
                            <ShoppingCartButton  
                                counter={product.saleQnt} 
                                updateCounter={(counter)=> itemQnt(product, counter )}>
                            </ShoppingCartButton>     
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

  class CustSaveSalePage extends Component {

    
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

    componentDidMount(){

    }

    constructor (props){
        super(props)
        let {data}=this.props;
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
            custProductSaleItem['custProduct']=this.findProduct(custProductSaleItem.custProductId)
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

    findProduct = (id)=>{
        return this.props.custProductList.find(custProduct=>custProduct.id===id);
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
            this.checkValidation(this.findField("customer"), customer.id)
            this.setState({customerId: customer.id});
        } else{
            this.checkValidation(this.findField("customer"), null)
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
        this.setState({selectedItems: newSelectedItems,
            subTotal: this.getSubTotal(), 
           discounts: this.getDiscounts(), totalPrice: this.getTotalSale(),
           payment:{
               ...this.state.payment,
               amount:this.getTotalSale()
           }
       });
   }

    setPrice=(item, amount)=>{
        item['salePrice']['price']=amount;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems,
             subTotal: this.getSubTotal(), 
            discounts: this.getDiscounts(), totalPrice: this.getTotalSale(),
            payment:{
                ...this.state.payment,
                amount:this.getTotalSale()
            }
        });
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
            custProductSalePaymentList:[]
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

        this.state.custProductSalePaymentList.forEach((custProductSalePaymentObj)=>{
            let custTransaction={
                transactionAmount: custProductSale.totalPrice,
                transactionStatus: 'Paid',
                transactionType:  'Credit',
                transactionMode: 'Online',
                transactionReciverId: this.props.userDetail.id,
                transactionSenderId: this.state.customerId,
                transactionMakerId: this.props.userDetail.id,
            };

            let custProductSalePayment= {};
            custProductSalePayment['customerId']= this.state.customerId;
            custProductSalePayment['custTransaction']=custTransaction;
            custProductSalePayment['primaryPayment'] =true
            custProductSale.custProductSalePaymentList.push(custProductSalePayment);
        });

        let custTransaction={
            transactionAmount: custProductSale.totalPrice,
            transactionStatus: 'Paid',
            transactionType:  'Credit',
            transactionMode: 'Online',
            transactionReciverId: this.props.userDetail.id,
            transactionSenderId: this.state.customerId,
            transactionMakerId: this.props.userDetail.id,
        };

        let custProductSalePayment= {};
        custProductSalePayment['customerId']= this.state.customerId;
        custProductSalePayment['custTransaction']=custTransaction;
        custProductSalePayment['primaryPayment'] =true
        custProductSale.custProductSalePaymentList.push(custProductSalePayment);
        if(custProductSale.saleDate==='Invalid date'){
            custProductSale.saleDate="";
        }
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

        console.log("saleDate=",custProductSale.saleDate)

        if(Object.keys(this.state.validationMap).length === 0){
            this.props.saveAction(type,custProductSale);
        }
        
    }

     getSelectedItemsTable=()=>{
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

    paymentChange = (payment, e) => {
        const newpayment={...payment};
        newpayment[e.target.name] = e.target.value;
        this.setState({...this.state, payment: newpayment});
        
        const transaction={};
        transaction['transactionAmount']=this.state.payment.amount;
        transaction['transactionType']='Credit';
        transaction['transactionMode']=this.state.payment.mode;
        transaction['transactionDate']=moment().format('YYYY-MM-DD');
        transaction['transactionStatus']=this.state.payment.mode=='Unpaid' ? 'Unpaid': 'Paid';
        transaction['transactionReciverId']=this.props.userDetail.id;
        transaction['transactionSenderId']=this.state.customerId;
        transaction['transactionMakerId']=this.props.userDetail.id;
        transaction['transactionService']='SALE';
        console.log("transaction=",transaction)
        CustTransationService.add(transaction);
    }

    getSelectedItemsGrid=()=>{
        return  (
        
           <List dense={true}>
                {
                this.state.selectedItems && this.state.selectedItems.map(selectedItem=>
                    
                  <ListItem key={'selectedItem_'+selectedItem.id+'_delete'}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                    sx={{border:1}}
                  >
                   
                    <ListItemAvatar 
                    key={'selectedItem_'+selectedItem.id+'_image'}
                    sx={{width:'10%'}}
                    >
                       {
                         selectedItem.custProduct.image ? 
                         <Avatar alt="Logo" src={selectedItem.custProduct.image} />
                         : <Avatar alt="Logo" ><FolderIcon /></Avatar>
                       } 
                    </ListItemAvatar>
                    <ListItemText
                    key={'selectedItem_'+selectedItem.custProduct.id+'_title'} 
                    primary={selectedItem.custProduct.title}
                    secondary={selectedItem.custProduct.description}
                     >
                    </ListItemText>
                    <ListItemText
                     key={'selectedItem_'+selectedItem.custProduct.id+'_price'}
                    >
                       <TextField type='number' 
                        label="Price"
                        value= {selectedItem.salePrice.price}
                        variant='standard' 
                        sx={{width:50}}
                        onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                    </ListItemText>
                    <ListItemText
                    key={'selectedItem_'+selectedItem.custProduct.id+'_discount'}
                    >
                        <TextField type='number' 
                        label="discount"
                        value={selectedItem.discount} 
                        size='small'
                        sx={{width:50}}
                        variant='standard' 
                        onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                    </ListItemText>
                    <ListItemText 
                    key={'selectedItem_'+selectedItem.custProduct.id+'_qnt'}
                    sx={{width:'10%'}}>
                        <ShoppingCartButton  
                            counter={selectedItem.saleQnt} 
                            updateCounter={(counter)=> this.itemQnt(selectedItem, counter )}>
                        </ShoppingCartButton>                        
                    </ListItemText>
                    <ListItemText 
                    key={'selectedItem_'+selectedItem.custProduct.id+'_switch'}
                    sx={{width:'10%'}}
                    >
                    <ToggleSwitch name="Whole Sale" 
                     onlevel="Wholesale"
                     offlevel="Retail"
                     value={selectedItem.isWholeSale} 
                     checked={selectedItem.isWholeSale} 
                     onClick={()=>this.toggleWholeSale(selectedItem)} 
                     >
                     </ToggleSwitch>
                    </ListItemText>
                  </ListItem>
                )
               }
              </List>
        )
    }


    render() {

    const { close, title, type} = this.props;
    
    return (
       /* <MainCard title={title} 
        subheader ={ <ItemOptions 
            label="Search items" 
            name="custProductSaleItemList"
            items={this.props.custProductList} 
            itemAction={this.itemAction}
            errorMessage={this.errorMessage}
            isError={this.isError}
            checkValidation={this.checkValidation}
            ></ItemOptions>}
            button ={
                <Tooltip title="Close" aria-label="close">
                <Button variant='outlined' color="error" onClick={close}>
                    <Close/>
                </Button>
            </Tooltip>
        }
        content={true}
                    >
           
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
                            helperText={this.errorMessage('saleDate')}
                            error={this.isError('saleDate')}
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
                       
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                            {
                                this.getSelectedItemsGrid()
                            }
                    </Grid>
                  
                    <Grid item xs={12} xl={12} spacing={2} sx={{textAlign: 'right'}}>
                        
                        <Typography>  
                            Sub Total <LabelImportant></LabelImportant> 
                            {
                                <Chip variant='outlined' sx={{direction: 'rtl' , width:100}} label={this.getSubTotal()}> {}  </Chip >  
                            }
                         </Typography> 
                         <Typography> 
                            Discounts <LabelImportant></LabelImportant> 
                            <Chip variant='outlined'  sx={{direction: 'rtl', width:100}} label={this.getDiscounts()}></Chip >
                        </Typography>  
                        <Typography> 
                            Grand Total <LabelImportant></LabelImportant> 
                            <Chip variant='outlined'  sx={{direction: 'rtl', width:100}} label={this.getTotalSale()}></Chip >
                        </Typography> 
                    </Grid>
                    
                    <Grid item xs={12} xl={12} spacing={2} sx={{textAlign: 'right'}}>
                         <div style={{alignItems:'end'}}>
                         Additional Charges
                        <DynamicField list={this.state.custProductSaleAdditionalList} onSave={this.addProductAdditionalList}></DynamicField>
                        <Typography> 
                        {
                        this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.map((addAdditionalCharge,i)=>
                                <Typography>{addAdditionalCharge.field} : <Chip variant='outlined' label={addAdditionalCharge.value}  sx={{direction: 'rtl', width:100}}></Chip></Typography>  
                            )
                        }
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} xl={12} sx={{textAlign: 'right'}}>
                    <PaymentFieldGroup 
                    amount={this.getTotalSale()} 
                    list={this.state.custProductSalePaymentList} 
                    onSave={this.addProductPaymentList}></PaymentFieldGroup>
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
                </Grid>
                </Grid>
                    
                <Grid container spacing={3} sx={{paddingTop: 2}}>
                    <Grid item  xs={12} sm={12} md={6}>
                        <Button variant='outlined'>Total Sale : {this.getTotalSale()}</Button>
                    </Grid>
                    <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                        <Button variant='outlined' onClick={()=>this.addSale(type)}>{type}</Button>
                    </Grid>
                </Grid>
            </MainCard>*/
            <MainCard title={title} >
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
                            helperText={this.errorMessage('saleDate')}
                            error={this.isError('saleDate')}
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
            label="Search items" 
            name="custProductSaleItemList"
            items={this.props.custProductList} 
            itemAction={this.itemAction}
            errorMessage={this.errorMessage}
            isError={this.isError}
            checkValidation={this.checkValidation}
            ></ItemOptions>
            </Grid>
            </Grid>
             
            <Grid container sx={{marginTop:5}}>
                <Grid item xs={12} sm={12} md={8} sx={{textAlign: 'center'}}>
                    <div style={{overflowY: 'auto', maxHeight:300, minHeight:300}}>
                    {
                        this.state.selectedItems.length>0?
                        this.state.selectedItems.map(product=>
                            <CartItem product={product} itemQnt={this.itemQnt} setDiscount={this.setDiscount} setPrice={this.setPrice}></CartItem>
                        )
                    :<h3>Add item in cart</h3>
                    }
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    {
                        this.state.selectedItems.length>0 &&
                        <div style={{textAlign:'right', alignContent: 'end', padding:5}}>
                            <div >
                                Additional Charges
                                <DynamicField type="number" label="" list={this.state.custProductSaleAdditionalList} onSave={this.addProductAdditionalList}></DynamicField>
                                { 
                                    this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.length>0
                                    && <Grid container sx={{marginLeft:2, marginTop:2, width:'95%'}}> 
                                    {
                                    this.state.custProductSaleAdditionalList.map((addAdditionalCharge,i)=>
                                    <>
                                        <Grid xs={12} xl={12} spacing={2} sx={{textAlign: 'right', marginTop:1, marginBottom:1}}>
                                            {addAdditionalCharge.field}  
                                            <LabelImportant></LabelImportant>
                                            <Chip variant='filled' color='secondary' sx={{direction: 'rtl' , width:100}} label={addAdditionalCharge.value} ></Chip>
                                        </Grid>
                                        </>
                                        )
                                    }
                                    </Grid>
                                }
                            </div>
                            <Divider></Divider>
                           <Grid item xs={12} xl={12} spacing={2} sx={{textAlign: 'right', marginTop:1, marginBottom:1}}>
                                <Typography>  
                                    Sub Total <LabelImportant></LabelImportant> 
                                    {
                                        <Chip variant='filled' color='warning' sx={{direction: 'rtl' , width:100}} label={this.state.subTotal}> {}  </Chip >  
                                    }
                                </Typography> 
                                <Typography> 
                                    Discounts <LabelImportant></LabelImportant> 
                                    <Chip variant='filled' color='primary'  sx={{direction: 'rtl', width:100}} label={this.state.discounts}></Chip >
                                </Typography>  
                                <Typography> 
                                   Total Amount <LabelImportant></LabelImportant> 
                                    <Chip variant='filled' color='success' sx={{direction: 'rtl', width:100}} label={this.state.totalPrice}></Chip >
                                </Typography> 
                           </Grid>
                           <Divider></Divider>
                           <Grid item xs={12} xl={12} spacing={2} sx={{textAlign: 'right', marginTop:1, marginBottom:1}}>
                           <FormControl>
                                <FormLabel id="payment-label">Payment</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="payment-label"
                                    name="mode"
                                    value={this.state.payment?.mode} onChange={e => this.paymentChange(this.state.payment, e)}
                                >
                                    <FormControlLabel value="Unpaid" control={<Radio  />} label="Unpaid" />
                                    <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                                    <FormControlLabel value="Online" control={<Radio />} label="Online" />
                                </RadioGroup>
                                {
                                    <TextField type='number' defaultValue={this.state.payment?.amount} value={this.state.payment?.amount} label="Amount" variant='standard'  name='amount'  onChange={e => this.paymentChange(this.state.payment, e)}></TextField>
                                }
                            </FormControl>
                            </Grid>
                            <Grid container spacing={3} sx={{paddingTop: 2}}>
                           
                            <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={12}>
                                <Button color='error' variant='outlined' onClick={()=>this.addSale(type)}>Checkout</Button>
                            </Grid>
                        </Grid>
                    </div>
                    }
                    
                </Grid>
                </Grid>
             </MainCard>
    );
    };
}

const mapStateToProps = state => {

    const { userDetail } = state.userReducer;

    const { custProductList } = state.custProductReducer;

    const { custCustomerList } = state.custCustomerReducer;

    return { custProductList, custCustomerList , userDetail};
}

export default connect(mapStateToProps, { getCustProductList, getCustCustomerList})(CustSaveSalePage);