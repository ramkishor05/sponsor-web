const globalSubCategoryMeta = {
    table: {
        name: 'Sub categories',
        headers : [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Image",
                type:'img',
                grid: 2,
                width: 30,
                height: 30,
                container: 'sub_category_logo'
            },
            {
                name: "name",
                label: "Name",
                type: 'text',
                sortable: true,
                "required" : {
                    value : '',
                    message: "Name is required!"
                }
            },
            {
                "id": "color",
                "key": "color",
                "name": "color",
                "label": "Color",
                "type": "color",
                sortable: true,
                "required" : {
                    value : '',
                    message: "Color is required!"
                }
            },
            {
                name: "mainCategoryId",
                "key": "mainCategoryId",
                label: "Main Category",
                type: 'text',
                sortable: true,
                "required" : {
                    value : '',
                    message: "Main category is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let findglobalCategoryGroup=props.globalCategoryGroupList.find(globalCategoryGroup=>globalCategoryGroup.id==value)
                        return findglobalCategoryGroup ? findglobalCategoryGroup.name : value;
                    }
                    return value;
                }
            },
            {
                name: "actions",
                label: "Actions",
                "align": "right"
            }
        ]
    },
    model : [
        {
            grid: 6,
            fields:[{
            name: "logoUrl",
            key: "logoUrl",
            label: "Image",
            type:'img',
            grid: 12,
            width: 200,
            height: 200,
            container: 'sub_category',
            onchange: (file, data, field, props, setData)=>{
                if(data){
                    data['content']=file;
                    setData && setData(data);
                }
                else{
                    data={};
                    data['content']=file;
                    setData && setData(data);
                }
            }
        }
    ]}
    ,
    {
        grid: 6,
        fields:[ {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            "id": "color",
            "key": "color",
            "name": "color",
            "label": "Color",
            "type": "color",
            "required" : {
                value : '',
                message: "Color is required!"
            }
        },
        {
            name: "mainCategoryId",
            label: "Main Category",
            type: 'select',
            "required" : {
                value : '',
                message: "Main Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalCategoryGroupList? props.globalCategoryGroupList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name"
        }]
    }
    ],
    filter : [
        
    {
        grid: 12,
        fields:[ {
            name: "name",
            label: "Name",
            type: 'text'
        },
        {
            "id": "color",
            "key": "color",
            "name": "color",
            "label": "Color",
            "type": "text"
        },
        {
            name: "mainCategoryId",
            label: "Main Category",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return props.globalCategoryGroupList? props.globalCategoryGroupList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name"
        }]
    }
    ]
}

export default globalSubCategoryMeta;