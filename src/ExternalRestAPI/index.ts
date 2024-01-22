import axios from 'axios';
interface Response {
   result: string;
   baseCode: string;
   conversion_rates:Map<string,number>;
}
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
    axios
        .request(options)
        .then(function ({ data }: { data: Response }) {
            console.log(data);
        })
        .catch(function (error: string) {
            console.error(error);
        });
}
getCurrencyRate();
