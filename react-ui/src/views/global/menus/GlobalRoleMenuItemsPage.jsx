import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getRoleMenuItemList, addRoleMenuItem, editRoleMenuItem, deleteRoleMenuItem, getUserRoleList, getMenuItemList,  getRoleMenuGroupList} from '../../../actions';

const tableheaders = [
    {
        name: "idenNo",
        label: "IdenNo",
        type: 'text'
    },
    {
        name: "userRole.roleId",
        label: "User Role",
        type: 'text'
    },
    {
        name: "menuItem.idenNo",
        label: "Menu Group",
        type: 'text'
    },
    {
        name: "roleMenuGroup.idenNo",
        label: "Role Menu Group",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
]


const modelheaders = [
    {
        name: "idenNo",
        label: "IdenNo",
        type: 'text'
    },
    {
        name: "userRole.id",
        key: "userRole",
        label: "User Role",
        type: 'select',
        find : (value, row, field, props)=>{
            return props.userRoles.find(userRole=>userRole.id==value)
        },
        onItems : (value,row, field, props )=>{
            return props.userRoles;
        },
        itemKey: 'id',
        itemVal:"roleId"

    },
    {
        name: "menuItem.id",
        key: "menuItem",
        label: "Menu Item",
        type: 'select',
        find : (value, row, field, props)=>{
            return props.menuItems.find(menuItem=>menuItem.id==value)
        },
        onItems : (value,row, field, props )=>{
            return props.menuItems;
        },
        itemKey: 'id',
        itemVal:"idenNo"
    },
    {
        name: "roleMenuGroup.id",
        key: "roleMenuGroup",
        label: "Role Menu Group",
        type: 'select',
        find : (value, row, field, props)=>{
            return props.roleMenuGroups.find(roleMenuGroup=>roleMenuGroup.id==value)
        },
        onItems : (value,row, field, props )=>{
            return props.roleMenuGroups;
        },
        itemKey: 'id',
        itemVal:"idenNo"
    }
]

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class GlobalRoleMenuItemsPage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit Role menu group", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Role menu group", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Role menu group", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addRoleMenuItem(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editRoleMenuItem(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteRoleMenuItem(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getRoleMenuItemList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getRoleMenuItemList();
        this.props.getUserRoleList();
        this.props.getMenuItemList(); 
        this.props.getRoleMenuGroupList();
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
                        headers={tableheaders} 
                        dataList={this.props.roleMenuItems}
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
                    fields= {modelheaders}
                    menuItems= {this.props.menuItems}
                    roleMenuGroups= {this.props.roleMenuGroups}
                    userRoles = {this.props.userRoleList}
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
    const { roleMenuItems } = state.globalRoleMenuItemReducer;
    const { roleMenuGroups } = state.globalRoleMenuGroupReducer;
    const { menuItems } = state.globalMenuItemReducer;
    const { userRoleList } = state.userRoleReducer;
    return { roleMenuItems, roleMenuGroups, menuItems, userRoleList };
};


export default connect(mapStateToProps, { getRoleMenuItemList, addRoleMenuItem, editRoleMenuItem, deleteRoleMenuItem, getUserRoleList, getMenuItemList,  getRoleMenuGroupList })(GlobalRoleMenuItemsPage);


