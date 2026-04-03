import { Building2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useNavigation } from "react-router-dom";

// ── Icons ────────────────────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const EyeIcon = ({ off }) => off ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── Feature list on the left panel ──────────────────────────────────────────
const features = [
  { label: "AI Document Q&A" },
  { label: "Smart Ticket Management" },
  { label: "Resident Analytics" },
  { label: "Instant Property Insights" },
];

// ── Reusable input ───────────────────────────────────────────────────────────
function InputField({ icon: Icon, label, type = "text", placeholder, value, onChange, rightEl }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#374151] tracking-wide uppercase">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-[#9ca3af]"><Icon /></span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-xl pl-10 pr-10 py-3 text-sm text-[#0f1117] placeholder-[#9ca3af] outline-none transition-all duration-150 focus:border-[#0f1117] focus:bg-white focus:ring-2 focus:ring-[#0f1117]/8"
        />
        {rightEl && <span className="absolute right-3.5 text-[#9ca3af] cursor-pointer hover:text-[#374151] transition-colors">{rightEl}</span>}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "user" });
  const {login,signup} = useAuth();
  const navigate  = useNavigate()

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const isLogin = mode === "login";

  return (
    <div className="flex font-['DM_Sans',sans-serif] bg-[#f0f2f5]" style={{ minHeight: '100vh', overflowY: 'scroll' }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] xl:w-[460px] flex-shrink-0 bg-[#0f1117] px-10 py-12 sticky top-0 h-screen">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl grid place-items-center text-white">
            <Building2 />
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] tracking-tight">PropertyAI</p>
            <p className="text-white/40 text-[11px]">Intelligent Assistant</p>
          </div>
        </div>

        {/* Hero copy */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-white text-[32px] xl:text-[36px] font-light leading-tight tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Manage your<br />
              <span className="text-white/50">property smarter.</span>
            </h2>
            <p className="text-white/40 text-sm mt-4 leading-relaxed max-w-[300px]">
              An AI-powered platform for residents and managers — documents, tickets, and analytics in one place.
            </p>
          </div>

          {/* Features */}
          <ul className="flex flex-col gap-3">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center flex-shrink-0 text-white">
                  <CheckIcon />
                </span>
                <span className="text-white/60 text-sm">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spacer — no stats */}
        <div />
      </div>

      {/* ── Right panel — scrolls with page ── */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-[#0f1117] rounded-xl grid place-items-center text-white">
              <BuildingIcon />
            </div>
            <span className="font-semibold text-[#0f1117]">PropertyAI</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-8">

            {/* Tab toggle */}
            <div className="flex bg-[#f0f2f5] rounded-xl p-1 mb-7">
              {["login", "signup"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 ${
                    mode === m
                      ? "bg-white text-[#0f1117] shadow-sm"
                      : "text-[#6b7280] hover:text-[#374151]"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-[22px] font-semibold text-[#0f1117] tracking-tight">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-[#6b7280] text-sm mt-1">
                {isLogin
                  ? "Sign in to access your property portal."
                  : "Join PropertyAI and get started today."}
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">

              {/* Name — signup only */}
              {!isLogin && (
                <InputField
                  icon={UserIcon}
                  label="Full Name"
                  placeholder="John Anderson"
                  value={form.name}
                  onChange={set("name")}
                />
              )}

              <InputField
                icon={MailIcon}
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
              />

              <InputField
                icon={LockIcon}
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
                rightEl={<span onClick={() => setShowPass(!showPass)}><EyeIcon off={showPass} /></span>}
              />

              {/* Confirm — signup only */}
              {!isLogin && (
                <InputField
                  icon={LockIcon}
                  label="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={set("confirm")}
                  rightEl={<span onClick={() => setShowConfirm(!showConfirm)}><EyeIcon off={showConfirm} /></span>}
                />
              )}

              {/* Role selector — signup only */}
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151] tracking-wide uppercase">I am a</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["resident", "manager"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setForm((f) => ({ ...f, role: r }))}
                        className={`py-2.5 rounded-xl border text-sm font-medium capitalize transition-all duration-150 ${
                          form.role === r
                            ? "border-[#0f1117] bg-[#0f1117] text-white"
                            : "border-[#e5e7eb] text-[#6b7280] hover:border-[#9ca3af]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Forgot — login only */}
              {isLogin && (
                <div className="flex justify-end -mt-1">
                  <button className="text-xs text-[#6b7280] hover:text-[#0f1117] transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button onClick={
                async () => {
                    try {
                        if (isLogin) {
                        await login(form.email, form.password);
                        } else {
                        await signup(
                            form.name,
                            form.email,
                            form.password,
                            form.role === 'resident' ? 'user' : 'admin'
                        );
                        }

                        navigate('/');
                    } catch (err) {
                        console.error(err);
                    }
                    }
              } className="mt-1 w-full flex items-center justify-center gap-2 bg-[#0f1117] hover:bg-[#1f2232] active:scale-[0.98] text-white font-medium py-3 rounded-xl text-sm transition-all duration-150 group">
                {isLogin ? "Sign In" : "Create Account"}
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                  <ArrowIcon />
                </span>
              </button>
            </div>

            {/* Switch mode */}
            <p className="text-center text-xs text-[#9ca3af] mt-5">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(isLogin ? "signup" : "login")}
                className="text-[#0f1117] font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          <p className="text-center text-[11px] text-[#9ca3af] mt-5">
            By continuing, you agree to PropertyAI's{" "}
            <span className="text-[#6b7280] hover:text-[#0f1117] cursor-pointer transition-colors">Terms</span>
            {" & "}
            <span className="text-[#6b7280] hover:text-[#0f1117] cursor-pointer transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}