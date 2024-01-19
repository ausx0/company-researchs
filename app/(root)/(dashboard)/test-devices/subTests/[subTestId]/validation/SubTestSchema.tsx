"use client";

import * as z from "zod";

export const SubTestSchema = z.object({
  Test: z.string().min(2).max(50),
  SubTest: z.string().min(0),
  Reference: z.string().min(0),
  SubTestType: z.string().min(0),
  Cost: z.number().min(0),
  SellPrice: z.number().min(0),
  ListItem: z.array(z.string()),
});
