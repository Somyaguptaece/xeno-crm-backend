const { Queue } = require("bullmq");

const campaignQueue = new Queue(
  "campaignQueue",
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

module.exports = campaignQueue;