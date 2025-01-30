import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button} from '@material-ui/core';
import { getCustBusinessList, addCustBusiness, editCustBusiness, deleteCustBusiness, getCustVendorList, getGlobalCountryList} from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import DynamicForm from '../../../component/pages/DynamicForm';

class CustBusiness extends Component {
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
            this.setState({ dataObject: row, title:"Edit business", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit business", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add business", type:"Add", savePage: true  });
        } else{
            this.setState({ dataObject: {}, title:"Add business", type:"Add", saveModel: true  });
        }
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete business", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addCustBusiness(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustBusiness(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustBusiness(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = async() => {
        await this.props.getCustBusinessList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false , savePage: false  });
        console.log("this.props.menuItem=",this.props.menuItem)
        if(this.props.menuItem.onBoarding){
            this.props.updateOnboarding(this.props.custBusinessList.length!==0);
        }
    }
    
   async componentDidMount() {
        this.props.getCustVendorList();
        this.props.getGlobalCountryList();
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                {
                    !this.state.savePage &&
                    <MainCard title="Bussiness List" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                    >
                        <DynamicTable 
                        headers={this.props.metadata.table} 
                        dataList={this.props.custBusinessList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
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
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {this.props.metadata.model}
                    saveAction = {this.saveObject}
                    {...this.props}
                    >
                    </DynamicModel>
                }
                {
                    this.state.deleteModel &&
                    <ConfirmModel
                    openAction={this.state.deleteModel}
                    closeAction={()=> this.setState({deleteModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    message= 'Do you want to delete'
                    saveAction = {this.saveObject}
                    >
                    </ConfirmModel>
                }
            
                
            </>
        );
    }
}

const mapStateToProps = state => {
    
    const { loader } =  state.loaderReducer
    const { custBusinessList} = state.custBusinessReducer;
    const { globalCountryList} = state.globalCountryReducer;
    return { custBusinessList, globalCountryList};
};

const styles = {
    addBusinessButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustVendorList, getCustBusinessList, addCustBusiness , editCustBusiness, deleteCustBusiness, getGlobalCountryList})(CustBusiness);
