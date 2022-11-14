// import Joi, { any } from "joi";
// import express, { Response, Request } from "express";
// import { RequestHandler } from "express";
// import { PrismaClient } from "@prisma/client";

// const router = express.Router();
// router.use(express.json());
// const prisma = new PrismaClient();

// router.post("/addweblinkcate", async (req: Request, res: Response) => {
//   const schema = Joi.object({
//     CategoryName: Joi.string().min(1).max(255).required(),
   
//   });

//   const options = {
//     abortEarly: false, // include all errors
//     allowUnknown: true, // ignore unknown props
//     stripUnknown: true, // remove unknown props
//   };

//   const { error } = schema.validate(req.body, options);

//   if (error) {
//     return res.status(422).json({
//       status: 422,
//       message: "Unprocessable Entity",
//       data: error.details,
//     });
//   }

//   const body = req.body;

//   const payload = {
//       CategoryName: body.CategoryName,
      
     
//       // Role: body.Role,
//       // Remove: body.Remove
//   };
  

//   const createWebCat = await prisma.weblinkCategories.create({
//     data: payload
//   });

//   return res.status(201).json(createWebCat);
// });

// module.exports = router;

import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


router.post("/addweblinkcate" ,async(req: Request, res: Response) => {

  
  const schema = Joi.object({
    CategoryName: Joi.string().min(1).max(255).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
      
    });
  }

  const body = req.body;


  const payload = {
    CategoryName: body.CategoryName,
  
    // Role: body.Role,
    // Remove: body.Remove
  };


  const user = await prisma.weblinkCategories.create({
    data: payload,
  });

  
  return res.status(201).json(user);
  
});


module.exports = router;
