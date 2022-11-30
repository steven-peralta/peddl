export interface ServerboundLoginPayload {
  userId: string;
  token: string;
}

export interface ClientboundMessagePayload {
  messageId: string;
  threadId: string;
  fromUserId: string;
  name: string;
  avatarSrc: string;
  content: string;
}

export interface ServerboundMessagePayload {
  messageId: string;
  threadId: string;
  toUserIds: string[];
  userId: string;
  content: string;
}

export interface ServerboundCreateThreadPayload {
  threadId: string;
  users: string[];
}

export interface ClientboundCreateThreadPayload {
  threadId: string;
  users: string[];
}

export interface ServerboundUpdateThreadPayload {
  threadId: string;
  latestMessage: string;
  users: string[];
}

export interface ClientboundUpdateThreadPayload {
  threadId: string;
  latestMessage: string;
}

export interface ServerboundDeleteThreadPayload {
  threadId: string;
  users: string[];
}

export interface ClientboundDeleteThreadPayload {
  threadId: string;
}

export interface ServerboundCreateLikePayload {
  userId: string;
  likedUserId: string;
}

export interface ServerboundDeleteLikePayload {
  userId: string;
  likedUserId: string;
}

export interface ClientboundMatchedPayload {
  userId: string;
  name: string;
}

export interface ClientboundUnmatchedPayload {
  userId: string;
}

export interface ClientboundMatchesPageMatchedPayload {
  userId: string;
  name: string;
  avatarSrc: string;
}

export interface ClientboundMatchesPageUnmatchedPayload {
  userId: string;
}
