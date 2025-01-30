import React, { Component} from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getCustCurrencyItemList, addCustCurrencyItem, editCustCurrencyItem, deleteCustCurrencyItem } 
from '../../../actions';
import { connect } from 'react-redux';

const headers = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "desc",
        label: "Description",
        type: 'text'
    },
    {
        name: "typeId",
        label: "Type",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
]

//==============================|| SAMPLE PAGE ||==============================//
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class CustCurrencyList extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit category list", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add category list", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete category list", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustCurrencyItem(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustCurrencyItem(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustCurrencyItem(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustCurrencyItemList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustCurrencyItemList();
    }
    render() {
        return (
            <>
                
                <MainCard title="Currency List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddIcon />
                            </Fab>
                        }
                    >
                        <DynamicTable 
                        headers={headers} 
                        dataList={this.props.custCurrencyItemList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
                    </MainCard>
                
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {headers}
                saveAction = {this.saveObject}
                >
                </DynamicModel>
            
                <ConfirmModel
                openAction={this.state.deleteModel}
                closeAction={()=> this.setState({deleteModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                message= 'Do you want to delete'
                saveAction = {this.saveObject}
                >
                </ConfirmModel>
            </>
        );
    };
}



const mapStateToProps = state => {
    const { custCurrencyItemList, show_cust_category_loader } = state.custCurrencyItemReducer;

    return { custCurrencyItemList, show_cust_category_loader };
};


export default connect(mapStateToProps, { getCustCurrencyItemList, addCustCurrencyItem, editCustCurrencyItem, deleteCustCurrencyItem })(CustCurrencyList);


