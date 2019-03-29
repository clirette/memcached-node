const Memcached = require('memcached');
// const memcached = new Memcached(['10.229.194.249:11211', '10.229.195.108:11211', '10.229.192.134:11211'], { idle: 10000 });
const memcached = new Memcached('localhost:11211', { idle: 10000 });

memcached.set('test', 'foo', 20, err => {
  if (err) console.log(err);
  memcached.get('test', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});

memcached.on('failure', details => {
  sys.error("Server " + details.server + "went down due to: " + details.messages.join( '' ) );
});