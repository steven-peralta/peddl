export enum ServerboundEvents {
  Login = 'serverBoundLogin',
  Logout = 'serverBoundLogout',
  CreateLike = 'serverBoundCreateLike',
  DeleteLike = 'serverBoundDeleteLike',
  SendMessage = 'serverBoundSendMessage',
  CreateThread = 'serverBoundCreateThread',
  UpdateThread = 'serverBoundUpdateThread',
  DeleteThread = 'serverBoundDeleteThread',
}

export enum ClientboundEvents {
  Matched = 'clientBoundMatched',
  Unmatched = 'clientBoundUnmatched',
  MatchesPageMatched = 'clientBoundMatchesPageMatched',
  MatchesPageUnmatched = 'clientBoundMatchesPageUnmatched',
  ReceiveMessage = 'clientBoundReceiveMessage',
  CreateThread = 'clientBoundCreateThread',
  UpdateThread = 'clientBoundUpdateThread',
  DeleteThread = 'clientBoundDeleteThread',
}
