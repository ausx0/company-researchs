"use client";

import * as z from "zod";

export const StepOneOrderSchema = z.object({
  Date: z.string().min(2).max(50),
  Type: z.string(),
  Client_id: z.string().optional(),
  Patient_id: z.string().optional(),
  Notes: z.string().min(2).max(50),
  Samples: z
    .array(
      z.object({
        patient: z.string().optional(),
        sample: z.string().optional(),
        test: z.string().optional(),
        orderType: z.string().optional(),
      })
    )
    .optional(),
});

export const StepTwoOrderSchema = z.object({
  Cost: z.string().min(1).max(50),
  Discount: z.string().min(1).max(50),
  BeforeDiscount: z.string().min(1).max(50),
  Total: z.string().min(1).max(50),
  Status: z.string().min(1).max(50),

  // Price: z.string().min(0),
});
