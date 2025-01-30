
const globalSponsorsMeta = {
    "table": {
        headers : [
            {
                name: "sponsorId",
                label: "Sponsor Id",
                type: 'text',
                sortable: true
            },
            {
                name: "levelNumber",
                label: "Level Number",
                type: 'text',
                sortable: true
            },
            {
                name: "levelIncome",
                label: "Level Income",
                type: 'text',
                sortable: true
            }
        ]
    },
    model : [
        {
            name: "fullName",
            label: "Name of customer",
            type: 'text',
            grid: '6',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "sponsorLeaderId",
            label: "Sponsor Leader",
            type: 'text',
            grid: '6',
            "required" : {
                value : '',
                message: "Sponsor Leader is required!"
            }
        },
        {
            name: "utrNumber",
            label: "UTR Number",
            grid: '6',
            type: 'text',
            "required" : {
                value : '',
                message: "UTR Number is required!"
            }
        },
        {
            name: "password",
            label: "Password",
            type: 'password',
            grid: '6',
            "required" : {
                value : '',
                message: "Password is required!"
            }
        },
        {
            name: "transactionReceiptResource",
            label: "Transaction receipt",
            type: 'img',
            grid: '6'
        },
        {
            name: "channelSubscriptionResource",
            label: "Channel Subscription",
            type: 'img',
            grid: '6'
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

export default globalSponsorsMeta;