const rp = require("request-promise");
const _ = require("lodash");

const uri1 =
  "https://apis.fretron.com/shipment-view/shipments/v1?filters=%7B%7D";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDM3OTY0NzEsInVzZXJJZCI6ImE0MmU1MzljLTg4ZjMtNDJjZi1hMWU3LWQxM2UwYjYwODMzZCIsImVtYWlsIjoic3lzdGVtX2ludGVncmF0aW9uQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiOTAwMDAwMDAwMCIsIm9yZ0lkIjoiMjAwMzkxNzMtMGZkMS00OGY1LWJkODEtOTliNGJmY2FhNDlhIiwibmFtZSI6IlN5c3RlbSBJbnRlZ3JhdGlvbiIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.BmJxqBNzl69JcSuxZNSX2MY2QWsaNFhS6_zOiWEXPoE";
const uri2 = (date, uid) =>
  `https://apis.fretron.com/shipment-view/shipments/v1?filters={}&from=[${date},"${uid}"]&sortBy=earliestDate`;

(async (itr) => {
  let result = [];
  try {
    let data = await rp({
      method: "GET",
      uri: uri1,
      json: true,
      headers: {
        Authorization: token,
      },
    });

    result = [...data];

    for (let i = 0; i < 3; i++) {
      const { shipmentDate: date, uuid: uid } = data[49];
      const [val] = await getData(date, uid);
      data = val;
      result = [...result, ...data];
    }

    result = _.uniq(result, "uuid");
    console.log(result.length);

    const filteredResult = filterByDate(result, 10);
    console.log(filteredResult.length);
  } catch (error) {
    console.log(error.messsage);
  }
})();

const getData = async (date, uid) => {
  try {
    let data = await rp({
      method: "GET",
      uri: uri2(date, uid),
      json: true,
      headers: {
        Authorization: token,
      },
    });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const filterByDate = (result, date) => {
  return result.filter(
    (it) => it.shipmentDate >= new Date(Date.now() - date * 24 * 60 * 60 * 1000)
  );
};

