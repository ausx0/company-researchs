"use client";

import { min } from "date-fns";
import * as z from "zod";

export const StepOneOrderSchema = z.object({
  Date: z.string().min(2).max(50),
  Type: z.coerce.number(),
  Client_id: z.coerce.number(), // patient_id: z.coerce.number().optional(),
  Notes: z.string().optional(),
  Referred: z.string().optional(),
  //   Samples: z
  //     .array(
  //       z.object({
  //         patient: z.string().optional(),
  //         sample: z.string().optional(),
  //         test: z.string().optional(),
  //         orderType: z.string().optional(),
  //       })
  //     )
  //     .optional(),
  // })
  // .refine((data) => !(data.Type === "1" && !data.Client_id), {
  //   message: "Required",
  //   path: ["patient_id"],
  // })
  // .refine((data) => !(data.Type === "2" && !data.Client_id), {
  //   message: "Required",
  //   path: ["client_id"],
});
export const StepTwoOrderSchema = z.object({
  Cost: z.string().min(1).max(50),
  Discount: z.string().min(1).max(50),
  BeforeDiscount: z.string().min(1).max(50),
  Total: z.string().min(1).max(50),
  Status: z.string().min(1).max(50),

  // Price: z.string().min(0),
});
