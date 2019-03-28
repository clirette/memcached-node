const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211', { retry: 5000, idle: 60000, failOverServers: ['localhost:11212'] });

memcached.set('foo', 'bar', 20, err => {
  memcached.get('foo', (err, data) => console.log(data));
});

memcached.on('failure', details => {
  sys.error("Server " + details.server + "went down due to: " + details.messages.join( '' ) );
});