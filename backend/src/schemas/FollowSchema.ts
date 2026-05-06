import { z } from 'zod';

export const toggleFollowSchema = z.object({
    params: z.object({
        username: z.string({ message: "Username é obrigatório" })
    })
});
