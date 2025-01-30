import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { 
    getCustProductList, addCustProduct, editCustProduct, deleteCustProduct,
    getCustUnitList, getCustCurrencyItemList, getCustCategoryList
 } from '../../../actions';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustProductStockService from '../../../services/CustProductStockService';
import DynamicForm from '../../../component/pages/DynamicForm';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class CustProductPage extends Component {
    state={
        configPage : true,
        saveModel: false,
        deleteModel: false,
        savePage : false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
        if(this.state.configPage){
            this.setState({ dataObject: row, title:"Edit product", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit product", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add product", type:"Add", savePage: true  });
        } else{
            this.setState({ dataObject: {}, title:"Add product", type:"Add", saveModel: true  });
        }
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete product", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type, row)
        if(type=='Add')
            this.props.addCustProduct(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustProduct(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustProduct(row.id, this.clearAndRefresh)

    };

     clearAndRefresh = async() => {
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false, savePage: false   });
        await this.props.getCustProductList();
        this.props.custProductList.forEach(custProduct=>{
            this.getCustProductStock(custProduct);
         });
        if(this.props.menuItem.onBoarding){
            this.props.updateOnboarding(this.props.custProductList.length!==0);
        }
    }

     getCustProductStock= async (custProduct)=>{
        custProduct['custProductStockList']= await CustProductStockService.getAll(custProduct.id);
    }
    
    async componentDidMount() {
        this.props.getCustCategoryList();
        this.props.getCustUnitList();
        await this.props.getCustCurrencyItemList();
        this.clearAndRefresh();
    }

 render() {
        return (
                <>
                { !this.state.savePage &&
                    <MainCard title="Product" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                        content={false}
                    >
                     <CollapsibleTable
                        headers={this.props.metadata.table} 
                        dataList={this.props.custProductList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        {... this.props}
                        ></CollapsibleTable>
                    </MainCard>
                }
               {
                this.state.savePage &&
                <DynamicForm
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {this.props.metadata.model}
                saveAction = {this.saveObject}
                {... this.props}
                >
                </DynamicForm>
               }
              {
               this.state.saveModel &&
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {this.props.metadata.model}
                saveAction = {this.saveObject}
                {... this.props}
                >
                </DynamicModel>
               } 
            
               {
                this.state.deleteModel && 
                <ConfirmModel
                openAction={this.state.deleteModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                message= 'Do you want to delete'
                saveAction = {this.saveObject}
                >
                </ConfirmModel>
               }
                
            </>
        );
    };
}


const mapStateToProps = state => {
    const { businessId} = state.accountReducer;
    const { custProductList} = state.custProductReducer;
    const { custUnitList} = state.custUnitReducer;
    const { custCurrencyItemList} = state.custCurrencyItemReducer;
    const { custCategoryItemList } = state.custCategoryItemReducer;
    const { globalCountryList} = state.globalCountryReducer;
    const { custBusinessList} = state.custBusinessReducer;
    const custBusineess=custBusinessList.find(custBusiness=>custBusiness.id==businessId);
    return { custProductList, custCurrencyItemList, custUnitList, custBusineess, globalCountryList, custCategoryItemList};
};


export default connect(mapStateToProps, { getCustProductList, addCustProduct, editCustProduct, deleteCustProduct, getCustUnitList, getCustCurrencyItemList, getCustCategoryList })(CustProductPage);


