"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  Container,
  Group,
  Loader,
  Pill,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch, IconUsersGroup, IconTargetArrow } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { LevelBadge } from "@/components/common";
import { usePeopleMatches, useTypeSearch } from "@/hooks/social";
import { initials } from "@/lib/utils";
import type { MatchingPerson, TypeSearchItem } from "@/types/api/main/social";

export default function TribesContent() {
  const router = useRouter();
  const { people } = usePeopleMatches();
  const [q, setQ] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState("");
  const { results, isFetching } = useTypeSearch(q, tags);

  const addTag = () => {
    const t = tagDraft.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagDraft("");
  };
  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Container size="md" py="lg">
      <Stack gap="lg">
        <Group gap="sm">
          <IconUsersGroup size={26} stroke={1.8} />
          <Title order={2}>หาเพื่อนไทป์เดียวกัน</Title>
        </Group>

        {/* Search: title + tags (multi) */}
        <BaseCard withBorder shadow="sm" padding="md">
          <Stack gap="sm">
            <TextInput
              placeholder="พิมพ์ชื่อไทป์ เช่น กีตาร์, วิ่ง, กาแฟ..."
              leftSection={<IconSearch size={16} />}
              radius="xl"
              value={q}
              onChange={(e) => setQ(e.currentTarget.value)}
            />
            <TextInput
              placeholder="ใส่แท็กแล้วกด Enter (ใส่ได้หลายอัน)"
              radius="xl"
              value={tagDraft}
              onChange={(e) => setTagDraft(e.currentTarget.value)}
              onKeyDown={onTagKey}
              onBlur={addTag}
            />
            {tags.length > 0 && (
              <Group gap="xs">
                {tags.map((t) => (
                  <Pill key={t} withRemoveButton onRemove={() => setTags((p) => p.filter((x) => x !== t))}>
                    {t}
                  </Pill>
                ))}
              </Group>
            )}
          </Stack>
        </BaseCard>

        {/* Top: people whose types match yours, closest level first */}
        {q === "" && tags.length === 0 && (
          <Stack gap="sm">
            <Group gap="xs">
              <IconTargetArrow size={20} stroke={1.8} color="var(--mantine-color-ong-green-6)" />
              <Text fw={700}>ไทป์ตรงคุณ · เลเวลใกล้เคียง</Text>
            </Group>
            {people.length > 0 ? (
              <Stack gap="sm">
                {people.map((p) => (
                  <PersonRow key={`${p.user_id}-${p.type_title}`} person={p} onOpen={() => router.push(`/u/${p.user_id}`)} />
                ))}
              </Stack>
            ) : (
              <Text size="sm" c="dimmed">ยังไม่มีคนตรงไทป์ — สร้างไทป์ให้มี tag ก่อนนะ</Text>
            )}
          </Stack>
        )}

        {/* Search results */}
        {(q !== "" || tags.length > 0) && (
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700}>ผลการค้นหา</Text>
              {isFetching && <Loader size="xs" color="ong-green" />}
            </Group>
            {results.length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                {results.map((r) => (
                  <TypeResultCard key={r.id} item={r} onOpen={() => router.push(`/u/${r.user_id}`)} />
                ))}
              </SimpleGrid>
            ) : (
              !isFetching && <Text size="sm" c="dimmed">ไม่พบไทป์ที่ตรง ลองคำอื่นดู</Text>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

function PersonRow({ person, onOpen }: { person: MatchingPerson; onOpen: () => void }) {
  const name = person.display_name ?? "ไม่ระบุชื่อ";
  return (
    <BaseCard withBorder shadow="none" padding="sm" onClick={onOpen} style={{ cursor: "pointer" }}>
      <Group justify="space-between" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Avatar radius="xl" color="ong-green" src={person.avatar_url || null}>{initials(name)}</Avatar>
          <Stack gap={2}>
            <Text fw={700} size="sm">{name}</Text>
            <Group gap={6}>
              <Badge variant="light" color="teal" radius="sm" size="sm">{person.type_title}</Badge>
              <LevelBadge level={person.type_level} size="sm" />
            </Group>
          </Stack>
        </Group>
        <Badge variant="light" color="ong-green" radius="sm">
          ห่าง {person.level_gap} lvl
        </Badge>
      </Group>
    </BaseCard>
  );
}

function TypeResultCard({ item, onOpen }: { item: TypeSearchItem; onOpen: () => void }) {
  const name = item.display_name ?? "ไม่ระบุชื่อ";
  return (
    <BaseCard withBorder shadow="none" padding="md" onClick={onOpen} style={{ cursor: "pointer" }}>
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} size="sm" lineClamp={1}>{item.title}</Text>
          <LevelBadge level={item.level} size="sm" />
        </Group>
        <Group gap="xs">
          <Avatar size="sm" radius="xl" color="ong-green">{initials(name)}</Avatar>
          <Text size="xs" c="dimmed">{name}</Text>
        </Group>
        {item.tags.length > 0 && (
          <Group gap={4}>
            {item.tags.slice(0, 4).map((t) => (
              <Badge key={t} size="xs" variant="dot" color="gray" radius="sm">{t}</Badge>
            ))}
          </Group>
        )}
      </Stack>
    </BaseCard>
  );
}
