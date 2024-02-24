"use client";

import * as z from "zod";

export const PatientSchema = z.object({
  Name: z.string().min(2).max(50),
  Disease: z.string().optional(),
  Phone: z.string().min(10).max(15),
  Address: z.string().min(4).max(100),
  Notes: z.string().optional(),
  Age: z.coerce.number().min(1).max(150),
  Gender: z.string().min(1),

  // Price: z.string().min(0),
});
