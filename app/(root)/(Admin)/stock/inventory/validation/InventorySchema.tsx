"use client";

import * as z from "zod";

export const InventorySchema = z.object({
  Name: z.string().min(1, "Enter Name"),
  Barcode: z.string().min(1, "Enter Barcode"),
  Unit: z.string().min(1, "Enter Unit"),
  PartUnit: z.string().optional(),
  Units: z.number().min(1, "Enter Units"),
  Least: z.number().min(1, "Enter Least"),
  Company: z.string().optional(),
  Supplier: z.string().optional(),
});
