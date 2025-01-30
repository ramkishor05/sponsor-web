import React, { Component } from 'react';

// material-ui
import { Divider} from '@material-ui/core';

// project imports
import MainCard from '../../../component/cards/MainCard';
import CustUserProfile from './CustUserProfile';
import CustUserAccount from './CustUserAccount';
import CustOwnerAccount from './CustOwnerAccount';
import { getUserVendor , getUserVendorList} from '../../../actions';
import { connect } from 'react-redux';

//==============================|| SAMPLE PAGE ||==============================//

class CustUserProfilePage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        this.props.getUserVendorList();
        await this.props.getUserVendor(this.props.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Profile" content = {false}>
                <CustUserProfile userAccount={this.props.userDetail} 
                userProfile={this.props.userDetail.userProfile}/>
                
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

export default connect(mapStateToProps, { getUserVendor, getUserVendorList })(CustUserProfilePage);