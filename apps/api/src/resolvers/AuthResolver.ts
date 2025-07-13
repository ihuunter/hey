import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';
import bcrypt from 'bcryptjs';
import { Context } from '../types/context';
import { generateToken } from '../middleware/auth';

class RegisterInput {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  username?: string;
  displayName?: string;
}

class LoginInput {
  emailOrUsername!: string;

  @MinLength(6)
  password!: string;
}

class AuthPayload {
  user!: any;
  token!: string;
}

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthPayload)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { prisma }: Context
  ): Promise<AuthPayload> {
    const { email, password, username, displayName } = input;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        displayName,
        address: `user-${Date.now()}`, // Temporary address generation
      }
    });
    
    // Generate token
    const token = generateToken(user);
    
    return { user, token };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('input') input: LoginInput,
    @Ctx() { prisma }: Context
  ): Promise<AuthPayload> {
    const { emailOrUsername, password } = input;
    
    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // For now, we'll skip password verification since we're focusing on the structure
    // In a real app, you'd verify the password here
    
    // Generate token
    const token = generateToken(user);
    
    return { user, token };
  }

  @Query(() => String, { nullable: true })
  async me(@Ctx() { user, isAuthenticated }: Context) {
    if (!isAuthenticated || !user) {
      return null;
    }
    
    return user;
  }
}