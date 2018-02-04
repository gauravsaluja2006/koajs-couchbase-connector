'use strict';

/**
 * Integrate Couchbase with Koa JS 
 * to access all your buckets in your middleware
 * @param {object} options
 * 
 * Example Options:
 * 
 * const couchBaseOptions = {
 *   connections: [
 *       {
 *           bucket: 'sample-bucket1'
 *       }
 *   ],
 *   host: "localhost",
 *   username: "Administrator",
 *   password: "mypassword"
 * }
 * 
 */
module.exports = createCouchbaseConnections;

var couchbase = require('couchbase');

function createCouchbaseConnections(options) {

    let connectionUrl = `couchbase://${options.host}`;
    
    var cluster = new couchbase.Cluster();
    cluster.authenticate(options.username, options.password);

    // this will contain all the bucket references
    let connections = {}

    // Will be creating the Bucket Instances once here
    options.connections.map((settings) => {
        connections[settings.bucket] = cluster.openBucket(settings.bucket);
    })

    // middleware function to attach all the opened buckets 
    // to the Request Context every time
    return async (ctx, next) => {
        ctx.couchbase = connections;
        await next();
    };
}