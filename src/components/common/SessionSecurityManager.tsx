'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSchool } from '@/context/SchoolContext';

/**
 * SessionSecurityManager
 * 
 * Enforces strict zero-trust session lifecycle:
 * 1. Immediate departure logout: As soon as an authenticated user navigates
 *    away from /admin-portal or /portal to any other page or external site,
 *    their session is instantly destroyed. Returning requires re-entering username & password.
 * 2. Window/Tab close logout: Any pagehide/beforeunload event purges session tokens.
 * 3. Inactivity auto-logout: 15 minutes of idle time automatically terminates active sessions.
 */
export function SessionSecurityManager() {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);
  const {
    isAdminAuthenticated,
    logoutAdmin,
    isPortalAuthenticated,
    logoutPortalUser
  } = useSchool();

  // 1. Immediate departure logout: detect when user leaves the system / portal
  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Leaving Super Admin Console
    if (prevPath.startsWith('/admin-portal') && !pathname.startsWith('/admin-portal')) {
      if (isAdminAuthenticated) {
        logoutAdmin();
      }
    }

    // Leaving Staff / Faculty Portal
    if (prevPath.startsWith('/portal') && !pathname.startsWith('/portal')) {
      if (isPortalAuthenticated) {
        logoutPortalUser();
      }
    }
  }, [pathname, isAdminAuthenticated, isPortalAuthenticated, logoutAdmin, logoutPortalUser]);

  // 2. Tab close / Page hide cleanup & Inactivity timeout (15 minutes)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      // Auto-logout after 15 minutes of inactivity if inside authenticated system
      idleTimer = setTimeout(() => {
        if (isAdminAuthenticated) {
          logoutAdmin();
        }
        if (isPortalAuthenticated) {
          logoutPortalUser();
        }
      }, 15 * 60 * 1000);
    };

    const handleLeavingSystem = () => {
      // Clear all active session tokens immediately when window or tab unloads
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.removeItem('blessed_admin_session');
          sessionStorage.removeItem('blessed_portal_session');
          sessionStorage.removeItem('blessed_portal_user');
          sessionStorage.removeItem('blessed_active_teacher');
          localStorage.removeItem('blessed_admin_session');
          localStorage.removeItem('blessed_portal_session');
          localStorage.removeItem('blessed_user');
          localStorage.removeItem('blessed_active_teacher');
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('mousemove', resetIdleTimer, { passive: true });
    window.addEventListener('keydown', resetIdleTimer, { passive: true });
    window.addEventListener('click', resetIdleTimer, { passive: true });
    window.addEventListener('touchstart', resetIdleTimer, { passive: true });
    window.addEventListener('scroll', resetIdleTimer, { passive: true });
    window.addEventListener('pagehide', handleLeavingSystem);
    window.addEventListener('beforeunload', handleLeavingSystem);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('pagehide', handleLeavingSystem);
      window.removeEventListener('beforeunload', handleLeavingSystem);
    };
  }, [isAdminAuthenticated, isPortalAuthenticated, logoutAdmin, logoutPortalUser]);

  return null;
}
