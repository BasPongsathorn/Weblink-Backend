
import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


router.post("/adddomain" ,AuthMiddleware, AdminMiddlewere,async(req: Request, res: Response) => {

  
  const schema = Joi.object({
    DomainName: Joi.string().min(1).max(255).required(),
   

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
    DomainName: body.DomainName,
  
  
    // Role: body.Role,
    // Remove: body.Remove
  };

  
  const createDomain = await prisma.domain.create({
    data: payload,
  });

  
  return res.status(201).json(createDomain);
  
});


module.exports = router;
