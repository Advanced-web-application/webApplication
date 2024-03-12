"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestAPIController = void 0;
const axios_1 = __importDefault(require("axios"));
// Move the interface outside the class
// interface Response {
//   result: string;
//   baseCode: string;
//   conversion_rates: Map<string, number>;
// }
// class RestAPIController {
//   // Add the getCurrencyRate method inside the class
//   getCurrencyRate() {
//     const options = {
//       method: 'GET',
//       url: 'https://v6.exchangerate-api.com/v6/7dd05392ee9911b244b282d8/latest/USD',
//       params: { category: 'all', count: '10' },
//       headers: {
//         'X-RapidAPI-Key': '7dd05392ee9911b244b282d8',
//         'X-RapidAPI-Host': 'v6.exchangerate-api.com',
//       },
//     };
//     axios
//       .request(options)
//       .then(function ({ data }: { data: Response }) {
//         console.log(data);
//       })
//       .catch(function (error: string) {
//         console.error(error);
//       });
//   }
// }
class RestAPIController {
    // Add the getCurrencyRate method inside the class
    getCurrencyRate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                url: 'https://v6.exchangerate-api.com/v6/7dd05392ee9911b244b282d8/latest/USD',
                params: { category: 'all', count: '10' },
                headers: {
                    'X-RapidAPI-Key': '7dd05392ee9911b244b282d8',
                    'X-RapidAPI-Host': 'v6.exchangerate-api.com',
                },
            };
            try {
                const { data } = yield axios_1.default.request(options);
                console.log(data);
                res.status(200).send(data);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error fetching currency rates');
            }
        });
    }
}
exports.RestAPIController = RestAPIController;
exports.default = new RestAPIController();
//# sourceMappingURL=restAPI_controller.js.map