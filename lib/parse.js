module.exports = (applications, data, socket) => {
  const args = data.toString('utf8').trim().split(/[ ,|]+/)

  applications.forEach((application) => {
    Object.keys(application.commands).forEach((key) => {
      const command = application.commands[key];

      const check = key.split(/[ ,|]+/);
      const func = check[0];

      if(func === args[0] && check.length === args.length) {
        const paramaters = args.map((a) => a.replace('[', '').replace(']', ''));

        paramaters[0] = socket;
        command.apply(application, paramaters);
      }
    });
  });
}
