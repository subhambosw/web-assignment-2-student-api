function logger(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(req.method + " " + req.url + " " + time);
  next();
}

module.exports = logger;
