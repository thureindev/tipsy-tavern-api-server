var server = require('./app');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log('Server running at port ' + PORT + '...');
});
