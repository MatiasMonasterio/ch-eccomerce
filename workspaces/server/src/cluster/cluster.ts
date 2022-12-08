import cluster from "cluster";
import os from "os";

import { MODE } from "../config/app";

const clusterInit = (callback: () => void) => {
  if (MODE === "CLUSTER" && cluster.isMaster) {
    os.cpus().forEach(() => {
      cluster.fork();
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cluster.on("exit", (_worker, _code, _signal) => cluster.fork());
    return;
  }

  callback();
};

export default clusterInit;
