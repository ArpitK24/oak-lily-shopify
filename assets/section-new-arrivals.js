/**
 * Oak & Lily New Arrivals: reveal decoded secondary alternate image on hover
 */
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.oak-arrivals__alternate');

  images.forEach((image) => {
    const ready = async () => {
      try {
        await image.decode();
        if (image.naturalWidth > 0) {
          image.classList.add('is-ready');
        }
      } catch {
        image.remove();
      }
    };

    image.addEventListener('load', ready, { once: true });
    image.addEventListener('error', () => image.remove(), { once: true });
    if (image.complete) ready();
  });
});
