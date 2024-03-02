"use client";

import * as z from "zod";

export const ExpenseSchema = z.object({
  Description: z.string().min(2).max(50),
  PaidBy: z.string().optional(),
  Date: z.string().min(1).max(15),
  Amount: z.coerce.number().min(1).max(150),

  // Price: z.string().min(0),
});
