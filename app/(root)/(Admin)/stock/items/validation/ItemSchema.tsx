"use client";

import * as z from "zod";

export const ItemSchema = z.object({
  Name: z.string().min(1, "Enter Name"),
  Barcode: z.string().min(1, "Enter Barcode"),
  Unit: z.string().min(1, "Enter Unit"),
  PartUnit: z.string().optional(),
  Units: z.coerce.number().min(1, "Enter Units"),
  Least: z.coerce.number().min(1, "Enter Least"),
  Company: z.string().optional(),
  Supplier: z.string().optional(),
});
