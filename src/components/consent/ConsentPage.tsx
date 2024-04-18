import ComponentWrapper from "~/wrappers/ComponentWrapper";
import FirstConsentVersion from "~/components/consent/FirstConsentVersion";
import SecondConsentVersion from "~/components/consent/SecondConsentVersion";

export default function ConsentPage({
  defaultConsentClicked,
}: {
  defaultConsentClicked: boolean;
}) {
  return (
    <ComponentWrapper
      renderDefault={() => (
        <FirstConsentVersion defaultConsentClicked={defaultConsentClicked} />
      )}
      renderTest={({ getDisplayStatus }) => (
        <>
          {getDisplayStatus("first-button") && (
            <FirstConsentVersion
              defaultConsentClicked={defaultConsentClicked}
            />
          )}
          {getDisplayStatus("second-button") && (
            <SecondConsentVersion
              defaultConsentClicked={defaultConsentClicked}
            />
          )}
        </>
      )}
    />
  );
}
