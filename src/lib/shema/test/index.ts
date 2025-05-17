import { z } from "zod"
import { CSV_TYPE, MAX_FILE_SIZE } from "~/lib/constants";

const csvShema = z.object({
    file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => CSV_TYPE.includes(files?.[0]?.type),
      "only .csv files are accepted."
    ),
}).strict();;

export { csvShema };

export type csvShema = z.infer<typeof csvShema>;