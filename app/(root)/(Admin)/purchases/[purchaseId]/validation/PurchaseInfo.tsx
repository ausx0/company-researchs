"use client";

import * as z from "zod";

// Schema for Creating a Purchase
export const CreatePurchaseSchema = z.object({
  Invoice_number: z.string().min(1).max(50),
  Supplier_id: z.number(),
  Note: z.string().min(1).max(255).optional(),
  Category_id: z.number(),
  Date: z.string().min(1).max(50),
});

// Schema for Finishing a Purchase
export const FinishPurchaseSchema = z.object({
  Purchase_id: z.number(),
  Total: z.number().nonnegative(),
});
// Schema for Purchase Details
export const PurchaseDetailsSchema = z.object({
  Item: z.string().min(1).max(255),
  Item_id: z.number(),
  Unit: z.string().min(1).max(50),
  Unit_id: z.coerce.number(),
  Quantity: z.coerce.number().nonnegative(),
  Cost: z.coerce.number().nonnegative(),
  Total: z.number().nonnegative(),
  TotalQuantity: z.number().nonnegative(),
  Purchase_id: z.number(),
});
