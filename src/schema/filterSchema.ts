import { z } from "zod";

const KEYWORD_MIN_LENGTH = 1;
const KEYWORD_MAX_LENGTH = 20;

export const filterShema = z.object({
  searchKeyword: z.string().min(KEYWORD_MIN_LENGTH).max(KEYWORD_MAX_LENGTH),
});
