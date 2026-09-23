export type PolicyKey = "terms" | "privacy" | "child";

export type PolicySection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PolicyDoc = {
  icon: "terms" | "privacy" | "child";
  effectiveDate: string;
  appName: string;
  organization: string;
  extra?: string;
  sections: PolicySection[];
};

export const TERMS_DOC: PolicyDoc = {
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

export const PRIVACY_DOC: PolicyDoc = {
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

export const CHILD_SAFETY_DOC: PolicyDoc = {
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

export const POLICY_DOCS: Record<PolicyKey, PolicyDoc> = {
  terms: TERMS_DOC,
  privacy: PRIVACY_DOC,
  child: CHILD_SAFETY_DOC,
};

export const POLICY_TITLES: Record<PolicyKey, Record<"mr" | "en", string>> = {
  terms: { mr: "अटी व शर्ती", en: "Terms & Conditions" },
  privacy: { mr: "गोपनीयता धोरण", en: "Privacy Policy" },
  child: { mr: "बाल सुरक्षा मानके", en: "Child Safety Standards" },
};