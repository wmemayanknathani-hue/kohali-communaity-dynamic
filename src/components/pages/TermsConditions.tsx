import { PolicyPageLayout } from "../../components/PolicyLayout";
import { TERMS_DOC } from "../../data/policies";

export function TermsConditions() {
  return <PolicyPageLayout title="Terms & Conditions" doc={TERMS_DOC} />;
}