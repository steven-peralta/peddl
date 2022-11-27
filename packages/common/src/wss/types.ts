export interface ServerboundLoginPayload {
  userId: string;
  token: string;
}

export interface ClientboundMessagePayload {
  messageId: string;
  threadId: string;
  fromUserId: string;
  content: string;
}

export interface ServerboundMessagePayload {
  messageId: string;
  threadId: string;
  toUserIds: string[];
  userId: string;
  content: string;
}
