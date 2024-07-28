"use client";

import * as z from "zod";

export const PurchaseInfoSchema = z.object({
  Invoice_number: z.string().min(1).max(50),
  Supplier_Id: z.string().min(1).max(50),
  Date: z.string().min(1).max(50),
  Category: z.string().min(1).max(50),
  Notes: z.string().min(1).max(50),

  // Price: z.string().min(0),
});
