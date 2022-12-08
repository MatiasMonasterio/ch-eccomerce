export default {
  secret: process.env.SESSION_SECRET || "",
  time: parseInt(process.env.SESSION_TIME || "10"),
};
