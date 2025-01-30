import React, { useEffect, useReducer, useState,Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getMenuGroupList, addMenuGroup, editMenuGroup, deleteMenuGroup } from '../../../actions';

const tableHeaders = [
    {
        name: "idenNo",
        label: "IdenNo",
        type: 'text'
    },{
        name: "title",
        label: "Title",
        type: 'text'
    },
    {
        name: "type",
        label: "Type",
        type: 'text'
    },
    {
        name: "icon",
        label: "Icon",
        type: 'text'
    },
    {
        name: "order",
        label: "Order",
        type: 'text'
    },
    {
        name: "url",
        label: "Url",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
]


const modelHeaders = [
    {
        name: "idenNo",
        label: "IdenNo",
        type: 'text'
    },{
        name: "title",
        label: "Title",
        type: 'text'
    },
    {
        name: "type",
        label: "Type",
        type: 'text'
    },
    {
        name: "icon",
        label: "Icon",
        type: 'text'
    },
    {
        name: "order",
        label: "Order",
        type: 'text'
    },
    {
        name: "url",
        label: "Url",
        type: 'text'
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

class GlobalMenuGroupsPage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit menu group", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add menu group", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete menu group", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addMenuGroup(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editMenuGroup(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteMenuGroup(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getMenuGroupList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getMenuGroupList();
    }

 render() {
        return (
                <>
                
                    <MainCard title={this.props.menuItem.title}
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                    >
                        <DynamicTable 
                        headers={tableHeaders} 
                        dataList={this.props.menuGroups}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
                    </MainCard>
                {
                    this.state.saveModel && 
                    <DynamicModel
                    title={this.state.title}
                    openAction={this.state.saveModel}
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelHeaders}
                    saveAction = {this.saveObject}
                    >
                    </DynamicModel>
                }
                
            
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
    const { menuGroups } = state.globalMenuGroupReducer;
    return { menuGroups};
};


export default connect(mapStateToProps, { getMenuGroupList, addMenuGroup, editMenuGroup, deleteMenuGroup })(GlobalMenuGroupsPage);


