import React, { Component } from 'react';
import { connect } from 'react-redux';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { Box, Button, Card, CardActionArea, CardContent, Grid,TextField, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { getUserFinancialAccount } from '../../../actions/cust/GlobalUserFinancialAccountActions';
import { getUserFinancialWallet } from '../../../actions/cust/GlobalUserFinancialWalletActions';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileCopyIcon from '@mui/icons-material/FileCopy';
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

const accountModel = [
    {
        name: "accountHolder",
        label: "Account Holder",
        type: 'text',
        "required" : {
            value : '',
            message: "Account holder is required!"
        }
    },
    {
        name: "accountNumber",
        label: "Account Number",
        type: 'text',
        "required" : {
            value : '',
            message: "Account number is required!"
        }
    },
    {
        name: "ifsc",
        label: "IFSC",
        type: 'text',
        "required" : {
            value : '',
            message: "Bank ifsc is required!"
        }
    },
    {
        name: "bankName",
        label: "Bank Name",
        type: 'text',
        "required" : {
            value : '',
            message: "Bank name is required!"
        }
    }
];

const upiModel = [
    {
        name: "upiHolder",
        label: "UPI Holder",
        type: 'text',
        "required" : {
            value : '',
            message: "UPI holder is required!"
        }
    },
    {
        name: "upiId",
        label: "UPI Id",
        type: 'text',
        "required" : {
            value : '',
            message: "UPI id is required!"
        }
    }
];

class CustUserAccount extends Component {
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
        accountView: false,
        accounts:[],
        upis:[],
        copyState:{}
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

    _addAccount = () => {
        this.setState({ dataObject: {}, title:"Add account", type:"AddAccount", saveModel: true  });
     }

     _addUPI = () => {
        this.setState({ dataObject: {}, title:"Add upi", type:"AddUPI", saveModel: true  });
     }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete cash book", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type==='AddAccount')
            this.state.accounts.push(row);
        if(type==='AddUPI'){
            this.state.upis.push(row);
        }
        this.clearAndRefresh();
        /*row['transactionReciverId']=this.props.userDetail.id;
        row['transactionSenderId']=this.props.userDetail.id;
        row['transactionMakerId']=this.props.userDetail.id;
        row['transactionService']='ACCOUNT';
        if(type=='Add')
            this.props.addCustTransation(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustTransation(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustTransation(row.id, this.clearAndRefresh)
*/
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
                
                    <MainCard title="Account" 
                    button ={
                        <>
                          <Button variant="outlined" 
                        color="primary" 
                        onClick={this._addAccount}
                        >
                            Add account
                        </Button>
                        <Button variant="outlined" 
                        color="primary" 
                        onClick={this._addUPI}
                        >
                            Add UPI
                        </Button>
                        </>
                    }
                    >
                        <Box
                        sx={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                            gap: 2,
                        }}
                        >{
                            this.state.upis.map(upi=>
                                <Card>
                                <CardActionArea
                                  sx={{
                                    height: '100%',
                                    backgroundColor:'#e3f2fd',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                  }}
                                >
                                  <CardContent sx={{ height: '100%' }}>
                                    
                                    <Grid container spacing={2}>
                                        <Grid item sx={12} md={12} xs={12}>
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span> Name: {upi.upiHolder}</span>
                                            </Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={upi.upiHolder} onCopy={(text, result)=>{
                                                   let newCopyState= {}
                                                   newCopyState[text]=result;
                                                   this.setState({...this.state, copyState:{ ...newCopyState}})
                                                }}>
                                                {
                                                    this.state.copyState[upi.upiHolder]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
                                                }   
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                          
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span>UPI Id: {upi.upiId}</span>
                                            </Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={upi.upiId} 
                                                onCopy={(text, result)=>{
                                                    let newCopyState= {}
                                                    newCopyState[text]=result;
                                                    this.setState({...this.state, copyState:{ ...newCopyState}})
                                                 }}>
                                                    {
                                                    this.state.copyState[upi.upiId]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
        
                                                    }
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        
                                        <Grid item sx={12} md={12} xs={12}>
                                            <TextField
                                            fullWidth
                                            label="Enter amount"
                                            variant={'outlined'}
                                            onChange={(event)=>{

                                            }}
                                            ></TextField>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                            <Button fullWidth variant='outlined' size='large' >Withdrow</Button>
                                        </Grid>
                                    </Grid>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                              )
                        }
                        {
                            this.state.accounts.map(account=>
                                <Card>
                                <CardActionArea
                                  sx={{
                                    height: '100%',
                                    backgroundColor:'#e3f2fd',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                  }}
                                >
                                  <CardContent sx={{ height: '100%' }}>
                                    
                                    <Grid container spacing={2}>
                                        <Grid item sx={12} md={12} xs={12}>
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span> Name: {account.accountHolder}</span>
                                            </Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={account.accountHolder} 
                                                onCopy={(text, result)=>{
                                                    let newCopyState= {}
                                                    newCopyState[text]=result;
                                                    this.setState({...this.state, copyState:{ ...newCopyState}})
                                                 }}>
                                                {
                                                    this.state.copyState[account.accountHolder]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
                                                }
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                          
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span>A/C: {account.accountNumber}</span>
                                            </Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={account.accountNumber} 
                                                onCopy={(text, result)=>{
                                                    let newCopyState= {}
                                                    newCopyState[text]=result;
                                                    this.setState({...this.state, copyState:{ ...newCopyState}})
                                                 }}>
                                                    {
                                                    this.state.copyState[account.accountNumber]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
                                                }
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span>IFSC: {account.ifsc}</span>
                                            </Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={account.ifsc} 
                                                onCopy={(text, result)=>{
                                                    let newCopyState= {}
                                                    newCopyState[text]=result;
                                                    this.setState({...this.state, copyState:{ ...newCopyState}})
                                                 }}>
                                                    {
                                                    this.state.copyState[account.ifsc]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
                                                    }
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                          <Grid container spacing={0}>
                                            <Grid sx={11} md={11} xs={11}>
                                                <span>Bank: {account.bankName}</span></Grid>
                                            <Grid sx={1} md={1} xs={1} style={{textAlign: 'right'}}>
                                                <CopyToClipboard text={account.bankName} 
                                                onCopy={(text, result)=>{
                                                    let newCopyState= {}
                                                    newCopyState[text]=result;
                                                    this.setState({...this.state, copyState:{ ...newCopyState}})
                                                 }}>
                                                    {
                                                        this.state.copyState[account.bankName]?<FileCopyIcon></FileCopyIcon> : <ContentCopyIcon></ContentCopyIcon>
                                                    }
                                                </CopyToClipboard>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                            <TextField
                                            fullWidth
                                            label="Enter amount"
                                            variant={'outlined'}
                                            ></TextField>
                                        </Grid>
                                        <Grid item sx={12} md={12} xs={12}>
                                            <Button fullWidth variant='outlined' size='large' >Withdrow</Button>
                                        </Grid>
                                    </Grid>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                              )
                        }
                        </Box>
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
                    this.state.saveModel && this.state.type && 
                    <DynamicModel
                size={'sm'}
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {this.state.type ==='AddUPI'? upiModel : accountModel}
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


export default connect(mapStateToProps, { getUserFinancialAccount, getUserFinancialWallet })(CustUserAccount);
