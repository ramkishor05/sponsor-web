import React, { Component} from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getCustUnitList, addCustUnit, editCustUnit, deleteCustUnit } 
from '../../../actions';
import { connect } from 'react-redux';

function createData(name, description, typeId, actions) {
    return { name, description, typeId, actions};
}
const headers = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "description",
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

function actions(){
    return ['edit', 'update']
}

//==============================|| SAMPLE PAGE ||==============================//
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class CustUnitList extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit Unit list", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Unit list", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Unit list", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustUnit(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustUnit(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustUnit(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustUnitList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustUnitList();
    }
    render() {
        return (
            <>
                
                <MainCard title="Unit List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddIcon />
                            </Fab>
                        }
                    >
                        <DynamicTable 
                        headers={headers} 
                        dataList={this.props.custUnitList}
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
    const { custUnitList, show_cust_Unit_loader } = state.custUnitReducer;

    return { custUnitList, show_cust_Unit_loader };
};


export default connect(mapStateToProps, { getCustUnitList, addCustUnit, editCustUnit, deleteCustUnit })(CustUnitList);


