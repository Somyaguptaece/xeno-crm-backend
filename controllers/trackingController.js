const prisma =
  require("../prisma/prismaClient");

const trackOpen =
async (req,res)=>{

  try{

    const logId =
      Number(
        req.params.logId
      );

    console.log(
      `EMAIL OPENED -> ${logId}`
    );

await prisma.communicationLog.update({

  where:{
    id:logId
  },

  data:{
    status:"OPENED"
  }

});

global.io.emit(
  "campaign-update",
  {
    logId,
    status:"OPENED"
  }
);

  }
  catch(error){

    console.error(
      error.message
    );

  }

  const pixel =
    Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
      "base64"
    );

  res.set(
    "Content-Type",
    "image/gif"
  );

  res.send(pixel);

};

const trackClick =
async (req,res)=>{

  try{

    const logId =
      Number(
        req.params.logId
      );

    console.log(
      `EMAIL CLICKED -> ${logId}`
    );

  await prisma.communicationLog.update({

  where:{
    id:logId
  },

  data:{
    status:"CLICKED"
  }

});

global.io.emit(
  "campaign-update",
  {
    logId,
    status:"CLICKED"
  }
);

  }
  catch(error){

    console.error(
      error.message
    );

  }

res.redirect(
  process.env.FRONTEND_URL
);

};

module.exports = {
  trackOpen,
  trackClick
};