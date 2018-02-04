# koajs-couchbase-connector
Integrate Couchbase with Koa JS to access all your buckets in your middleware 

=========

## Installation

  `npm install koajs-couchbase-connector`

## Usage

    const Koa = require('koa');
    const couchOperations = require('koajs-couchbase-connector');

    const app = new Koa();

    // COUCHBASE SETTINGS
    const couchBaseOptions = {
        connections: [
            {
                bucket: 'sample-bucket1'
            },
            {
                bucket: 'sample-bucket2'
            }
        ],
        host: "localhost",
        username: "Administrator",
        password: "mypassword"
    }

    app.use(createCouchbaseConnections(couchBaseOptions));

    app.use(async ctx => {
        ctx.couchbase['sample-bucket1'].get('key', function (err, result) {
            // ....
        });
    })


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Any contributions are most welcome.