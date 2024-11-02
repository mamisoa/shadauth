import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/prisma/prisma'
import { saltAndHash } from '@/src/_actions/utils'

const registerSchema = z.object({
  username: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().max(300),
  password: z.string().min(3),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, firstname, lastname, email, password } = registerSchema.parse(body)

    // Check if email is already taken
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await saltAndHash(password)

    // Create the user
    await prisma.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}