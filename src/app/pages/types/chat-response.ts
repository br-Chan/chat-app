export interface ChatMessage {
  created_at: string;
  id: string;
  sender: string;
  text: string;
  users: {
    id: string;
    name: string;
  };
}
