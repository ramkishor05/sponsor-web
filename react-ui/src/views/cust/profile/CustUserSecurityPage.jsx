import React, { Component } from 'react';

// project imports
import MainCard from '../../../component/cards/MainCard';
import CustOwnerAccount from './CustOwnerAccount';
import { getUserVendor , getUserVendorList} from '../../../actions';
import { connect } from 'react-redux';
import CustUserAccount from './CustUserAccount';

class CustUserSecurityPage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        this.props.getUserVendorList();
        await this.props.getUserVendor(this.props.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Security center" content = {false}>
                <CustUserAccount userAccount={this.props.userDetail}/>
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

export default connect(mapStateToProps, { getUserVendor, getUserVendorList })(CustUserSecurityPage);