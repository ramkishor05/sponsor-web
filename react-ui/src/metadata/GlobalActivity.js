import { Button } from "@material-ui/core";
import { Edit} from "@material-ui/icons";

const types=[
    'Approval',
    "Approved",
    "Rejected"
]

const globalActivityMeta={
    "table": {
        headers : [
            {
                name: "userAccount.registeredEmail",
                label: "Email",
                type: 'text',
                sortable: true
            },
            {
                name: "sponsorLeaderId",
                label: "Sponsor Leader",
                type: 'text'
            },
            {
                name: "utrNumber",
                label: "UTR Number",
                grid: '6',
                type: 'text'
            },
            {
                name: "utrReceipt",
                label: "UTR Receipt",
                type: 'img',
                width: '30'
            },
            {
                name: "status",
                label: "Status",
                type: 'text',
                render: (value, row, i, header, props)=>{
                    switch(value)
                    {
                        case 'Approval': return <span style={{background: 'blue', color:'whte', padding:5}}>{value}</span>
                        case 'Approved': return <span style={{background: 'green', color:'white', paddiing:5}}>{value}</span>
                        case 'Rejected': return <span style={{background: 'red', color:'white', padding:5}}>{value}</span>
                    }
                    return value;
                 }
            },{
                name: "actions",
                label: "actions",
                type: 'text',
                render: (value, row, i, header, props)=>{
                   return <Button color="secondary" aria-label="Edit" size="small" variant='outlined'  onClick={() => props.editAction(row)}>
                        <Edit/>
                    </Button>
                }
            }
        ]
    },
    model : [
        
        {
            name: "status",
            label: "Status",
            type: 'select',
            required: {
                "value": "",
                "message": "Status is required!"
            },
            "onItems": (value, data, field, props )=>{
                return types
            }
        },
        {
            name: "remarks",
            label: "Remarks",
            type: 'textarea'
        }
    ],
    filters : [
        {
            name: "sponsorLeaderId",
            label: "Sponsor Leader Id",
            type: 'text'
        },
        {
            name: "fullName",
            label: "Sponsor name",
            type: 'text'
        }
    ]
}

export default globalActivityMeta;