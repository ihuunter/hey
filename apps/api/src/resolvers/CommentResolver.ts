import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Context } from '../types/context';

class CreateCommentInput {
  content!: string;
  postId!: string;
  parentId?: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [String])
  async comments(
    @Ctx() { prisma }: Context,
    @Arg('postId') postId: string,
    @Arg('limit', { defaultValue: 20 }) limit: number
  ) {
    const comments = await prisma.comment.findMany({
      where: { 
        postId,
        parentId: null // Only top-level comments
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
        replies: {
          include: {
            author: true,
            likes: {
              include: {
                user: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    
    return comments;
  }

  @Mutation(() => String)
  async createComment(
    @Arg('input') input: CreateCommentInput,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const { content, postId, parentId } = input;
    
    // Verify post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    // If parentId is provided, verify parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });
      
      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
      
      if (parentComment.postId !== postId) {
        throw new Error('Parent comment does not belong to this post');
      }
    }
    
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        postId,
        parentId,
      },
      include: {
        author: true,
        likes: true,
        replies: {
          include: {
            author: true,
            likes: true,
          },
        },
      },
    });
    
    return comment;
  }

  @Mutation(() => Boolean)
  async likeComment(
    @Arg('commentId') commentId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: user.id,
          commentId,
        },
      },
    });
    
    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId: user.id,
            commentId,
          },
        },
      });
      return false;
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: user.id,
          commentId,
        },
      });
      return true;
    }
  }

  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('commentId') commentId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    if (comment.authorId !== user.id) {
      throw new Error('Not authorized to delete this comment');
    }
    
    await prisma.comment.delete({
      where: { id: commentId },
    });
    
    return true;
  }
}