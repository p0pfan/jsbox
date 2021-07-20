const param = $context.query;
const {barCode, appCode} = param;
let url = `https://jisutxmcx.market.alicloudapi.com/barcode2/query?barcode=${barCode}`;

const resp = await $http.request({
     method: "GET",
     url: url,
     header: {
       "Authorization":`APPCODE ${appCode}`,
       'Content-Type': 'application/json; charset=UTF-8'
     }
   });

$intents$.finish(JSON.stringify(resp.data));