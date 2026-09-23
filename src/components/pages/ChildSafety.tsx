import { PolicyPageLayout } from "../../components/PolicyLayout";
import { CHILD_SAFETY_DOC } from "../../data/policies";

export function ChildSafety() {
  return <PolicyPageLayout title="Child Safety Standards" doc={CHILD_SAFETY_DOC} />;
}