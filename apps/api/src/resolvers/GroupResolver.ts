import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Context } from '../types/context';

class CreateGroupInput {
  name!: string;
  description?: string;
  avatar?: string;
  cover?: string;
}

@Resolver()
export class GroupResolver {
  @Query(() => [String])
  async groups(
    @Ctx() { prisma }: Context,
    @Arg('limit', { defaultValue: 20 }) limit: number
  ) {
    const groups = await prisma.group.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
        posts: {
          orderBy: { createdAt: 'desc' },
          take: 3,
          include: {
            author: true,
          },
        },
      },
    });
    
    return groups;
  }

  @Query(() => String, { nullable: true })
  async group(
    @Ctx() { prisma }: Context,
    @Arg('id') id: string
  ) {
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
        posts: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: true,
            likes: {
              include: {
                user: true,
              },
            },
            comments: {
              include: {
                author: true,
              },
              orderBy: { createdAt: 'desc' },
              take: 3,
            },
          },
        },
      },
    });
    
    return group;
  }

  @Mutation(() => String)
  async createGroup(
    @Arg('input') input: CreateGroupInput,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const { name, description, avatar, cover } = input;
    
    const group = await prisma.group.create({
      data: {
        name,
        description,
        avatar,
        cover,
        ownerId: user.id,
      },
      include: {
        owner: true,
        members: true,
      },
    });
    
    // Add creator as a member
    await prisma.groupMember.create({
      data: {
        userId: user.id,
        groupId: group.id,
        role: 'owner',
      },
    });
    
    return group;
  }

  @Mutation(() => Boolean)
  async joinGroup(
    @Arg('groupId') groupId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });
    
    if (!group) {
      throw new Error('Group not found');
    }
    
    const existingMember = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId: user.id,
          groupId,
        },
      },
    });
    
    if (existingMember) {
      // Leave group
      await prisma.groupMember.delete({
        where: {
          userId_groupId: {
            userId: user.id,
            groupId,
          },
        },
      });
      return false;
    } else {
      // Join group
      await prisma.groupMember.create({
        data: {
          userId: user.id,
          groupId,
          role: 'member',
        },
      });
      return true;
    }
  }

  @Query(() => [String])
  async myGroups(
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const memberships = await prisma.groupMember.findMany({
      where: { userId: user.id },
      include: {
        group: {
          include: {
            owner: true,
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    
    return memberships.map(m => m.group);
  }
}