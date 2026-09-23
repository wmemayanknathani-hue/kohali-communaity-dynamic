import { PolicyPageLayout } from "../../components/PolicyLayout";
import { PRIVACY_DOC } from "../../data/policies";

export function PrivacyPolicy() {
  return <PolicyPageLayout title="Privacy Policy" doc={PRIVACY_DOC} />;
}