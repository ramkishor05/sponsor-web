import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalTagItemList, getGlobalCategoryList, getGlobalImageLibraryPageList, addGlobalImageLibrary, editGlobalImageLibrary, deleteGlobalImageLibrary } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';

import FilterModel from '../../../component/model/FilterModel';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class GlobalImageLibrary extends Component {
    state={
        title: "",
        type: "",

        saveModel: false,
        deleteModel: false,
        dataObject: {},
    
        pageNumber: 0,
        pageSize: 7,
        filterModel: false,
        filterObject: {},
    }
    
    _edit = row => {
       this.setState({ ...this.state, dataObject: row, title:"Update Image Library", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ ...this.state, dataObject: {}, title:"Add Image Library", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ ...this.state, dataObject: row, title:"Delete Image Library", type:"Delete", deleteModel: true  });
    };

    _filter = () => {
        this.setState({ ...this.state, title:"Filters", type:"Filter", filterModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalImageLibrary(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalImageLibrary(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalImageLibrary(row.id, this.clearAndRefresh)
        if(type=='Filter'){
            this.props.getGlobalImageLibraryPageList(this.state.pageNumber, this.state.pageSize, row);
            this.setState({ filterObject: row, saveModel: false, deleteModel:false , filterModel: true });
        }
    };

    clearAndRefresh = async() => {
        await this.props.getGlobalCategoryList();
        this.props.getGlobalImageLibraryPageList(this.state.pageNumber, this.state.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false , filterModel: false  });
    }

    clearFilter=  async() => {
        this.setState({ filterObject: {}, saveModel: false,deleteModel:false , filterModel: false  });
        this.props.getGlobalImageLibraryPageList(this.state.pageNumber, this.state.pageSize, this.state.filterObject);
    }

    pageAction= async(pageNumber,pageSize )=>{
        this.setState({...this.state, pageNumber, pageSize})
        await this.clearAndRefresh();
    }
    
    async componentDidMount() {
        await this.clearAndRefresh();
    }

    render() {
        return (
            <>
                
                <MainCard title="Image Library" 
                        button ={
                            <>
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._filter}
                            >
                              <FilterListIcon/>
                            </Button>
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                               <AddIcon/>
                            </Button>
                            </>
                        }
                        content = {false}
                    >
                        <DynamicTable 
                            pageSize= {config.pageSize}
                            pageCount= {this.props.globalImageLibraryPageData.pageCount}
                            totalPages= {this.props.globalImageLibraryPageData.totalPages}
                            pageAction={this.pageAction}
                            headers={this.props.metadata.table.headers} 
                            pageField={this.props.metadata.table.pageField} 
                            dataList={this.props.globalImageLibraryPageData.elements}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            {...this.props}
                        ></DynamicTable>
                    </MainCard>
                    {
                    this.state.saveModel &&
                            <DynamicModel
                            title={this.state.title}
                            openAction={this.state.saveModel}
                            closeAction={()=> this.setState({saveModel: false})}
                            data={this.state.dataObject} 
                            type={this.state.type}
                            fields= {this.props.metadata.model}
                            saveAction = {this.saveObject}
                            {...this.props}
                            >
                            </DynamicModel>
                }
                {this.state.filterModel &&   this.props.metadata.filter &&
                        <FilterModel
                        title={this.state.title}
                        openAction={this.state.filterModel}
                        closeAction={()=> this.setState({filterModel: false})}
                        clearAction={this.clearFilter}
                        data={this.state.filterObject} 
                        type={this.state.type}
                        fields= {this.props.metadata.filter}
                        saveAction = {this.saveObject}
                        {...this.props}
                        >
                        </FilterModel>
                    }
               {
                this.state.deleteModel &&  
                        <ConfirmModel
                            openAction={this.state.deleteModel}
                            closeAction={()=> this.setState({deleteModel: false})}
                            data={this.state.dataObject} 
                            type={this.state.type}
                            message= 'Do you want to delete'
                            saveAction = {this.saveObject}
                            {...this.props}
                        >
                        </ConfirmModel>
                }
            </>
        );
    };
}



const mapStateToProps = state => {
    const globalCategoryItemList = state.globalCategoryReducer.globalCategoryList;

    const { globalTagItemList } = state.globalTagItemReducer;


    const { globalImageLibraryList, globalImageLibraryPageData } = state.globalImageLibraryReducer;

    return { globalImageLibraryList, globalTagItemList, globalImageLibraryPageData , globalCategoryItemList};
};


export default connect(mapStateToProps, {getGlobalTagItemList, getGlobalCategoryList, getGlobalImageLibraryPageList, addGlobalImageLibrary, editGlobalImageLibrary, deleteGlobalImageLibrary })(GlobalImageLibrary);


