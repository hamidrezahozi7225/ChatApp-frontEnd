import CredentialsProvider from 'next-auth/providers/credentials';
import { UserModel } from '@/components/model/UserModel';
import connectDB from '@/components/utils/connectDB';
import { comparePassword } from '@/components/utils/helper';
import { AuthOptions, SessionStrategy } from 'next-auth';

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' as SessionStrategy },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

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

        return { email: user.email, status: '200', id: '1' };
      },
    }),
  ],
};
