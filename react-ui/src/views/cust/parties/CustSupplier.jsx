import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, TableCell } from '@material-ui/core';


import { getCustSupplierList, addCustSupplier, editCustSupplier, deleteCustSupplier, getCustVendorList } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { AddTaskOutlined } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import CustSupplierDetail from './CustSupplierDetail';

const tableheaders = [
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
        label: "Actions",
        render: (value, row, rowIndex, header, props)=>{
            return <TableCell key={header.name+'_'+rowIndex} align='right'>
                        <Fab color="secondary" aria-label="Edit" size='small'   onClick={() => props.editAction(row)}>
                        <EditIcon/>
                    </Fab>
                    <Fab color="secondary" aria-label="Delete" size='small'  onClick={() => props.deleteAction(row)} >
                        <DeleteIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="View" size='small'  onClick={() => props.previewAction(row)} >
                        <PreviewIcon />
                    </Fab>
                </TableCell>
        }
    }
];

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

class CustSupplier extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        viewModel: false,
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit supplier", type:"Edit", saveModel: true  });
    }

    _preview = row => {
        this.setState({ dataObject: row, title:"View supplier", type:"View", viewModel: true  });
     }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add supplier", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete supplier", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addCustSupplier(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustSupplier(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustSupplier(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustSupplierList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustVendorList();
        this.props.getCustSupplierList();
    }

    render() {
        return (
            <>
                 {
                            !this.state.viewModel && 
                <MainCard title="Supplier List" 
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
                            headers={tableheaders} 
                            dataList={this.props.custSupplierList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            previewAction={this._preview}
                            ></DynamicTable>

                        
                        
                    </MainCard>
                    }

                {
                this.state.viewModel && 
                <CustSupplierDetail
                 supplier={this.state.dataObject}
                 setLoadingView = {()=> this.setState({viewModel: false})}
                 />
                }
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
    const { user } = state.userReducer;
    const { custSupplierList, show_supplier_loader } = state.custSupplierReducer;

    return { user, custSupplierList, show_supplier_loader };
};

const styles = {
    addSupplierButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustSupplierList, addCustSupplier,editCustSupplier, deleteCustSupplier, getCustVendorList })(CustSupplier);
