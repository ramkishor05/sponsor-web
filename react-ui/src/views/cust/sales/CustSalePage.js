import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core';


import { 
    addCustSale, editCustSale, deleteCustSale, getCustSaleList, getCustCustomerList, getCustProductList,getCustBusinessList
 } from '../../../actions';

 import MainCard from '../../../component/cards/MainCard';
 import AddIcon from '@material-ui/icons/Add';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import { makeStyles } from '@material-ui/styles';
import PrintBill from './PrintBill';
import CustSaveSaleModel from './CustSaveSaleModel';
import CustSaveSalePage from './CustSaveSalePage';
import ProductList from '../../../component/products/ProductList';
import ProductGrids from '../../../component/products/ProductGrids';
import QuickBuyProductCard from '../../../component/products/QuickBuyProductCard';


const mainheaders = [
    {
        name: "idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "saleDate",
        label: "Sale Date",
        type: 'text'
    },
    {
        name: "customerId",
        label: "Customer",
        type: 'text',
        render: (value, row, header, props)=>{
           let customer= props.custCustomerList? props.custCustomerList.find((custCustomer)=>custCustomer.id==value): null;
           return customer? customer.name : value;
        }
    },
    {
        name: "totalPrice",
        label: "Total Price",
        type: 'text'
    },
    {
        name: "totalQnt",
        label: "Total Qnt",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const custProductSaleItemListHeaders = [
    {
        name: "custProduct.idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "custProduct.name",
        label: "Name",
        type: 'text'
    },
    {
        name: "salePrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "saleQnt",
        label: "Qnt",
        type: 'text'
    },
    {
        name: "subTotal",
        label: "Sub Total",
        type: 'text',
        render: (value, row, header, props)=>{
           return value;// row.salePrice.price*row.saleQnt;
        }
    }
];
const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Items",
            name: "custProductSaleItemList",
            headers: custProductSaleItemListHeaders
        }
    ]
}

const modelheaders = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email'
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text'
    },
    {
        name: "mobileNumber",
        label: "mobileNumber",
        type: 'text'
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text'
    }
];

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));
  
  

class CustSalePage extends Component {
    state={
        configPage : true,
        savePage : false,
        saveModel: false,
        deleteModel: false,
        printModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    _clearModel=()=>{
        this.setState({ deleteModel:false, saveModel:false, printModel: false,  savePage : false });
    }
    
    clearAndRefresh = () => {
        this.props.getCustSaleList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false, savePage : false  });
    }
    
    _edit = row => {
        this._clearModel();
        if(this.state.configPage){
             this.setState({ dataObject: row, title:"Edit sale", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit sale", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        this._clearModel();
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add sale", type:"Add", savePage: true  });
        } else{
            this.setState({ dataObject: {}, title:"Add sale", type:"Add", saveModel: true  });
        }
    }

    build=(row)=>{
        let custCustomer= this.props.custCustomerList.find(custCustomer=>custCustomer.id==row.customerId);
        let custBusiness= this.props.custBusinessList.find(custBusiness=>custBusiness.id==row.businessId);
        const subTotal=row.custProductSaleItemList.reduce((previousValue, currentValue) => {
            return previousValue + (Number.parseFloat(currentValue.salePrice.price)*currentValue.saleQnt);
        }, 0);
        const invoice={
            idenNo:row.idenNo,
            date:row.saleDate,
            from: {
                name: custBusiness.name, 
                phone: custBusiness.phoneNumber, 
                address: custBusiness.permamentAddress
            } ,
            to: {
                name: custCustomer.name, 
                phone: custCustomer.phoneNumber, 
                address: custCustomer.permamentAddress
            },
            payment: {
                status: 'Unpaid',
                amount: subTotal-row.discounts
            },
            headers:custProductSaleItemListHeaders,
            items: row.custProductSaleItemList,
            subTotal: subTotal,
            discounts: row.discounts,
            totalAmount:subTotal-row.discounts,
        }
        return invoice;
     }

    _print = (row) => {
        this._clearModel();
        this.setState({ dataObject: this.build(row), title:"Sale Invoice", type:"Print", printModel: true  });
     }
    _delete = row => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Delete sale", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustSale(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustSale(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustSale(row.id, this.clearAndRefresh)

    };

   async componentDidMount() {
      
        this.props.getCustProductList();
        this.props.getCustBusinessList();
        this.props.getCustCustomerList();
        this.clearAndRefresh();
    }
    

    render() {
        return (
            <>
                { !this.state.savePage &&
                <MainCard title="Sale List" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                        content={false}
                    >
                       
                       {<CollapsibleTable 
                            headers={headers} 
                            dataList={this.props.custSaleList}
                            custCustomerList= {this.props.custCustomerList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            printAction= {this._print}
                            >

                    </CollapsibleTable>}
                    </MainCard>
                }
                {
                    this.state.savePage && <CustSaveSalePage
                    title={this.state.title}
                    open={this.state.savePage}
                    close={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    custProductList={this.props.custProductList}
                    saveAction = {this.saveObject}
                >
                </CustSaveSalePage>
                }

{
                    this.state.saveModel && <CustSaveSaleModel
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    custProductList={this.props.custProductList}
                    saveAction = {this.saveObject}
                >
                </CustSaveSaleModel>
                }
                
                {
                    this.state.printModel && <PrintBill
                    title={this.state.title}
                    open={this.state.printModel}
                    headers={headers} 
                    custCustomerList={this.props.custCustomerList}
                    close={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </PrintBill>
                }
            
                <ConfirmModel
                    openAction={this.state.deleteModel}
                    closeAction={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    message= 'Do you want to delete'
                    saveAction = {this.saveObject}
                    >
                </ConfirmModel>
            </>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { custSaleList} = state.custSaleReducer;
    const { custCustomerList} = state.custCustomerReducer;
    const { custProductList} = state.custProductReducer;
    const { custBusinessList} = state.custBusinessReducer;
    return { user, custSaleList, custCustomerList, custProductList, custBusinessList};
};

const styles = {
    addCustomerButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { addCustSale, editCustSale,deleteCustSale, getCustSaleList, getCustCustomerList, getCustProductList, getCustBusinessList})(CustSalePage);
