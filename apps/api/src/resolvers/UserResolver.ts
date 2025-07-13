import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { Context } from '../types/context';

class UpdateProfileInput {
  displayName?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
  username?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [String])
  async users(@Ctx() { prisma }: Context) {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    
    return users;
  }

  @Query(() => String, { nullable: true })
  async user(
    @Ctx() { prisma }: Context,
    @Arg('address', { nullable: true }) address?: string,
    @Arg('username', { nullable: true }) username?: string
  ) {
    if (!address && !username) {
      throw new Error('Either address or username must be provided');
    }
    
    const user = await prisma.user.findFirst({
      where: address ? { address } : { username },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        followers: {
          include: {
            follower: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
    });
    
    return user;
  }

  @Mutation(() => String)
  async updateProfile(
    @Arg('input') input: UpdateProfileInput,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: input,
    });
    
    return updatedUser;
  }

  @Mutation(() => Boolean)
  async followUser(
    @Arg('userAddress') userAddress: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const targetUser = await prisma.user.findUnique({
      where: { address: userAddress },
    });
    
    if (!targetUser) {
      throw new Error('User not found');
    }
    
    if (targetUser.id === user.id) {
      throw new Error('Cannot follow yourself');
    }
    
    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: user.id,
          followingId: targetUser.id,
        },
      },
    });
    
    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: user.id,
            followingId: targetUser.id,
          },
        },
      });
      return false;
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: targetUser.id,
        },
      });
      return true;
    }
  }

  @Query(() => [String])
  async searchUsers(
    @Arg('query') query: string,
    @Ctx() { prisma }: Context
  ) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { displayName: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
    
    return users;
  }
}