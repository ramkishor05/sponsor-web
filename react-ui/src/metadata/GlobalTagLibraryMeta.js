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
const globalTaglibraryMeta = {
    "table": {
        name: 'Tag library',
        headers : [
            {
                name: "name",
                label: "Name",
                type: 'text',
                sortable: true
            },
            {
                name: "color",
                label: "Color",
                type: 'color',
                sortable: true
            },
            {
                name: "type",
                label: "Type",
                type: 'text'
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'text',
                sortable: true,
                "render":(value, row, header, props)=>{
                    if(value){
                        let globalSubCategory=props.globalSubCategoryList.find(globalSubCategory=>globalSubCategory.id==value)
                        return globalSubCategory ? globalSubCategory.name : value;
                    }
                    return value;
                }
            },
            {
                name: "imageList",
                label: "Images",
                type: 'text',
                sortable: true,
                "render": (imageList, row, header, props) => {
                    if (imageList) {
                        return imageList.map(image => <img
                            width={30}
                            height={30}
                            style={{margin: 2}}
                            title={image.title}
                            src={image.imageUrl}
                        /> );
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
            "onItems": (value, data, field, props )=>{
                return [5,7,10,20,50,100]
            }
        }
    },
    model : [
        {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "color",
            label: "Color",
            type: 'color',
            "required" : {
                value : '',
                message: "Color is required!"
            }
        },
        {
            name: "type",
            label: "Type",
            type: 'select',
            "required" : {
                value : '',
                message: "Type is required!"
            },
            "onItems": (value, data, field, props )=>{
                return types
            },
            "itemKey": "name",
            "itemVal": "desc"
        },
        {
            name: "subCategoryId",
            label: "Sub Category",
            type: 'select',
            "required" : {
                value : '',
                message: "Sub Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalSubCategoryList? props.globalSubCategoryList: []
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
        },
        {
            name: "imageList",
            label: "Images",
            type: 'select',
            multiple: true,
            "onItems": (value, data, field, props )=>{
                return props.globalImageLibraryList? props.globalImageLibraryList: []
            },
            getValue: (data,field)=>{
                return data.imageList.map(data=>data.id);
            },
            setValue:(valueList, field, data, setData, checkValidation, props)=>{
                if(valueList){
                    let globalImageLibraryList=  props.globalImageLibraryList? props.globalImageLibraryList: []
                    console.log("value==",valueList)
                    data.imageList=globalImageLibraryList.filter(image=>
                        valueList.find(item=>item===image.id)!=null);
                    setData(data);
                }
                
            },
            "onDisplay" : (data)=>{
                return <><img
                        width={30}
                        height={20}
                        src={data.imageUrl}
                        title={data.title}
                    /> {data.title} </>
            },
            "itemKey": "id",
            "itemVal": "name"
        }
    ],
    
    filter : [
        {
            name: "name",
            label: "Name",
            type: 'text'
        },
        {
            name: "color",
            label: "Color",
            type: 'text'
        },
        {
            name: "type",
            label: "Type",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return types
            },
            "itemKey": "name",
            "itemVal": "desc"
        },
        {
            name: "subCategoryId",
            label: "Sub Category",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return props.globalSubCategoryList? props.globalSubCategoryList: []
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
        }
    ]
}

export default globalTaglibraryMeta