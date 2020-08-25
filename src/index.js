// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
var cluster = require('cluster');

const { port, env } = require("./config/vars");
const logger = require("./config/logger");
const mongoose = require("./config/mongoose");
const app = require("./config/express");

// open mongoose connection
mongoose.connect();
// listen to requests



cluster.schedulingPolicy = cluster.SCHED_RR;
if(cluster.isMaster){
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
}else{
    app.listen(port, () => logger.info(`Server started on port ${port} (${env}), Worker: ${cluster.worker.id}, Process: ${cluster.worker.process.pid}`));
}
 
cluster.on('fork', function(worker) {
    logger.info(`forked -> Worker number: ${ worker.id} start`);
});

cluster.on('exit', (worker) => {
    logger.error(`The Worker number: ${worker.id} has died`);
});


/**
 * Exports express
 * @public
 */
module.exports = app;
