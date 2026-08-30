import { z } from "zod";

export const nextPageSearchSchema = z.object({
    page: z.coerce.number().int().min(1).catch(1),
});

export type TNextPageSearch = z.infer<typeof nextPageSearchSchema>;
