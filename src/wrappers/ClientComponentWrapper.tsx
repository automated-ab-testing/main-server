"use client";

import { useEffect } from "react";
import incrementViewCount from "~/utils/user/increment-view-count";
import incrementClickCount from "~/utils/user/increment-click-count";

export default function ClientComponentWrapper({
  versionId,
  featureFlags,
  renderClient,
}: {
  versionId: string;
  featureFlags: Record<string, boolean>;
  renderClient: (props: {
    getDisplayStatus: (domId: string) => boolean;
    emitWin: () => void;
  }) => React.ReactElement;
}) {
  // Increment the view count on mount
  useEffect(() => {
    void incrementViewCount({ versionId });
  }, [versionId]);

  // Render the client
  return renderClient({
    getDisplayStatus: (domId) => featureFlags[domId] ?? false,
    emitWin: () => {
      void incrementClickCount();
    },
  });
}
