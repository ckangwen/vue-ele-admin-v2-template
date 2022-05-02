const path = require("path");
const fs = require("fs");
const sirv = require("sirv");
const connect = require("connect");
const compression = require("compression");
const corsMiddleware = require("cors");
const open = require("open");
const { green, yellow, red } = require("kolorist");

const defaultHttpOptions = {
  port: 5555,
  host: "localhost",
};
const DIST_DIR = path.resolve(__dirname, "../dist");

function httpServerStart(httpServer, serverOptions) {
  if (!fs.existsSync(DIST_DIR)) {
    console.log(red("No dist directory found"));
    return;
  }
  const { port, host } = serverOptions;

  const onError = (e) => {
    if (e.code === "EADDRINUSE") {
      console.log(yellow(`Port ${port} is in use, trying another one...`));
      httpServer.listen(port + 1, host);
    } else {
      httpServer.removeListener("error", onError);
    }
  };

  httpServer.on("error", onError);

  httpServer.listen(port, host, () => {
    const url = `http://${host}:${port}`;
    console.log(green(`Preview server is running on ${url}`));
    httpServer.removeListener("error", onError);
    open(url);
  });
}

function preview() {
  const app = connect();

  // eslint-disable-next-line global-require
  const httpServer = require("http").createServer(app);
  app.use(corsMiddleware());
  app.use(compression());
  app.use(
    sirv(
      DIST_DIR,
      {
        etag: true,
        dev: true,
        single: true,
      },
    ),
  );

  httpServerStart(httpServer, defaultHttpOptions);
}

preview();
