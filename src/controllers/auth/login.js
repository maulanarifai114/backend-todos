const { checkUsername } = require('../../models/users');
const { response, reject } = require('../../helpers/helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    reject(res, null, 401, 'Cannot login, some or all field is empty');
  } else {
    checkUsername(username)
      .then((result) => {
        const user = result[0];
        if (!user) {
          reject(res, null, 401, 'Your account is not registered');
        } else if (user.confirmed === 0) {
          reject(res, null, 401, 'Your account is not confirmed');
        } else {
          bcrypt.compare(password, user.password, function (err, check) {
            if (!check) {
              reject(res, null, 401, 'Password Wrong!');
            } else if (err) {
              reject(res, null, 401, { msg: 'Error bcrypt compare', err });
            } else {
              delete user.password;
              delete user.confirmed;
              delete user.created_at;
              delete user.updated_at;
              const payload = { id: user.id };
              const option = { expiresIn: '24h' };
              const secret = process.env.SECRET_KEY;
              const getToken = (err, token) => {
                user.token = token;
                if (err) {
                  reject(res, null, 401, { msg: 'Error get token', err });
                } else {
                  response(res, user, 200, null);
                }
              };
              jwt.sign(payload, secret, option, getToken);
            }
          });
        }
      })
      .catch((err) =>
        reject(res, null, 500, { msg: 'Database is error', err })
      );
  }
};
