"use client";

import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconHeart, IconX } from "@tabler/icons-react";
import { BaseCard } from "@/components/ui/Card";
import { OngBadge } from "@/components/common";
import { MatchScoreRing } from "@/components/common";
import { useRespondToMatch } from "@/hooks/match";
import { initials } from "@/lib/utils";
import type { MatchSuggestion } from "@/types/app/match";
import { APP_TEXT } from "@/constant/text/common";

interface MatchCardProps {
  match: MatchSuggestion;
}

export default function MatchCard({ match }: MatchCardProps) {
  const respond = useRespondToMatch();
  const { user, sharedTribe, score, sharedInterests } = match;

  const responded = match.status !== "PENDING";

  const handleRespond = (accept: boolean) => {
    respond.mutate({ id: match.id, accept });
  };

  return (
    <BaseCard withBorder padding={0} shadow="sm" w="100%" maw={360}>
      <Stack gap={0}>
        <Group
          justify="space-between"
          align="flex-start"
          p="lg"
          style={{
            background: `linear-gradient(135deg, var(--mantine-color-${sharedTribe.color}-0), transparent)`,
          }}
        >
          <Group gap="sm">
            <Avatar
              size={56}
              radius="xl"
              color={sharedTribe.color}
              src={user.avatarUrl || null}
            >
              {initials(user.displayName)}
            </Avatar>
            <Stack gap={2}>
              <Text fw={700}>{user.displayName}</Text>
              <Text size="xs" c="dimmed">
                {user.age} ปี · {user.location}
              </Text>
            </Stack>
          </Group>
          <MatchScoreRing score={score} size={72} />
        </Group>

        <Stack gap="sm" p="lg">
          {user.bio && (
            <Text size="sm" lineClamp={2}>
              {user.bio}
            </Text>
          )}

          <Group gap={6}>
            <OngBadge tribe={sharedTribe} size="md" />
            {sharedInterests.slice(0, 2).map((interest) => (
              <Badge key={interest.id} size="sm" radius="xl" variant="light" color="gray">
                {interest.name}
              </Badge>
            ))}
          </Group>

          {!responded ? (
            <Group grow>
              <Tooltip label={APP_TEXT.button.reject}>
                <ActionIcon
                  variant="light"
                  color="red"
                  size="lg"
                  radius="xl"
                  loading={respond.isPending}
                  onClick={() => handleRespond(false)}
                  aria-label={APP_TEXT.button.reject}
                >
                  <IconX size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={APP_TEXT.button.accept}>
                <ActionIcon
                  variant="filled"
                  color="ong-green"
                  size="lg"
                  radius="xl"
                  loading={respond.isPending}
                  onClick={() => handleRespond(true)}
                  aria-label={APP_TEXT.button.accept}
                >
                  <IconHeart size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          ) : (
            <Text size="sm" c={match.status === "ACCEPTED" ? "ong-green.7" : "dimmed"} fw={600} ta="center">
              {match.status === "ACCEPTED"
                ? "อ๊อก! ตรงไทป์กัน"
                : "ยังไม่ตรงไทป์"}
            </Text>
          )}
        </Stack>
      </Stack>
    </BaseCard>
  );
}
