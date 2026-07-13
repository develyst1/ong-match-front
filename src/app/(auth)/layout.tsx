import { Container, Stack } from "@mantine/core";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ong-landing-bg" style={{ minHeight: "100vh" }}>
      <Container size="xs" py={64}>
        <Stack align="center" justify="center" h="100%">
          {children}
        </Stack>
      </Container>
    </div>
  );
}
