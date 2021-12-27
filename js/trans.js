/* 配置开始 */
const fileName = "temp.js"; //要翻译的文件名
const startIndex = 1; //从哪一行开始翻译
const endIndex = 30; //到这一行结束
const cnPath = "./";
const tempFileName = "./translation.txt"; //翻译后的内容在这里
/* 配置结束 */

const md5 = require("md5");
const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const readline = require("linebyline");
const axiosRateLimit = require("axios-rate-limit");
// const { dirname } = require("path")
const http = axiosRateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
  maxRPS: 10,
});
const transAPI = "http://api.fanyi.baidu.com/api/trans/vip/translate";
const appid = "";
const key = "";
const salt = new Date().getTime();

fs.unlinkSync(tempFileName);

let fileData = readline(path.join(cnPath, fileName));
fileData.on("line", async function (line, lineCount) {
  if (lineCount >= startIndex && lineCount <= endIndex) {
    let temp = line.split(":");
    let transText = await handleData(temp[1]);
    let newText = temp[0] + ": " + transText + "\r\n";
    fs.appendFileSync(tempFileName, newText);
    console.log(newText);
  }
});

async function handleData(r) {
  const str1 = appid + r + salt + key;
  const sign = md5(str1);
  return http
    .get(transAPI, {
      params: {
        q: r,
        appid: appid,
        salt: salt,
        from: "zh",
        to: "en",
        sign: sign,
      },
    })
    .then((res) => {
      let { trans_result } = res.data;
      if (!trans_result) return [];
      let { dst } = trans_result[0];

      return camelize(dst);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
    //word, index
    return word.toUpperCase();
  });
}
