/* 'use client'
import { cn, parseCSV } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { csvShema } from "~/lib/shema/test"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "./ui/form"
import { useState } from "react"
import prisma from "~/lib/prisma"
import { save } from "~/actions/testData"

export default function FileForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [csvData, setCsvData] = useState<Array<Array<string>>>([[]]);
  const [error, setError] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof csvShema>>({
    resolver: zodResolver(csvShema),
    defaultValues: {
      file: [[]]
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof csvShema>) {
    const file = values.file[0];
    if (!file) {
      setError(true)
      return;
    }
    if (!file.name.endsWith('.csv')) {
      setError(true)
      return;
    }
    const data = await parseCSV(file);
    setCsvData(data)

    csvData.map(row => {
      console.log("row" +  row)
      row.map( cell =>
      {
         save(cell , row)
      }
      )
    })

  }

    // make Form field not controlled to avoid errors
    const fileRef = form.register("file");

    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input accept=".csv" type="file" placeholder="csv" {...fileRef}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload Csv
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>

        </Card>
      </div>
    )
  }
 */