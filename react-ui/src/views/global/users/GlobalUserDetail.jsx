import React, { Component} from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';

import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalUserList, addGlobalUser, editGlobalUser, deleteGlobalUser } 
from '../../../actions';
import { connect } from 'react-redux';


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
        label: "Actions",
        "align": "right"
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
class GlobalUser extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update User", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add User", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete User", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalUser(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalUser(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalUser(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalUserList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getGlobalUserList();
    }
    render() {
        return (
            <>
                
                <MainCard title="User List" 
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
                        headers={headers} 
                        dataList={this.props.globalUserList}
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
                            fields= {headers}
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
    const { globalUserList, show_global_User_loader } = state.globalUserReducer;

    return { globalUserList, show_global_User_loader };
};


export default connect(mapStateToProps, { getGlobalUserList, addGlobalUser, editGlobalUser, deleteGlobalUser })(GlobalUser);


