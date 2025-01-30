import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalReProgramLibraryPageList, addGlobalReProgramLibrary, editGlobalReProgramLibrary, deleteGlobalReProgramLibrary } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';


const globalReProgramMeta = {
    "table": {
        headers : [
            {
                name: "musicUrl",
                label: "Audio",
                type: 'audio',
                width: 200,
                height: 150,
                "required" : {
                    value : '',
                    message: "URL is required!"
                }
            },
            {
                name: "name",
                label: "Name",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Name is required!"
                }
            },
            {
                name: "title",
                label: "Title",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Title is required!"
                }
            },
            {
                name: "description",
                label: "Description",
                type: 'text'
            },
            
            {
                name: "actions",
                label: "Actions",
                "align": "right"
            }
        ]
    },
    model : [
        {
            grid: 6,
            fields:[{
            name: "musicUrl",
            label: "URL",
            type: 'audio',
            width: "200px",
            height: "200px",
            "required" : {
                value : '',
                message: "URL is required!"
            },
            onchange: (file, data, field, props, setData)=>{
                if(data){
                    data['fileResource']=file;
                    setData && setData(data);
                }
                else{
                    data={};
                    data['fileResource']=file;
                    setData && setData(data);
                }
            }
        }]
    }
        ,
        {
            grid: 6,
            fields:[
        {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "title",
            label: "Title",
            type: 'text',
            "required" : {
                value : '',
                message: "Title is required!"
            }
        },
        {
            name: "description",
            label: "Description",
            type: 'textarea',
            rows: 10
        }]
    }
    ]
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class GlobalReProgramLibrary extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update Reprogram", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Reprogram", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Reprogram", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log("row==",row)
        if(type=='Add')
            this.props.addGlobalReProgramLibrary(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalReProgramLibrary(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalReProgramLibrary(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalReProgramLibraryPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }
    render() {
        return (
            <>
                
                <MainCard title="Reprogram" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                        content = {false}
                    >
                        <DynamicTable 
                        pageSize= {config.pageSize}
                        pageCount= {this.props.globalReProgramLibraryPageData.pageCount}
                        totalPages= {this.props.globalReProgramLibraryPageData.totalPages}
                        pageAction={this.props.getGlobalReProgramLibraryPageList}
                        headers={globalReProgramMeta.table.headers} 
                        dataList={this.props.globalReProgramLibraryPageData.elements}
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
                            fields= {globalReProgramMeta.model}
                            saveAction = {this.saveObject}
                            {...this.props}
                            >
                            </DynamicModel>
                }
                <ConfirmModel
                openAction={this.state.deleteModel}
                closeAction={()=> this.setState({deleteModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                message= 'Do you want to delete'
                saveAction = {this.saveObject}
                >
                </ConfirmModel>
            </>
        );
    };
}



const mapStateToProps = state => {
    const { globalReProgramLibraryList, globalReProgramLibraryPageData } = state.globalReProgramLibraryReducer;

    return { globalReProgramLibraryList, globalReProgramLibraryPageData };
};


export default connect(mapStateToProps, { getGlobalReProgramLibraryPageList, addGlobalReProgramLibrary, editGlobalReProgramLibrary, deleteGlobalReProgramLibrary })(GlobalReProgramLibrary);


