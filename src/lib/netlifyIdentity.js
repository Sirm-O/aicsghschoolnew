// This file handles Netlify Identity integration for the CMS
// It's used to manage authentication for content editors

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Load Netlify Identity Widget
  const netlifyIdentity = window.netlifyIdentity;

  if (netlifyIdentity) {
    // Initialize the identity service
    netlifyIdentity.init({
      APIUrl: 'https://sengani-girls-school.netlify.app/.netlify/identity',
      locale: 'en'
    });

    // Handle login events
    netlifyIdentity.on('login', () => {
      // Redirect to admin page after login
      if (window.location.pathname !== '/admin/') {
        window.location.href = '/admin/';
      }
    });

    // Handle logout events
    netlifyIdentity.on('logout', () => {
      // Redirect to home page after logout
      window.location.href = '/';
    });

    // Handle initialization
    netlifyIdentity.on('init', user => {
      if (!user) {
        // User is not logged in
        console.log('User not logged in');
      } else {
        // User is logged in
        console.log('User logged in:', user.email);
      }
    });
  }
}

// Export for use in other components
export const handleLogin = () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.open('login');
  }
};

export const handleSignup = () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.open('signup');
  }
};

export const handleLogout = () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.logout();
  }
};

export const getCurrentUser = () => {
  if (window.netlifyIdentity) {
    return window.netlifyIdentity.currentUser();
  }
  return null;
};

export default {
  handleLogin,
  handleSignup,
  handleLogout,
  getCurrentUser
};

