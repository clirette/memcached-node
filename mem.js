const memjs = require('memjs');
const client = memjs.Client.create('10.229.195.108:11211,10.229.194.249:11211,10.229.192.134:11211');

client.set('memfirst', 'memfirstval', { expires: 600 }, (err, val) => {
    client.get('memfirst', (err, val) => console.log(val.toString()));
});

client.set('memsecond', 'memsecondval', { expires: 600 }, (err, val) => {
    client.get('memsecond', (err, val) => console.log(val.toString()));
});

client.set('memthird', 'memthirdval', { expires: 600 }, (err, val) => {
    client.get('memthird', (err, val) => console.log(val.toString()));
});