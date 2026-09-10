import { useRef, useState } from "react";
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
} from "lucide-react";
//  DatabaseSearch,

type RoleTab = "member" | "admin";
type AdminRole = "master" | "survey";
type MemberStep = "mobile" | "otp";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<RoleTab>("member");
  const [adminRole, setAdminRole] = useState<AdminRole>("master");

  // member / OTP flow
  const [memberStep, setMemberStep] = useState<MemberStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpError, setOtpError] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [loginError, setLoginError] = useState("");
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // admin flow
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const mobileValid = /^\d{10}$/.test(mobile);
  const adminValid = username.trim().length > 0 && password.length > 0;
  const otpValid = otp.every((d) => d.length === 1);

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

  function handleSendOtp() {
    if (!mobileValid || isLoading) return;
    setIsLoading(true);
    // simulated OTP dispatch — swap for the real request
    setTimeout(() => {
      setIsLoading(false);
      setOtp(Array(OTP_LENGTH).fill(""));
      setOtpError("");
      setMemberStep("otp");
      startResendTimer();
      setTimeout(() => otpInputRefs.current[0]?.focus(), 50);
    }, 550);
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
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setOtp(next);
    setOtpError("");
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpInputRefs.current[focusIndex]?.focus();
  }

  function handleVerifyOtp() {
    if (!otpValid || isLoading) return;
    setIsLoading(true);
    // simulated verification — swap for the real request
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("authToken", "dummy-token");
      navigate("/home", { replace: true });
    }, 550);
  }


  const API_PATH = import.meta.env.VITE_API_PATH;
  async function handleAdminLogin() {
    if (!adminValid || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_PATH}/auth.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
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
        window.location.href = "http://192.168.1.62/webmedia/wme/kohli_community/auth-login.php?username=" + username + "&password=" + password+"&action="+"login_proc&is_mobile=1";
        // if (data.data.user_type == 5) {
        // } else {
        //   window.location.href = "http://192.168.1.62/webmedia/wme/kohli_community/index.php";
        // }

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
        <div className="text-center px-1 pb-6 shrink-0">
          <div className="relative mx-auto mb-3.5 grid h-[70px] w-[70px] place-items-center rounded-full border-2 border-[var(--gold-100)]/60 bg-[linear-gradient(160deg,var(--gold-300),var(--gold-500))] shadow-[0_6px_18px_rgba(0,0,0,0.3)]">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="kc-font-display text-[21px] font-extrabold text-white tracking-wide">
            Kohali Samaj
          </h1>
          <p className="mt-1.5 text-[12.5px] font-medium text-[var(--gold-300)]/90">
            Welcome back to your community
          </p>
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
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${tab === "member"
                    ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--maroon-800)] hover:bg-white/60"
                  }`}
              >
                <Phone size={14} />
                Member
              </button>
              <button
                role="tab"
                aria-selected={tab === "admin"}
                onClick={() => switchTab("admin")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${tab === "admin"
                    ? "bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] text-[var(--gold-300)] shadow-[var(--shadow-gold)]"
                    : "text-[var(--maroon-800)] hover:bg-white/60"
                  }`}
              >
                <ShieldCheck size={14} />
                Admin
              </button>
            </div>
          )}

          {tab === "member" ? (
            memberStep === "mobile" ? (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                  Community member
                </p>
                <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-[18px]">
                  Login with your mobile number
                </h2>

                <label htmlFor="mobile" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                  Mobile number
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-[var(--cream)] px-3 py-3 transition-colors duration-150 ${mobile.length > 0 && !mobileValid
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
                  <p className="mt-1.5 text-[11.5px] font-medium text-red-500">
                    Enter a valid 10-digit mobile number
                  </p>
                )}

                <button
                  onClick={handleSendOtp}
                  disabled={!mobileValid || isLoading}
                  className="kc-btn-shine mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3.5 text-[14px] font-extrabold text-[var(--maroon-950)] shadow-[0_6px_16px_rgba(212,175,55,0.35)] transition-all duration-150 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-800)]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending OTP
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="mt-3.5 text-center text-[11.5px] text-[var(--muted-foreground)]">
                  Also part of the survey team?{" "}
                  <button onClick={() => switchTab("admin")} className="font-bold text-[var(--maroon-800)] underline-offset-2 hover:underline">
                    Use Admin Login
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
                  Change number
                </button>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))] shadow-[0_6px_16px_rgba(90,10,20,0.25)] mb-3.5">
                  <MessageSquareText size={18} className="text-[var(--gold-300)]" />
                </span>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                  Verify OTP
                </p>
                <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-2">
                  Enter the 6-digit code
                </h2>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--gold-500)]/35 bg-[var(--cream)] px-3 py-2 mb-6 text-[12px] text-[var(--muted-foreground)]">
                  Sent to <span className="font-bold text-[var(--ink)]">+91 {mobile}</span>
                </div>

                <div
                  className="flex justify-center gap-2.5 mb-2"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpInputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-[44px] h-[52px] shrink-0 text-center text-[19px] font-extrabold rounded-xl border bg-[var(--cream)] text-[var(--maroon-950)] outline-none shadow-[inset_0_1px_3px_rgba(90,10,20,0.08)] transition-all duration-150 ${otpError
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
                  <span className="text-[var(--muted-foreground)]">Didn't get the code?</span>
                  <button
                    onClick={handleResendOtp}
                    disabled={resendIn > 0 || isLoading}
                    className="font-bold text-[var(--maroon-800)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed hover:underline underline-offset-2 disabled:hover:no-underline"
                  >
                    {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
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
                      Verifying
                    </>
                  ) : (
                    <>
                      Verify & continue
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            )
          ) : (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gold-600)] mb-1">
                Authorized access
              </p>
              <h2 className="text-[16.5px] font-extrabold text-[var(--maroon-950)] mb-[18px]">
                Choose your admin role
              </h2>

              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <button
                  aria-pressed={adminRole === "master"}
                  onClick={() => setAdminRole("master")}
                  className={`flex flex-col items-center gap-2 rounded-xl border py-3.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${adminRole === "master"
                      ? "border-[var(--gold-500)] bg-[var(--gold-100)]"
                      : "border-[var(--gold-500)]/25 bg-transparent hover:border-[var(--gold-500)]/50 hover:bg-[var(--gold-100)]/50"
                    }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))]">
                    <ShieldCheck size={16} className="text-[var(--gold-300)]" />
                  </span>
                  <span className="text-[11.5px] font-bold text-[var(--maroon-950)]">Master Admin</span>
                </button>
                <button
                  aria-pressed={adminRole === "survey"}
                  onClick={() => setAdminRole("survey")}
                  className={`flex flex-col items-center gap-2 rounded-xl border py-3.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-500)] ${adminRole === "survey"
                      ? "border-[var(--gold-500)] bg-[var(--gold-100)]"
                      : "border-[var(--gold-500)]/25 bg-transparent hover:border-[var(--gold-500)]/50 hover:bg-[var(--gold-100)]/50"
                    }`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(150deg,var(--maroon-800),var(--maroon-950))]">
                    <ClipboardList size={16} className="text-[var(--gold-300)]" />
                  </span>
                  <span className="text-[11.5px] font-bold text-[var(--maroon-950)]">Survey User</span>
                </button>
              </div>

              <label htmlFor="username" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                Username
              </label>
              <div className="rounded-xl border border-[var(--gold-500)]/35 bg-[var(--cream)] px-3 py-3 mb-3 focus-within:border-[var(--gold-500)] transition-colors duration-150">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[var(--ink)] placeholder:text-[var(--muted-foreground)] outline-none"
                />
              </div>

              <label htmlFor="password" className="block text-[12.5px] font-semibold text-[var(--ink)] mb-1.5">
                Password
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
              <div className="flex justify-end mb-4">
                <button type="button" className="text-[11.5px] font-bold text-[var(--maroon-800)] underline-offset-2 hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleAdminLogin}
                disabled={!adminValid || isLoading}
                className="kc-btn-shine w-full flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,var(--gold-300),var(--gold-500))] py-3.5 text-[14px] font-extrabold text-[var(--maroon-950)] shadow-[0_6px_16px_rgba(212,175,55,0.35)] transition-all duration-150 hover:brightness-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--maroon-800)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Logging in
                  </>
                ) : (
                  <>
                    Login as {adminRole === "master" ? "Master Admin" : "Survey User"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="mt-3.5 text-center text-[10.5px] text-[var(--muted-foreground)] leading-relaxed px-1">
                Logging in as Survey User with a mobile number already used for
                Member login? Both profiles link automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}