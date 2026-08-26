'use client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  isGuest: boolean;
  avatarUrl?: string;
}

const GUEST_KEY = 'askmydata_guest_session_v1';

export class GuestSessionStore {
  public static isGuest(): boolean {
    if (typeof window === 'undefined') return true;
    try {
      const stored = localStorage.getItem(GUEST_KEY);
      if (stored === null) return true; // Default to guest session if not explicitly logged in
      return stored === 'true';
    } catch {
      return true;
    }
  }

  public static setGuestSession(isGuest: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUEST_KEY, isGuest ? 'true' : 'false');
    }
  }

  public static getUserProfile(): UserProfile {
    const guest = this.isGuest();
    if (guest) {
      return {
        id: 'usr-guest-001',
        name: 'Guest User',
        email: 'guest@askmydata.app',
        company: 'Guest Session Workspace',
        role: 'Guest Analyst',
        isGuest: true,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      };
    }

    return {
      id: 'usr-member-100',
      name: 'Business Member',
      email: 'member@company.com',
      company: 'Real Business Workspace',
      role: 'Workspace Admin',
      isGuest: false,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    };
  }
}
