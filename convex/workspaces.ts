import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { generateCode } from '../src/lib/generateCode';
import { mutation, query } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const joinCode = generateCode(6);

    const workspaceId = await ctx.db.insert('workspaces', {
      name,
      userId,
      joinCode,
    });

    await ctx.db.insert('members', {
      userId,
      workspaceId,
      role: 'admin',
    });

    await ctx.db.insert('channels', {
      name: 'General',
      workspaceId,
    });

    return workspaceId;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }

    const members = await ctx.db
      .query('members')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();

    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
  },
});

export const getById = query({
  args: { id: v.id('workspaces') },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', id),
      )
      .unique();

    if (!member) {
      return null;
    }

    return await ctx.db.get(id);
  },
});

export const getPublicInfo = query({
  args: { id: v.id('workspaces') },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', id),
      )
      .unique();


    const workspace = await ctx.db.get(id);

    if (!workspace) {
      return null;
    }

    return {
      name: workspace.name,
      isMember: !!member,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id('workspaces'),
    name: v.string(),
  },
  handler: async (ctx, { id, name }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', id),
      )
      .unique();

    if (!member || member.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    await ctx.db.patch(id, { name });

    return id;
  },
});

export const remove = mutation({
  args: { id: v.id('workspaces') },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', id),
      )
      .unique();

    if (!member || member.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const [workspaceMembers] = await Promise.all([
      ctx.db
        .query('members')
        .withIndex('by_workspace_id', (q) => q.eq('workspaceId', id))
        .collect(),
    ]);

    for (const workspaceMember of workspaceMembers) {
      await ctx.db.delete(workspaceMember._id);
    }

    await ctx.db.delete(id);

    return id;
  },
});

export const newJoinCode = mutation({
  args: { workspaceId: v.id('workspaces') },
  handler: async (ctx, { workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', workspaceId),
      )
      .unique();

    if (!member || member.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const joinCode = generateCode(6);

    await ctx.db.patch(workspaceId, { joinCode });

    return workspaceId;
  },
});

export const join = mutation({
  args: {
    joinCode: v.string(),
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, { joinCode, workspaceId }) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const workspace = await ctx.db.get(workspaceId);

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    if (workspace.joinCode !== joinCode.toLowerCase()) {
      throw new Error('Invalid join code');
    }

    const existingMember = await ctx.db
      .query('members')
      .withIndex('by_user_id_and_workspace_id', (q) =>
        q.eq('userId', userId).eq('workspaceId', workspace._id),
      )
      .unique();

    if (existingMember) {
      throw new Error('Already a member');
    }

    await ctx.db.insert('members', {
      userId,
      workspaceId: workspace._id,
      role: 'member',
    });

    return workspace._id;
  },
});
