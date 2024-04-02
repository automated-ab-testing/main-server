"use client";

import incrementClickCount from "~/utils/user/increment-click-count";

export default function ClientComponentWrapper({
  featureFlags,
  renderClient,
}: {
  featureFlags: Record<string, boolean>;
  renderClient: (props: {
    getDisplayStatus: (domId: string) => boolean;
    emitWin: () => Promise<void>;
  }) => React.ReactElement;
}) {
  // Render the client
  return renderClient({
    getDisplayStatus: (domId) => featureFlags[domId] ?? false,
    emitWin: async () => {
      await incrementClickCount();
    },
  });
}
