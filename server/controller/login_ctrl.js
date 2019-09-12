const sha256 = require('js-sha256');

const userPwd = sha256('pingan');
const adminPwd = sha256('baoxian');

module.exports = {
  login(req, res) {
    const pwd = req.body.pwd;
    let resultCode = 'fail';
    let userRole = null;
    if (pwd === userPwd) {
      resultCode = 'success';
      userRole = 'user';
    } else if (pwd === adminPwd) {
      resultCode = 'success';
      userRole = 'admin';
    }
    res.send({
      result_code: resultCode,
      data: {
        role: userRole,
      },
    });
  },
};
