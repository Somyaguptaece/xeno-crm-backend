console.log(
  "WORKER FILE LOADED"
);
const axios =
  require("axios");

  const prisma =
    require("../prisma/prismaClient");

const { Worker } =
  require("bullmq");

const worker =
  new Worker(

    "campaignQueue",

    async (job) => {

      console.log(
        "Processing Job:",
        job.data
      );

const campaign =
  await prisma.campaign.findUnique({
    where: {
      id:
        job.data.campaignId,
    },
  });

  const customer =
  await prisma.customer.findUnique({

    where: {
      id:
        job.data.customerId,
    },

  });

console.log(
  "Sending Email To:",
  customer.email
);

await axios.post(
  "http://localhost:6000/channel/send",
  {

    logId:
      job.data.logId,

    customerId:
      job.data.customerId,

    campaignId:
      job.data.campaignId,

    channel:
      campaign.channel,

    customer: {

      name:
        customer.name,

      email:
        customer.email,

      phone:
        customer.phone,

    },

    campaign: {

      name:
        campaign.name,

      message:
        campaign.message,

    },

  }
);

await prisma.campaign.update({

  where: {
    id:
      job.data.campaignId,
  },

  data: {
    status: "SENT",
  },

});

      console.log(
        "Sent To Channel Service"
      );

    },

    {
      connection: {
        host: "localhost",
        port: 6379,
      },
    }

  );
worker.on(
  "completed",
  (job) => {

    console.log(
      "JOB COMPLETED",
      job.id
    );

  }
);

worker.on(
  "failed",
  (job, err) => {

    console.log(
      "JOB FAILED",
      err.message
    );

  }
);
console.log(
  "Campaign Worker Started..."
);