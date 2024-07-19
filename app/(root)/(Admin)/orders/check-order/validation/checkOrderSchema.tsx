"use client";

import { min } from "date-fns";
import * as z from "zod";

export const CheckOrderSchema = z.object({
  Order_id: z.coerce.number().optional(),
  Search_type: z.string().optional(),

  // Price: z.string().min(0),
});
