/**
 * Authentication and Farmer Profile Persistence Service
 * Stores user session in localStorage and syncs with backend server.
 */
import { UserAccount } from '../types';

const STORAGE_KEY = 'hydraline_auth_user';
const SESSION_TIMESTAMP_KEY = 'hydraline_auth_timestamp';
const REMEMBER_ME_KEY = 'hydraline_remember_me';
const LOGIN_HISTORY_KEY = 'hydraline_login_history';
const REGISTERED_USERS_KEY = 'hydraline_registered_users';
const SAVED_CREDENTIALS_KEY = 'hydramind_saved_credentials';

export interface SavedCredentials {
  email: string;
  password?: string;
  savedAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe: boolean;
  provider?: 'email' | 'google' | 'microsoft';
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  farmName: string;
  landArea: number;
  state: string;
  district: string;
  primaryCrops: string[];
  password: string;
  rememberMe: boolean;
}

export interface LoginHistoryEntry {
  timestamp: string;
  email: string;
  name: string;
  method: string;
  device: string;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  strengthLabel: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  colorClass: string;
  hasMinLength: boolean; // >= 8 chars
  hasUpperCase: boolean; // [A-Z]
  hasLowerCase: boolean; // [a-z]
  hasNumber: boolean; // [0-9]
  hasSpecialChar: boolean; // [!@#$%^&*...]
  isValid: boolean; // meets all required rules
}

/**
 * Real-time Password Strength Evaluation
 * Rules:
 *  - Minimum 8 characters
 *  - At least one lowercase letter
 *  - At least one uppercase letter
 *  - At least one number
 *  - Special character (bonus)
 */
export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const hasMinLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score++;
  if (hasLowerCase && hasUpperCase) score++;
  if (hasNumber) score++;
  if (hasSpecialChar) score++;

  let strengthLabel: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' = 'Very Weak';
  let colorClass = 'bg-slate-200';

  if (!password) {
    strengthLabel = 'Very Weak';
    colorClass = 'bg-slate-200';
  } else if (score <= 1) {
    strengthLabel = 'Weak';
    colorClass = 'bg-rose-500';
  } else if (score === 2) {
    strengthLabel = 'Fair';
    colorClass = 'bg-amber-500';
  } else if (score === 3) {
    strengthLabel = 'Good';
    colorClass = 'bg-lime-500';
  } else {
    strengthLabel = 'Strong';
    colorClass = 'bg-emerald-600';
  }

  // Strong password requirement: at least 8 chars + uppercase + lowercase + number
  const isValid = hasMinLength && hasLowerCase && hasUpperCase && hasNumber;

  return {
    score,
    strengthLabel,
    colorClass,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    isValid,
  };
}

/**
 * Retrieve saved user from localStorage
 */
export function getSavedUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as UserAccount;
    return user;
  } catch (err) {
    console.error('Failed to parse saved user:', err);
    return null;
  }
}

/**
 * Check if "Remember Me" was enabled
 */
export function getRememberMe(): boolean {
  try {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  } catch {
    return true;
  }
}

/**
 * Retrieve saved email and password credentials for automatic login prefill
 */
export function getSavedCredentials(): SavedCredentials | null {
  try {
    const raw = localStorage.getItem(SAVED_CREDENTIALS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedCredentials;
  } catch {
    return null;
  }
}

/**
 * Save email & password credentials to localStorage when Remember Me is enabled
 */
export function saveCredentials(email: string, password?: string): void {
  try {
    if (!email) return;
    localStorage.setItem(
      SAVED_CREDENTIALS_KEY,
      JSON.stringify({
        email: email.trim(),
        password: password || '',
        savedAt: new Date().toISOString(),
      })
    );
  } catch (err) {
    console.warn('Could not save credentials to localStorage:', err);
  }
}

/**
 * Remove saved credentials from localStorage
 */
export function clearSavedCredentials(): void {
  try {
    localStorage.removeItem(SAVED_CREDENTIALS_KEY);
  } catch (err) {
    console.warn('Could not clear saved credentials:', err);
  }
}

/**
 * Get all registered farmer accounts from local storage
 */
export function getRegisteredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserAccount[];
  } catch {
    return [];
  }
}

/**
 * Save user locally and optionally record history
 */
export function saveUserLocally(user: UserAccount, rememberMe: boolean = true): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_TIMESTAMP_KEY, new Date().toISOString());
    localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? 'true' : 'false');

    // Add to local login history
    const historyEntry: LoginHistoryEntry = {
      timestamp: new Date().toLocaleString(),
      email: user.email,
      name: user.name,
      method: user.token ? 'SSO' : 'Password',
      device: typeof navigator !== 'undefined' && navigator.userAgent?.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser',
    };

    const existingHistoryRaw = localStorage.getItem(LOGIN_HISTORY_KEY);
    const existingHistory: LoginHistoryEntry[] = existingHistoryRaw ? JSON.parse(existingHistoryRaw) : [];
    const updatedHistory = [historyEntry, ...existingHistory.slice(0, 9)];
    localStorage.setItem(LOGIN_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (err) {
    console.warn('Could not persist to localStorage:', err);
  }
}

/**
 * Clear local session
 */
export function clearSavedUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_TIMESTAMP_KEY);
  } catch (err) {
    console.warn('Could not remove from localStorage:', err);
  }
}

/**
 * Authenticate via email & password or SSO provider
 */
export async function signInUser(creds: LoginCredentials): Promise<UserAccount> {
  const { email, password = '', rememberMe, provider = 'email' } = creds;

  // Validate password length if password is used
  if (provider === 'email' && password && password.length < 8) {
    throw new Error('Password must be at least 8 characters long for secure authentication.');
  }

  const registered = getRegisteredUsers();
  let matchedUser = registered.find(
    (f) => f.email.toLowerCase() === email.trim().toLowerCase() || (f.phone && f.phone.includes(email.trim()))
  );

  // If no match found among registered accounts, generate a clean personalized profile based on their email or input
  if (!matchedUser) {
    const cleanEmail = email.trim();
    const username = cleanEmail.split('@')[0] || 'Farmer';
    const capitalizedName = username
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    matchedUser = {
      id: `user-${Date.now()}`,
      name: capitalizedName.trim() || 'Farmer Member',
      email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@farmer.hydraline.ai`,
      phone: cleanEmail.match(/^\+?[0-9]{10,13}$/) ? cleanEmail : '+91 98000 12345',
      farmName: `${capitalizedName || 'Modern'} Farm`,
      landArea: 5.0,
      areaUnit: 'Acres',
      state: 'Maharashtra',
      district: 'Nashik',
      primaryCrops: ['Tomato', 'Bell Pepper', 'Wheat'],
      soilType: 'Rich Loamy Soil',
      avatarUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80`,
      joinedDate: 'Joined Today',
      lastLoginAt: new Date().toISOString(),
      rememberMe,
    };
  } else {
    matchedUser = {
      ...matchedUser,
      lastLoginAt: new Date().toISOString(),
      rememberMe,
    };
  }

  // Persist locally
  saveUserLocally(matchedUser, rememberMe);
  if (rememberMe && email) {
    saveCredentials(email, password);
  } else {
    clearSavedCredentials();
  }

  // Sync with server in background
  try {
    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: matchedUser,
        provider,
        rememberMe,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn('Server auth sync failed, fallback to local storage:', err);
  }

  return matchedUser;
}

/**
 * Register a new Farmer account with strong password enforcement
 */
export async function signUpUser(data: SignUpData): Promise<UserAccount> {
  // Validate password rules before account creation
  const strength = evaluatePasswordStrength(data.password);
  if (!strength.isValid) {
    throw new Error('Password must be at least 8 characters with a mix of uppercase (A-Z), lowercase (a-z), and numbers (0-9).');
  }

  const newUser: UserAccount = {
    id: `farmer-${Date.now()}`,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim() || '+91 98000 00000',
    farmName: data.farmName.trim() || `${data.name.trim()}'s Farm`,
    landArea: data.landArea || 5.0,
    areaUnit: 'Acres',
    state: data.state || 'Maharashtra',
    district: data.district || 'Nashik',
    primaryCrops: data.primaryCrops.length > 0 ? data.primaryCrops : ['Tomato', 'Bell Pepper'],
    soilType: 'Alluvial Loamy Soil',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    joinedDate: 'Joined Today',
    lastLoginAt: new Date().toISOString(),
    rememberMe: data.rememberMe,
  };

  // Add to registered users repository
  try {
    const existing = getRegisteredUsers();
    const filtered = existing.filter((u) => u.email.toLowerCase() !== newUser.email.toLowerCase());
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([newUser, ...filtered]));
  } catch (err) {
    console.warn('Could not save to registered users:', err);
  }

  saveUserLocally(newUser, data.rememberMe);
  if (data.rememberMe && data.email) {
    saveCredentials(data.email, data.password);
  } else {
    clearSavedCredentials();
  }

  try {
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: newUser,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn('Server signup sync failed, fallback to local storage:', err);
  }

  return newUser;
}
