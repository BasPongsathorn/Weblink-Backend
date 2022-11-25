import { NextFunction, Response } from 'express';

const AdminMiddlewere = (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && user.Role) {
        next();
        return;
    }
    return res.sendStatus(403);
};

export default AdminMiddlewere;
