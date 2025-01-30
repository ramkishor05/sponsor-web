import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core"
import { useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactToPrint from 'react-to-print';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import PdfInvoice from "./PdfInvoice";
import html2pdf from "html2pdf.js";
import { red } from "@material-ui/core/colors";


const Invoice = (props)=>{
    const reference = useRef();
    const {invoice}=props
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
    
   const print=() =>{
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(`<div>${renderToStaticMarkup(main())}</div>`);
        pri.document.close();
        pri.focus();
        pri.print();      
    }

    const downloadPDF=()=>{
        const printElement = renderToStaticMarkup(main());
        var opt = {
            margin:       1,
            filename:     "INVOICE_"+invoice.idenNo+'.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
        html2pdf().from(printElement).set(opt).save();
    }

    const main=()=>{
        return <Box >
        <Grid container spacing={2}>
            <Grid item xs={6} xl={6} sx={6}>
                <Typography variant="p" gutterBottom align="left">
                <p>
                    {invoice.from.name}
                    </p>
                    <address>
                    {invoice.from.address }
                    </address>
                    <p>
                    {invoice.from.phone }
                    </p>
                </Typography>
            </Grid>
            <Grid item xs={6} xl={6} sx={6} align='right'>
                <Typography variant="p" gutterBottom align="right">
                    <p>
                        Invoice No : {invoice.idenNo}
                    </p>
                    <p>
                        Invoice Date : {invoice.date}
                    </p>
                    <p></p>
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={2} >
            <Grid item xs={6} xl={6} sx={12}>
                <div align="left" style={{border:1, borderStyle:'groove', padding:10}}>
                    <p>Bill To </p>
                    <p>{invoice.to.name}</p>
                    <p>{invoice.to.address }</p>
                    <p >{invoice.to.phone } </p>
                </div>
            </Grid>
            <Grid item xs={6} xl={6} sx={12}>
                <div align="right" style={{border:1, borderStyle:'groove', padding:10, marginBottom:5}}>
                    <p>Payment # </p>
                    <p>Total Amount: {invoice.payment.amount}</p>
                    <p style={{fontVariant:'all-petite-caps', fontStyle:900, color: 'red'}}><b>Payment Status : {invoice.payment.status }</b></p>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} xl={12} sx={12} container alignContent="flex-end">
                <Table style={{border:1, borderStyle:'outset'}}>
                    <TableHead>
                        
                         <TableRow>
                         {
                         invoice.headers.map(header=>
                            <TableCell key={header.name}>
                                {header.label}
                            </TableCell>
                         )}
                        </TableRow>
                       
                        
                    </TableHead>
                    <TableBody>
                        
                         {
                        invoice.items.map(item=>
                            <TableRow>
                                {
                                    invoice.headers.map(header=>
                                        <TableCell key={item.id+'_'+header.name}>
                                            {
                                                header.render ? header.render(getValue(item,header.name),item, header, props ):
                                                getValue(item,header.name)
                                            }
                                        </TableCell>
                                    )
                                }
                             </TableRow>
                           )
                        }
                        
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
        <Box height={20}>&nbsp;</Box>
        <Grid container spacing={2}>
            <Grid item xs={8} align="right">
                
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={2} >
                    <Grid item xs={9} align="right">
                       Sub Total : 
                    </Grid>
                    <Grid item xs={3} align="right">
                        {invoice.subTotal}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={8} align="right">
                
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={2} >
                    <Grid item xs={9} align="right">
                        Discounts :
                    </Grid>
                    <Grid item xs={3} align="right">
                        {invoice.discounts}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={8} align="right">
                
            </Grid>

            <Grid item xs={4}>
                <Grid container spacing={2} >
                    <Grid item xs={9} align="right">
                        Total Amount :
                    </Grid>
                    <Grid item xs={3} align="right">
                        {invoice.totalAmount}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
       
    </Box>
    
    }

    return (
        <>
        <Card >
            <CardContent ref={reference} variant="outlined">
            {
                main()
            }
            </CardContent>
            <CardActions disableSpacing
                sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    p: 1,
                }}>

                <ButtonGroup  aria-label="outlined primary button group">
                    <ReactToPrint 
                    trigger={() => <Button variant="outlined">Print</Button>}
                    content={() => reference.current}
                    />

                    <Button variant="outlined" onClick={downloadPDF} >PDF</Button>
                </ButtonGroup>
            </CardActions>
        </Card>
       
        </>
    )
}

export default Invoice;

