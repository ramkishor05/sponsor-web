
const globalSponsorsMeta = {
    "table": {
        headers : [
            {
                name: "investDate",
                label: "Date",
                type: 'text'
            },
            {
                name: "investAmount",
                label: "Invested",
                type: 'text'
            },
            {
                name: "earnedAmount",
                label: "Earned",
                type: 'text'
            },
            {
                name: "status",
                label: "Status",
                type: 'text'
            }
        ]
    },
    model : [
        {
            name: "investAmount",
            label: "Invested",
            type: 'text',
            disabled: true
        }
    ]
}

export default globalSponsorsMeta;