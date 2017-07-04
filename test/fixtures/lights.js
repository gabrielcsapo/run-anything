module.exports = {
    name: 'lights',
    commands: {
        'on [id]': (socket, id) => {
            socket.write(`turned on light ${id}`);
        },
        'off [id]': (socket, id) => {
            socket.write(`turned off light ${id}`);
        },
        'list': (socket) => {
            socket.write(`12356, 12357, 12341, 934123`);
        }
    }
};
