import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalSponsorAccount, getGlobalSponsorBoostTransactionPageList, addGlobalSponsorBoostTransaction, editGlobalSponsorBoostTransaction, deleteGlobalSponsorBoostTransaction } 
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
class CustBoost extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update SponsorBoostTransaction", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: { investAmount: 100 }, title:"Add SponsorBoostTransaction", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete SponsorBoostTransaction", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalSponsorBoostTransaction(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalSponsorBoostTransaction(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalSponsorBoostTransaction(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalSponsorAccount();
        this.props.getGlobalSponsorBoostTransactionPageList(0, config.pageSize, this.props.searchValue);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                
                <MainCard title="Boosts" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            disabled={ !this.props.globalSponsorAccount.applicableBoost}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                        content = {false}
                    >
                        <DynamicTable 
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalSponsorBoostTransactionPageData.elements}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        {...this.props}
                        ></DynamicTable>
                    </MainCard>
                    {
                    this.state.saveModel &&
                    <ConfirmModel
                    openAction={this.state.saveModel}
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    message= 'Do you want to investment 100 rupee'
                    saveAction = {this.saveObject}
                    >
                    </ConfirmModel>
                }
               
            </>
        );
    };
}



const mapStateToProps = state => {
    const {searchValue}= state.searchReducer;
    const { globalSponsorAccount } = state.globalSponsorReducer;

    const { globalSponsorBoostTransactionPageData, globalSponsorBoostTransactionAccount } = state.globalSponsorBoostTransactionReducer;

    return {searchValue, globalSponsorBoostTransactionPageData, globalSponsorBoostTransactionAccount, globalSponsorAccount };
};


export default connect(mapStateToProps, { getGlobalSponsorAccount, getGlobalSponsorBoostTransactionPageList, addGlobalSponsorBoostTransaction, editGlobalSponsorBoostTransaction, deleteGlobalSponsorBoostTransaction })(CustBoost);


