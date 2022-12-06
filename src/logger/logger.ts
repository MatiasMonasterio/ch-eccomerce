import log4js from "log4js";
import { LOGGER_CATEGORY } from "../config/app";

log4js.configure({
  appenders: {
    info: { type: "console" },
    warn: { type: "file", filename: "app-logs/warn.log" },
    error: { type: "file", filename: "app-logs/error.log" },
    loggerConsole: { type: "logLevelFilter", appender: "info", level: "all" },
    loggerWarning: { type: "logLevelFilter", appender: "warn", level: "warn" },
    loggerError: { type: "logLevelFilter", appender: "error", level: "error" },
  },
  categories: {
    default: { appenders: ["info"], level: "trace" },
    console: { appenders: ["info"], level: "info" },
    warn: { appenders: ["info", "warn"], level: "warn" },
    error: { appenders: ["info", "error"], level: "error" },
    all: {
      appenders: ["loggerConsole", "loggerWarning", "loggerError"],
      level: "all",
    },
  },
});

export default log4js.getLogger(LOGGER_CATEGORY);
