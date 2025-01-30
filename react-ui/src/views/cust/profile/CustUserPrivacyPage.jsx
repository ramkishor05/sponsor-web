import React, { Component } from 'react';

// project imports
import MainCard from '../../../component/cards/MainCard';
import { getUserVendor , getUserVendorList} from '../../../actions';
import { connect } from 'react-redux';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';

class CustUserPrivacyPage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        this.props.getUserVendorList();
        await this.props.getUserVendor(this.props.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Privacy center" content = {false}>
                Notification  <Switch defaultChecked />
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                    <FormControlLabel required control={<Switch />} label="Required" />
                    <FormControlLabel disabled control={<Switch />} label="Disabled" />
                </FormGroup>
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

export default connect(mapStateToProps, { getUserVendor, getUserVendorList })(CustUserPrivacyPage);