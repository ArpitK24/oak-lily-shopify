/**
 * Oak & Lily Shoppable Videos
 * Manages IntersectionObserver-based autoplay/pause and play/pause toggle.
 */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.shoppable-video-carousel');

  sections.forEach((section) => {
    const videos = section.querySelectorAll('.video-wrapper video');
    if (!videos.length) return;

    // Use IntersectionObserver to play visible videos and pause offscreen ones
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Autoplay prevented by browser policy
                });
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );

      videos.forEach((video) => {
        observer.observe(video);
      });
    }

    // Toggle play/pause when clicking the video wrapper
    const wrappers = section.querySelectorAll('.video-wrapper');
    wrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', (e) => {
        // Do not intercept clicks on links
        if (e.target.closest('a')) return;

        const video = wrapper.querySelector('video');
        if (!video) return;

        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });

    // Pause all videos when page becomes hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        videos.forEach((v) => v.pause());
      } else {
        videos.forEach((v) => {
          const rect = v.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            v.play().catch(() => {});
          }
        });
      }
    });
  });
});
