//? MiddleWareFunctions.

//# Import the chalk npm
import chalk from "chalk";
const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const time = chalk.blue(new Date().toUTCString());
    const method = chalk.cyan(req.method);
    const url = chalk.green(`${req.protocol}://${req.get("host")}${req.originalUrl}`);

    // Pick status color dynamically
    let statusColor;
    if (res.statusCode >= 200 && res.statusCode < 300) {
      statusColor = chalk.green;
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      statusColor = chalk.yellow;
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
      statusColor = chalk.red;
    } else {
      statusColor = chalk.bgRed.white.bold; // 500+ errors stand out
    }

    const status = statusColor(res.statusCode);

    const duration = Date.now() - start;
    const durationColor = duration > 1000 ? chalk.red : chalk.gray;

    console.log(`${time} ${method} ${url} ${status} - ${durationColor(duration + "ms")}`);
  });

  next();
};

export default logger;