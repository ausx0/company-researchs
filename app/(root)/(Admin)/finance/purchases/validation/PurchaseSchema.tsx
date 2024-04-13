"use client";

import * as z from "zod";

export const PurchaseSchema = z.object({
  Purchase: z.string().min(2).max(50),
  // Price: z.string().min(0),
});
