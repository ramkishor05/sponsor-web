import React, { Component} from 'react';

import "./styles.css";

import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';

import { getAccessSponsorPageData} 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';
import AccessSponsorService from '../../../services/AccessSponsorService';
import GlobalSponsorLibararyService from '../../../services/GlobalSponsorLibararyService';

class GlobalActivity  extends Component {
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
        if(type=='Update'){
            AccessSponsorService.changeStatus({userSponsorId: row.id, status:row.status, remarks: row.remarks}).then(response=>{
                this.clearAndRefresh();
                if(row.status==='Approved'){
                    GlobalSponsorLibararyService.add({
                        userAccountId: row.userAccountId,
                        sponsorLeaderId: row.sponsorLeaderId,
                        registeredEmail: row?.userAccount?.registeredEmail,
                        utrNumber: row.utrNumber,
                        transactionReceipt: row.utrReceipt,
                        status:row.status
                    });
                }
            });
        }
        if(type=='Delete')
            this.props.deleteGlobalSponsor(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getAccessSponsorPageData(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });

    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }


    render() {
        return (
            <>
                <MainCard title="Activity" 
                        content = {false}
                        sx={{minHeight: 500}}
                    >
                      {
                       <DynamicTable 
                       headers={this.props.metadata.table.headers} 
                       dataList={this.props.accessSponsorPageData.elements}
                       deleteAction = {this._delete}
                       editAction = {this._edit}
                       pageAction= {(pageNumber,pageSize)=>{
                          this.props.getAccessSponsorPageData(pageNumber, pageSize);
                       }}
                       pageNumber= {this.props.accessSponsorPageData.pageNumber}
                       pageSize= {this.props.accessSponsorPageData.pageSize}
                       totalPages= {this.props.accessSponsorPageData.totalPages}
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
            </>
        );
    };
}

const mapStateToProps = state => {
    const { accessSponsorPageData } = state.accessSponsorReducer;
    return { accessSponsorPageData };
};

export default connect(mapStateToProps, {getAccessSponsorPageData})(GlobalActivity);
