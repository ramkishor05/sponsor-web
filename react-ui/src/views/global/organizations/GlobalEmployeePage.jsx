import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';


import { getGlobalEmployeeList, addGlobalEmployee, editGlobalEmployee, deleteGlobalEmployee, getGlobalVendorList } from '../../../actions';
import { getUsers } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { AddTaskOutlined } from '@material-ui/icons';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import UserService from '../../../services/UserService';

const mainheaders = [
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
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const accountheaders = [
    {
        name: "username",
        label: "User Name",
        type: 'text'
    },
    {
        name: "type",
        label: "User type",
        type: 'email'
    },
    {
        name: "AccountName",
        label: "accountName",
        type: 'text'
    },
    {
        label: "User Role",
        name: "userRole.roleName",
        type: 'text'
    }
];

const profileheaders = [
    {
        name: "title",
        label: "Title",
        type: 'text'
    },
    {
        name: "firstName",
        label: "First Name",
        type: 'email'
    },
    {
        name: "lastName",
        label: "Last Name",
        type: 'text'
    }
];

const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "User Account ",
            name: "userAccount",
            headers: accountheaders,
            onLoad : (value, parent, props)=>{
              let userAccount= props.userList ? props.userList.find((user)=>user.id===parent.accountId) : null;
              if(userAccount){
                parent['userAccount'] = userAccount;
                return userAccount;
              }
              return null;
            }
        },
        {
            label: "User Profile",
            name: "userAccount.userProfile",
            headers: profileheaders,
            onLoad : (value, parent, props)=>{
                if(parent.userAccount){
                    return parent.userAccount.userProfile;
                }
                return null;
            }
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
    },
    {
        name: "enableAccess",
        label: "Enable Access",
        type: 'switch'
    }
];

class GlobalEmployeePage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
        row['enableAccess']=true;
      
       this.setState({ dataObject: row, title:"Edit employee", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add employee", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete employee", type:"Delete", deleteModel: true  });
    };
    
     saveObject = async (type, row) => {
        if(type=='Add')
            this.props.addGlobalEmployee(row, this.clearAndRefresh)
        if(type=='Edit'){
            if(row.enableAccess){
                let register={
                    mobile: row.mobileNumber,
                    email: row.emailAddress,
                    username: row.emailAddress,
                    password: 'temp123',
                    type: 'Employee',
                    userRoleId: 4,
                    ownerId: this.props.userDetail.ownerId
                }
                let user= await UserService.addCustom(register);
                row['accountId']=user.id;
            }
            
            delete row.enableAccess;

            this.props.editGlobalEmployee(row.id,row, this.clearAndRefresh)
        }
        
        if(type=='Delete')
            this.props.deleteGlobalEmployee(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalEmployeeList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false });
    }
    
   async componentDidMount() {
        this.props.getGlobalVendorList();
        this.props.getGlobalEmployeeList();
       await this.props.getUsers();
    }

    render() {
        return (
            <>
                
                <MainCard title="Employee List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddTaskOutlined/>
                            </Fab>
                        }
                        content = {false}
                    >
                       <CollapsibleTable 
                            headers={headers} 
                            dataList={this.props.globalEmployeeList}
                            userList= {this.props.users}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            printAction= {this._print}
                            >

                        </CollapsibleTable>
                    </MainCard>
                
                    {this.state.saveModel  &&
                    <DynamicModel
                    title={this.state.title}
                    openAction={this.state.saveModel}
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
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
    }
}

const mapStateToProps = state => {
    const { user, users, show_user_loader, userDetail  } = state.userReducer;
    const { globalEmployeeList, show_employee_loader } = state.globalEmployeeReducer;
    return { user, globalEmployeeList,users, show_employee_loader, show_user_loader, userDetail };
};

const styles = {
    addEmployeeButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalEmployeeList, addGlobalEmployee,editGlobalEmployee, deleteGlobalEmployee, getGlobalVendorList , getUsers })(GlobalEmployeePage);
