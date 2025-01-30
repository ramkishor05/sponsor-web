import { connect } from 'react-redux';
import { getGlobalUserPageList, addGlobalUser, editGlobalUser, deleteGlobalUser, getUserRoleList} from '../../../actions';
import DynamicPage from '../../../component/pages/DynamicPage';


class GlobalUserPage extends DynamicPage{

    constructor(props){
        super(props);
    }
    
    clearAndRefresh = async() => {
        await this.props.getUserRoleList();
        this.props.getPageList(this.state.pageNumber, this.state.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false , filterModel: false  });
    }
}

const mapStateToProps = state => {
    const { userRoleList } = state.userRoleReducer

    const { globalUserPageData } = state.globalUserReducer;


    return { 
        dataList: globalUserPageData.elements,
        pageNumber: globalUserPageData.pageNumber,
        pageSize: globalUserPageData.pageSize,
        totalPages: globalUserPageData.totalPages,
        userRoleList 
    };
};

export default connect(mapStateToProps, { 
    
    getPageList: getGlobalUserPageList, 
    add: addGlobalUser,
    edit:editGlobalUser, 
    delete: deleteGlobalUser,
    getUserRoleList

})(GlobalUserPage);
