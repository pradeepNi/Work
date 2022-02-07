/*

1. URL --> https://apis.fretron.com/shipment-view/freightunits/v2/freightunits/extended?group1=null&group1Limit=100&size=200&filters=%7B%22lineItems.status%22%3A%5B%5D%2C%22lineItems.transporterId%22%3A%5B%5D%2C%22lineItems.loadTypeId%22%3A%5B%5D%2C%22documentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22_customeField%22%3Anull%2C%22_not%22%3A%7B%22type%22%3A%5B%22Temporary%22%5D%2C%22lineItems.status%22%3A%5B%22FINALIZED%22%2C%22FINALIZATION_IN_PROGRESS%22%5D%7D%7D&soFilters=%7B%22lineItems.status%22%3A%5B%5D%2C%22secondaryStatus%22%3A%5B%5D%2C%22salesBranch%22%3A%5B%5D%2C%22customer%22%3A%5B%5D%2C%22orderDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22consignee%22%3A%5B%5D%2C%22consigner%22%3A%5B%5D%2C%22origin%22%3A%5B%5D%2C%22destination%22%3A%5B%5D%2C%22route%22%3A%5B%5D%2C%22salesOffice.zoneName%22%3A%5B%5D%2C%22salesOffice.regionName%22%3A%5B%5D%2C%22contractBranch.name%22%3A%5B%5D%2C%22_not%22%3A%7B%22lineItems.status%22%3A%5B%22CLOSED%22%5D%7D%7D
2. Token --> Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDM5NTQ3MDIsInVzZXJJZCI6ImViZTU3NTFhLWEwNWItNDZiNi05MWI0LTFjMTEyYTkwZjYzOCIsImVtYWlsIjoic3V5YXNoLmt1bWFyQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTU1NTEwNzcwMCIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IlN1eWFzaCAiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.xphxSt6K078HfFIp41a8LN-CAgVB6uNNcJAs5Nah4sE
3. Task -->
3.1 Filter all the freights which are type: "Planned"
3.2 Study about lodash and groupBy function for the same
3.2 Map items in an object like this 
{
    shipmentNumber: found on [].lineItems[0].shipment.shipmentNumber,
    shipmentDate(in Date Time format): [].lineItems[0].shipment.shipmentDate,
    transporter: [].lineItems[0].trasporter.name,
    transporterVerificationStatus: [].lineItems[0].trasporter.verificationStatus,
    expectedFreightValue: [].lineItems[0].expectedFreightINR,
    allowedLoadTypesName: [[].allowedLoadTypes.forEach(e => e.name)] inside an array,
    allowedLoadTypesCapacity: [[].allowedLoadTypes.forEach(e => e.passingCapacityMT)] inside an array
}
3.3 Post the resulting data on the below given API and show the result!
4. POST api --> https://apis.fretron.com/automate/autoapi/run/e3029ee3-4576-4555-af4d-85b22faa33e3
*/

const rp = require("request-promise");
const _ = require("lodash");
const URL =
  "https://apis.fretron.com/shipment-view/freightunits/v2/freightunits/extended?group1=null&group1Limit=100&size=200&filters=%7B%22lineItems.status%22%3A%5B%5D%2C%22lineItems.transporterId%22%3A%5B%5D%2C%22lineItems.loadTypeId%22%3A%5B%5D%2C%22documentDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22_customeField%22%3Anull%2C%22_not%22%3A%7B%22type%22%3A%5B%22Temporary%22%5D%2C%22lineItems.status%22%3A%5B%22FINALIZED%22%2C%22FINALIZATION_IN_PROGRESS%22%5D%7D%7D&soFilters=%7B%22lineItems.status%22%3A%5B%5D%2C%22secondaryStatus%22%3A%5B%5D%2C%22salesBranch%22%3A%5B%5D%2C%22customer%22%3A%5B%5D%2C%22orderDate%22%3A%7B%22from%22%3Anull%2C%22till%22%3Anull%7D%2C%22consignee%22%3A%5B%5D%2C%22consigner%22%3A%5B%5D%2C%22origin%22%3A%5B%5D%2C%22destination%22%3A%5B%5D%2C%22route%22%3A%5B%5D%2C%22salesOffice.zoneName%22%3A%5B%5D%2C%22salesOffice.regionName%22%3A%5B%5D%2C%22contractBranch.name%22%3A%5B%5D%2C%22_not%22%3A%7B%22lineItems.status%22%3A%5B%22CLOSED%22%5D%7D%7D";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDM5NTQ3MDIsInVzZXJJZCI6ImViZTU3NTFhLWEwNWItNDZiNi05MWI0LTFjMTEyYTkwZjYzOCIsImVtYWlsIjoic3V5YXNoLmt1bWFyQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTU1NTEwNzcwMCIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IlN1eWFzaCAiLCJvcmdUeXBlIjoiRkxFRVRfT1dORVIiLCJpc0dvZCI6dHJ1ZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.xphxSt6K078HfFIp41a8LN-CAgVB6uNNcJAs5Nah4sE";
const post_api =
  "https://apis.fretron.com/automate/autoapi/run/e3029ee3-4576-4555-af4d-85b22faa33e3";

const main = async () => {
  let response = await rp({
    method: "GET",
    uri: URL,
    headers: {
      Authorization: token,
    },
    json: true,
  }).catch((err) => console.error(err));

  let reqData = response.filter(({ type }) => type === "Planned");

  let reqMappedArray = getReqArray(reqData);

  const value = _.groupBy(reqMappedArray, "transporter");

  postData(value);

  // console.log(value);
};

const getReqArray = (reqData) => {
  let reqMappedArray = [];
  reqData.forEach((element) => {
    reqMappedArray.push({
      shipmentNumber:
        element.lineItems[0].shipment !== undefined
          ? element.lineItems[0].shipment.shipmentNumber
          : "",
      shipmentDate:
        element.lineItems[0].shipment !== undefined
          ? (() => {
              let date = new Date(element.lineItems[0].shipment.shipmentDate);
              let [dd, mm, yyyy, HH, MM] = [
                String(date.getDate()).padStart(2, "0"),
                String(date.getMonth() + 1).padStart(2, "0"),
                date.getFullYear(),
                String(date.getHours()).padStart(2, "0"),
                String(date.getMinutes()).padStart(2, "0"),
              ];

              return `${dd}/${mm}/${yyyy} ${HH}:${MM}`;
            })()
          : "",
      transporter:
        element.lineItems[0].trasporter !== undefined
          ? element.lineItems[0].trasporter.name
          : "",
      transporterVerificationStatus:
        element.lineItems[0].trasporter !== undefined
          ? element.lineItems[0].trasporter.verificationStatus
          : "",
      expectedFreightValue: element.lineItems[0].expectedFreightINR
        ? element.lineItems[0].expectedFreightINR
        : "",
      allowedLoadTypesName: element.allowedLoadTypes
        ? (() => {
            let res = [];
            element.allowedLoadTypes.forEach(({ name }) => res.push(name));
            return res.length ? res : "";
          })()
        : "",
      allowedLoadTypesCapacity: element.allowedLoadTypes
        ? (() => {
            let res = [];
            element.allowedLoadTypes.forEach(({ passingCapacityMT }) =>
              res.push(passingCapacityMT)
            );
            return res.length ? res : "";
          })()
        : "",
    });
  });
  return reqMappedArray;
};

const postData = async (data) => {
  const res = await rp({
    method: "POST",
    uri: post_api,
    json: true,
    body: data,
    headers: {
      Authorization: token,
    },
  });

  console.log(res);
};

main();
