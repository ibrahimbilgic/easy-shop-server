const expressJwt = require("express-jwt");

// api korumak icin
function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] }, // regex ifade ile products sonrasinda ne gelirse gelsin kabul edelim dedik
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] }, // regex ifade ile categories sonrasinda ne gelirse gelsin kabul edelim dedik
      `${api}/user/login`,
      `${api}/user/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
