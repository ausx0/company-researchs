"use client";

import * as z from "zod";

export const PurchaseCategoriesSchema = z.object({
  Category: z.string().min(2).max(50),
  Description: z.string().min(2).max(200),
  // Price: z.string().min(0),
});
