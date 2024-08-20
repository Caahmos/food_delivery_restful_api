import { Server } from './server';

const server = new Server().app
const port = 5000;

server.listen(port, () => {
    console.log('Server is running at port:');
    console.log('http://localhost:5000');
});
