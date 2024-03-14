import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import { Server, IncomingMessage, ServerResponse } from "http";

let app: Express;
let server;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  server= app.listen();

});

afterAll(async () => {
  await mongoose.connection.close();
  return new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
});


describe("Rest API tests", () => {
  test("Test Get Rest API", async () => {
    const response = await request(server).get("/restAPI")
    expect(response.statusCode).toBe(200);
  });

});

// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import { Express } from "express";
// import axios from 'axios';

// jest.mock('axios');

// let app: Express;

// beforeAll(async () => {
//   app = await initApp();
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("Rest API tests", () => {
//   test("Test Get Rest API", async () => {
//     (axios.request as jest.MockedFunction<typeof axios.request>).mockResolvedValueOnce({
//       data: {
//         base_code: "USD",
//         rates: {
//           USD: 1,
//           AED: 3.6725,
//           AFN: 71.1581,
//           ALL: 95.0213,
//           AMD: 404.5419,
//           ANG: 1.79,
//           AOA: 838.2876,
//           ARS: 848.25,
//           AUD: 1.5126,
//           AWG: 1.79,
//           AZN: 1.7014,
//           BAM: 1.7898,
//           BBD: 2,
//           BDT: 109.7523,
//           BGN: 1.7899,
//           BHD: 0.376,
//           BIF: 2855.6975,
//           BMD: 1,
//           BND: 1.3305,
//           BOB: 6.9172,
//           BRL: 4.9796,
//           BSD: 1,
//           BTN: 82.7605,
//           BWP: 13.6063,
//           BYN: 3.2441,
//           BZD: 2,
//           CAD: 1.3482,
//           CDF: 2723.4985,
//           CHF: 0.8777,
//           CLP: 962.0101,
//           CNY: 7.1818,
//           COP: 3895.6568,
//           CRC: 510.6495,
//           CUP: 24,
//           CVE: 100.907,
//           CZK: 23.1616,
//           DJF: 177.721,
//           DKK: 6.8261,
//           DOP: 58.9847,
//           DZD: 134.3558,
//           EGP: 49.0738,
//           ERN: 15,
//           ETB: 56.8891,
//           EUR: 0.915,
//           FJD: 2.2461,
//           FKP: 0.7801,
//           FOK: 6.8261,
//           GBP: 0.78,
//           GEL: 2.6561,
//           GGP: 0.7801,
//           GHS: 12.9571,
//           GIP: 0.7801,
//           GMD: 65.5129,
//           GNF: 8537.9449,
//           GTQ: 7.8029,
//           GYD: 209.4348,
//           HKD: 7.8206,
//           HNL: 24.674,
//           HRK: 6.8951,
//           HTG: 132.5639,
//           HUF: 361.1704,
//           IDR: 15528.813,
//           ILS: 3.6198,
//           IMP: 0.7801,
//           INR: 82.7646,
//           IQD: 1311.128,
//           IRR: 42023.1028,
//           ISK: 136.2003,
//           JEP: 0.7801,
//           JMD: 154.9261,
//           JOD: 0.709,
//           JPY: 146.8232,
//           KES: 139.4443,
//           KGS: 89.4585,
//           KHR: 4038.4028,
//           KID: 1.5125,
//           KMF: 450.2151,
//           KRW: 1311.4325,
//           KWD: 0.3071,
//           KYD: 0.8333,
//           KZT: 450.2632,
//           LAK: 20675.6615,
//           LBP: 89500,
//           LKR: 306.8597,
//           LRD: 193.4489,
//           LSL: 18.6789,
//           LYD: 4.8168,
//           MAD: 10.0453,
//           MDL: 17.6806,
//           MGA: 4502.8767,
//           MKD: 56.4508,
//           MMK: 2099.1095,
//           MNT: 3370.2244,
//           MOP: 8.0558,
//           MRU: 39.9394,
//           MUR: 45.7133,
//           MVR: 15.4234,
//           MWK: 1693.5666,
//           MXN: 16.8021,
//           MYR: 4.6839,
//           MZN: 63.8838,
//           NAD: 18.6789,
//           NGN: 1592.172,
//           NIO: 36.7933,
//           NOK: 10.4519,
//           NPR: 132.4168,
//           NZD: 1.621,
//           OMR: 0.3845,
//           PAB: 1,
//           PEN: 3.6889,
//           PGK: 3.7651,
//           PHP: 55.3353,
//           PKR: 279.0643,
//           PLN: 3.9186,
//           PYG: 7282.4415,
//           QAR: 3.64,
//           RON: 4.5424,
//           RSD: 107.2176,
//           RUB: 90.7971,
//           RWF: 1298.1602,
//           SAR: 3.75,
//           SBD: 8.2697,
//           SCR: 13.7713,
//           SDG: 454.4184,
//           SEK: 10.2418,
//           SGD: 1.3304,
//           SHP: 0.7801,
//           SLE: 22.6643,
//           SLL: 22664.2818,
//           SOS: 571.3575,
//           SRD: 35.7608,
//           SSP: 1603.8084,
//           STN: 22.4207,
//           SYP: 12890.7986,
//           SZL: 18.6789,
//           THB: 35.4106,
//           TJS: 10.9461,
//           TMT: 3.5,
//           TND: 3.0962,
//           TOP: 2.3263,
//           TRY: 32.0268,
//           TTD: 6.7653,
//           TVD: 1.5125,
//           TWD: 31.3935,
//           TZS: 2541.4456,
//           UAH: 38.4252,
//           UGX: 3883.9521,
//           UYU: 38.8664,
//           UZS: 12555.3544,
//           VES: 36.2005,
//           VND: 24636.696,
//           VUV: 119.5606,
//           WST: 2.727,
//           XAF: 600.2869,
//           XCD: 2.7,
//           XDR: 0.7491,
//           XOF: 600.2869,
//           XPF: 109.2045,
//           YER: 250.3112,
//           ZAR: 18.6762,
//           ZMW: 24.5149,
//           ZWL: 16874.2082

//         }
//       },
//     });

//  // test("Test Get Rest API", async () => {
//     const response = await request(app).get("/restAPI");
//     expect(response.statusCode).toBe(200);
//     console.log(response.body);
//   });
// });