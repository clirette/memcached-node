const Memcached = require('memcached');
const util = require('util');
// memcached -p 11212 -d
//retries = number of times a retry will be made before reporting an issue
//fails when cannot establish connection to any server
/**
 * maxTimeout is time in ms before starting test connections to server
 * 
 * issue event: we've failed to connect and used a retry. failures is decremented and totalFailures increments
 * messages are pushed onto array as events occur
 * semi breakthrough: setting key on failover then stopping server a will actually throw in failover and read key
 * remove event: fired when we've exhausted allotted failures
 */
// const memcached = new Memcached(['10.229.195.108:11211', '10.229.194.249:11211', '10.229.192.134:11211'], {

const memcached = new Memcached(['10.229.195.108:11211', '10.229.194.249:11211'], {
  retries: 3,
  failures: 3,
  retry: 10000,
  redundancy: true,
  timeout: 1000,
  minTimeout: 3000,
  remove: true,
  failOverServers: ['10.229.192.134:11211']
});


memcached.flush((err, res) => {
  memcached.get('a', err => {
    setTimeout(() => {
      setInterval(() => {
        memcached.get('a', (err, data) => {
          // if(err) throw err;
          if (data) {
            console.log(data)
          }
          console.log(new Date().getSeconds())
        });
      }, 1000);
    }, 1000);
  });

});

memcached.on('reconnecting', details => console.log(`Server: ${details.server} Downtime: ${details.totalDownTime} Attempts: ${details.totalReconnectsAttempted} ${util.inspect(details)}`));

memcached.on('reconnect', details => {
  console.log(`reconnected at ${new Date()} ${util.inspect(details)}`);
})

memcached.on('issue', details => {
  console.log(`issue at ${new Date()} ${util.inspect(details)}`)
});

memcached.on('failure', details => {
  console.log(`failure at ${new Date()}`);
});

memcached.on('remove', details => {
  console.log(`removed at ${new Date()} ${util.inspect(details)}`);
})