"use client";

import * as z from "zod";

export const SampleSchema = z.object({
  Sample: z.string().min(2).max(50),
  // Price: z.string().min(0),
});
