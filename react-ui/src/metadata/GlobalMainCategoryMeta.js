const globalMainCategoryMeta = {
    "id": "",
    "table": {
         name: 'Main categories',
        "headers": [
           
            {
                "id": "name",
                "key": "name",
                "name": "name",
                "label": "Name",
                "type": "text",
                sortable: true,
                "required" : {
                    value : '',
                    message: "Title is required!"
                }
            },
            {
                "id": "color",
                "key": "color",
                "name": "color",
                "label": "Color",
                "type": "color",
                sortable: true,
                width: 50,
                height: 50,
                "required" : {
                    value : '',
                    message: "Color is required!"
                }
            },
            {
                "name": "actions",
                "label": "Actions",
                "align": "right"
            }
        ]
    },
    "model" :[
         
         {
            grid: 12,
            fields:[
                {
                    "id": "name",
                    "key": "name",
                    "name": "name",
                    "label": "Name",
                    "type": "text",
                    "grid": 6,
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
                    "grid": 6,
                    "required" : {
                        value : '',
                        message: "Color is required!"
                    }
                }
            ]
         }
    ],
    "filter" :[
         {
            grid: 12,
            fields:[
                {
                    "id": "name",
                    "key": "name",
                    "name": "name",
                    "label": "Name",
                    "type": "text",
                    "grid": 6
                },
                {
                    "id": "color",
                    "key": "color",
                    "name": "color",
                    "label": "Color",
                    "type": "text",
                    "grid": 6
                }
            ]
         }
    ]
}

export default globalMainCategoryMeta;