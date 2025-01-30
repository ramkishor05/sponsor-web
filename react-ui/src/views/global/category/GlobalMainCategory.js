import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getGlobalCategoryGroupPageList, addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup } from '../../../actions';
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

class GlobalCategoryGroup extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        filterModel: false,
        dataObject: {},
        filterObject: {},
        title: "",
        type: "",
        pageNumber: 0,
        pageSize: 7
    }
    
    _edit = row => {
       this.setState({ ...this.state, dataObject: row, title:"Update Main Category", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ ...this.state, dataObject: {}, title:"Add Main Category", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ ...this.state, dataObject: row, title:"Delete Main Category", type:"Delete", deleteModel: true  });
    };

    _filter = () => {
        this.setState({ ...this.state, title:"Filters", type:"Filter", filterModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add'){
            this.props.addGlobalCategoryGroup(row, this.clearAndRefresh)
        }
            
        if(type=='Update'){
            this.props.editGlobalCategoryGroup(row.id,row, this.clearAndRefresh)
        }
            
        if(type=='Delete'){
            this.props.deleteGlobalCategoryGroup(row.id, this.clearAndRefresh)
        }
            
        if(type=='Filter'){
            this.setState({...this.state, filterObject: row, filterModel: false });
            this.props.getGlobalCategoryGroupPageList(this.state.pageNumber, this.state.pageSize, row);
        }
    };

    clearAndRefresh = () => {
        this.setState({ ...this.state, dataObject: {}, saveModel: false, deleteModel:false , filterModel: false });
        this.props.getGlobalCategoryGroupPageList(this.state.pageNumber, this.state.pageSize, this.state.filterObject);
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    clearFilter=  async() => {
        this.setState({...this.state, filterObject: {}, filterModel: false });
        this.props.getGlobalCategoryGroupPageList(this.state.pageNumber, this.state.pageSize);
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
                        pageSize= {config.pageSize}
                        pageCount= {this.props.globalCategoryGrouppPageData.pageCount}
                        totalPages= {this.props.globalCategoryGrouppPageData.totalPages}
                        pageAction={this.props.getGlobalCategoryGroupPageList}
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalCategoryGrouppPageData.elements}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
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
                        >
                        </DynamicModel>
                    }
                    {this.state.filterModel &&   this.props.metadata.filter &&
                        <FilterModel
                        title={this.state.title}
                        openAction={this.state.filterModel}
                        closeAction={()=> this.setState({filterModel: false})}
                        clearAction ={this.clearFilter}
                        data={this.state.filterObject} 
                        type={this.state.type}
                        fields= {this.props.metadata.filter}
                        saveAction = {this.saveObject}
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
                        >
                    </ConfirmModel>
                 }
            </>
        );
    };
}


const mapStateToProps = state => {
    const { globalCategoryGroupList, globalCategoryGrouppPageData, show_global_category_group_loader } = state.globalCategoryGroupReducer;
    return { globalCategoryGroupList, globalCategoryGrouppPageData, show_global_category_group_loader };
};


export default connect(mapStateToProps, { getGlobalCategoryGroupPageList,addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup })(GlobalCategoryGroup);


