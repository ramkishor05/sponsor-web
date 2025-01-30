import { Button, Grid } from "@material-ui/core";
import MainCard from "../../../component/cards/MainCard";
import { Component } from "react";
import { connect } from "react-redux";
import { getCustSaleListByCustomer, addCustSale, editCustSale, deleteCustSale } from "../../../actions";
import CustSaveSaleModel from "../sales/CustSaveSaleModel";
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
class VendorCustomerDetail extends Component {
   
    state={
        totalDueAmount: 0,
        totalGotAmount: 0,
        totalGiveAmount: 0,
        transations:[],
        saveModel: false,
        deleteModel: false,
        printModel: false,
        dataObject: {},
        title: "",
        type: ""
    }

    constructor(props){
        super(props);
        this.props.custSaleList.forEach(custSale=>{
                this.state.transations.push({
                    date:custSale.saleDate,
                    desc: "Bill : "+custSale.totalPrice,
                    type: "# Sale In",
                    giveAmount: custSale.totalPrice,
                    gotAmount:  '',
                    dataObject: custSale
                })

                custSale.custProductSalePaymentList.forEach(custProductSalePayment => {
                    this.state.transations.push({
                        date:custProductSalePayment.transationDate,
                        desc: "Bill : "+custSale.totalPrice,
                        type: custProductSalePayment.mode=='Unpaid' ? '# Payment Unpaid' : "# Payment In",
                        giveAmount: '',
                        gotAmount: custProductSalePayment.mode=='Unpaid' ? '' :custProductSalePayment.amount,
                        dataObject: custProductSalePayment
                    })
                });
           }
          );
         this.state.totalGiveAmount=  this.state.transations && this.state.transations.filter(transation=> transation.giveAmount!=='').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.giveAmount);
          }, 0)

          this.state.totalGotAmount=this.state.transations && this.state.transations.filter(transation=> transation.gotAmount!=='').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.gotAmount);
        }, 0)
        this.state.totalDueAmount = this.state.totalGotAmount - this.state.totalGiveAmount
         
    }

    _edit = row => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Edit sale", type:"Edit", saveModel: true  });
    }

    _clearModel=()=>{
        this.setState({ deleteModel:false, saveModel:false, printModel: false });
    }

    saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustSale(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustSale(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustSale(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustSaleList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
   
    async componentDidMount() {
       await this.props.getCustSaleListByCustomer(this.props.customer.id);
       
    }

    render() {
        return (
            <MainCard title="Customer Detail">
                <Grid container spacing={2}>
                    <Grid item sx={4} md={4}>
                        Name : {this.props.customer.name}
                    </Grid>
                    
                    <Grid item sx={4} md={4}>
                        Mobile Number : {this.props.customer.mobileNumber}
                    </Grid>
                    <Grid item sx={4} md={4}>
                        Phone Number : {this.props.customer.phoneNumber}
                    </Grid>
                    <Grid item sx={4} md={4}>
                        Email Address : {this.props.customer.emailAddress}
                    </Grid>
                    <Grid item sx={4} md={4}>
                       Permament Address : {this.props.customer.permamentAddress}
                    </Grid>
                    <Grid item sx={4} md={4}>
                       Present Address : {this.props.customer.presentAddress}
                    </Grid>
                </Grid>
                
                <Grid container spacing={2} style={{padding: 10}}>
                    <Grid item sx={12} md={12} textAlign={'center'} >
                        <h4>Transations</h4>
                    </Grid>
                    <Grid item sx={12} md={12} textAlign={'right'} style={{padding: 10}}>
                     { this.state.totalDueAmount>0? 
                        <h5 className="mb-0"><span className="badge bg-danger"> You will give : {this.state.totalDueAmount}</span></h5> : 
                        <h5 className="mb-0"><span className="badge bg-success"> You will got : {this.state.totalDueAmount-this.state.totalDueAmount-this.state.totalDueAmount}</span></h5>
                     }
                    </Grid>
                </Grid> 
                <Grid container spacing={1}>
                   <Grid item sx={12} md={12}>

                        <table className="table mb-0" style={{border:1, borderStyle:'dashed'}}>
                        <thead>
                            <tr>
                            <th scope="col">Task</th>
                            <th scope="col">You give
                            <h6 className="mb-0"><span className="badge bg-danger">
                            Total: {
                                   this.state.totalGiveAmount
                                  
                               }
                               </span>
                               </h6>
                            </th>
                            <th scope="col">
                                You Got
                                <h6 className="mb-0"><span className="badge bg-success">
                                Total: {
                                   this.state.totalGotAmount
                                }
                                </span>
                                </h6>
                            </th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.transations.map(transation=>
                
                            <tr className="fw-normal">
                            <th>
                                <span className="ms-2">{transation.date}</span><br/>
                                <span className="ms-2">{transation.desc}</span><br/>
                                <Button className="ms-2" size="small" variant="outlined">{transation.type}</Button>
                            </th>
                            <td className="align-middle">
                                <h6 className="mb-0"><span className="badge bg-danger">{transation.giveAmount}</span></h6>
                            </td>
                            <td className="align-middle">
                                <h6 className="mb-0"><span className="badge bg-success">{transation.gotAmount}</span></h6>
                            </td>
                            <td className="align-middle">
                                <Button onClick={()=>this._edit(transation.dataObject)}>Edit</Button>
                               
                                <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                                    className="fas fa-trash-alt fa-lg text-warning"></i></a>
                            </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                    </Grid>
                </Grid>
                {
                    this.state.saveModel && <CustSaveSaleModel
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    custProductList={this.props.custProductList}
                    saveAction = {this.saveObject}
                >
                </CustSaveSaleModel>
                }
            </MainCard>
        );
    }
};

const mapStateToProps = state => {
    const { userDetail, } = state.userReducer;
    const { custSaleList} = state.custSaleReducer;
    return { userDetail, custSaleList };
};

export default connect(mapStateToProps, { getCustSaleListByCustomer,addCustSale, editCustSale, deleteCustSale  })(VendorCustomerDetail);