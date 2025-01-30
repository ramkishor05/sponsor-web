import React, { Component} from 'react';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getCustUserRoyaltyPageList } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';

class CustRoyalty extends Component {
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
       this.setState({ dataObject: {}, title:"Add Sponsor", type:"Add", saveModel: true  });
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
        this.props.getCustUserRoyaltyPageList(0, config.pageSize, this.props.searchValue);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                
                <MainCard title="Royalties" 
                        content = {false}
                    >
                        <DynamicTable 
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.userRoyaltyPage.elements}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        {...this.props}
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
    const {searchValue}= state.searchReducer;
    const { userRoyaltyPage } = state.custUserRoyaltyReducer;
    return {searchValue,  userRoyaltyPage };
};


export default connect(mapStateToProps, { getCustUserRoyaltyPageList })(CustRoyalty);


