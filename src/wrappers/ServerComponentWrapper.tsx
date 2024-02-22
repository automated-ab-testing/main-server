import getInitialData from "~/utils/user/get-initial-data";

export default async function ServerComponentWrapper({
  renderDefault,
  renderTest,
}: {
  renderDefault: () => React.ReactElement;
  renderTest: (props: {
    versionId: string;
    featureFlags: Record<string, boolean>;
  }) => React.ReactElement;
}) {
  // Get the initial data (cached on the server)
  const { versionId, featureFlags } = await getInitialData();

  // If there is no data, return the default render
  if (!versionId) return renderDefault();

  return renderTest({ versionId, featureFlags });
}
