import React, { Component } from 'react';

// project imports
import MainCard from '../../../component/cards/MainCard';
import CustOwnerAccount from './CustOwnerAccount';
import { getUserVendor , getUserVendorList} from '../../../actions';
import { connect } from 'react-redux';

class CustOwnerAccountPage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        this.props.getUserVendorList();
        await this.props.getUserVendor(this.props.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Ownership" content = {false}>
                <CustOwnerAccount 
                vendorAccount={this.props.userVendor} 
                userAccount={this.props.userDetail}
                vendorList={this.props.userVendorList}
                />
            </MainCard>            
        );
    }
};

const mapStateToProps = state => {
    const { ownerId} = state.accountReducer;
    const { userDetail} = state.userReducer;
    const { userVendor, userVendorList} = state.userVendorReducer;
    console.log("userVendor=",userVendor)
    return { userDetail, userVendor, userVendorList, ownerId };
};

export default connect(mapStateToProps, { getUserVendor, getUserVendorList })(CustOwnerAccountPage);