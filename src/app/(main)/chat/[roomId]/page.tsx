import { ChatContent } from "@/components/partials/Chat";

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <ChatContent initialRoomId={roomId} />;
}
