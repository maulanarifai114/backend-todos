const connection = require('../configs/db');

module.exports = {
  response: (res, result, status, err) => {
    const resultPrint = {};
    resultPrint.status = 'success';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    res.status(status);
    res.json(resultPrint);
  },
  reject: (res, result, status, err) => {
    const resultPrint = {};
    resultPrint.status = 'failed';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    res.status(status);
    res.json(resultPrint);
  },
  actionQuery: (...arg) => {
    return new Promise((resolve, reject) => {
      connection.query(...arg, (error, results) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  },
};
