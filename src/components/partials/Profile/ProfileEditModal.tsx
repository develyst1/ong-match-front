"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  FileButton,
  Group,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCamera, IconPhoto } from "@tabler/icons-react";
import { BaseButton } from "@/components/ui/Button";
import { BaseInput } from "@/components/ui/Input";
import { BaseModal } from "@/components/ui/Modal";
import { useUpdateMe } from "@/hooks/user";
import { fileToDataUrl } from "@/lib/image";
import { ageFromDob, initials } from "@/lib/utils";
import type { User } from "@/types/app/user";

interface Props {
  me: User;
  opened: boolean;
  onClose: () => void;
}

export default function ProfileEditModal({ me, opened, onClose }: Props) {
  const updateMe = useUpdateMe();

  const [displayName, setDisplayName] = useState(me.displayName);
  const [bio, setBio] = useState(me.bio);
  const [location, setLocation] = useState(me.location);
  const [dob, setDob] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(me.avatarUrl);
  const [coverUrl, setCoverUrl] = useState(me.coverUrl ?? "");
  const [busy, setBusy] = useState(false);

  const pickAvatar = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setAvatarUrl(await fileToDataUrl(file, 512));
    setBusy(false);
  };

  const pickCover = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setCoverUrl(await fileToDataUrl(file, 1280, 0.82));
    setBusy(false);
  };

  const handleSave = () => {
    updateMe.mutate(
      {
        displayName,
        bio,
        location,
        age: dob ? ageFromDob(new Date(dob)) : me.age,
        avatarUrl,
        coverUrl,
        primaryTribeId: me.primaryTribeId,
        interestIds: me.interestIds,
        activityLevel: me.activityLevel,
      },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <BaseModal open={opened} onClose={onClose} title="แก้ไขโปรไฟล์" size="lg">
      <Stack gap="lg">
        {/* Cover + avatar preview */}
        <Box>
          <Box
            style={{
              height: 120,
              borderRadius: "var(--mantine-radius-lg)",
              background: coverUrl
                ? `center / cover no-repeat url(${coverUrl})`
                : "linear-gradient(120deg, var(--mantine-color-ong-green-3), var(--mantine-color-teal-2))",
              position: "relative",
            }}
          >
            <FileButton accept="image/*" onChange={pickCover}>
              {(props) => (
                <BaseButton
                  {...props}
                  size="xs"
                  variant="white"
                  radius="xl"
                  leftSection={<IconPhoto size={14} />}
                  style={{ position: "absolute", right: 10, bottom: 10 }}
                >
                  รูปพื้นหลัง
                </BaseButton>
              )}
            </FileButton>
          </Box>

          <Group gap="md" mt={-32} pl="md" align="flex-end">
            <Box style={{ position: "relative" }}>
              <Avatar size={80} radius="xl" color="ong-green" src={avatarUrl || null}>
                {initials(displayName || "?")}
              </Avatar>
              <FileButton accept="image/*" onChange={pickAvatar}>
                {(props) => (
                  <Box
                    {...props}
                    component="button"
                    style={{
                      position: "absolute",
                      right: -2,
                      bottom: -2,
                      width: 30,
                      height: 30,
                      borderRadius: 999,
                      border: "2px solid var(--mantine-color-body)",
                      background: "var(--mantine-color-ong-green-6)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <IconCamera size={16} />
                  </Box>
                )}
              </FileButton>
            </Box>
          </Group>
        </Box>

        <BaseInput
          label="ชื่อที่แสดง"
          value={displayName}
          onChange={(e) => setDisplayName(e.currentTarget.value)}
        />
        <Textarea
          label="คำอธิบายตัวเอง"
          placeholder="บอกหน่อยคุณเป็นคนไทป์ไหน"
          radius="lg"
          autosize
          minRows={2}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
        />
        <Group grow align="flex-start">
          <BaseInput
            label="จังหวัด"
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
          />
          <DatePickerInput
            label="วันเกิด"
            placeholder={me.age ? `อายุ ${me.age} ปี` : "เลือกวันเกิด"}
            radius="xl"
            size="md"
            valueFormat="D MMM YYYY"
            maxDate={new Date()}
            value={dob}
            onChange={setDob}
          />
        </Group>

        <Group justify="flex-end" mt="sm">
          <BaseButton variant="subtle" onClick={onClose}>
            ยกเลิก
          </BaseButton>
          <BaseButton loading={updateMe.isPending} disabled={busy} onClick={handleSave}>
            บันทึก
          </BaseButton>
        </Group>
      </Stack>
    </BaseModal>
  );
}
