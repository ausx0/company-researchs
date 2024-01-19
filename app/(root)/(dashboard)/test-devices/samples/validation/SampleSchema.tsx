"use client";

import * as z from "zod";

export const SampleSchema = z.object({
  Name: z.string().min(2).max(50),
  Price: z.string().min(0),
});
