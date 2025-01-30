import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, ButtonGroup, Fab, Pagination, TableFooter, TablePagination } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import { makeStyles } from '@material-ui/styles';
import config from '../../config';

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
    height:'100%',
    margin: 0,
    padding:0,
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
        return  <img
                width={field.width}
                height={field.height}
                src={config.resourseUrl(getValue(data,field.name))}
            />
    default:
       return getValue(data,field.name);
    }
}

  const getChildrenLoad = (row,children, props) =>{
    let childrenRow = children.onLoad(row[children.name],row, props);
    return childrenRow ?  children.headers.map((header)=>
            <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'_'+childrenRow.id+'_'+header.name}>{
              header.render ? header.render(getValue(childrenRow,header.name), childrenRow,header, props ):
              renderCell(childrenRow, header)
            }</TableCell>
      ) :
              <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'_norows'} 
              colSpan={7} sx={{textAlign: 'center'}}>
                            No data founds
            </TableCell>
  }

function Row(props) {
  const classes = useStyles();
  
  const { row, headers } = props;
  const [open, setOpen] = React.useState(false);

  
  const [pageNumber, setPageNumber] = React.useState(0);
  const handlePageNumber = (event, pageNumber) => {
    setPageNumber(pageNumber);
    props.pageAction &&  props.pageAction(pageNumber-1,props.pageSize);
  };

  return (
    <React.Fragment>
      
    <TableRow key={row.id+'_data_main'} sx={{ '& > *': { borderBottom: 'unset' } }}>
           
        {
            headers &&  headers.headers.map((header)=>
                
                    header.name=='actions' 
                    ?
                    <TableCell key={row.id+'_data_main_'+header.name} align={header.align? header.align: 'center'} style={{fontWeight: 600}}>
                        <ButtonGroup>
                        {
                         props.collapsible &&  <Button color="primary" aria-label="Collapse"
                              size="small" variant='outlined'
                              onClick={() => setOpen(!open)}
                          >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </Button>
                      }
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
                    <TableCell key={row.id+'_data_main_'+header.name} {...header.props}>
                        {
                         header.render ? header.render(getValue(row,header.name),row, header, props ):
                         renderCell(row, header)
                        } 
                            
                    </TableCell>
                
            )
        }
    </TableRow>
    <TableRow key={row.id+'_data_child'}>
        <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headers.headers.length+1}>
          {
            headers &&  headers.childrens && headers.childrens.map(children=>
            <Collapse key={row.id+'_data_child_collapse'+children.name} in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, padding:2 }} className={classes.table}>
              <Typography variant="h6" gutterBottom component="div">
                {children.label}
              </Typography>
              <Table size="small" aria-label="purchases" className={classes.table}>
                <TableHead>
                  <TableRow key={row.id+'_data_child_collapse_row_header_'+children.name}>
                   {children.headers.map((header)=>
                      <TableCell key={row.id+'_data_child_collapse_row_header_cel_'+children.name+'_'+header.name}>{header.label}</TableCell>
                   )}
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                  {
                   children.onLoad ? 
                      <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_onLoad'}>
                        { getChildrenLoad(row, children, props ) }
                      </TableRow>
                  :
                  row[children.name] ? row[children.name].map(childrenRow=>
                    <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_onLoad'}>
                    {
                    children.headers.map((header)=>
                      <TableCell key={row.id+'_data_main_'+header.name} {...header.props}>
                        {
                        header.render ? header.render(getValue(childrenRow,header.name),childrenRow, header, props ):
                        getValue(childrenRow,header.name)
                        }   
                      </TableCell>
                        )
                      }
                    </TableRow>
                  )
                  :
                  <TableRow key={row.id+'_data_child_collapse_row_body_'+children.name+'_norows'} >
                           <TableCell key={row.id+'_data_child_collapse_row_body_cel_'+children.name+'__norows'} 
                           colSpan={6} sx={{textAlign: 'center'}}>
                            No data founds
                          </TableCell>
                  </TableRow>
                 
                }
                </TableBody>
                {
                  props.pageAction && props.totalPages && 
                  <TableFooter style={{border : 0}} >
                    <TableRow style={{border : 0}} >
                      <TableCell colSpan={headers.length} sx={{border : 0, textAlign: 'right'}}  align='right' > 
                      <div style={{border : 2, textAlign: 'right'}}>
                      <Pagination count={props.totalPages} page={pageNumber}  boundaryCount={1}
                        variant="outlined" shape="rounded" onChange={handlePageNumber}/>
                        </div>
                      </TableCell>
                    </TableRow>
                </TableFooter>
                }
              </Table>
            </Box>
           </Collapse>
            )
        }
        </TableCell>
    </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const classes = useStyles();
  const {dataList, headers}=props;

  const [pageNumber, setPageNumber] = React.useState(0);
  const handlePageNumber = (event, pageNumber) => {
    setPageNumber(pageNumber);
    props.pageAction &&  props.pageAction(pageNumber-1,props.pageCount);
  };
  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
           {
                headers && headers.headers.map(header=>
                  header.name=='actions' ?
                  <TableCell key={header.name} align={header.align? header.align: 'center'} style={{fontWeight: 600}} >{header.label}</TableCell>:
                  <TableCell key={header.name} align={header.align? header.align: 'left'} style={{fontWeight: 600}} >{header.label}</TableCell>
                )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {  
           dataList && dataList.length>0 ? dataList.map((row) => (
                <Row key={row.id} row={row} {...props}/>
            ))
            :
            <TableRow>
              <TableCell colSpan={headers.headers.length+1} align='center'>
                No rows found
              </TableCell>
            </TableRow>
          }
        </TableBody>
        {
            props.pageAction && 
            <TableFooter style={{border : 0}} >
              <TableRow style={{border : 0}} >
                <TableCell colSpan={headers.headers.length+1} sx={{border : 0, textAlign: 'right'}}  align='right' > 
                <div style={{border : 2, textAlign: 'right'}}>
                <Pagination 
                  count={props.pageCount}
                  page={pageNumber} 
                  size="small" 
                  siblingCount={0} 
                  boundaryCount={2} 
                  variant="outlined" 
                  shape="rounded" 
                  onChange={handlePageNumber}/>
                  </div>
                </TableCell>
              </TableRow>
          </TableFooter>
          }
      </Table>
    </TableContainer>
  );
}