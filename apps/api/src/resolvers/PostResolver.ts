import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Context } from '../types/context';

class CreatePostInput {
  content!: string;
  images?: string[];
  videos?: string[];
  groupId?: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [String])
  async posts(
    @Ctx() { prisma }: Context,
    @Arg('limit', { defaultValue: 20 }) limit: number,
    @Arg('cursor', { nullable: true }) cursor?: string
  ) {
    const posts = await prisma.post.findMany({
      where: cursor ? { id: { lt: cursor } } : {},
      orderBy: { createdAt: 'desc' },
      take: limit,
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
          take: 5,
        },
        bookmarks: true,
      },
    });
    
    return posts;
  }

  @Query(() => String, { nullable: true })
  async post(
    @Ctx() { prisma }: Context,
    @Arg('id') id: string
  ) {
    const post = await prisma.post.findUnique({
      where: { id },
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
            likes: {
              include: {
                user: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        bookmarks: true,
        group: true,
      },
    });
    
    return post;
  }

  @Mutation(() => String)
  async createPost(
    @Arg('input') input: CreatePostInput,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const { content, images, videos, groupId } = input;
    
    const post = await prisma.post.create({
      data: {
        content,
        images: images || [],
        videos: videos || [],
        authorId: user.id,
        groupId,
      },
      include: {
        author: true,
        likes: true,
        comments: true,
        bookmarks: true,
      },
    });
    
    return post;
  }

  @Mutation(() => Boolean)
  async likePost(
    @Arg('postId') postId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });
    
    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
      return false;
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: user.id,
          postId,
        },
      });
      return true;
    }
  }

  @Mutation(() => Boolean)
  async bookmarkPost(
    @Arg('postId') postId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });
    
    if (existingBookmark) {
      // Remove bookmark
      await prisma.bookmark.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
      return false;
    } else {
      // Add bookmark
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          postId,
        },
      });
      return true;
    }
  }

  @Query(() => [String])
  async timeline(
    @Ctx() { prisma, user, isAuthenticated }: Context,
    @Arg('limit', { defaultValue: 20 }) limit: number
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    // Get posts from followed users
    const following = await prisma.follow.findMany({
      where: { followerId: user.id },
      select: { followingId: true },
    });
    
    const followingIds = following.map(f => f.followingId);
    followingIds.push(user.id); // Include own posts
    
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: followingIds },
        published: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
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
        bookmarks: true,
      },
    });
    
    return posts;
  }

  @Query(() => [String])
  async bookmarkedPosts(
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      include: {
        post: {
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
      orderBy: { createdAt: 'desc' },
    });
    
    return bookmarks.map(b => b.post);
  }
}