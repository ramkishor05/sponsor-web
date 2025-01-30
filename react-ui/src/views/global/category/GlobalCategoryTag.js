import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import {getGlobalImageLibraryList, getGlobalTagItemPageList, getGlobalCategoryList, addGlobalTagItem, editGlobalTagItem, deleteGlobalTagItem } 
from '../../../actions';
import { connect } from 'react-redux';


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
class GlobalTagItem extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        filterModel: false,
        dataObject: {},
        filterObject: {},
        title: "",
        type: "",
        pageSize: 7,
        pageNumber: 0
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update Tag Library", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Tag Library", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete sub tag", type:"Delete", deleteModel: true  });
    };

    _filter = () => {
        this.setState({ title:"Filters", type:"Filter", filterModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalTagItem(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalTagItem(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalTagItem(row.id, this.clearAndRefresh)
        if(type=='Filter'){
            this.setState({...this.state, filterObject: row, filterModel: false });
            this.props.getGlobalTagItemPageList(this.state.pageNumber, this.state.pageSize, row);
        }
    };

    clearAndRefresh = async() => {
        await this.props.getGlobalImageLibraryList();
        await this.props.getGlobalCategoryList();
        this.setState({ ...this.state, dataObject: {}, saveModel: false, deleteModel:false , filterModel: false });
        this.props.getGlobalTagItemPageList(this.state.pageNumber, this.state.pageSize, this.state.filterObject);
    }
    
    clearFilter=  async() => {
        this.setState({...this.state, filterObject: {}, filterModel: false });
        this.props.getGlobalTagItemPageList(this.state.pageNumber, this.state.pageSize);
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
                
                <MainCard title={this.props.metadata.table.name} 
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
                        pageSize= {this.state.pageSize}
                        pageCount= {this.props.globalTagItemPageData.pageCount}
                        totalPages= {this.props.globalTagItemPageData.totalPages}
                        pageAction={this.pageAction}
                        headers={this.props.metadata.table.headers} 
                        pageField={this.props.metadata.table.pageField} 
                        dataList={this.props.globalTagItemPageData.elements}
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
                {this.state.filterModel &&    this.props.metadata.filter &&
                        <FilterModel
                        title={this.state.title}
                        openAction={this.state.filterModel}
                        closeAction={()=> this.setState({filterModel: false})}
                        data={this.state.dataObject} 
                        type={this.state.type}
                        fields= {this.props.metadata.filter}
                        saveAction = {this.saveObject}
                        {...this.props}
                        >
                        </FilterModel>
                    }
                 {this.state.deleteModel &&  
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

    const { globalImageLibraryList } = state.globalImageLibraryReducer;

    const { globalTagItemList, globalTagItemPageData } = state.globalTagItemReducer;

    return { globalTagItemList, globalTagItemPageData, globalSubCategoryList: globalCategoryItemList, globalImageLibraryList };
};


export default connect(mapStateToProps, { getGlobalTagItemPageList, getGlobalCategoryList, getGlobalImageLibraryList, addGlobalTagItem, editGlobalTagItem, deleteGlobalTagItem })(GlobalTagItem);


