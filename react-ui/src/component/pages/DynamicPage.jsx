import { Button } from "@material-ui/core";
import MainCard from "../cards/MainCard";

import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DynamicTable from "../table/DynamicTable";
import DynamicModel from "../model/DynamicModel";
import FilterModel from "../model/FilterModel";
import ConfirmModel from "../model/ConfirmModel";
import { Component } from "react";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});

class DynamicPage extends Component {

    state={
        title: this.props.metadata.table.title,
        type: "",
        message : 'Do you want to delete',
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        dataList : [],
        pageNumber: this.props.pageNumber? this.props.pageNumber: 0,
        pageSize: this.props.pageSize? this.props.pageSize:  7,
        totalPages: this.props.totalPages? this.props.totalPages: 0,
        filterModel: false,
        filterObject: {}
    }

    getModeTitle= () =>{
        return this.state.type+ " "+ this.state.title
    }

    
    _edit = row => {
        this.setState({ ...this.state, dataObject: row, type:"Update", saveModel: true  });
     }
 
     _add = () => {
        this.setState({ ...this.state, dataObject: {}, type:"Add", saveModel: true  });
     }
 
     _delete = row => {
         this.setState({ ...this.state, dataObject: row, type:"Delete", deleteModel: true  });
     };
 
     _filter = () => {
         this.setState({ ...this.state, type:"Filter", filterModel: true  });
     };
     
      saveObject = (type, row) => {
         if(type==='Add')
             this.props.add(row, this.clearAndRefresh)
         if(type==='Update')
             this.props.edit(row.id, row, this.clearAndRefresh)
         if(type==='Delete')
             this.props.delete(row.id, this.clearAndRefresh)
         if(type==='Filter'){
             this.props.getPageList(this.state.pageNumber, this.state.pageSize, row);
             this.setState({ filterObject: row, saveModel: false, deleteModel:false , filterModel: true });
         }
     };

     sortAction=(orderBy, sortOrder , dataList)=>{
        this.setState({...this.state, filterObject:{
            ...this.state.filterObject,
            orderBy, sortOrder
        }})
        this.props.getPageList(this.state.pageNumber, this.state.pageSize, {... this.state.filterObject, orderBy, sortOrder });
     }
 
     clearAndRefresh = async() => {
         this.props.getPageList(this.state.pageNumber, this.state.pageSize, this.state.filterObject);
         this.setState({ dataObject: {}, saveModel: false,deleteModel:false , filterModel: false  });
     }
 
     clearFilter=  async() => {
         this.setState({ filterObject: {}, saveModel: false, deleteModel:false , filterModel: false  });
         this.props.getPageList(this.state.pageNumber, this.state.pageSize, this.state.filterObject);
     }
 
     pageAction= async(pageNumber,pageSize )=>{
         this.setState({ ...this.state, pageNumber, pageSize })
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
                             pageNumber= {this.state.pageNumber}
                             totalPages= {this.state.totalPages}
                             pageAction={this.pageAction}
                             headers={this.props.metadata.table.headers} 
                             pageField={this.props.metadata.table.pageField} 
                             dataList={this.state.dataList}
                             deleteAction = {this._delete}
                             editAction = {this._edit}
                             {...this.props}
                         ></DynamicTable>
                     </MainCard>
                     {
                     this.state.saveModel &&
                             <DynamicModel
                             title={this.getModeTitle()}
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
                         title={this.getModeTitle()}
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
                             message= {this.state.message}
                             saveAction = {this.saveObject}
                             {...this.props}
                         >
                         </ConfirmModel>
                 }
             </>
         );
     };
}

export default DynamicPage;
