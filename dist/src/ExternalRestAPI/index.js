"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function getCurrencyRate() {
    const options = {
        method: 'GET',
        url: 'https://v6.exchangerate-api.com/v6/7dd05392ee9911b244b282d8/latest/USD',
        params: { category: 'all', count: '10' },
        headers: {
            'X-RapidAPI-Key': '7dd05392ee9911b244b282d8',
            'X-RapidAPI-Host': 'v6.exchangerate-api.com',
        },
    };
    axios_1.default
        .request(options)
        .then(function ({ data }) {
        console.log(data);
    })
        .catch(function (error) {
        console.error(error);
    });
}
getCurrencyRate();
//# sourceMappingURL=index.js.map