import { useRef, useState,useEffect } from "react";
// 
import { useNavigate } from "react-router-dom";
import logo from "../assets/kohali-logo.png";
import {
  Phone,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  MessageSquareText,
  X,
  FileText,
  ShieldAlert,
  Mail,
  Globe,
} from "lucide-react";
//  DatabaseSearch,

type RoleTab = "member" | "admin";
type AdminRole = "master" | "survey";
type MemberStep = "mobile" | "otp";
type Lang = "mr" | "en";
type PolicyKey = "terms" | "privacy" | "child";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;
// Default language is Marathi (mr). Add/adjust keys here only —
const STRINGS: Record<Lang, Record<string, string>> = {
  mr: {
    logoname: "कोहली समाज",
    welcomeBack: "आपल्या समाजामध्ये पुन्हा स्वागत आहे",
    member: "सदस्य",
    admin: "प्रशासक",
    communityMember: "समाज सदस्य",
    loginWithMobile: "आपल्या मोबाईल क्रमांकाने लॉगिन करा",
    mobileNumber: "मोबाईल क्रमांक",
    mobileError: "कृपया वैध १०-अंकी मोबाईल क्रमांक टाका",
    sendOtp: "OTP पाठवा",
    sendingOtp: "OTP पाठवत आहे",
    alsoSurveyTeam: "सर्वेक्षण टीमचा भाग आहात?",
    useAdminLogin: "प्रशासक लॉगिन वापरा",
    changeNumber: "क्रमांक बदला",
    verifyOtp: "OTP सत्यापित करा",
    enterCode: "६-अंकी कोड टाका",
    sentTo: "याकडे पाठवले",
    didntGetCode: "कोड मिळाला नाही?",
    resendIn: "पुन्हा पाठवा",
    resendOtp: "पुन्हा OTP पाठवा",
    verifyContinue: "सत्यापित करा आणि पुढे जा",
    verifying: "सत्यापित करत आहे",
    authorizedAccess: "अधिकृत प्रवेश",
    chooseAdminRole: "आपली प्रशासक भूमिका निवडा",
    masterAdmin: "मुख्य प्रशासक",
    surveyUser: "सर्वेक्षण वापरकर्ता",
    username: "वापरकर्तानाव",
    usernamePlaceholder: "आपले वापरकर्तानाव टाका",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड विसरलात?",
    loginAs: "लॉगिन करा",
    loggingIn: "लॉगिन होत आहे",
    linkNote:
      "आधीच सदस्य लॉगिनसाठी वापरलेल्या मोबाईल क्रमांकाने सर्वेक्षण वापरकर्ता म्हणून लॉगिन करत आहात? दोन्ही प्रोफाईल आपोआप जोडली जातील.",
    termsAndConditions: "अटी व शर्ती",
    privacyPolicy: "गोपनीयता धोरण",
    childSafety: "बाल सुरक्षा मानके",
    close: "बंद करा",
  },
  en: {
    logoname: "Kohali Samaj",
    welcomeBack: "Welcome back to your community",
    member: "Member",
    admin: "Admin",
    communityMember: "Community member",
    loginWithMobile: "Login with your mobile number",
    mobileNumber: "Mobile number",
    mobileError: "Enter a valid 10-digit mobile number",
    sendOtp: "Send OTP",
    sendingOtp: "Sending OTP",
    alsoSurveyTeam: "Also part of the survey team?",
    useAdminLogin: "Use Admin Login",
    changeNumber: "Change number",
    verifyOtp: "Verify OTP",
    enterCode: "Enter the 6-digit code",
    sentTo: "Sent to",
    didntGetCode: "Didn't get the code?",
    resendIn: "Resend in",
    resendOtp: "Resend OTP",
    verifyContinue: "Verify & continue",
    verifying: "Verifying",
    authorizedAccess: "Authorized access",
    chooseAdminRole: "Choose your admin role",
    masterAdmin: "Master Admin",
    surveyUser: "Survey User",
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    forgotPassword: "Forgot password?",
    loginAs: "Login as",
    loggingIn: "Logging in",
    linkNote:
      "Logging in as Survey User with a mobile number already used for Member login? Both profiles link automatically.",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    childSafety: "Child Safety Standards",
    close: "Close",
  },
};

/* ---------------------------------------------------------------------- */
/*  Policy content — structured    */
/* ---------------------------------------------------------------------- */

type PolicySection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type PolicyDoc = {
  icon: "terms" | "privacy" | "child";
  effectiveDate: string;
  appName: string;
  organization: string;
  extra?: string; 
  sections: PolicySection[];
};

const TERMS_DOC: PolicyDoc = {
  icon: "terms",
  effectiveDate: "22 Sep 2026",
  appName: "Kohali Samaj",
  organization: "Kohali Samaj Vikas Mandal, Nagpur",
  sections: [
    {
      paragraphs: [
        "Welcome to the Kohali Samaj. By downloading, accessing, or using the App, you agree to these Terms & Conditions.",
        "If you do not agree with these terms, please do not use the App.",
      ],
    },
    {
      heading: "1. Purpose of the App",
      paragraphs: [
        "Kohali Samaj is a digital community platform designed to connect community members and provide access to community information, services, events, notices, activities, business information, opportunities, and other community-related resources.",
      ],
    },
    {
      heading: "2. User Account",
      paragraphs: ["Some features may require users to create or access an account.", "Users are responsible for:"],
      bullets: [
        "Providing accurate information.",
        "Keeping their account information up to date.",
        "Keeping OTPs and login information confidential.",
        "Not allowing unauthorized persons to use their account.",
      ],
    },
    {
      paragraphs: ["Users must immediately notify the support team if they believe their account has been misused."],
    },
    {
      heading: "3. Accurate Information",
      paragraphs: [
        "Users must provide accurate and truthful information when submitting forms, family details, business information, enquiries, or other content.",
        "Users should not knowingly submit false, misleading, fraudulent, offensive, or unlawful information.",
      ],
    },
    {
      heading: "4. User-Submitted Content",
      paragraphs: [
        "Users may be allowed to submit information, photographs, videos, business details, feedback, enquiries, or other content.",
        "By submitting content, the user confirms that:",
      ],
      bullets: [
        "They have the right to submit the content.",
        "The content does not violate applicable laws.",
        "The content does not infringe another person's copyright, privacy, or other rights.",
        "The content does not contain harmful, abusive, sexually explicit, discriminatory, or illegal material.",
      ],
    },
    {
      paragraphs: [
        "We reserve the right to review, remove, restrict, or reject content that violates these Terms or applicable policies.",
      ],
    },
    {
      heading: "5. Business Promotion",
      paragraphs: [
        "Business and professional information submitted through the App is provided by users.",
        "Kohali Samaj Vikas Mandal does not necessarily verify or endorse every business, professional, product, service, claim, or listing submitted by users.",
        "Users should independently verify information before entering into any commercial transaction.",
      ],
    },
    {
      heading: "6. Community Content",
      paragraphs: [
        "Information about events, notices, activities, initiatives, achievements, photographs, videos, and other community content may be published through the App.",
        "Information may be updated, modified, or removed when required.",
      ],
    },
    {
      heading: "7. Prohibited Activities",
      paragraphs: ["Users must not:"],
      bullets: [
        "Use the App for unlawful purposes.",
        "Submit false or misleading information.",
        "Impersonate another person.",
        "Attempt to access another user's account.",
        "Upload malicious software or harmful content.",
        "Attempt to damage or disrupt the App.",
        "Use the App to harass, threaten, abuse, or exploit others.",
        "Upload content involving child sexual abuse or exploitation.",
        "Use the App for spam, fraud, or unauthorized commercial activity.",
        "Attempt to gain unauthorized access to the App, server, database, or related systems.",
      ],
    },
    {
      heading: "8. Child Safety",
      paragraphs: [
        "The safety of children and minors is important to us.",
        "The App does not permit any content or activity involving child sexual abuse or exploitation.",
        "Users must not upload, share, request, promote, or distribute child sexual abuse material or any content that sexually exploits or endangers children.",
        "Any such content or activity may be removed and may be reported to appropriate authorities where required by law.",
      ],
    },
    {
      heading: "9. Intellectual Property",
      paragraphs: [
        "The App, its design, branding, logos, software, text, graphics, and original content are protected by applicable intellectual property laws.",
        "Users may not copy, reproduce, modify, distribute, or commercially exploit App content without appropriate authorization.",
        "User-submitted content remains subject to the rights of the respective user or owner.",
      ],
    },
    {
      heading: "10. Third-Party Services and Links",
      paragraphs: [
        "The App may provide links or access to third-party websites, services, social media profiles, or platforms.",
        "We are not responsible for the content, availability, security, privacy practices, or terms of third-party services.",
        "Users should review the terms and privacy policies of third-party services before using them.",
      ],
    },
    {
      heading: "11. Availability of the App",
      paragraphs: [
        "We aim to keep the App available and functional; however, temporary interruptions may occur due to maintenance, technical issues, network problems, security incidents, or circumstances beyond our control.",
      ],
    },
    {
      heading: "12. Disclaimer",
      paragraphs: [
        "The information provided through the App is intended for general community and informational purposes.",
        "While reasonable efforts may be made to keep information accurate and current, we do not guarantee that all information will always be complete, accurate, or up to date.",
      ],
    },
    {
      heading: "13. Account Suspension or Termination",
      paragraphs: [
        "We may restrict, suspend, or terminate access to an account where there is a violation of these Terms, misuse of the App, fraudulent activity, security concerns, or where required by law.",
      ],
    },
    {
      heading: "14. Changes to These Terms",
      paragraphs: [
        "We may update these Terms & Conditions from time to time.",
        "Updated terms will be made available through the App or official website. Continued use of the App after an update may constitute acceptance of the revised terms, subject to applicable law.",
      ],
    },
    {
      heading: "15. Contact",
      paragraphs: [
        "For questions, complaints, or support:",
        "Kohali Samaj Vikas Mandal, Nagpur",
        "Email: ksvmnagpur@gmail.com",
        "Website: https://kohalisamaj.org/",
      ],
    },
    {
      paragraphs: ["By using the Kohali Samaj App, you agree to comply with these Terms & Conditions."],
    },
  ],
};

const PRIVACY_DOC: PolicyDoc = {
  icon: "privacy",
  effectiveDate: "22 Sep 2026",
  appName: "Kohali Samaj",
  organization: "Kohali Samaj Vikas Mandal, Nagpur",
  extra: "Contact Email: ksvmnagpur@gmail.com",
  sections: [
    {
      paragraphs: [
        "Kohali Samaj Vikas Mandal, Nagpur (\u201cwe\u201d, \u201cour\u201d, or \u201cus\u201d) respects your privacy and is committed to protecting the personal information of users of the Kohali Samaj mobile application (\u201cApp\u201d).",
        "This Privacy Policy explains what information we may collect, how we use it, how we protect it, and the choices available to users.",
      ],
    },
    {
      heading: "1. Information We May Collect",
      paragraphs: ["Depending on the features used by a user, the App may collect the following information:"],
    },
    {
      heading: "Account and Contact Information",
      bullets: ["Name", "Mobile number", "Email address, where provided", "Login and account information"],
    },
    {
      heading: "Family and Community Information",
      paragraphs: [
        "Where users voluntarily provide such information through the community survey or member services, the App may collect:",
      ],
      bullets: [
        "Family details",
        "Date of birth or age",
        "Address and location-related information",
        "Education and occupation details",
        "Community-related information",
        "Other information voluntarily provided through forms",
      ],
    },
    {
      heading: "Business Information",
      paragraphs: ["For users who submit business or professional information:"],
      bullets: [
        "Business/person name",
        "Business category",
        "Contact information",
        "Business address",
        "Description of services",
        "Social media or business profile links",
        "Business images or other information voluntarily submitted",
      ],
    },
    {
      heading: "Content Submitted by Users",
      paragraphs: ["Users may voluntarily provide:"],
      bullets: ["Photos", "Videos", "Documents or other media", "Enquiries", "Feedback", "Support requests", "Other information submitted through the App"],
    },
    {
      heading: "Technical Information",
      paragraphs: [
        "The App may automatically receive limited technical information required for security, performance, and functionality, such as:",
      ],
      bullets: ["Device and operating system information", "App version", "Basic diagnostic information", "Technical logs and error information"],
    },
    {
      paragraphs: ["The exact data collected depends on the features and permissions implemented in the App."],
    },
    {
      heading: "2. How We Use Information",
      paragraphs: ["Information may be used to:"],
      bullets: [
        "Create and manage user accounts.",
        "Provide secure login and authentication.",
        "Provide community services and features.",
        "Maintain member and family information submitted by users.",
        "Display community events, notices, activities, and updates.",
        "Provide business promotion and professional information.",
        "Respond to enquiries, support requests, and feedback.",
        "Improve the App and its services.",
        "Maintain security and prevent misuse.",
        "Comply with applicable legal and regulatory requirements.",
      ],
    },
    {
      paragraphs: [
        "We do not use personal information for purposes unrelated to the functionality of the App unless permitted by applicable law or with appropriate user consent.",
      ],
    },
    {
      heading: "3. Sharing of Information",
      paragraphs: [
        "We do not sell users' personal information.",
        "Information may be shared only when necessary to operate the App, provide requested services, protect users and the platform, or comply with legal requirements.",
        "This may include trusted service providers that support functions such as:",
      ],
      bullets: [
        "Authentication and OTP services",
        "Hosting and cloud infrastructure",
        "Application security",
        "Technical maintenance",
        "Notifications and communication services",
      ],
    },
    {
      paragraphs: [
        "Such providers are expected to handle information only for the purposes for which they are engaged and in accordance with applicable requirements.",
        "Information may also be disclosed when required by law, court order, government authority, or to protect the rights, safety, and security of users or the organization.",
      ],
    },
    {
      heading: "4. User-Submitted Public Information",
      paragraphs: [
        "Certain information submitted for community or business promotion may be displayed to other users or publicly within the App or related community platform.",
        "Users should only submit information that they are comfortable sharing for the selected purpose.",
      ],
    },
    {
      heading: "5. Data Security",
      paragraphs: [
        "We take reasonable technical and organizational measures to protect user information against unauthorized access, loss, misuse, alteration, or disclosure.",
        "However, no internet-based system can be guaranteed to be completely secure.",
        "Users are responsible for keeping their login credentials and OTPs confidential and should not share OTPs with anyone.",
      ],
    },
    {
      heading: "6. Data Retention",
      paragraphs: [
        "We retain information only for as long as reasonably necessary to provide the requested services, maintain legitimate records, comply with applicable legal requirements, resolve disputes, and enforce our policies.",
        "When information is no longer required, it may be deleted or securely disposed of in accordance with applicable requirements.",
      ],
    },
    {
      heading: "7. Account and Data Deletion",
      paragraphs: [
        "Users may request deletion of their account and associated personal information by contacting us through the official support/contact method provided in the App or on the associated website.",
        "Where applicable, users may also use the account deletion option provided within the App.",
        "Upon receiving a valid deletion request, we will process the request and delete applicable personal information, except where retention is required or permitted by law.",
      ],
    },
    {
      heading: "8. Children's Privacy",
      paragraphs: [
        "The Kohali Samaj App is a community platform and is not specifically designed as a children's entertainment or child-directed application.",
        "Where information relating to children or minors is provided as part of family or community information, users should provide such information only where they are legally authorized or permitted to do so.",
        "We do not knowingly use children's information for targeted advertising or unrelated purposes.",
        "Any child-related information collected through the App will be handled in accordance with applicable laws and Google Play policies.",
      ],
    },
    {
      heading: "9. Third-Party Services",
      paragraphs: [
        "The App may use third-party services for functions such as hosting, authentication, notifications, analytics, security, or communication.",
        "These services may process information according to their own privacy policies and applicable terms.",
      ],
    },
    {
      heading: "10. Changes to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes in the App, services, technology, or applicable requirements.",
        "Any updated policy will be made available through the App or the official website.",
      ],
    },
    {
      heading: "11. Contact Us",
      paragraphs: [
        "If you have questions, concerns, privacy requests, or requests regarding your personal information, please contact:",
        "Kohali Samaj Vikas Mandal, Nagpur",
        "Email: ksvmnagpur@gmail.com",
        "Website: https://kohalisamaj.org/",
      ],
    },
    {
      paragraphs: [
        "By using the Kohali Samaj App, you acknowledge that you have read and understood this Privacy Policy.",
      ],
    },
  ],
};

const CHILD_SAFETY_DOC: PolicyDoc = {
  icon: "child",
  effectiveDate: "22 Sep 2026",
  appName: "Kohali Samaj",
  organization: "Kohali Samaj Vikas Mandal, Nagpur",
  sections: [
    {
      paragraphs: [
        "Kohali Samaj Vikas Mandal, Nagpur is committed to maintaining a safe and respectful digital environment for all users, including children and minors.",
      ],
    },
    {
      heading: "1. Zero Tolerance for Child Sexual Abuse and Exploitation",
      paragraphs: ["Kohali Samaj strictly prohibits any content or activity involving:"],
      bullets: [
        "Child sexual abuse or exploitation.",
        "Child sexual abuse material (CSAM).",
        "Sexualization or exploitation of minors.",
        "Grooming or attempts to sexually exploit children.",
        "Requests for sexual images or videos involving minors.",
        "Sharing, storing, promoting, or distributing CSAM.",
        "Any other activity that places children at risk of sexual abuse or exploitation.",
      ],
    },
    {
      paragraphs: [
        "Any content or activity that violates these standards may be immediately removed and may be reported to appropriate authorities or relevant organizations where required.",
      ],
    },
    {
      heading: "2. User Reporting",
      paragraphs: [
        "Users can report content, accounts, or activities that may involve child safety concerns through the in-app support/reporting mechanism or by contacting:",
        "Child Safety Contact:",
        "Kohali Samaj Vikas Mandal, Nagpur",
        "Email: ksvmnagpur@gmail.com",
        "Reports should include enough information for us to identify and review the reported content or activity.",
      ],
    },
    {
      heading: "3. Action on Reports",
      paragraphs: ["When a child-safety report is received, we may:"],
      bullets: [
        "Review the reported content or account.",
        "Remove content that violates our policies.",
        "Restrict or suspend accounts involved in violations.",
        "Preserve relevant information where legally required.",
        "Report suspected child sexual exploitation or abuse to the appropriate authorities where required by law.",
      ],
    },
    {
      heading: "4. Protection of Children",
      paragraphs: [
        "Users must not use the Kohali Samaj App to contact, exploit, manipulate, threaten, or sexually exploit children.",
        "Users must not request or encourage children to provide inappropriate personal information, photographs, videos, or other sensitive content.",
      ],
    },
    {
      heading: "5. Family and Community Information",
      paragraphs: [
        "The App may allow authorized users to provide family or community information.",
        "Users should provide information about children or minors only when they are legally authorized or permitted to provide that information.",
        "Sensitive information about children should not be unnecessarily shared through public areas of the App.",
      ],
    },
    {
      heading: "6. Prohibited User Behavior",
      paragraphs: ["The following activities are prohibited:"],
      bullets: [
        "Sexual communication with minors.",
        "Grooming.",
        "Sexual exploitation of children.",
        "Sharing or requesting sexual content involving minors.",
        "Threatening or blackmailing minors.",
        "Encouraging minors to meet strangers for inappropriate purposes.",
        "Using the App to facilitate child exploitation or abuse.",
      ],
    },
    {
      heading: "7. Cooperation with Authorities",
      paragraphs: [
        "Kohali Samaj Vikas Mandal will cooperate with lawful requests from relevant authorities concerning suspected child abuse, exploitation, or other illegal activities.",
        "Where required by applicable law, suspected child sexual abuse or exploitation may be reported to the appropriate authorities.",
      ],
    },
    {
      heading: "8. Community Safety",
      paragraphs: [
        "All users are expected to maintain respectful behavior and help keep the platform safe.",
        "Users who become aware of content or activity that may place a child at risk should report it promptly using the available reporting mechanism.",
      ],
    },
    {
      heading: "9. Child Safety Contact",
      paragraphs: [
        "For child-safety concerns, reports, or requests related to child protection:",
        "Kohali Samaj Vikas Mandal, Nagpur",
        "Email: ksvmnagpur@gmail.com",
        "Website: https://kohalisamaj.org/",
        "This contact should be monitored regularly so that child-safety reports can be reviewed and addressed appropriately.",
      ],
    },
    {
      heading: "10. Policy Updates",
      paragraphs: [
        "These Child Safety Standards may be updated from time to time to reflect changes in applicable laws, Google Play policies, technology, and platform functionality.",
        "The latest version will be published on the official website and/or made available through the App.",
      ],
    },
  ],
};

const POLICY_DOCS: Record<PolicyKey, PolicyDoc> = {
  terms: TERMS_DOC,
  privacy: PRIVACY_DOC,
  child: CHILD_SAFETY_DOC,
};

const POLICY_TITLES: Record<PolicyKey, Record<Lang, string>> = {
  terms: { mr: "अटी व शर्ती", en: "Terms & Conditions" },
  privacy: { mr: "गोपनीयता धोरण", en: "Privacy Policy" },
  child: { mr: "बाल सुरक्षा मानके", en: "Child Safety Standards" },
};

function PolicyIcon({ kind }: { kind: PolicyDoc["icon"] }) {
  if (kind === "terms") return <FileText size={16} className="text-[var(--gold-300)]" />;
  if (kind === "privacy") return <Lock size={16} className="text-[var(--gold-300)]" />;
  return <ShieldAlert size={16} className="text-[var(--gold-300)]" />;
}

function PolicyModal({
  policyKey,
  lang,
  closeLabel,
  onClose,
}: {
  policyKey: PolicyKey;
  lang: Lang;
  closeLabel: string;
  onClose: () => void;
}) {
  const doc = POLICY_DOCS[policyKey];
  const title = POLICY_TITLES[policyKey][lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-[1px] p-0 sm:p-5"
      onClick={onClose}
    >
      <div
        className="flex w-full sm:max-w-[480px] max-h-[88vh] sm:max-h-[82vh] flex-col overflow-hidden rounded-t-[24px] sm:rounded-[20px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative shrink-0 bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[var(--gold-100)] transition-colors duration-150 hover:bg-white/20"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-2.5 pr-10">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
              <PolicyIcon kind={doc.icon} />
            </span>
            <h3 className="text-[16px] font-extrabold leading-snug text-white">{title}</h3>
          </div>

          {/* meta chips */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--gold-100)]">
              {doc.organization}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--gold-100)]">
              Effective {doc.effectiveDate}
            </span>
          </div>
        </div>

        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {doc.extra && (
            <p className="mb-4 rounded-lg bg-[var(--cream)] px-3 py-2 text-[11.5px] font-semibold text-[var(--maroon-800)]">
              {doc.extra}
            </p>
          )}

          <div className="flex flex-col gap-4">
            {doc.sections.map((section, si) => (
              <div key={si}>
                {section.heading && (
                  <h4 className="mb-1.5 text-[12.5px] font-extrabold uppercase text-[var(--maroon-800)]">
                    {section.heading}
                  </h4>
                )}

                {section.paragraphs?.map((p: string, pi: number) => (
                  <p
                    key={pi}
                    className="mb-1.5 flex items-center gap-1.5 text-[12.5px] leading-relaxed text-[var(--ink)] text-justify"
                  >
                    {p.startsWith("Email:") ? (
                      <>
                        <Mail
                          size={14}
                          className="shrink-0 text-[var(--maroon-800)]"
                        />
                        <a
                          href={`mailto:${p.replace("Email:", "").trim()}`}
                          className="text-[var(--maroon-800)] hover:underline"
                        >
                          {p.replace("Email:", "").trim()}
                        </a>
                      </>
                    ) : p.startsWith("Website:") ? (
                      <>
                        <Globe
                          size={14}
                          className="shrink-0 text-[var(--maroon-800)]"
                        />
                        <a
                          href={p.replace("Website:", "").trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--maroon-800)] hover:underline"
                        >
                          {p.replace("Website:", "").trim()}
                        </a>
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-1 flex flex-col gap-1">
                    {section.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-2 text-[12.5px] leading-relaxed text-[var(--ink)]"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-500)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          
        </div>

        {/* sticky footer */}
        <div className="shrink-0 border-t border-[var(--gold-500)]/20 bg-white px-5 py-3.5">
          <button
            onClick={onClose}
            className="kc-btn-shine w-full rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3 text-[13.5px] font-extrabold text-[var(--maroon-950)] transition-all duration-150 hover:brightness-105"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<RoleTab>("member");
  const [adminRole, setAdminRole] = useState<AdminRole>("master");

  // language — defaults to Marathi
  const [lang, setLang] = useState<Lang>("mr");
  const t = STRINGS[lang];

  // policy modal
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  // member / OTP flow
  const [memberStep, setMemberStep] = useState<MemberStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [loginError, setLoginError] = useState("");
  const [mobileloginError, setmobileLoginError] = useState("");
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // admin flow
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userId,setUserId]= useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mobileValid = /^\d{10}$/.test(mobile);
  const adminValid = username.trim().length > 0 && password.length > 0;
  const otpValid = otp.every((d) => d.length === 1);

    useEffect(() => {

      const otpStatus = localStorage.getItem("otp_status");
      const isDeviceLogin = localStorage.getItem("is_device_login");
      // alert(otpStatus)
      if (
          otpStatus === "done" &&
          isDeviceLogin === "1"
      ) {
          navigate("/home", { replace: true });
      }
  }, [navigate]);

  function startResendTimer() {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setResendIn(RESEND_SECONDS);
    resendTimerRef.current = setInterval(() => {
      setResendIn((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleSendOtp() {
    if (!mobileValid || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_PATH}/action_layer.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login_mobile",
          mobile: mobile,
        }),
      });
      const data = await res.json();
      if (data.status == true) {
        setIsLoading(false);
        setMemberStep("otp");
        startResendTimer();
        otpInputRefs.current[0]?.focus();
        localStorage.clear();
        localStorage.setItem("mobile_user", JSON.stringify(data.data));
        setUserId(data.data.id);
        localStorage.setItem("auth_settings", data.settings);
        localStorage.setItem("is_device_login", "1");
        localStorage.setItem("otp_status", "pending");
      } else {
        setIsLoading(false);
        setmobileLoginError(data.msg || "Invalid Mobile Number");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleResendOtp() {
    if (resendIn > 0 || isLoading) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    startResendTimer();
    otpInputRefs.current[0]?.focus();
  }

  function handleChangeNumber() {
    setMemberStep("mobile");
    setOtp(Array(OTP_LENGTH).fill(""));
    console.log(otp);
    setOtpError("");
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    setResendIn(0);
  }

  function handleOtpDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    setOtpError("");
    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    setOtpError("");
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpInputRefs.current[focusIndex]?.focus();
  }

 async function handleVerifyOtp() {
  if (!otpValid || isLoading) return;

  setIsLoading(true);

  const otpNew = otp.join("");

  try {
    const response = await fetch(`${API_PATH}/action_layer.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        action: "verify_otp",
        user_id: userId,
        otp: otpNew,
      }),
    });
    const result = await response.json();
    console.log("Verify OTP Response:", result);

    if (result.status === true || result.success === true) {
      localStorage.setItem("otp_status", "done");

      navigate("/home", { replace: true });
    } else {
      setOtpError(result.msg);
    }
  } catch (error) {
    console.error("Verify OTP Error:", error);
  } finally {
    setIsLoading(false);
  }
}

  const API_PATH =
    window.location.hostname === "localhost" || window.location.hostname === "192.168.1.62"
      ? import.meta.env.VITE_LOCAL_API_PATH
      : import.meta.env.VITE_LIVE_API_PATH;

  async function handleAdminLogin() {
    if (!adminValid || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_PATH}/action_layer.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          action: "login_admin_surevy",
        }),
      });
      const data = await res.json();
      if (data.status == true) {
        // localStorage.setItem("is_login", data.data.is_login);
        // localStorage.setItem("is_mobile", data.data.is_mobile);
        // localStorage.setItem("login_token", data.data.login_token);
        // localStorage.setItem("name", data.data.name);
        // localStorage.setItem("username", data.data.username);
        // localStorage.setItem("user_type", data.data.user_type);
        // localStorage.setItem("user_id", data.data.id);
        // console.log(data);
        let authUrl = "";
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "192.168.1.62"
        ) {
          authUrl = "http://192.168.1.62/webmedia/wme/kohli_community/auth-login.php";
        } else {
          authUrl = "https://wmegroup.in/wmeclient/kohali_connect/auth-login.php";
        }
        window.location.href =
          authUrl +
          "?username=" +
          encodeURIComponent(username) +
          "&password=" +
          encodeURIComponent(password) +
          "&action=login_proc&is_mobile=1";
      } else {
        setIsLoading(false);
        setLoginError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function switchTab(next: RoleTab) {
    setTab(next);
    setIsLoading(false);
    if (next === "member") handleChangeNumber();
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-10">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(212,175,55,0.07) 0 1.5px, transparent 1.5px 28px)," +
            "repeating-linear-gradient(-45deg, rgba(212,175,55,0.07) 0 1.5px, transparent 1.5px 28px)," +
            "radial-gradient(120% 90% at 50% -10%, var(--maroon-700) 0%, var(--maroon-900) 55%, var(--maroon-950) 100%)",
        }}
      />

      <div className="w-full max-w-[430px] flex flex-col px-5">
        {/* ---- hero: logo + heading sit directly on the page background ---- */}
        <div className="relative text-center px-1 pb-6 shrink-0">
          <div className="relative mx-auto mb-3.5 grid h-[70px] w-[70px] place-items-center rounded-full border-2 border-[var(--gold-100)]/60 bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_6px_18px_rgba(0,0,0,0.3)]">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="kc-font-display text-[21px] font-extrabold text-white tracking-wide">
            {t.logoname}
          </h1>
          <p className="mt-1.5 text-[12.5px] font-medium text-[var(--gold-300)]/90">
            {t.welcomeBack}
          </p>

          {/* language toggle — MR / EN pill, below the tagline */}
          <div
            role="tablist"
            aria-label="Language"
            className="mx-auto w-max mt-3 flex rounded-full border border-[var(--gold-100)]/40 bg-black/15 p-0.5 backdrop-blur-sm"
          >
            <button
              role="tab"
              aria-selected={lang === "mr"}
              onClick={() => setLang("mr")}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition-colors duration-150 ${
                lang === "mr"
                  ? "bg-[var(--gold-300)] text-[var(--maroon-950)]"
                  : "text-[var(--gold-100)]/80 hover:text-[var(--gold-100)]"
              }`}
            >
              मराठी
            </button>
            <button
              role="tab"
              aria-selected={lang === "en"}
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition-colors duration-150 ${
                lang === "en"
                  ? "bg-[var(--gold-300)] text-[var(--maroon-950)]"
                  : "text-[var(--gold-100)]/80 hover:text-[var(--gold-100)]"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* ---- card ---- */}
        <div className="w-full rounded-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] px-[22px] pt-[26px] pb-7">
          {/* role switcher — hidden once member has moved into OTP entry,
                so the tabs don't invite switching mid-verification */}
          {!(tab === "member" && memberStep === "otp") && (
            <div role="tablist" aria-label="Login type" className="flex rounded-xl bg-[var(--gold-100)] p-1 mb-[22px]">
              <button
                role="tab"
                aria-selected={tab === "member"}
                onClick={() => switchTab("member")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${
                  tab === "member"
                    ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--maroon-800)] hover:bg-white/60"
                }`}
              >
                <Phone size={14} />
                {t.member}
              </button>
              <button
                role="tab"
                aria-selected={tab === "admin"}
                onClick={() => switchTab("admin")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${
                  tab === "admin"
                    ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--maroon-800)] hover:bg-white/60"
                }`}
              >
                <ShieldCheck size={14} />
                {t.admin}
              </button>
            </div>
          )}

          {tab === "member" ? (
            memberStep === "mobile" ? (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                  {t.communityMember}
                </p>
                <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-[18px]">
                  {t.loginWithMobile}
                </h2>

                <label htmlFor="mobile" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                  {t.mobileNumber}
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-[var(--cream)] px-3 py-3 transition-colors duration-150 ${
                    mobile.length > 0 && !mobileValid
                      ? "border-red-400"
                      : "border-[var(--gold-500)]/35 focus-within:border-[var(--gold-500)]"
                  }`}
                >
                  <span className="text-[13.5px] font-bold text-[var(--maroon-800)] pr-2 border-r border-[var(--gold-500)]/30">
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1 bg-transparent text-[14px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-foreground)] outline-none"
                  />
                </div>
                {mobile.length > 0 && !mobileValid && (
                  <p className="mt-1.5 text-[11.5px] font-medium text-red-500">{t.mobileError}</p>
                )}
                <p className="mt-1.5 text-[11.5px] font-medium text-red-500">{mobileloginError}</p>
                <button
                  onClick={handleSendOtp}
                  disabled={!mobileValid || isLoading}
                  className="kc-btn-shine mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3.5 text-[14px] font-extrabold text-[var(--maroon-950)] shadow-[0_6px_16px_rgba(212,175,55,0.35)] transition-all duration-150 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-800)]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      {t.sendingOtp}
                    </>
                  ) : (
                    <>
                      {t.sendOtp}
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="mt-3.5 text-center text-[11.5px] text-[var(--muted-foreground)]">
                  {t.alsoSurveyTeam}{" "}
                  <button onClick={() => switchTab("admin")} className="font-bold text-[var(--maroon-800)] underline-offset-2 hover:underline">
                    {t.useAdminLogin}
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleChangeNumber}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--gold-500)]/30 px-2.5 py-1 text-[11.5px] font-semibold text-[var(--maroon-800)] mb-4 transition-colors duration-150 hover:bg-[var(--gold-100)]"
                >
                  <ArrowLeft size={12} />
                  {t.changeNumber}
                </button>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[0_6px_16px_rgba(90,10,20,0.25)] mb-3.5">
                  <MessageSquareText size={18} className="text-[var(--gold-300)]" />
                </span>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                  {t.verifyOtp}
                </p>
                <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-2">
                  {t.enterCode}
                </h2>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--gold-500)]/35 bg-[var(--cream)] px-3 py-2 mb-6 text-[12px] text-[var(--muted-foreground)]">
                  {t.sentTo} <span className="font-bold text-[var(--ink)]">+91 {mobile}</span>
                </div>

                <div className="flex justify-center gap-2.5 mb-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpInputRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-[44px] h-[52px] shrink-0 text-center text-[19px] font-extrabold rounded-xl border bg-[var(--cream)] text-[var(--maroon-950)] outline-none shadow-[inset_0_1px_3px_rgba(90,10,20,0.08)] transition-all duration-150 ${
                        otpError
                          ? "border-red-400"
                          : "border-[var(--gold-500)]/35 focus:border-[var(--gold-500)] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.18)]"
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="mb-2 text-center text-[11.5px] font-medium text-red-500">{otpError}</p>
                )}

                <div className="flex items-center justify-center gap-1.5 mt-4 mb-6 text-[11.5px]">
                  <span className="text-[var(--muted-foreground)]">{t.didntGetCode}</span>
                  <button
                    onClick={handleResendOtp}
                    disabled={resendIn > 0 || isLoading}
                    className="font-bold text-[var(--maroon-800)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed hover:underline underline-offset-2 disabled:hover:no-underline"
                  >
                    {resendIn > 0 ? `${t.resendIn} ${resendIn}s` : t.resendOtp}
                  </button>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={!otpValid || isLoading}
                  className="kc-btn-shine w-full flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3.5 text-[14px] font-extrabold text-[var(--maroon-950)] shadow-[0_6px_16px_rgba(212,175,55,0.35)] transition-all duration-150 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-800)]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      {t.verifying}
                    </>
                  ) : (
                    <>
                      {t.verifyContinue}
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            )
          ) : (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                {t.authorizedAccess}
              </p>
              <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-[18px]">
                {t.chooseAdminRole}
              </h2>

              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <button
                  aria-pressed={adminRole === "master"}
                  onClick={() => setAdminRole("master")}
                  className={`flex flex-col items-center gap-2 rounded-xl border py-3.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${
                    adminRole === "master"
                      ? "border-[var(--gold-500)] bg-[var(--gold-100)]"
                      : "border-[var(--gold-500)]/25 bg-transparent hover:border-[var(--gold-500)]/50 hover:bg-[var(--gold-100)]/50"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))]">
                    <ShieldCheck size={16} className="text-[var(--gold-300)]" />
                  </span>
                  <span className="text-[11.5px] font-bold text-[var(--maroon-950)]">{t.masterAdmin}</span>
                </button>
                <button
                  aria-pressed={adminRole === "survey"}
                  onClick={() => setAdminRole("survey")}
                  className={`flex flex-col items-center gap-2 rounded-xl border py-3.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${
                    adminRole === "survey"
                      ? "border-[var(--gold-500)] bg-[var(--gold-100)]"
                      : "border-[var(--gold-500)]/25 bg-transparent hover:border-[var(--gold-500)]/50 hover:bg-[var(--gold-100)]/50"
                  }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))]">
                    <ClipboardList size={16} className="text-[var(--gold-300)]" />
                  </span>
                  <span className="text-[11.5px] font-bold text-[var(--maroon-950)]">{t.surveyUser}</span>
                </button>
              </div>

              <label htmlFor="username" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                {t.username}
              </label>
              <div className="rounded-xl border border-[var(--gold-500)]/35 bg-[var(--cream)] px-3 py-3 mb-3 focus-within:border-[var(--gold-500)] transition-colors duration-150">
                <input
                  id="username"
                  type="text"
                  placeholder={t.usernamePlaceholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-foreground)] outline-none"
                />
              </div>

              <label htmlFor="password" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                {t.password}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--gold-500)]/35 bg-[var(--cream)] px-3 py-3 mb-2 focus-within:border-[var(--gold-500)] transition-colors duration-150">
                <Lock size={14} className="text-[var(--gold-600)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-foreground)] outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-[var(--gold-600)] hover:text-[var(--maroon-800)] transition-colors duration-150"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="mt-1.5 text-[11.5px] font-medium text-red-500">{loginError}</p>
              {/* <div className="flex justify-end mb-4">
                <button type="button" className="text-[11.5px] font-bold text-[var(--maroon-800)] underline-offset-2 hover:underline">
                  {t.forgotPassword}
                </button>
              </div> */}

              <button
                onClick={handleAdminLogin}
                disabled={!adminValid || isLoading}
                className="kc-btn-shine w-full flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3.5 text-[14px] font-extrabold text-[var(--maroon-950)] shadow-[0_6px_16px_rgba(212,175,55,0.35)] transition-all duration-150 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-800)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t.loggingIn}
                  </>
                ) : (
                  <>
                    {t.loginAs} {adminRole === "master" ? t.masterAdmin : t.surveyUser}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="mt-3.5 text-center text-[10.5px] text-[var(--muted-foreground)] leading-relaxed px-1">
                {t.linkNote}
              </p>
            </div>
          )}
        </div>

        {/* ---- footer links ---- */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-[var(--gold-100)]/85">
          <button
            onClick={() => setActivePolicy("terms")}
            className="hover:text-white hover:underline underline-offset-2 transition-colors duration-150"
          >
            {t.termsAndConditions}
          </button>
          <span className="text-[var(--gold-100)]/40">|</span>
          <button
            onClick={() => setActivePolicy("privacy")}
            className="hover:text-white hover:underline underline-offset-2 transition-colors duration-150"
          >
            {t.privacyPolicy}
          </button>
          <span className="text-[var(--gold-100)]/40">|</span>
          <button
            onClick={() => setActivePolicy("child")}
            className="hover:text-white hover:underline underline-offset-2 transition-colors duration-150"
          >
            {t.childSafety}
          </button>
        </div>
      </div>

      {/* ---- policy modal ---- */}
      {activePolicy && (
        <PolicyModal
          policyKey={activePolicy}
          lang={lang}
          closeLabel={t.close}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </div>
  );
}