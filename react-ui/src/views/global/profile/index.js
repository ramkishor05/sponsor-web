import React, { Component } from 'react';

// material-ui
import { Divider} from '@material-ui/core';

// project imports
import MainCard from '../../../component/cards/MainCard';
import GlobalUserProfile from './GlobalUserProfile';
import GlobalUserAccount from './GlobalUserAccount';
import GlobalOwnerAccount from './GlobalOwnerAccount';
import { getUserVendor } from '../../../actions';
import { connect } from 'react-redux';

//==============================|| SAMPLE PAGE ||==============================//

class GlobalUserProfilePage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        await this.props.getUserVendor(this.props.userDetail.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Profile" content = {false}>
                <GlobalUserProfile userProfile={this.props.userDetail.userProfile}/>
                <Divider></Divider>
                
                <GlobalUserAccount userAccount={this.props.userDetail}/>
            </MainCard>
        
            
        );
    }
};

const mapStateToProps = state => {
    const { userDetail, } = state.userReducer;
    const { vendor} = state.userVendorReducer;
    return { userDetail, vendor };
};

export default connect(mapStateToProps, { getUserVendor })(GlobalUserProfilePage);