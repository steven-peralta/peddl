export enum ServerboundEvents {
  Login = 'login',
  Logout = 'logout',
  Like = 'like',
  Unlike = 'unlike',
  SendMessage = 'sendMessage',
}

export enum ClientboundEvents {
  Matched = 'matched',
  Unmatched = 'unmatched',
  ReceiveMessage = 'receiveMessage',
}
