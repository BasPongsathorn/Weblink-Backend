
import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import { SendMailFAQ } from '../../utils/SendFaq';

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();

const adminEmail:any = process.env.AdminFAQ

const postFaqUser = async(req: any, res: Response) => {

  
  const schema = Joi.object({
    Name: Joi.string().min(1).max(255).required(),
    Email: Joi.string().min(1).max(255).required(),
    Message: Joi.string().min(1).max(255).required(),
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
    Name: body.Name,
    Email: body.Email,
    Message: body.Message,
    CreatedBy: req.user.Email
  
    // Role: body.Role,
    // Remove: body.Remove
  };

  
  const createfaq = await prisma.faqUser.create({
    data: payload,
  });
  if (createfaq) {
    await SendMailFAQ(payload.Message, adminEmail);
    return res.status(201).json({
      status: 201,
      message: 'We have received your question',
    })
    
          
  }


  return res.status(201).json(createfaq);
  
}

export { postFaqUser }