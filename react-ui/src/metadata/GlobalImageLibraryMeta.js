const types=[
    {
        id: 1,
        name: "Words",
        desc: "Words"
    },
    {
        id: 0,
        name: "Image",
        desc: "Image"
    },
    ,
    {
        id: 2,
        name: "Example",
        desc: "Example"
    }
]
const globalImageLibraryMeta = {
"table": {
    headers: [{
            name: "imageUrl",
            label: "Image",
            width: 30,
            height: 30,
            type: 'img'
        },
        {
            name: "name",
            label: "Name",
            type: 'text',
            sortable: true
        },
        {
            name: "type",
            label: "Folder",
            type: 'text',
            sortable: true
        },
        {
            name: "subCategoryId",
            "key": "subCategoryId",
            label: "Sub Category",
            type: 'text',
            sortable: true,
            "render": (value, row, header, props) => {
                if (value) {
                    let findglobalCategoryItem = props.globalCategoryItemList.find(globalCategoryItem => globalCategoryItem.id === value)
                    return findglobalCategoryItem ? findglobalCategoryItem.name : value;
                }
                return value;
            }
        },
        {
            name: "tagList",
            label: "Tags",
            type: 'text',
            sortable: true,
            "render": (tagList, row, header, props) => {
                if (tagList) {
                    return tagList.map(tag => tag.name).join(", ");;
                }
                return "";
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
        "onItems": (value, data, field, props) => {
            return [5, 7, 10, 20, 50, 100]
        }
    }
},
model: [{
        grid: 6,
        fields: [{
            name: "imageUrl",
            label: "Image",
            width: 200,
            height: 200,
            grid: 12,
            type: 'img',
            "required": {
                value: '',
                message: "Image is required!"
            },
            onchange: (value, data, field, props, setData) => {
                if (data) {
                    data['fileResource'] = value
                    setData && setData(data);
                } else {
                    data = {};
                    data['fileResource'] = value
                    setData && setData(data);
                }
            }
        }]
    },
    {
        grid: 6,
        fields: [{
                name: "name",
                label: "Name",
                type: 'text',
                "required": {
                    value: '',
                    message: "Name is required!"
                }
            },
            {
                name: "type",
                label: "Folder",
                type: 'text'
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'select',
                "required": {
                    value: '',
                    message: "Sub Category is required!"
                },
                "onItems": (value, data, field, props) => {
                    return props.globalCategoryItemList ? props.globalCategoryItemList : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img alt='Logo'
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }
        ]
    }
],

filter: [

    {
        grid: 12,
        fields: [{
                name: "name",
                label: "Name",
                type: 'text'
            },
            {
                name: "type",
                label: "Folder",
                type: 'text'
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'select',
                "onItems": (value, data, field, props) => {
                    return props.globalCategoryItemList ? props.globalCategoryItemList : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img alt='Logo'
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }
        ]
    }
]

}

export default globalImageLibraryMeta;