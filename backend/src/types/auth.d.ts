import { Request } from "express";

import { usersModel } from "@/generated/prisma/models";

export interface SessionRequest extends Request {
  session?: {
    user: null | usersModel;
  };
}
