import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  CheckCircle2,
  XCircle,
  User,
  Globe,
  ChevronDown,
  ShieldCheck,
  KeyRound,
  LogIn,
  UserPlus
} from 'lucide-react';
import { UserAccount, Language } from '../../types';
import {
  signInUser,
  signUpUser,
  evaluatePasswordStrength,
  getSavedCredentials,
  saveCredentials,
  clearSavedCredentials
} from '../../services/authService';

interface SignInViewProps {
  onBack?: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  currentUser: UserAccount | null;
  onSignOut?: () => void;
  language?: Language;
  onSetLanguage?: (lang: Language) => void;
  onExploreAsGuest?: () => void;
}

/**
 * HydraMind Official Logo Component
 * Leaf sprout canopy over terraced soil furrow curved arcs
 */
export const HydraMindLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${dim} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
        {/* Outer subtle circular frame */}
        <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#e2ece4" strokeWidth="2" />
        
        {/* Leaf 1 (Left tilted) */}
        <path
          d="M48 42 C40 26 28 20 18 20 C16 32 22 44 34 47 C40 48 45 46 48 42 Z"
          fill="#0c8b51"
        />
        {/* Leaf 2 (Center upright) */}
        <path
          d="M51 38 C49 20 52 11 58 7 C64 15 65 25 59 36 C56 40 53 40 51 38 Z"
          fill="#10a360"
        />
        {/* Leaf 3 (Right tilted) */}
        <path
          d="M54 42 C64 28 75 22 84 22 C86 34 78 46 66 48 C60 49 55 46 54 42 Z"
          fill="#0c8b51"
        />
        
        {/* Furrow 1 (Top curved terrace) */}
        <path
          d="M22 55 C38 67 62 67 78 55 C80 58 77 63 72 67 C58 77 42 77 28 67 C23 63 20 58 22 55 Z"
          fill="#0c8b51"
        />
        {/* Furrow 2 (Middle curved terrace) */}
        <path
          d="M27 70 C40 79 60 79 73 70 C71 74 67 78 61 82 C54 86 46 86 39 82 C33 78 29 74 27 70 Z"
          fill="#0a7443"
        />
        {/* Furrow 3 (Bottom subtle arc) */}
        <path
          d="M36 84 C45 89 55 89 64 84 C62 87 58 90 50 90 C42 90 38 87 36 84 Z"
          fill="#085f37"
        />
      </svg>
    </div>
  );
};

export const SignInView: React.FC<SignInViewProps> = ({
  onBack,
  onLoginSuccess,
  currentUser,
  onSignOut,
  language = 'en',
  onSetLanguage,
  onExploreAsGuest
}) => {
  // Mode toggle: 'signin' or 'signup' (Create Account)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [hasSavedPassword, setHasSavedPassword] = useState(false);

  // Sign Up inputs
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Load saved credentials on mount if user previously checked "Remember me"
  useEffect(() => {
    const saved = getSavedCredentials();
    if (saved && saved.email) {
      setEmail(saved.email);
      if (saved.password) {
        setPassword(saved.password);
        setHasSavedPassword(true);
      }
      setRememberMe(true);
    }
  }, []);

  // Real-time password evaluation for Sign Up
  const passwordStrength = useMemo(() => {
    return evaluatePasswordStrength(password);
  }, [password]);

  // Multilingual translations
  const t = {
    hydraMind: 'HydraMind',
    tagline:
      language === 'hi'
        ? 'स्मार्ट कृषि। बेहतर कल।'
        : 'Smart Farming. Better Tomorrow.',
    tabSignIn: language === 'hi' ? 'साइन इन' : 'Sign In',
    tabCreateAccount: language === 'hi' ? 'खाता बनाएं' : 'Create Account',
    welcomeBack: language === 'hi' ? 'वापसी पर स्वागत है!' : 'Welcome Back!',
    signinSub:
      language === 'hi'
        ? 'अपने स्मार्ट फार्मिंग डैशबोर्ड पर जाने के लिए साइन इन करें।'
        : 'Sign in to continue to your smart farming dashboard.',
    createAccountTitle: language === 'hi' ? 'नया किसान खाता बनाएं' : 'Create Farmer Account',
    createAccountSub:
      language === 'hi'
        ? 'स्मार्ट एआई कृषि टूल्स का उपयोग करने के लिए अपना फार्म प्रोफाइल बनाएं।'
        : 'Register your farm profile to access AI crop diagnostic tools.',
    emailPlaceholder: language === 'hi' ? 'ईमेल या मोबाइल नंबर' : 'Email or Mobile Number',
    passwordPlaceholder: language === 'hi' ? 'पासवर्ड' : 'Password',
    rememberMe: language === 'hi' ? 'मुझे याद रखें' : 'Remember me',
    forgotPassword: language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot password?',
    signInBtn: language === 'hi' ? 'साइन इन करें' : 'Sign In',
    signUpBtn: language === 'hi' ? 'खाता बनाएं और साइन इन करें' : 'Create Account & Sign In',
    or: language === 'hi' ? 'या' : 'or',
    continueGoogle: language === 'hi' ? 'Google के साथ जारी रखें' : 'Continue with Google',
    savedPasswordReady:
      language === 'hi' ? 'सहेजा गया पासवर्ड तैयार है' : 'Saved password loaded & ready',
    fullNamePlaceholder: language === 'hi' ? 'पूरा नाम (उदा. रमेश पाटिल)' : 'Full Name (e.g. Ramesh Patil)',
    phonePlaceholder: language === 'hi' ? 'मोबाइल नंबर (+91)' : 'Mobile Number (+91)',
    farmNamePlaceholder: language === 'hi' ? 'खेत / फार्म का नाम' : 'Farm Name (e.g. Green Valley Farm)',
    confirmPasswordPlaceholder: language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password',
  };

  // Sign In handler
  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFeedback(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFeedback({ type: 'error', message: 'Please enter your email or mobile number.' });
      return;
    }

    if (!password) {
      setFeedback({ type: 'error', message: 'Please enter your password.' });
      return;
    }

    if (password.length < 8) {
      setFeedback({
        type: 'error',
        message: 'Password must be at least 8 characters long for secure authentication.'
      });
      return;
    }

    setIsLoading(true);

    try {
      const user = await signInUser({
        email: trimmedEmail,
        password,
        rememberMe,
        provider: 'email'
      });

      // Persist credentials if Remember me was checked
      if (rememberMe) {
        saveCredentials(trimmedEmail, password);
      } else {
        clearSavedCredentials();
      }

      setFeedback({
        type: 'success',
        message: `Welcome back, ${user.name}! Sign-in verified.`
      });

      setTimeout(() => {
        onLoginSuccess(user);
      }, 500);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to sign in. Please verify your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up / Create Account handler
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!fullName.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your full name.' });
      return;
    }

    if (!email.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your email address or mobile number.' });
      return;
    }

    if (!passwordStrength.hasMinLength) {
      setFeedback({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }

    if (!passwordStrength.hasLowerCase || !passwordStrength.hasUpperCase) {
      setFeedback({
        type: 'error',
        message: 'Password must contain both uppercase and lowercase letters.'
      });
      return;
    }

    if (!passwordStrength.hasNumber) {
      setFeedback({ type: 'error', message: 'Password must contain at least one number (0-9).' });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match. Please re-enter to confirm.' });
      return;
    }

    setIsLoading(true);

    try {
      const user = await signUpUser({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || '+91 98000 12345',
        farmName: farmName.trim() || `${fullName.trim()}'s Farm`,
        landArea: 5.0,
        state: 'Maharashtra',
        district: 'Nashik',
        primaryCrops: ['Tomato', 'Bell Pepper', 'Wheat'],
        password,
        rememberMe
      });

      if (rememberMe) {
        saveCredentials(email.trim(), password);
      }

      setFeedback({
        type: 'success',
        message: `Account created for ${user.name}! Welcome to HydraMind.`
      });

      setTimeout(() => {
        onLoginSuccess(user);
      }, 550);
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to create account.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Google SSO login handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const providerEmail = email.trim() || 'farmer.hydramind@gmail.com';
      const user = await signInUser({
        email: providerEmail,
        rememberMe: true,
        provider: 'google'
      });
      if (rememberMe) {
        saveCredentials(providerEmail, 'GoogleSSO_Verified#2026');
      }
      setFeedback({
        type: 'success',
        message: `Signed in with Google as ${user.name}!`
      });
      setTimeout(() => {
        onLoginSuccess(user);
      }, 500);
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Google sign-in error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Autofill demo login credentials
  const handleAutofillDemo = () => {
    setEmail('farmer.ramesh@hydramind.ai');
    setPassword('KisanAgro#2026');
    setRememberMe(true);
    setHasSavedPassword(true);
    setFeedback({
      type: 'info',
      message: 'Demo credentials loaded. Click "Sign In" to continue.'
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f4f7f4] font-sans text-slate-800 antialiased overflow-x-hidden flex items-center justify-center p-3 sm:p-6 selection:bg-emerald-200">
      
      {/* Top-Right Language Picker Pill: "🌐 English ⌵ | हिंदी" */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30">
        <div className="relative">
          <div className="flex items-center bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'hi' ? 'हिंदी' : 'English'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <span className="mx-2 text-slate-300">|</span>
            <button
              type="button"
              onClick={() => {
                if (onSetLanguage) onSetLanguage(language === 'hi' ? 'en' : 'hi');
                setLangDropdownOpen(false);
              }}
              className="hover:text-emerald-700 transition-colors font-medium cursor-pointer"
            >
              {language === 'hi' ? 'English' : 'हिंदी'}
            </button>
          </div>

          {langDropdownOpen && onSetLanguage && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-40 text-xs">
              <button
                type="button"
                onClick={() => {
                  onSetLanguage('en');
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-1.5 hover:bg-emerald-50 flex items-center justify-between ${
                  language === 'en' ? 'font-bold text-emerald-800' : 'text-slate-700'
                }`}
              >
                <span>English</span>
                {language === 'en' && <Check className="w-3 h-3 text-emerald-600" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSetLanguage('hi');
                  setLangDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-1.5 hover:bg-emerald-50 flex items-center justify-between ${
                  language === 'hi' ? 'font-bold text-emerald-800' : 'text-slate-700'
                }`}
              >
                <span>हिंदी</span>
                {language === 'hi' && <Check className="w-3 h-3 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Unified Split Frame */}
      <div className="relative w-full max-w-[1360px] min-h-[90vh] bg-white rounded-3xl lg:rounded-[36px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200/80">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Clean Reference Artwork with Sign In Page REMOVED */}
        {/* Uses /assets/aistudio/hydramind_left_hero.png (zero overlap!) */}
        {/* ========================================================= */}
        <div className="relative w-full lg:w-[54%] xl:w-[56%] min-h-[360px] sm:min-h-[460px] lg:min-h-[700px] bg-[#eaf4ec] overflow-hidden flex items-center justify-center">
          <img
            src="/assets/aistudio/hydramind_left_hero.png"
            alt="HydraMind Smart Farming Companion"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: The Actual Working, Well-Structured Sign-In & Create Account Card */}
        {/* ========================================================= */}
        <div className="relative w-full lg:w-[46%] xl:w-[44%] flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-white overflow-y-auto">
          
          <div className="w-full max-w-[430px] my-auto">
            
            {/* Centered HydraMind Logo Emblem & Branding */}
            <div className="flex flex-col items-center text-center">
              <HydraMindLogo size="lg" className="mb-2.5" />
              <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#0c5a3e] leading-tight">
                {t.hydraMind}
              </h2>

              <h3 className="mt-2 text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight">
                {mode === 'signin' ? t.welcomeBack : t.createAccountTitle}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 max-w-sm">
                {mode === 'signin' ? t.signinSub : t.createAccountSub}
              </p>
            </div>

            {/* Segmented Mode Selector: [ Sign In ]  |  [ Create Account ] */}
            <div className="mt-5 p-1 bg-slate-100 rounded-2xl flex items-center border border-slate-200/80 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setFeedback(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-[#0c5a3e] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.tabSignIn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setFeedback(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#0c5a3e] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.tabCreateAccount}</span>
              </button>
            </div>

            {/* Feedback / Error Notification Banner */}
            {feedback && (
              <div
                className={`mt-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
                  feedback.type === 'error'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}
              >
                {feedback.type === 'error' ? (
                  <XCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Saved Password Ready indicator */}
            {hasSavedPassword && mode === 'signin' && !feedback && (
              <div className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-50/90 border border-emerald-200/60 text-[11px] font-semibold text-emerald-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.savedPasswordReady}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearSavedCredentials();
                    setEmail('');
                    setPassword('');
                    setHasSavedPassword(false);
                  }}
                  className="text-emerald-700 hover:text-emerald-900 underline text-[10px] cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}

            {/* ========================================================= */}
            {/* OPTION 1: SIGN IN FORM */}
            {/* ========================================================= */}
            {mode === 'signin' ? (
              <form onSubmit={handleSignIn} autoComplete="on" className="mt-5 space-y-4">
                
                {/* Email or Mobile Number Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="signin-email"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setHasSavedPassword(false);
                    }}
                    placeholder={t.emailPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e] focus:ring-2 focus:ring-[#0c5a3e]/15 transition-all shadow-2xs"
                  />
                </div>

                {/* Password Input with Visibility Eye Toggle */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="signin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setHasSavedPassword(false);
                    }}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e] focus:ring-2 focus:ring-[#0c5a3e]/15 transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember Me Checkbox & Forgot Password Link */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-[#0c5a3e] accent-[#0c5a3e] focus:ring-[#0c5a3e] cursor-pointer"
                    />
                    <span className="font-semibold text-slate-700">{t.rememberMe}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setShowForgotModal(true);
                    }}
                    className="font-bold text-[#0c8b51] hover:text-[#0c5a3e] hover:underline transition-colors cursor-pointer"
                  >
                    {t.forgotPassword}
                  </button>
                </div>

                {/* Primary Button: "➔ Sign In" */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#0c5a3e] hover:bg-[#094731] active:bg-[#073625] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0c5a3e]/20 hover:shadow-lg hover:shadow-[#0c5a3e]/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </span>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      <span>{t.signInBtn}</span>
                    </>
                  )}
                </button>

                {/* Divider: "or" */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                    {t.or}
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                {/* Continue with Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200/90 transition-all flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-60"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.15C3.25 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.39l4.01-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.25 2.64 1.26 6.61l4.01 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">{t.continueGoogle}</span>
                </button>

                {/* Helpful Demo / Guest Testing Links */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={handleAutofillDemo}
                    className="hover:text-emerald-700 transition-colors underline cursor-pointer"
                  >
                    Autofill Demo Login
                  </button>
                  {onExploreAsGuest && (
                    <button
                      type="button"
                      onClick={onExploreAsGuest}
                      className="hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      Guest Preview →
                    </button>
                  )}
                </div>

              </form>
            ) : (
              /* ========================================================= */
              /* OPTION 2: CREATE ACCOUNT FORM */
              /* ========================================================= */
              <form onSubmit={handleSignUpSubmit} className="mt-5 space-y-3.5">
                
                {/* Full Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e] focus:ring-2 focus:ring-[#0c5a3e]/15"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e]"
                  />
                </div>

                {/* Farm Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder={t.farmNamePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e]"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Real-time Password Strength Meter */}
                {password && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-600">Password Strength:</span>
                      <span
                        className={`font-bold ${
                          passwordStrength.isValid ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {passwordStrength.strengthLabel}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.colorClass}`}
                        style={{ width: `${Math.max(15, passwordStrength.score * 25)}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-500 pt-1">
                      <span className={passwordStrength.hasMinLength ? 'text-emerald-700 font-bold' : ''}>
                        {passwordStrength.hasMinLength ? '✓' : '•'} 8+ characters
                      </span>
                      <span className={passwordStrength.hasNumber ? 'text-emerald-700 font-bold' : ''}>
                        {passwordStrength.hasNumber ? '✓' : '•'} At least 1 number
                      </span>
                      <span className={passwordStrength.hasLowerCase && passwordStrength.hasUpperCase ? 'text-emerald-700 font-bold' : ''}>
                        {passwordStrength.hasLowerCase && passwordStrength.hasUpperCase ? '✓' : '•'} Uppercase & lowercase
                      </span>
                      <span className={passwordStrength.hasSpecialChar ? 'text-emerald-700 font-bold' : ''}>
                        {passwordStrength.hasSpecialChar ? '✓' : '•'} Symbol (bonus)
                      </span>
                    </div>
                  </div>
                )}

                {/* Confirm Password */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0c5a3e]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Save Credentials Checkbox */}
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0c5a3e] accent-[#0c5a3e] focus:ring-[#0c5a3e]"
                  />
                  <span>Save password & remember credentials</span>
                </label>

                {/* Submit button: Create Account & Sign In */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#0c5a3e] hover:bg-[#094731] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0c5a3e]/20 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>{t.signUpBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0c5a3e] flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Reset Your Password</h3>
            <p className="mt-1 text-xs text-slate-600">
              Enter your registered email address or mobile number. We will send a secure password reset link or SMS code.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. farmer@hydramind.ai or +91 98000 12345"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-hidden focus:border-[#0c5a3e]"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setFeedback({
                    type: 'success',
                    message: `Password reset instructions sent to ${forgotEmail || 'your email'}.`
                  });
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0c5a3e] hover:bg-[#094731] cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
