import { Grid } from "@material-ui/core";

import defaultImg from '../assets/images/product/no-image.svg' 

const fullName =( row) =>{
    let finalname="";
    let userProfile= row?.userProfile;
    if(userProfile){
        if(userProfile.fullName){
            return userProfile.fullName;
        }
        if(userProfile.firstName){
            finalname+=userProfile.firstName;
            if(userProfile.lastName){
                finalname+=userProfile.lastName;
            }
        }else{
            if(userProfile.lastName){
                finalname+=userProfile.lastName;
            }
        }
    }
    return finalname;
}

const phohograph =( row) =>{
    let userProfile= row?.userProfile;
    if(userProfile && userProfile.pictureURL){
        return userProfile.pictureURL;
    }
    return defaultImg;
}

const globalUserMeta = {
    "table": {
        title: 'User',
        name: 'Users',
        headers : [
            {
                name: "username",
                label: "User#",
                type: 'text',
                render: (value, row, header, props ) =>{
                    return <Grid container>
                            <Grid item>
                              <img style={{textAlign :'center'}} 
                              alt='Phohograph' 
                              src={phohograph(row)} 
                              width={60} 
                              height={60}></img>
                            </Grid> 
                            <Grid item>
                                {fullName(row)}
                            </Grid>
                        </Grid> 
                }
            },
            {
                name: "registeredEmail",
                label: "Registered Email",
                type: 'text'
            },
            {
                name: "registeredMobile",
                label: "Registered Mobile",
                type: 'text'
            },
            {
                name: "userRole",
                label: "User Type",
                type: 'text',
                render: (userRole, row, header, props ) =>{
                    return userRole?.roleName;
                }
            },
            {
                name: "actions",
                label: "Actions",
                "align": "right"
            }
        ],
        pageField: {
            name: "pageSize",
            label: "Page Size",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return [5,7,10,20,50,100]
            }
        }
    },
    model : [
        {
            name: "userProfile.pictureURL",
            label: "Profile Img",
            type: 'img',
            width: 200,
            height:200,
            grid:12,
            render: (value, row, header, props ) =>{
                return <img style={{textAlign :'center'}} alt='Phohograph' src={value} width={50} height={50}></img>
            }
        },
        {
            name: "username",
            label: "Username",
            type: 'text',
            "required" : {
                value : '',
                message: "Username is required!"
            }
        },
        {
            name: "registeredEmail",
            label: "Registered Email",
            type: 'email'
        },
        {
            name: "registeredMobile",
            label: "Registered mobile",
            type: 'text'
        },
        {
            name: "userRoleId",
            key: "userRoleId",
            label: "User Role",
            type: 'select',
            "required" : {
                value : '',
                message: "User role is required!"
            },
            onItems: (value, row, header, props ) =>{
                return props.userRoleList? props.userRoleList: [];
            },
            itemKey: 'id',
            itemVal: 'roleName'
        }
    ],
    
    filter : [
        {
            name: "username",
            label: "Username",
            type: 'text'
        },
        {
            name: "registeredMobile",
            label: "Registered Mobile",
            type: 'text'
        },
        {
            name: "userRoleId",
            key: "userRoleId",
            label: "User Role",
            type: 'select',
            onItems: (value, row, header, props ) =>{
                return props.userRoleList? props.userRoleList: [];
            },
            itemKey: 'id',
            itemVal: 'roleName'
        }
    ]
}

export default globalUserMeta;