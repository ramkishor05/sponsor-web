import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


// material-ui
import { Avatar, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
// project imports
import EarningCard from './EarningCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import { gridSpacing } from '../../../store/constant';
import MainCard from '../../../component/cards/MainCard';
import { Close } from '@material-ui/icons';
// assets
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { getGlobalDashboard } from '../../../actions/global/GlobalDashboardActions';
import { getGlobalSponsorAccount } from '../../../actions';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

// style constant
const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      }
}));

const Dashboard = () => {
    const dispatch= useDispatch();
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    const [isLoadingView, setLoadingView] = useState(false);
    const {globalDashboard} = useSelector((state) => state.globalDashboardReducer);
    const { globalSponsorAccount } = useSelector((state)=>state.globalSponsorReducer);

    const showMore=(id, status)=>{
        setLoadingView(status);
    }

    async function dashboardList() {
        dispatch(getGlobalDashboard());
    };

    useEffect(() => {
        dashboardList();
        setLoading(false);
        
        setLoadingView(false);
    }, []);

    return (
        
            isLoadingView ? 
            <MainCard content={false}
                    title="Stock List" 
                        button ={
                            
                        <Tooltip title="Add" aria-label="add">
                            <Button variant='contained' color="error" className={useStyles.absolute} onClick={()=>setLoadingView(false)}>
                                <Close></Close>
                            </Button>
                        </Tooltip>
                        }
            >

               <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Table style={{border:1, borderStyle: 'groove'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Gross Sale
                                    </TableCell>
                                    <TableCell>
                                        Gross Purchase
                                    </TableCell>
                                    <TableCell>
                                        Gross Profit/Loss
                                    </TableCell>
                                    <TableCell>
                                        Stock Qnt
                                    </TableCell>
                                    <TableCell>
                                        Stock Price
                                    </TableCell>
                                    <TableCell>
                                        Net Sale
                                    </TableCell>
                                    <TableCell>
                                        Net Purchase
                                    </TableCell>
                                    <TableCell>
                                        Net Profit/Loss
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    globalDashboard.stocks && globalDashboard.stocks.map(stock=>
                                    <TableRow>
                                        <TableCell>
                                            {stock.name}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalGrossSale}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalGrossPurchase}
                                        </TableCell>
                                        <TableCell>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalGrossProfit.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {
                                                        stock.totalGrossProfit>0?
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                        :
                                                        <Avatar variant="rounded" className={classes.avatarError}>
                                                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalStockQnt}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalStockPrice}
                                        </TableCell>
                                        <TableCell style={{alignItems :  'center'}}>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalNetSale.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                           
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalNetPurchase}
                                        </TableCell>
                                        <TableCell>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalNetProfit.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {
                                                        stock.totalNetProfit>0?
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                        :
                                                        <Avatar variant="rounded" className={classes.avatarError}>
                                                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    )
                                
                            }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </MainCard>
            :
            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} price={globalSponsorAccount.sponsorIncome} title="Sponsor Income" symbol={'₹'}/>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} price={globalSponsorAccount.levelIncome} title="Level Income" symbol={'₹'}/>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} price={globalSponsorAccount.boostIncome} title="Boost Income" symbol={'₹'}/>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} price={globalSponsorAccount.royaltyIncome} title="Royalty Income" symbol={'₹'}/>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} subTitle="Days remaining"  price={globalDashboard.remainingDaysForLuckyDraw} title="Lucky draw" background={'#1e88e5'} />
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <EarningCard isLoading={isLoading} subTitle="Days remaining" price={globalDashboard.remainingDaysForMegaDraw} title="Mega draw" background={'#49D242'}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    );
};

export default Dashboard;
