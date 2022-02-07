const rp = require("request-promise");

require("dotenv").config();

const uri = (size, from) =>
  `https://apis.fretron.com/shipment-view/bpartners/partners?size=${size}&from=${from}&filters={"type":[],"isPortalEnabled":[],"group":[],"city":[],"status":[],"verificationStatus":[],"_customeField":null}`;

const main = async () => {
  let [allData, result] = [[], []];
  try {
    let [size, from] = [50, 0];
    while (size === 50) {
      let data = await getNextData(size, from);
      allData = [...allData, ...data];
      size = data.length;
      from += size;
    }
    allData.forEach((val) => result.push(val.name));
    console.log(result.length);
    console.log(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};

const getNextData = async (size, from) => {
  try {
    let data = await rp({
      method: "GET",
      json: true,
      uri: uri(size, from),
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    console.log("ERROR : ", error);
    throw error;
  }
};

main();
