import getFeatureFlags from "~/utils/user/fetch/get-feature-flags";

export default async function ComponentWrapper({
  renderDefault,
  renderTest,
}: {
  renderDefault: () => React.ReactElement;
  renderTest: (props: {
    getDisplayStatus: (domId: string) => boolean;
  }) => React.ReactElement;
}) {
  // Get the feature flags
  const featureFlags = await getFeatureFlags();

  if (Object.keys(featureFlags).length === 0) return renderDefault();

  return renderTest({
    getDisplayStatus: (domId) => featureFlags[domId] ?? false,
  });
}
