"use client";

import * as z from "zod";

export const ClientSchema = z.object({
  Name: z.string().min(2).max(50),
  Email: z.string().email(),
  Phone: z.string().min(10).max(15),
  Address: z.string().min(4).max(100),
  Rep: z.string().min(2).max(50),

  // Price: z.string().min(0),
});
