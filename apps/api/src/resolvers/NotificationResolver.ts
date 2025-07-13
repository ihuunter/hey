import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Context } from '../types/context';

@Resolver()
export class NotificationResolver {
  @Query(() => [String])
  async notifications(
    @Ctx() { prisma, user, isAuthenticated }: Context,
    @Arg('limit', { defaultValue: 20 }) limit: number
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    
    return notifications;
  }

  @Mutation(() => Boolean)
  async markNotificationAsRead(
    @Arg('notificationId') notificationId: string,
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });
    
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    if (notification.userId !== user.id) {
      throw new Error('Not authorized');
    }
    
    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
    
    return true;
  }

  @Mutation(() => Boolean)
  async markAllNotificationsAsRead(
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    await prisma.notification.updateMany({
      where: { 
        userId: user.id,
        read: false,
      },
      data: { read: true },
    });
    
    return true;
  }

  @Query(() => Number)
  async unreadNotificationCount(
    @Ctx() { prisma, user, isAuthenticated }: Context
  ) {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }
    
    const count = await prisma.notification.count({
      where: { 
        userId: user.id,
        read: false,
      },
    });
    
    return count;
  }

  // Helper method to create notifications (used by other resolvers)
  async createNotification(
    prisma: any,
    userId: string,
    type: string,
    title: string,
    message: string,
    entityId?: string,
    entityType?: string
  ) {
    return await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        entityId,
        entityType,
      },
    });
  }
}