// Mock seed data for Ong Match — lets the UI run without a backend.
// The services fall back to this data when the API call fails, so the app
// stays fully demoable. Replace by running the real backend (see .env.local).

import type { ChatMessageResponse, ChatRoomResponse } from "@/types/api/main/chat";
import type { InterestResponse } from "@/types/api/main/interest";
import type { MatchResponse } from "@/types/api/main/match";
import type { TribeResponse } from "@/types/api/main/tribe";
import type { UserResponse } from "@/types/api/main/user";

export const MOCK_TRIBES: TribeResponse[] = [
  {
    id: "t-cartoon",
    slug: "cartoon",
    name: "องค์การ์ตูน",
    nameEn: "Cartoon & Anime",
    emoji: "🎌",
    color: "grape",
    description: "สายอนิเมะ มังงะ และการ์ตูน ตื่นเต้นไปกับทุกตอน",
    memberCount: 1284,
  },
  {
    id: "t-mountain",
    slug: "mountain",
    name: "องค์เขา",
    nameEn: "Mountain & Outdoor",
    emoji: "🏔️",
    color: "teal",
    description: "สายปีนเขา เดินป่า แคมป์ปิ้ง ชอบขึ้นยอดดอยทุกฤดู",
    memberCount: 967,
  },
  {
    id: "t-cactus",
    slug: "cactus",
    name: "องค์กระบองเพชร",
    nameEn: "Cactus & Plants",
    emoji: "🌵",
    color: "green",
    description: "สายกระบองเพชร ต้นไม้ สุขกับการดูแลต้นเล็กต้นน้อย",
    memberCount: 743,
  },
  {
    id: "t-dog",
    slug: "dog",
    name: "องค์หมา",
    nameEn: "Dog Lovers",
    emoji: "🐶",
    color: "orange",
    description: "สายรักหมา พาน้องเดินเล่น แชร์เรื่องน้องหมาทุกวัน",
    memberCount: 2105,
  },
  {
    id: "t-exotic",
    slug: "exotic",
    name: "องค์เอ็กโซติก",
    nameEn: "Exotic Pets",
    emoji: "🦎",
    color: "lime",
    description: "สายสัตว์เลี้ยงแปลก งู กิ้งก่า หนูตะเภา ฯลฯ",
    memberCount: 412,
  },
  {
    id: "t-mixed",
    slug: "mixed",
    name: "องค์ผสม",
    nameEn: "Multi-Ong",
    emoji: "✨",
    color: "blue",
    description: "หลายองค์ในใจเดียว เปิดใจทุกความสนใจ",
    memberCount: 3389,
  },
];

export const MOCK_INTERESTS: InterestResponse[] = [
  { id: "i-anime-jump", tribeId: "t-cartoon", name: "Shonen", emoji: "⚔️" },
  { id: "i-anime-slice", tribeId: "t-cartoon", name: "Slice of Life", emoji: "🌸" },
  { id: "i-anime-ghibli", tribeId: "t-cartoon", name: "Studio Ghibli", emoji: "🐱" },
  { id: "i-mountain-doi", tribeId: "t-mountain", name: "ปีนดอย", emoji: "⛰️" },
  { id: "i-mountain-camp", tribeId: "t-mountain", name: "เดินป่า/แคมป์", emoji: "⛺" },
  { id: "i-mountain-sunrise", tribeId: "t-mountain", name: "ดูพระอาทิตย์ขึ้น", emoji: "🌅" },
  { id: "i-cactus-succ", tribeId: "t-cactus", name: " Succulent", emoji: "🪴" },
  { id: "i-cactus-rare", tribeId: "t-cactus", name: "พันธุ์หายาก", emoji: "💎" },
  { id: "i-dog-shiba", tribeId: "t-dog", name: "ชิบาอินุ", emoji: "🐕" },
  { id: "i-dog-golden", tribeId: "t-dog", name: "โกลเด้น", emoji: "🦮" },
  { id: "i-dog-adopt", tribeId: "t-dog", name: "รับเลี้ยง", emoji: "❤️" },
  { id: "i-exotic-reptile", tribeId: "t-exotic", name: "สัตว์เลื้อยคลาน", emoji: "🐍" },
  { id: "i-exotic-amphib", tribeId: "t-exotic", name: "สัตว์สะเทิน", emoji: "🐸" },
];

const ME: UserResponse = {
  id: "u-me",
  displayName: "คุณ",
  bio: "กำลังหาคนองค์เดียวกัน 💚",
  age: 26,
  location: "กรุงเทพมหานคร",
  avatarUrl: "",
  primaryTribeId: "t-cactus",
  interestIds: ["i-cactus-succ", "i-cactus-rare"],
  activityLevel: "HIGH",
  createdAt: "2025-01-15T00:00:00.000Z",
};

const MOCK_OTHERS: UserResponse[] = [
  {
    id: "u-1",
    displayName: "เอิร์น",
    bio: "สายกระบองเพชรหนีแดด รวบรวมพันธุ์หายากทุกตัว 🌵",
    age: 28,
    location: "กรุงเทพมหานคร",
    avatarUrl: "",
    primaryTribeId: "t-cactus",
    interestIds: ["i-cactus-succ", "i-cactus-rare"],
    activityLevel: "HIGH",
    createdAt: "2025-02-01T00:00:00.000Z",
  },
  {
    id: "u-2",
    displayName: "เพลง",
    bio: "ตื่นมาดูแสงแรกของวันที่ยอดดอย 🌅",
    age: 31,
    location: "เชียงใหม่",
    avatarUrl: "",
    primaryTribeId: "t-mountain",
    interestIds: ["i-mountain-doi", "i-mountain-sunrise", "i-mountain-camp"],
    activityLevel: "HIGH",
    createdAt: "2025-01-20T00:00:00.000Z",
  },
  {
    id: "u-3",
    displayName: "มะลิ",
    bio: "คนรักหมา พาชิบาอินุเดินเล่นทุกเย็น 🐕",
    age: 24,
    location: "กรุงเทพมหานคร",
    avatarUrl: "",
    primaryTribeId: "t-dog",
    interestIds: ["i-dog-shiba", "i-dog-adopt"],
    activityLevel: "MEDIUM",
    createdAt: "2025-03-10T00:00:00.000Z",
  },
  {
    id: "u-4",
    displayName: "ฟิล์ม",
    bio: "อนิเมะทุกซีซั่น ไม่พลาดตอนเดียว 🎌",
    age: 23,
    location: "นนทบุรี",
    avatarUrl: "",
    primaryTribeId: "t-cartoon",
    interestIds: ["i-anime-jump", "i-anime-ghibli"],
    activityLevel: "HIGH",
    createdAt: "2025-02-15T00:00:00.000Z",
  },
  {
    id: "u-5",
    displayName: "เบนซ์",
    bio: "เลี้ยงเดรัจฉานที่บ้าน งู กิ้งก่า มีหมด 🦎",
    age: 29,
    location: "กรุงเทพมหานคร",
    avatarUrl: "",
    primaryTribeId: "t-exotic",
    interestIds: ["i-exotic-reptile", "i-exotic-amphib"],
    activityLevel: "MEDIUM",
    createdAt: "2025-01-05T00:00:00.000Z",
  },
];

export const MOCK_ME: UserResponse = ME;
export const MOCK_USERS: UserResponse[] = [ME, ...MOCK_OTHERS];

export const MOCK_MATCHES: MatchResponse[] = [
  {
    id: "m-1",
    user: MOCK_OTHERS[0],
    score: 92,
    sharedTribe: MOCK_TRIBES[2],
    sharedInterests: [
      MOCK_INTERESTS.find((i) => i.id === "i-cactus-succ")!,
      MOCK_INTERESTS.find((i) => i.id === "i-cactus-rare")!,
    ],
    status: "PENDING",
    createdAt: "2025-07-12T09:00:00.000Z",
  },
  {
    id: "m-2",
    user: MOCK_OTHERS[1],
    score: 58,
    sharedTribe: MOCK_TRIBES[1],
    sharedInterests: [MOCK_INTERESTS.find((i) => i.id === "i-mountain-sunrise")!],
    status: "PENDING",
    createdAt: "2025-07-11T14:30:00.000Z",
  },
  {
    id: "m-3",
    user: MOCK_OTHERS[3],
    score: 44,
    sharedTribe: MOCK_TRIBES[0],
    sharedInterests: [],
    status: "PENDING",
    createdAt: "2025-07-10T18:20:00.000Z",
  },
  {
    id: "m-4",
    user: MOCK_OTHERS[2],
    score: 71,
    sharedTribe: MOCK_TRIBES[3],
    sharedInterests: [MOCK_INTERESTS.find((i) => i.id === "i-dog-adopt")!],
    status: "PENDING",
    createdAt: "2025-07-09T11:05:00.000Z",
  },
];

export const MOCK_CHAT_ROOMS: ChatRoomResponse[] = [
  {
    id: "r-cactus",
    type: "GROUP",
    tribeId: "t-cactus",
    name: "🌵 องค์รูมกระบองเพชร",
    avatarUrl: "",
    lastMessage: "ใครมีพันธุ์ Echinopsis บ้างคะ",
    lastMessageAt: "2025-07-14T08:30:00.000Z",
    unreadCount: 5,
    participantsCount: 743,
  },
  {
    id: "r-mountain",
    type: "GROUP",
    tribeId: "t-mountain",
    name: "🏔️ องค์รูมขึ้นเขา",
    avatarUrl: "",
    lastMessage: "สัปดาห์หน้าไปดอยหลวงเชียงดาวกันมั้ย",
    lastMessageAt: "2025-07-13T22:10:00.000Z",
    unreadCount: 0,
    participantsCount: 967,
  },
  {
    id: "r-u1",
    type: "PRIVATE",
    name: "เอิร์น",
    avatarUrl: "",
    lastMessage: "อ๊อก! ตรงองค์กันจริง 😄",
    lastMessageAt: "2025-07-14T10:00:00.000Z",
    unreadCount: 1,
    participantsCount: 2,
  },
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessageResponse[]> = {
  "r-cactus": [
    {
      id: "msg-1",
      roomId: "r-cactus",
      senderId: "u-1",
      senderName: "เอิร์น",
      content: "สวัสดีค่าชาวองค์กระบองเพชร 🌵",
      createdAt: "2025-07-14T08:00:00.000Z",
      isMine: false,
    },
    {
      id: "msg-2",
      roomId: "r-cactus",
      senderId: "u-me",
      senderName: "คุณ",
      content: "หวัดดีจ้า! ทุกคนเลี้ยงอะไรกันบ้าง",
      createdAt: "2025-07-14T08:15:00.000Z",
      isMine: true,
    },
    {
      id: "msg-3",
      roomId: "r-cactus",
      senderId: "u-1",
      senderName: "เอิร์น",
      content: "ใครมีพันธุ์ Echinopsis บ้างคะ",
      createdAt: "2025-07-14T08:30:00.000Z",
      isMine: false,
    },
  ],
  "r-u1": [
    {
      id: "pm-1",
      roomId: "r-u1",
      senderId: "u-1",
      senderName: "เอิร์น",
      content: "เห็นโปรไฟล์แล้ว เราองค์เดียวกันเลยนะ 🌵",
      createdAt: "2025-07-14T09:30:00.000Z",
      isMine: false,
    },
    {
      id: "pm-2",
      roomId: "r-u1",
      senderId: "u-me",
      senderName: "คุณ",
      content: "จริงดิ! 92% เลย อ๊อก! ตรงองค์กัน 😄",
      createdAt: "2025-07-14T09:45:00.000Z",
      isMine: true,
    },
    {
      id: "pm-3",
      roomId: "r-u1",
      senderId: "u-1",
      senderName: "เอิร์น",
      content: "อ๊อก! ตรงองค์กันจริง 😄",
      createdAt: "2025-07-14T10:00:00.000Z",
      isMine: false,
    },
  ],
};

/** Simulate network latency for mock calls. */
export function mockDelay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
