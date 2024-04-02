import getFeatureFlags from "~/utils/user/get-feature-flags";

export default async function ServerComponentWrapper({
  renderDefault,
  renderTest,
}: {
  renderDefault: () => React.ReactElement;
  renderTest: (props: {
    featureFlags: Record<string, boolean>;
  }) => React.ReactElement;
}) {
  // Get the feature flags
  const featureFlags = await getFeatureFlags();

  if (Object.keys(featureFlags).length === 0) return renderDefault();

  return renderTest({ featureFlags });
}
