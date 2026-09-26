import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../SectionHeader";
import { useNavigate } from "react-router-dom";
import {
  Megaphone,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Store,
  Tag,
  FileText,
  Navigation,
  Smartphone,
  MessageCircle,
  Globe,
  Link2,
  Image as ImageIcon,
  Video,
  // Layers,
  Send,
  CheckCircle2,
  ShieldCheck,
  Type,
  ChevronLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Scroll reveal                                                             */
/* -------------------------------------------------------------------------- */

function useRevealVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealVisible();

  const delayClass =
    delay === 80
      ? "delay-75"
      : delay === 140
        ? "delay-150"
        : "";

  return (
    <div
      ref={ref}
      className={`${className} transform transition-all duration-500 ease-out ${delayClass} ${visible
        ? "translate-y-0 opacity-100"
        : "translate-y-5 opacity-0"
        }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface BusinessPromotionCTAProps {
  onPress: () => void;
}

interface InfoRowProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  last?: boolean;
}

interface FieldProps {
  Icon: LucideIcon;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  textarea?: boolean;
  required?: boolean;
  colSpan?: boolean;
  action?: React.ReactNode;
  name?: string;
  error?: string;
}

interface AdType {
  key: string;
  label: string;
  Icon: LucideIcon;
}

/* -------------------------------------------------------------------------- */
/* Advertisement types                                                        */
/* -------------------------------------------------------------------------- */

const AD_TYPES: AdType[] = [
  {
    key: "poster",
    label: "Poster",
    Icon: ImageIcon,
  },
  {
    key: "video",
    label: "Video",
    Icon: Video,
  },
  // {
  //   key: "both",
  //   label: "Poster + Video",
  //   Icon: Layers,
  // },
];

/* -------------------------------------------------------------------------- */
/* Home CTA card                                                              */
/* -------------------------------------------------------------------------- */

export function BusinessPromotionCTA({
  onPress,
}: BusinessPromotionCTAProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="group relative w-full overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--maroon-800),var(--maroon-900))] p-5 text-left shadow-[0_8px_22px_rgba(58,13,20,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(58,13,20,0.35)] active:scale-[0.99]"
    >
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 animate-pulse rounded-full bg-[var(--gold-500)] opacity-20" />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
          <Megaphone
            className="h-6 w-6 text-[var(--maroon-900)]"
            strokeWidth={2.25}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-widest text-[var(--maroon-900)]">
            Business Promotion
          </span>

          <p className="mt-1.5 text-[15px] font-extrabold leading-tight text-[var(--paper)]">
            आपल्या व्यवसायाची जाहिरात करा
          </p>

          <p className="mt-0.5 text-[12px] text-[var(--paper)]/70">
            Get your business featured to the whole community
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight
          className="h-5 w-5 shrink-0 text-[var(--paper)]/70 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared info row                                                            */
/* -------------------------------------------------------------------------- */

function InfoRow({
  Icon,
  label,
  value,
  last = false,
}: InfoRowProps) {
  return (
    <div
      className={`group flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-[var(--gold-100)]/40 active:scale-[0.99] md:gap-4 md:px-5 md:py-4 ${last
        ? ""
        : "border-b border-[var(--gold-300)]/50"
        }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-sm">
        <Icon
          className="h-[18px] w-[18px] text-[var(--maroon-900)]"
          strokeWidth={2.25}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="block font-display text-[14px] font-bold text-[var(--ink)]">
          {label}
        </h1>

        <p className="block font-mr text-[12px] text-[var(--text-muted)]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form field                                                                 */
/* -------------------------------------------------------------------------- */

function Field({
  Icon,
  label,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  colSpan = false,
  action,
  name,
  error,
}: FieldProps) {
  return (
    <label
      className={
        colSpan
          ? "block sm:col-span-2 lg:col-span-3"
          : "block"
      }
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className={`text-[11.5px] font-bold ${error ? "text-red-600" : "text-[var(--maroon-700)]"}`}>
          {label}

          {required && (
            <span className="text-[var(--gold-600)]"> *</span>
          )}
        </span>

        {action}
      </div>

      <div className={`flex items-start gap-2.5 rounded-2xl border-[1.5px] bg-[var(--cream)]/50 px-3.5 py-2.5 transition-all duration-200 ${
        error
          ? "border-red-500 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-200"
          : "border-[var(--gold-500)] focus-within:border-[var(--maroon-700)] focus-within:ring-4 focus-within:ring-[rgba(122,31,43,0.12)]"
      }`}>
        <Icon className={`mt-[3px] h-4 w-4 shrink-0 transition-colors duration-200 ${
          error
            ? "text-red-400"
            : "text-[var(--ink)]/35 peer-focus:text-[var(--maroon-700)]"
        }`} />

        {textarea ? (
          <textarea
            rows={3}
            placeholder={placeholder}
            required={required}
            name={name}
            className="w-full resize-none bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            required={required}
            name={name}
            className="w-full bg-transparent text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/35"
          />
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Business Promotion page                                               */
/* -------------------------------------------------------------------------- */

export default function BusinessPromotion() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [adType, setAdType] = useState<string>("poster");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const API_PATH =
    window.location.hostname === "localhost" ||
      window.location.hostname === "192.168.1.62"
      ? import.meta.env.VITE_LOCAL_API_PATH
      : import.meta.env.VITE_LIVE_API_PATH;

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (!agreed) {
      newErrors["agreement"] = "Please agree to the advertisement guidelines";
    }

    // Validate required fields
    const requiredFields = [
      { name: "business_name", label: "Business Name" },
      { name: "business_category", label: "Business Category" },
      { name: "contact_number", label: "Contact Number" },
      { name: "business_description", label: "Business Description" },
      { name: "business_address", label: "Business Address" },
    ];

    const form = formRef.current;
    if (!form) {
      return;
    }

    // Check all required fields
    requiredFields.forEach(({ name, label }) => {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      if (!field || !field.value.trim()) {
        newErrors[name] = `${label} is required`;
      }
    });

    // Validate files based on ad type
    if (adType === "poster" && !posterFile) {
      newErrors["poster"] = "Please upload a poster image";
    }
    if (adType === "video" && !videoFile) {
      newErrors["video"] = "Please upload a video";
    }
    if (adType === "both" && (!posterFile || !videoFile)) {
      newErrors["media"] = "Please upload both poster and video";
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    setLoading(true);
    const formData = new FormData();

    // Add action and ad type
    formData.append("action", "add_business_promotion");
    formData.append("ad_type", adType);

    // Collect all form field values
    const allFields = [
      "business_name",
      "business_category",
      "contact_number",
      "whatsapp_number",
      "business_description",
      "business_location",
      "business_address",
      "website",
      "instagram",
      "facebook",
      "youtube",
      "advertisement_title",
      "advertisement_description",
    ];

    allFields.forEach((fieldName) => {
      const field = form.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement;
      if (field) {
        const value = field.value.trim();
        if (value) {
          formData.append(fieldName, value);
          console.log(`Added ${fieldName}: ${value}`);
        }
      }
    });

    // Add files
    if (posterFile) {
      formData.append("poster", posterFile);
      console.log("Added poster:", posterFile.name);
    }

    if (videoFile) {
      formData.append("video", videoFile);
      console.log("Added video:", videoFile.name);
    }
    let user=JSON.parse(localStorage.getItem('mobile_user') || '{}');
    formData.append('owner_name',user.name)
    formData.append('created_by',user.id)
    
    // Log FormData for debugging
    console.log("=== FormData Contents ===");
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    try {
      console.log(`Sending to: ${API_PATH}/action_layer.php`);

      const response = await fetch(`${API_PATH}/action_layer.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.status === 1) {
        setSubmitted(true);
        // Reset form
        form.reset();
        setPosterFile(null);
        setVideoFile(null);
        setAdType("poster");

        setTimeout(() => {
          setSubmitted(false);
          navigate("/home");
        }, 3000);
      } else {
        alert(result.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Unable to submit application. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };
   let userData=JSON.parse(localStorage.getItem('mobile_user') || '{}');
  return (
    <form ref={formRef} className="min-h-screen w-full bg-[var(--cream)] pb-10 text-[var(--ink)]">
      <div className="mx-auto max-w-md px-4 pt-5 sm:max-w-lg md:max-w-3xl md:px-8 lg:max-w-4xl">

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="mx-auto flex w-full items-center justify-between gap-3">
          <SectionHeader
            eyebrow="Grow Your Business"
            title="Business Promotion"
          />

          <button
            type="button"
            onClick={() => navigate("/home")}
            aria-label="Go back"
            className="mb-3.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(115deg,var(--maroon-900),var(--maroon-700)_65%,var(--maroon-850))] shadow-sm transition-transform duration-150 active:scale-95 md:h-10 md:w-10"
          >
            <ChevronLeft
              className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.35)] bg-[linear-gradient(150deg,var(--maroon-950)_0%,var(--maroon-900)_38%,var(--maroon-700)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-maroon)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-7 lg:px-10">

          {/* Cross hatch */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px),repeating-linear-gradient(-60deg,rgba(212,175,55,0.05)_0_1.5px,transparent_1.5px_26px)]" />

          {/* Content */}
          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--maroon-950)]">
              व्यवसाय प्रचार
            </span>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              Business Promotion
            </h2>

            <p className="mt-1 text-sm text-[var(--gold-100)]">
              आपल्या व्यवसायाची जाहिरात करा — tell us about your
              business and we'll help promote it to the community.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Applicant Information                                             */}
        {/* ---------------------------------------------------------------- */}

        <Reveal className="mt-5">
          <SectionHeader
            eyebrow="Applicant Information"
            title="From your Survey form"
          />

          <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl">

            <InfoRow
              Icon={User}
              label="Name"
              value={userData.name}
            />

            <InfoRow
              Icon={Phone}
              label="Phone"
              value={userData.phone_number}
            />

            <InfoRow
              Icon={MapPin}
              label="Address"
              value={userData.address}
              last
            />

          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Business Information                                               */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={80} className="mt-5">
          <SectionHeader
            eyebrow="About The Business"
            title="Business Information"
          />

          <div className="grid grid-cols-1 gap-3.5 overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] p-3 px-4 py-3.5 shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl md:px-5 md:py-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Business Name */}
            <Field
              Icon={Store}
              label="Business Name"
              placeholder="e.g. Kohali Textiles"
              name="business_name"
              required
              colSpan
              error={errors.business_name}
            />

            {/* Business Category */}
            <Field
              Icon={Tag}
              label="Business Category"
              placeholder="e.g. Retail, Food, Services"
              name="business_category"
              required
              error={errors.business_category}
            />

            {/* Contact Number */}
            <Field
              Icon={Smartphone}
              label="Contact Number"
              name="contact_number"
              placeholder="+91 00000 00000"
              type="tel"
              required
              error={errors.contact_number}
            />

            {/* WhatsApp */}
            <Field
              Icon={MessageCircle}
              label="WhatsApp Number"
              name="whatsapp_number"
              placeholder="+91 00000 00000"
              type="tel"
            />

            {/* Business Description */}
            <Field
              Icon={FileText}
              label="Business Description"
              placeholder="What does your business offer?"
              name="business_description"
              textarea
              required
              colSpan
              error={errors.business_description}
            />

            {/* Business Address */}
            <Field
              Icon={MapPin}
              label="Business Address"
              placeholder="Shop / street / area, city"
              name="business_address"
              textarea
              required
              colSpan
              error={errors.business_address}
            />

            {/* Business Location */}
            <Field
              Icon={Navigation}
              label="Business Location"
              name="business_location"
              placeholder="Pin dropped on map"
              action={
                <button
                  type="button"
                  className="text-[10.5px] font-bold text-[var(--maroon-700)] underline underline-offset-2 transition-colors hover:text-[var(--maroon-900)]"
                >
                  Pick on map
                </button>
              }
            />

            {/* Website */}
            <Field
              Icon={Globe}
              label="Website"
              placeholder="www.yourbusiness.com"
              type="url"
              name="website"
            />

            {/* Social Media */}
            <Field
              Icon={Link2}
              label="Instagram Link"
              placeholder="Instagram profile links"
              name="instagram"
            />

            <Field
              Icon={Link2}
              label="Facebook Link"
              placeholder="Facebook profile links"
              name="facebook"
            />

            <Field
              Icon={Link2}
              label="Youtube Link"
              placeholder="Youtube profile links"
              name="youtube"
            />

          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Advertisement Information                                         */}
        {/* ---------------------------------------------------------------- */}

        <Reveal delay={140} className="mt-5">
          <SectionHeader
            eyebrow="Promote It"
            title="Advertisement Information"
          />

          <div className="overflow-hidden rounded-2xl border border-[color:var(--gold-300)]/60 bg-[var(--paper)] p-3 px-4 py-3.5 shadow-[0_6px_20px_-12px_rgba(74,11,26,0.35)] md:rounded-3xl md:px-5 md:py-4">

            {/* Advertisement Type */}
            <div className="mb-4">
              <span className="mb-2 block text-[11.5px] font-bold text-[var(--maroon-700)]">
                Advertisement Type{" "}
                <span className="text-[var(--gold-600)]">
                  *
                </span>
              </span>

              <div className="grid grid-cols-3 gap-2 md:max-w-md">

                {AD_TYPES.map(
                  ({ key, label, Icon }: AdType) => {
                    const active = adType === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setAdType(key)}
                        className={`relative flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${active
                          ? "border-[var(--gold-500)] bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_6px_16px_rgba(212,175,55,0.35)]"
                          : "border-[var(--gold-500)] bg-[var(--cream)]"
                          }`}
                      >

                        {/* Selected indicator */}
                        {active && (
                          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--maroon-800)] text-[var(--gold-100)] shadow-sm">
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              strokeWidth={2.5}
                            />
                          </span>
                        )}

                        {/* Icon */}
                        <Icon
                          className={`h-5 w-5 transition-transform duration-200 ${active
                            ? "scale-110 text-[var(--maroon-900)] opacity-100"
                            : "scale-100 text-[var(--ink)] opacity-55"
                            }`}
                          strokeWidth={2.25}
                        />

                        {/* Label */}
                        <span
                          className={`text-[11px] font-bold leading-tight ${active
                            ? "text-[var(--maroon-900)] opacity-100"
                            : "text-[var(--ink)] opacity-60"
                            }`}
                        >
                          {label}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>
            </div>

            {/* Advertisement Media Upload */}
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">

                {/* Poster Upload */}
                {(adType === "poster" || adType === "both") && (
                  <label className="block cursor-pointer">
                    <div className="mb-1.5">
                      <span className={`text-[11.5px] font-bold ${errors.poster ? "text-red-600" : "text-[var(--maroon-700)]"}`}>
                        Poster Image <span className="text-[var(--gold-600)]">*</span>
                      </span>
                    </div>

                    <div className={`rounded-2xl border-[1.5px] border-dashed bg-[var(--cream)]/50 px-4 py-5 text-center transition-all ${
                      errors.poster
                        ? "border-red-500 hover:border-red-600"
                        : "border-[var(--gold-500)] hover:border-[var(--maroon-700)]"
                    }`}>
                      <ImageIcon className={`mx-auto mb-2 h-7 w-7 ${errors.poster ? "text-red-500" : "text-[var(--maroon-700)]"}`} />

                      <p className="text-[13px] font-bold text-[var(--ink)]">
                        {posterFile ? posterFile.name : "Upload Poster"}
                      </p>

                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                        JPG, JPEG, PNG, WEBP • Max 5 MB
                      </p>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          setPosterFile(e.target.files?.[0] || null);
                          if (e.target.files?.[0]) {
                            setErrors(prev => ({ ...prev, poster: "" }));
                          }
                        }}
                      />
                    </div>
                    {errors.poster && (
                      <p className="mt-1.5 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <span>⚠</span> {errors.poster}
                      </p>
                    )}
                  </label>
                )}

                {/* Video Upload */}
                {(adType === "video" || adType === "both") && (
                  <label className="block cursor-pointer">
                    <div className="mb-1.5">
                      <span className={`text-[11.5px] font-bold ${errors.video ? "text-red-600" : "text-[var(--maroon-700)]"}`}>
                        Advertisement Video <span className="text-[var(--gold-600)]">*</span>
                      </span>
                    </div>

                    <div className={`rounded-2xl border-[1.5px] border-dashed bg-[var(--cream)]/50 px-4 py-5 text-center transition-all ${
                      errors.video
                        ? "border-red-500 hover:border-red-600"
                        : "border-[var(--gold-500)] hover:border-[var(--maroon-700)]"
                    }`}>
                      <Video className={`mx-auto mb-2 h-7 w-7 ${errors.video ? "text-red-500" : "text-[var(--maroon-700)]"}`} />

                      <p className="text-[13px] font-bold text-[var(--ink)]">
                        {videoFile ? videoFile.name : "Upload Video"}
                      </p>

                      <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                        MP4, MOV, WEBM • Max 50 MB
                      </p>

                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        className="hidden"
                        onChange={(e) => {
                          setVideoFile(e.target.files?.[0] || null);
                          if (e.target.files?.[0]) {
                            setErrors(prev => ({ ...prev, video: "" }));
                          }
                        }}
                      />
                    </div>
                    {errors.video && (
                      <p className="mt-1.5 text-[11px] font-medium text-red-600 flex items-center gap-1">
                        <span>⚠</span> {errors.video}
                      </p>
                    )}
                  </label>
                )}

              </div>
              {errors.media && (
                <p className="mt-3 text-[11px] font-medium text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.media}
                </p>
              )}
            </div>

            {/* Advertisement fields */}
            <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-2">

              <Field
                Icon={Type}
                label="Advertisement Title"
                name="advertisement_title"
                placeholder="A short catchy title"
              />

              <Field
                Icon={FileText}
                label="Advertisement Description"
                name="advertisement_description"
                placeholder="What should the ad say?"
                textarea
                colSpan
              />

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Agreement + Submit                                               */}
            {/* ---------------------------------------------------------------- */}

            <div className="relative mt-4">
              <div>

                {/* Agreement */}
                <button
                  type="button"
                  onClick={() => {
                    setAgreed((current) => !current);
                    if (!agreed) {
                      setErrors(prev => ({ ...prev, agreement: "" }));
                    }
                  }}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-200 ${
                    errors.agreement
                      ? "border-red-500 bg-red-50 hover:border-red-600"
                      : "border-[var(--gold-500)] bg-[var(--cream)]/50 hover:border-[var(--maroon-300)]"
                  } active:scale-[0.99]`}
                >

                  {/* Checkbox */}
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-all duration-200 ${agreed
                      ? "border-[var(--maroon-700)] bg-[var(--maroon-700)]"
                      : "border-[var(--gold-500)] bg-transparent"
                      }`}
                  >
                    {agreed && (
                      <CheckCircle2
                        className="h-3.5 w-3.5 text-[var(--paper)]"
                        strokeWidth={3}
                      />
                    )}
                  </span>

                  {/* Agreement text */}
                  <span className="flex items-start gap-2 text-[13px] leading-snug text-[var(--ink)]/85">
                    <ShieldCheck className="mt-[2px] h-4 w-4 shrink-0 text-[var(--maroon-700)]/60" />

                    <span>
                      I agree to the{" "}
                      <span className="font-bold text-[var(--maroon-700)] underline underline-offset-2">
                        advertisement guidelines
                      </span>
                      .
                    </span>
                  </span>

                </button>

                {errors.agreement && (
                  <p className="mt-2 text-[11px] font-medium text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.agreement}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!agreed || loading}
                  className="relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--maroon-700),var(--maroon-900))] py-3.5 text-[14px] font-extrabold text-[var(--paper)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 md:w-auto md:px-10"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2
                        className="h-4 w-4"
                        strokeWidth={2.5}
                      />
                      Application Submitted
                    </>
                  ) : loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--paper)] border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </button>

              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </form>
  );
}