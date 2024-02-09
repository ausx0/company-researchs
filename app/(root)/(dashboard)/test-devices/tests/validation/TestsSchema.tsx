"use client";

import * as z from "zod";

export const SampleSchema = z.object({
  Test: z.string().min(2).max(50),
  Sample_id: z.number(),
  OnePrice: z.boolean(),
  Price: z.string(),
});
