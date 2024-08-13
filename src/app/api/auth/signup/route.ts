import { UserModel } from '@/components/model/UserModel';
import connectDB from '@/components/utils/connectDB';
import { hashPassword } from '@/components/utils/helper';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, userName } = await req.json();

    if (!email || !password || !userName) {
      return NextResponse.json({ status: 400, message: 'Invalid request' });
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json({ status: 400, message: 'User already exist' });
    }

    const hassPassword = await hashPassword(password);

    const user = await UserModel.create({
      email,
      password: hassPassword,
      userName,
    });

    return NextResponse.json({
      status: 201,
      message: 'User created successfully',
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}
