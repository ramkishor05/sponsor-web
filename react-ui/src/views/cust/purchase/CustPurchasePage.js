import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core';


import { 
    addCustPurchase, editCustPurchase, deleteCustPurchase, getCustPurchaseList, getCustSupplierList, getCustBusinessList
 } from '../../../actions';

 import MainCard from '../../../component/cards/MainCard';
 import AddIcon from '@material-ui/icons/Add';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustSavePurchaseModel from './CustSavePurchaseModel';
import { makeStyles } from '@material-ui/styles';
import PrintBill from './PrintBill';
import CustSavePurchasePage from './CustSavePurchasePage';


const mainheaders = [
    {
        name: "idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "purchaseDate",
        label: "Purchase Date",
        type: 'text'
    },
    {
        name: "supplierId",
        label: "Supplier",
        type: 'text',
        render: (value, row, header, props)=>{
            let supplier= props.custSupplierList ?  props.custSupplierList.find((custSupplier)=>custSupplier.id==value): null
           return supplier?  supplier.name: value;
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

const custProductPurchaseItemHeaders = [
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
        name: "purchasePrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "purchaseQnt",
        label: "Qnt",
        type: 'text'
    },
    {
        name: "discount",
        label: "Discount",
        type: 'text'
    },
    {
        name: "subTotal",
        label: "Sub Total",
        type: 'text',
        render: (value, row, header, props)=>{
           return row.purchaseQnt* row.purchasePrice.price;
        }
    }
];

const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Items",
            name: "custProductPurchaseItemList",
            headers: custProductPurchaseItemHeaders
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
  
  

class CustPurchasePage extends Component {
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
        this.setState({ deleteModel:false, saveModel:false, printModel: false, savePage:false });
    }
    _edit = row => {
        this._clearModel();
        if(this.state.configPage){
            this.setState({ dataObject: row, title:"Edit purchase", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit purchase", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        this._clearModel();
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add purchase", type:"Add", savePage: true  });
        } else {
            this.setState({ dataObject: {}, title:"Add purchase", type:"Add", saveModel: true  });
        }
    }

    build=(row)=>{
        let custSupplier= this.props.custSupplierList.find(custSupplier=>custSupplier.id==row.supplierId);
        let custBusiness= this.props.custBusinessList.find(custBusiness=>custBusiness.id==row.businessId);
        const subTotal=row.custProductPurchaseItemList.reduce((previousValue, currentValue) => {
            return previousValue + (Number.parseFloat(currentValue.purchasePrice.price)*currentValue.purchaseQnt);
        }, 0);
        const invoice={
            idenNo:row.idenNo,
            date:row.purchaseDate,
            from: {
                name: custBusiness.name, 
                phone: custBusiness.phoneNumber, 
                address: custBusiness.permamentAddress
            } ,
            to: {
                name: custSupplier.name, 
                phone: custSupplier.mobileNumber, 
                address: custSupplier.presentAddress
            },
            payment: {
                status: 'Unpaid',
                amount: subTotal-row.discounts
            },
            headers:custProductPurchaseItemHeaders,
            items: row.custProductPurchaseItemList,
            subTotal: subTotal,
            discounts: row.discounts,
            totalAmount:subTotal-row.discounts,
        }
        return invoice;
     }

    _print = (row) => {
        this._clearModel();
        this.setState({ dataObject: this.build(row), title:"Purchase Invoice", type:"Print", printModel: true  });
     }

     

    _delete = row => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Delete purchase", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustPurchase(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustPurchase(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustPurchase(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustPurchaseList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false,savePage : false });
    }
    
   async componentDidMount() {
       this.props.getCustSupplierList();
       this.props.getCustBusinessList();
       await this.props.getCustPurchaseList();
    }
    

    render() {
        return (
            <>
                {
                !this.state.savePage 
                 && <MainCard title="Purchase List" 
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
                    <CollapsibleTable 
                        headers={headers} 
                        dataList={this.props.custPurchaseList}
                        custSupplierList= {this.props.custSupplierList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        printAction= {this._print}
                        >

                    </CollapsibleTable>
                </MainCard>
                }
                
                {
                    this.state.savePage && <CustSavePurchasePage
                    title={this.state.title}
                    open={this.state.savePage}
                    close={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </CustSavePurchasePage>
                }
                {
                    this.state.saveModel && <CustSavePurchaseModel
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={this._clearModel}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </CustSavePurchaseModel>
                }
                
                {
                    this.state.printModel && <PrintBill
                    title={this.state.title}
                    open={this.state.printModel}
                    headers={headers} 
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
    const { custPurchaseList} = state.custPurchaseReducer;
    const { custSupplierList} = state.custSupplierReducer;
    const { custBusinessList} = state.custBusinessReducer;
    return { user, custPurchaseList, custSupplierList, custBusinessList};
};

export default connect(mapStateToProps, { addCustPurchase, editCustPurchase,deleteCustPurchase, getCustPurchaseList, getCustSupplierList, getCustBusinessList})(CustPurchasePage);
