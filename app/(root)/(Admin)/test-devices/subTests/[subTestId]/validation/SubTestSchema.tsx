"use client";

import * as z from "zod";

export const SubTestSchema = z.object({
  Test_id: z.string().min(2).max(50),
  SubTest: z.string().min(0),
  Unit: z.string().min(0),
  Cost: z.coerce.number().min(0),
  Price: z.coerce.number().min(0),
  Reference: z.string().min(0),
  Result: z.coerce.number().min(0),
});
