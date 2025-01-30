
const headers = [
    {
        name: "title",
        label: "Title",
        type: 'text'
    },{
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "description",
        label: "Description",
        type: 'text'
    },
    {
        name: "typeId",
        label: "Type",
        type: 'text'
    },
    {
        name: "purchasePrice",
        label: "Purchase",
        type: 'text'
    },
    {
        name: "purchaseUnitId",
        label: "Unit",
        type: 'select',
        items: [
            
        ],
        itemKey: 'id',
        itemVal: 'name'
    },
    {
        name: "retailPrice",
        label: "Retail",
        type: 'text'
    },
    {
        name: "retailUnitId",
        label: "Unit",
        type: 'select',
        items: [
        ],
        itemKey: 'id',
        itemVal: 'name'
    },
    {
        name: "actions",
        label: "Actions"
    }
]
export default headers;