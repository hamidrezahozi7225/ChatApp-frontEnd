import { UserModel } from '@/components/model/UserModel';
import connectDB from '@/components/utils/connectDB';
import { comparePassword } from '@/components/utils/helper';
import NextAuth, { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error('مشکلی در سرور رخ داده است');
        }

        if (!email || !password)
          throw new Error('لطفا اطلاعات معتبر وارد کنید');

        const user = await UserModel.findOne({ email });

        if (!user) throw new Error('کاربری با این مشخصات وجود ندارد');

        const verifyPass = await comparePassword(password, user.password);

        if (!verifyPass) {
          throw new Error('ایمیل یا رمز عبور اشتباه است');
        }

        return { email: user.email, status: '200' };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export default handler;
