/**
 * Oak & Lily Header Interactions
 * Scoped lightweight mobile drawer and dropdown handlers
 */
document.addEventListener('DOMContentLoaded', () => {
  const drawerContainer = document.getElementById('Details-menu-drawer-container');
  if (drawerContainer) {
    const backdrop = drawerContainer.querySelector('.menu-drawer__backdrop');
    const closeBtn = drawerContainer.querySelector('.menu-drawer__close');

    function closeDrawer() {
      drawerContainer.removeAttribute('open');
      document.body.style.overflow = '';
    }

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    drawerContainer.addEventListener('toggle', () => {
      if (drawerContainer.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerContainer.hasAttribute('open')) {
        closeDrawer();
      }
    });
  }

  // Desktop dropdown hover and outside click
  const dropdowns = document.querySelectorAll('.header__menu-details');
  if (dropdowns.length > 0) {
    dropdowns.forEach((details) => {
      details.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 990) {
          details.setAttribute('open', '');
        }
      });
      details.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 990) {
          details.removeAttribute('open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      dropdowns.forEach((details) => {
        if (!details.contains(e.target)) {
          details.removeAttribute('open');
        }
      });
    });
  }
});
