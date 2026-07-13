import { IconSparkles } from "@tabler/icons-react";

/**
 * Shared alias for a Tabler icon component reference.
 * @tabler/icons-react doesn't export its `TablerIcon`/`IconProps` types, so we
 * derive the type from one of the exported icon components.
 */
export type TablerIcon = typeof IconSparkles;
