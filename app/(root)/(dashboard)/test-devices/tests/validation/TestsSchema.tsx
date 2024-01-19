"use client";

import * as z from "zod";

export const SampleSchema = z.object({
  Test: z.string().min(2).max(50),
  Sample: z.string({
    required_error: "Please select an Sample to display.",
  }),
});
