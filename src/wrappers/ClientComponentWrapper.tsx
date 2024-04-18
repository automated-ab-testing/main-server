"use client";

import { toast } from "react-toastify";

import incrementClickCount from "~/utils/user/action/increment-click-count";

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
      await incrementClickCount().catch(() =>
        toast.error("Something went wrong!"),
      );
    },
  });
}
