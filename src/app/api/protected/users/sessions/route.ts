import prisma from '../../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

const db = prisma.session

const INTERNAL_SERVER_ERROR_RESPONSE = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })