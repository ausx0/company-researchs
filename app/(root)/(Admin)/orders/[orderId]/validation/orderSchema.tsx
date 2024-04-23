"use client";

import { min } from "date-fns";
import * as z from "zod";

export const StepOneOrderSchema = z
  .object({
    Date: z.string().min(2).max(50),
    Type: z.string(),
    Client_id: z.coerce.number().optional(),
    Patient_id: z.coerce.number().optional(),
    Notes: z.string().optional(),
    Referred: z.string().min(3).max(50),
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
  })
  .refine((data) => !(data.Type === "1" && !data.Patient_id), {
    message: "Required",
    path: ["Patient_id"],
  })
  .refine((data) => !(data.Type === "2" && !data.Client_id), {
    message: "Required",
    path: ["Client_id"],
  });

export const OrderTestsSchema = z.object({
  Order_id: z.coerce.number().optional(),
  Patient_id: z.coerce.number().optional(),
  Total: z.coerce.number(),
  Sample_id: z.coerce.number().min(0),
  Received: z.number().min(0).max(1),
  Tests: z.object({
    Test_id: z.coerce.number().min(0),
    SubTest_id: z.array(z.coerce.number().min(0)),
  }),
});

export const StepTwoOrderSchema = z.object({
  Cost: z.string().min(1).max(50),
  Discount: z.string().min(1).max(50),
  BeforeDiscount: z.string().min(1).max(50),
  Total: z.string().min(1).max(50),
  Status: z.string().min(1).max(50),

  // Price: z.string().min(0),
});

export const OrderPaymentSchema = z.object({
  Order_id: z.coerce.number().optional(),
  Payer: z.string(),
  Bofore_discount: z.coerce.number().optional(),
  Discount: z.coerce.number().optional(),
  Total: z.coerce.number().optional(),
  Payment_status: z.coerce.number().optional(),
  Paid: z.coerce.number().optional(),
});
