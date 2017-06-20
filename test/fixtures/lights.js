module.exports = {
    name: 'lights',
    commands: ['on [id]', 'off [id]', 'list'],
    on: (socket, id) => {
        socket.write(`turned on light ${id}`);
    },
    off: (socket, id) => {
        socket.write(`turned off light ${id}`);
    },
    list: (socket) => {
        socket.write(`12356, 12357, 12341, 934123`);
    }
};
