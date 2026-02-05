import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

interface LoginProps {
  onLogin: (isNewUser: boolean) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Validation States
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Password Rules
  const passwordRules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "No spaces", test: (p: string) => !/\s/.test(p) },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /\d/.test(p) },
    { label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];

  const getPasswordValidationState = (pwd: string) => {
    return passwordRules.map(rule => ({ ...rule, valid: rule.test(pwd) }));
  };

  const passwordValidationState = getPasswordValidationState(password);
  const isPasswordFullyValid = passwordValidationState.every(r => r.valid);
  const hasSpaces = /\s/.test(password);

  const validateEmail = (emailToValidate: string) => {
    if (!emailToValidate) return false;
    
    // Regex for local@domain.tld
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(emailToValidate)) {
      setEmailError('Please enter a valid email address.');
      setIsEmailValid(false);
      return false;
    }
    
    setEmailError(null);
    setIsEmailValid(true);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error and success state while typing
    if (emailError) setEmailError(null);
    if (isEmailValid) setIsEmailValid(false);
  };

  const handleEmailBlur = () => {
    if (email) {
      validateEmail(email);
    } else {
      setEmailError(null);
      setIsEmailValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailOk = validateEmail(email);
    const isPasswordOk = isSignUp ? isPasswordFullyValid : password.length > 0;
    
    if (isEmailOk && isPasswordOk) {
      // Mock login - in a real app, you'd validate credentials here
      onLogin(isSignUp);
    }
  };

  const isFormValid = isSignUp 
    ? (isEmailValid && isPasswordFullyValid && name.trim().length > 0)
    : (isEmailValid && password.length > 0);

  return (
    <div className="h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-black text-[32px] tracking-tight mb-[8px] mt-[60px] mr-[0px] ml-[0px]">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-gray-600 text-[15px]">
            {isSignUp ? 'Start your learning journey' : 'Continue learning'}
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input - Only for Sign Up */}
            {isSignUp && (
              <div>
                <label className="text-gray-700 text-[13px] mb-2.5 block">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 text-black px-6 py-3.5 rounded-full border border-gray-200 focus:border-gray-400 focus:outline-none focus:ring-0 placeholder:text-gray-400 transition-colors"
                  required
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="text-gray-700 text-[13px] mb-2.5 block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="name@email.com"
                  className={`w-full bg-gray-50 text-black px-6 py-3.5 rounded-full border ${
                    emailError 
                      ? 'border-red-500 focus:border-red-500 pr-12' 
                      : isEmailValid 
                        ? 'border-green-500/50 focus:border-green-500/50 pr-12' 
                        : 'border-gray-200 focus:border-gray-400'
                  } focus:outline-none focus:ring-0 placeholder:text-gray-400 transition-colors`}
                  required
                />
                {emailError && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none animate-in fade-in zoom-in duration-200">
                    <AlertCircle className="w-[18px] h-[18px]" />
                  </div>
                )}
                {isEmailValid && !emailError && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none animate-in fade-in zoom-in duration-200">
                    <Check className="w-[18px] h-[18px]" />
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-red-500 text-[13px] mt-2 flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="text-gray-700 text-[13px] mb-2.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full bg-gray-50 text-black px-6 py-3.5 rounded-full border ${
                    hasSpaces
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-gray-400'
                  } focus:outline-none focus:ring-0 placeholder:text-gray-400 transition-colors pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password - Only for Login */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-600 text-[13px] hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3.5 rounded-full transition-all mt-8 font-medium ${
                isFormValid 
                  ? 'bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/5' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
            >
              {isSignUp ? 'Create account' : 'Log in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500 text-[13px]">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login Options - Google and Apple only */}
          <div className="space-y-3">
            <button className="w-full bg-gray-50 border border-gray-200 text-black py-3.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-colors flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[15px]">Continue with Google</span>
            </button>
            
            <button className="w-full bg-gray-50 border border-gray-200 text-black py-3.5 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-colors flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-[15px]">Continue with Apple</span>
            </button>
          </div>

          {/* Toggle Sign Up/Login */}
          <div className="text-center pt-6">
            <span className="text-gray-500 text-[14px]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black text-[14px] hover:text-gray-700 transition-colors"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </div>

          {/* Footer */}
          <p className="text-gray-400 text-center text-[12px] leading-relaxed pt-[32px] pr-[0px] pb-[0px] pl-[0px] bg-white">
            By continuing, you agree to our Terms of Service<br />and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}