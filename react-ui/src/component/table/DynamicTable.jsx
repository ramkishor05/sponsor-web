import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup, Fab, Grid, MenuItem, Pagination, Select, TableFooter, TablePagination} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import defaultImg from '../../assets/images/product/no-image.svg'
const useStyles = makeStyles({
    table: {
      width: '100%',
      height:'100%',
      margin: 0,
      padding:0,
      border: "0px",
      "& .MuiPaper-root": {
        padding:0,
        margin:0,
        borderRadius: 0 
      },
      "& .MuiTableRow-root": {
        borderBottom: '1px solid #ddd',
        padding:0,
        margin:0
      },
      "& .MuiTableCell-root": {
        border: "0px solid rgba(224, 224, 224, 1)",
        padding: 8
      },
      "& .MuiTableFooter-root":{
        textAlign: 'right',
        align:'right',

        padding: 8
      },
      "& .MuiTableHeader-root":{
        padding: 8 
      }

    }
  });

function DynamicTable (props){
    const classes = useStyles();
    const [pageSize, setPageSize] = React.useState(props.pageSize? props.pageSize: 7);
    const [pageNumber, setPageNumber] = React.useState(props.pageNumber?props.pageNumber:0);

    const [sort, setSort] = React.useState({});

    const handlePageNumber = (event, pageNumber) => {
      setPageNumber(pageNumber);
      props.pageAction &&  props.pageAction(pageNumber-1,pageSize);
    };

    const updatePageSize = (pageSize)=>{
      setPageSize(pageSize);
      props.pageAction &&  props.pageAction(pageNumber,pageSize);
    }

    const handleSort= (orderBy, sortable) =>{
      if(sortable){
        var sortOrder= sort[orderBy];
        if(props.sortAction){
          props.sortAction(orderBy, sortOrder , props.dataList);
        } else{
          props.dataList.sort((data1,data2)=>{
            let value1=getValue(data1,orderBy).toString();
            let value2=getValue(data2,orderBy).toString();
            return sortOrder=='desc' ? value2.localeCompare(value1): value1.localeCompare(value2);
          })
        }
        var sorting={...sort};
        if(!sortOrder){
          sorting[orderBy]='asc';
        } else
        if(sortOrder=='asc'){
          sorting[orderBy]='desc';
        } else
        if(sortOrder=='desc'){
          sorting[orderBy]='asc';
        }
        setSort({...sorting});
      }
    }

    const renderArrow = (orderBy, sortable)=>{
      if(sortable){
        var sortOrder= sort[orderBy];
        return !sortOrder || sortOrder=='asc' ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>;
      } else{
         return "";
      }
       
    }

    const getValue=(data, keyStr)=>{
        let keys=keyStr.split("\.");
        let val=data;
        for (let i = 0; i < keys.length; i++){
          if( typeof val === 'object'){
            if(!val){
              val={};
            }
            val=val[keys[i]];
          }
        }
        return val;
      }

    const renderCell= (data, field)=>{
        switch(field.type) {
            
        case 'img':
            let imageContent= getValue(data,field.name);
            let imageResourseUrl= imageContent && imageContent!==""? imageContent :defaultImg;
            return  <img
                    width={field.width}
                    height={field.height}
                    className={classes.img}
                    src={imageResourseUrl}
                />
        case 'color':
            return <Button style={{backgroundColor: getValue(data,field.name), height:'80%'}} ></Button>
        case 'video':
          let videoContent= getValue(data,field.name);
            let videoResourseUrl= videoContent && videoContent!==""? videoContent :defaultImg;
          return <video width={field.width}
              preload="metadata"
              src={videoResourseUrl} 
              poster={getValue(data,"posterUrl")}
              height={field.height} controls>
            <source  src={videoResourseUrl} />
            Your browser does not support the video tag.
          </video>
        case 'audio':
          let audioContent= getValue(data,field.name);
            let audioResourseUrl= audioContent && audioContent!==""? audioContent :defaultImg;
          return <video width={field.width}
              preload="metadata"
              src={audioResourseUrl} 
              poster={getValue(data,"posterUrl")}
              height={field.height} controls>
            <source  src={audioResourseUrl} />
            Your browser does not support the video tag.
          </video>
        default:
           return getValue(data,field.name);
        }
    }

    const {headers, dataList, pageField} = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" className={classes.table}>
                
                <TableHead>
                <TableRow>
                    {
                        headers && headers.map(header=>
                            header.name=='actions' 
                            ?
                            <TableCell component="th" scope="row" 
                            key={header.name} 
                            align={header.align? header.align: 'center'} 
                            style={{width: header.width, fontWeight: 600}}
                            >{header.label}</TableCell>
                            :
                            <TableCell component="th" scope="row" 
                            key={header.name} align={header.align? header.align: 'left'} 
                            style={{width: header.width, fontWeight: 600}}
                            onClick={ (event)=> handleSort(header.name, header.sortable)}
                            >
                               {
                                renderArrow(header.name, header.sortable)
                               }
                              {
                              header.label
                              }
                              
                              </TableCell>
                        )
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {dataList && dataList.length>0 ?  dataList.map((row, i) => (
                    <TableRow key={i}>{
                        headers &&  headers.map(header=>
                            header.name=='actions' 
                            ?
                            header.render ? header.render('', row, i, header, props) :
                            <TableCell key={header.name+'_'+i} align={header.align? header.align: 'center'} style={{fontWeight: 400}}>
                               <ButtonGroup>
                                {
                                props.editAction &&
                                <Button color="secondary" aria-label="Edit" size="small" variant='outlined'  onClick={() => props.editAction(row)}>
                                        <EditIcon/>
                                </Button>
                                }
                                {
                                props.deleteAction &&
                                <Button  color="error" aria-label="Delete"  size="small" variant='outlined' onClick={() => props.deleteAction(row)} >
                                    <DeleteIcon />
                                </Button>

                                }
                                {
                                props.printAction && 
                                <Button color="primary"  aria-label="Print"  size="small" variant='outlined'  onClick={() => props.printAction(row)} >
                                    <PrintIcon />
                                </Button>
                                }
                                </ButtonGroup>
                            </TableCell>
                            :
                            <TableCell key={header.name+'_'+i} {...header.props} style={{fontWeight: 400}}>{
                                header.render ?
                                 header.render(getValue(row,header.name), row, header, props) :
                                renderCell(row,header)
                                
                                
                             }</TableCell>
                            )
                        }
                    </TableRow>
                )) :
                <TableRow>
                    <TableCell colSpan={headers.length+1} align='center'>
                        No rows found
                    </TableCell>
                </TableRow>
                }
                </TableBody>
                {
                  props.pageAction && 
                  <TableFooter style={{border : 0, textAlign: 'right'}} >
                    <TableRow style={{border : 0, textAlign: 'right'}} >

                      <TableCell colSpan={headers.length} sx={{border : 0, textAlign: 'right', alignContent: 'flex-end'}}  align='right' > 
                      <Grid container style={{border : 2, textAlign: 'right'}}>
                      <Grid item>
                         {
                        
                        pageField &&

                        <Select
                          variant='standard'
                          labelId={pageField.name+"-label"}
                          id={pageField.name}
                          value={pageSize}
                          defaultValue={pageSize}
                          label={pageField.label}
                          onChange={(event)=>updatePageSize(event.target.value)}
                        >
                            {
                             pageField.onItems && pageField.onItems (null,null, pageField, props ).
                              map(item=> 
                              
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                              )
                            }

                        </Select>
                      }
                      </Grid>
                      <Grid item>
                          <Pagination count={props.totalPages} page={pageNumber} 
                            sx={{paddingLeft: 0, paddingRight:0}}
                            variant="outlined" shape="rounded" onChange={handlePageNumber}/>
                       </Grid>
                       </Grid>
                      </TableCell>
                    </TableRow>
                </TableFooter>
                }
            </Table>
        </TableContainer>
    )
}

export default DynamicTable;