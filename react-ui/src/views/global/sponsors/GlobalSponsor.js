import React, { Component} from 'react';

import "./styles.css";
import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalSponsorPageList, addGlobalSponsor, editGlobalSponsor, deleteGlobalSponsor } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class GlobalSponsor extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update Sponsor", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {
        sponsorLeaderId: this.props.globalSponsorAccount.sponsorId
       }, title:"Add Sponsor", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Sponsor", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalSponsor(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalSponsor(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalSponsor(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalSponsorPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });

    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                <MainCard title="Sponsors" 
                        content = {false}
                        sx={{minHeight: 500}}
                    >
                      { this.props.globalSponsorPageData &&
                       <DynamicTable 
                       headers={this.props.metadata.table.headers} 
                       dataList={this.props.globalSponsorPageData.elements}
                       deleteAction = {this._delete}
                       editAction = {this._edit}
                       pageAction= {(pageNumber,pageSize)=>{
                          this.props.getGlobalSponsorPageList(pageNumber, pageSize);
                       }}
                       pageNumber= {this.props.globalSponsorPageData.pageNumber}
                       pageSize= {this.props.globalSponsorPageData.pageSize}
                       totalPages= {this.props.globalSponsorPageData.totalPages}
                       {...this.props}
                       ></DynamicTable>
                      }   
                       
                    </MainCard>
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
    const { globalSponsorPageData, globalSponsorAccount } = state.globalSponsorReducer;
    return { globalSponsorPageData, globalSponsorAccount };
};

export default connect(mapStateToProps, {getGlobalSponsorPageList, addGlobalSponsor, editGlobalSponsor, deleteGlobalSponsor })(GlobalSponsor);
