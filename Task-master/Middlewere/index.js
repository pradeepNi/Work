const axios = require("axios");

var token =
  "Beaer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDM3MTUwNDIsInVzZXJJZCI6IjJlZjQzODRlLWE5NGQtNGMzMS1iMTc4LWFkZGFhOTI4M2E4MCIsIm1vYmlsZU51bWJlciI6IjcwMDQ0NTU2OTkiLCJvcmdJZCI6ImVmMzAwNjgzLTkwMWItNDc3NC1iZjBlLTk1NWQ0OWU3OTZiYyIsIm5hbWUiOiJCcmlqZXNoIFNpbmdoIiwib3JnVHlwZSI6IkZMRUVUX09XTkVSIiwiaXNHb2QiOnRydWUsInBvcnRhbFR5cGUiOiJiYXNpYyJ9.pY0K2zXrNut2BLy4IOV4Rgi78A9Ln-UtFvfECco71vQ";
var allFields = [
  "shipmentNumber",
  "shipmentStages",
  "edd",
  "uuid",
  "shipmentTrackingStatus",
  "shipmentDate",
];
var url =
  "http://122.180.251.100:3002/shipment-view/shipments/v1?filters=%7B%7D" +
  JSON.stringify(allFields) +
  "&size=500";

(async function () {
  try {
    const shipments = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: token,
      },
    });
    // console.log(shipments.data);

    let result = {};
    shipments.data.map((item) => {
      if (item.shipmentTrackingStatus === null) {
        if (result["null"] !== undefined) {
          result["null"].push(item);
        } else {
          result["null"] = [];
          result["null"].push(item);
        }
      } else {
        if (result[item.shipmentTrackingStatus] !== undefined) {
          result[item.shipmentTrackingStatus].push(item);
        } else {
          result[item.shipmentTrackingStatus] = [];
          result[item.shipmentTrackingStatus].push(item);
        }
      }
    });
    console.log(result);
    // console.table(Object.keys(result));
  } catch (error) {
    console.error(error);
  }
})();
