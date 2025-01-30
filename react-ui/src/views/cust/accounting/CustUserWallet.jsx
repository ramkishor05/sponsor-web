import React, { Component } from 'react';
import { connect } from 'react-redux';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { Grid,TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { getUserFinancialAccount } from '../../../actions/cust/GlobalUserFinancialAccountActions';
import { getUserFinancialWallet } from '../../../actions/cust/GlobalUserFinancialWalletActions';


const headers = [
    {
        name: "id",
        label: "Id",
        type: 'text'
    },
    {
        name: "utrNumber",
        label: "UTR",
        type: 'text'
    },
    {
        name: "amount",
        label: "Amount",
        type: 'text'
    },
    {
        name: "type",
        label: "Type",
        type: 'text',
        render: (value)=>{
            return value==='DEBIT'? <span className="badge bg-danger"> Give </span>: 
            <span className="badge bg-success">Got</span>
        }
    },
    {
        name: "remarks",
        label: "Remarks",
        type: 'text'
    }
];

const model = [
    {
        name: "transactionAmount",
        label: "Amount",
        type: 'text'
    },
    {
        name: "type",
        label: "Type",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Credit', 'Debit'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    },
    {
        name: "transactionStatus",
        label: "Status",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Paid', 'Unpaid'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    },
    {
        name: "transactionMode",
        label: "Mode",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Cash','Online'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    }
];

class CustUserWallet extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: "",
        transations:[],
        selectionRange: [
            dayjs(format(new Date(),'yyyy/MM/dd')),
            dayjs(format(new Date(),'yyyy/MM/dd'))
        ],
        accountView: false
    }

    constructor(props){
        super(props)
    }

    _edit = row => {
       this.setState({ dataObject: row, title:"Edit cash book", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add cash book", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete cash book", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        row['transactionReciverId']=this.props.userDetail.id;
        row['transactionSenderId']=this.props.userDetail.id;
        row['transactionMakerId']=this.props.userDetail.id;
        row['transactionService']='ACCOUNT';
        if(type=='Add')
            this.props.addCustTransation(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustTransation(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustTransation(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getUserFinancialAccount(this.props.searchValue);
        this.props.getUserFinancialWallet(this.props.searchValue);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    getDebit=(transactions)=>{
        let transactionAmountTotal= transactions &&  transactions.filter(custTransation=>custTransation.type=='DEBIT').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.amount);
        }, 0)
        return transactionAmountTotal;
     }

     getCredit=(transactions)=>{
        let transactionAmountTotal= transactions &&  transactions.filter(custTransation=>custTransation.type=='CREDIT').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.amount);
        }, 0)
        return transactionAmountTotal;
     }

     changeView= ()=>{
        this.setState({...this.state, accountView: !this.state.accountView});
     }

     getAccount=()=>{
        return this.state.accountView ? this.props.userAccount?  this.props.userAccount: { balance: 0.0, transactions:[]}: this.props.userWallet;
     }

     getUserBalance= ()=>{
        return this.props?.userAccount?.balance-this.props?.userWallet?.balance;
     }

     render() {
        return (
                <>
                
                    <MainCard title="Wallet" 
                    button ={
                        <>
                       
                        {/*
                         <label htmlFor='account-view'>
                        {this.state.accountView? 'Account':"Wallet"}
                        </label>
                        <Switch value={this.state.accountView}
                        id="account-view"
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={this.changeView}
                        >
                            
                        </Switch>*/}
                        </>
                    }
                    >
                        <Grid container spacing={0} >
                            <Grid item sx={9} md={9}>  
                            <Grid container spacing={0}  >
                                    
                                    <Grid item sx={8} md={8}> 
                                        
                                        <TextField
                                        value={this.getAccount().balance}
                                        label="Current Balance"
                                        variant={'standard'}
                                        size='small'
                                        disabled
                                        ></TextField>
{/*
                                        <TextField
                                        value={this.getUserBalance()}
                                        label="User Balance"
                                        variant={'standard'}
                                        size='small'
                                        disabled
                                        ></TextField>*/}
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid item sx={3} md={3} >  
                                <Grid container spacing={0} >
                                    <Grid item sx={8} md={8}> 
                                        You give 
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                    alignItems={'end'} style={{textAlign:'end'}}>  
                                    <span className="badge bg-danger">  
                                    {
                                        this.getDebit(this.getAccount().transactions)
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} >
                                    <Grid item sx={8} md={8}> 
                                      You Got 
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                    alignItems={'end'} style={{textAlign:'end'}}>  
                                    <span className="badge bg-success">  
                                    {
                                        this.getCredit(this.getAccount().transactions)
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                            
                        <Grid container spacing={2} padding={1} paddingLeft={0} paddingRight={0}>
                            <Grid item sx={10} md={10}>
                                Transations 
                            </Grid>
                            <Grid item sx={2} md={2} textAlign={'end'}>    
                             
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1}>
                        <Grid item sx={12} md={12}>

                        <DynamicTable 
                        headers={headers} 
                        dataList={this.getAccount().transactions}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>

                            </Grid>
                        </Grid>
                    </MainCard>
                {
                    this.state.saveModel && 
                    <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {model}
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
    const {searchValue}= state.searchReducer;
    const { userDetail } = state.userReducer;
    const { userAccount } = state.custUserAccountReducer;
    const { userWallet } = state.custUserWalletReducer;
    return { searchValue, userDetail, userAccount, userWallet};
};


export default connect(mapStateToProps, { getUserFinancialAccount, getUserFinancialWallet })(CustUserWallet);
