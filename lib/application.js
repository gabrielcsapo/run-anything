module.exports = (application) => {
    application.commands['help'] = (socket) => {
        socket.write(JSON.stringify(Object.keys(application.commands)))
    }
    //  TODO: add a helper function that will emit state if the application has one
    return application;
}
