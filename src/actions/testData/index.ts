/* 'use server'
import prisma from "~/lib/prisma";

export async function save(cell: string, row: string[]) {
    console.log(cell , row , "Data")
    await prisma.testData.deleteMany();
    await prisma.testData.create(
        {
            data: {
                value1: cell,
                value2: row,
            }
        }

    )

} */