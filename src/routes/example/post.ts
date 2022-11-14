import Joi, { any } from "joi";
import express, { Response, Request } from "express";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();

// router.post("/addUser", async (req: Request, res: Response) => {
//   const schema = Joi.object({
//     FirstName: Joi.string().min(1).max(255).required(),
//     LastName: Joi.string().min(1).max(255).required(),
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
//       FirstName: body.FirstName,
//       LastName: body.LastName
//       // Role: body.Role,
//       // Remove: body.Remove
//   };
  

//   const user = await prisma.user.create({
//     data: payload
//   });

//   return res.status(201).json(user);
// });

module.exports = router;
