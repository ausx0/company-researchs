"use client";

import * as z from "zod";

export const ExpenseSchema = z.object({
  Category: z.number(),
  Description: z.string().min(2).max(50),
  By: z.string().optional(),
  Date: z.string().min(1).max(15),
  Amount: z.coerce.number().optional(),

  // Price: z.string().min(0),
});
