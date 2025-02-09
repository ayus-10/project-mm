export interface IConversation {
  receiverName: string;
  receiverEmail: string;
  message: {
    messageTime: string;
    isSeen: boolean;
    lastMessage: string;
    sentBy: string;
  } | null;
}
