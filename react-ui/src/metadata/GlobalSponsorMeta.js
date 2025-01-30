import { Filter, Style } from "@material-ui/icons";

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
                name: "sponsorIncome",
                label: "Sponsor Income",
                type: 'text'
            },
            {
                "name": "registeredEmail",
                "label": "Registered Email",
                "type": "email"
            },
            {
                name: "fullName",
                label: "Name of customer",
                type: 'text'
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
                name: "transactionReceipt",
                label: "Transaction receipt",
                type: 'img',
                width: '30'
            }
        ]
    },
    "model" : [
        {
          "grid": 7,
          "fields": [
            {
              "name": "sponsorLeaderId",
              "label": "Sponsor Leader",
              "type": "text",
              "grid": "12"
            },
            {
              "name": "fullName",
              "label": "Name of customer",
              "type": "text",
              "grid": "12",
              "required": {
                "value": "",
                "message": "Name is required!"
              }
            },
            {
              "name": "utrNumber",
              "label": "UTR Number",
              "grid": "12",
              "type": "text",
              "required": {
                "value": "",
                "message": "UTR Number is required!"
              }
            },
            {
                "name": "registeredEmail",
                "label": "Registered Email",
                "type": "email",
                "grid": "12",
                "required": {
                  "value": "",
                  "message": "Email is required!"
                }
              },
              {
                "name": "password",
                "label": "Password",
                "type": "password",
                "grid": "12",
                "required": {
                  "value": "",
                  "message": "Password is required!"
                }
              }
          ]
        },
        {
          "grid": 5,
          "fields": [
            {
                "name": "transactionReceiptResource",
                "label": "Transaction receipt",
                "type": "img",
                "grid": "12",
                "width": "100%",
                "height": "300"
              }
          ]
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