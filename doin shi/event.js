document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const items = document.querySelectorAll(".item");

  const FADE_STEP = 0.05;      // how much volume changes per frame
  const INTERVAL = 50;          // milliseconds between volume changes
  const MAX_VOLUME = 0.5;       // cap volume at 50%

  items.forEach(item => {
    const video = item.querySelector("video");
    let fadeInInterval, fadeOutInterval;
    let firstHover = true;      // track first hover for unmuting

    if (video) {
      video.muted = true;       // start muted
      video.volume = 0;         // start at 0
    }

    item.addEventListener("mouseenter", () => {
      header.textContent = item.dataset.text || "";
      header.style.opacity = "1";

      if (video) {
        clearInterval(fadeOutInterval);   // stop fade-out if active
        video.play();

        // Only unmute on first hover
        if (firstHover) {
          video.muted = false;
          firstHover = false;
        }

        fadeInInterval = setInterval(() => {
          if (video.volume < MAX_VOLUME) {
            video.volume = Math.min(video.volume + FADE_STEP, MAX_VOLUME);
          } else {
            clearInterval(fadeInInterval);
          }
        }, INTERVAL);
      }
    });

    item.addEventListener("mouseleave", () => {
      header.style.opacity = "0";

      if (video) {
        clearInterval(fadeInInterval);  // stop fade-in if active

        fadeOutInterval = setInterval(() => {
          if (video.volume > 0) {
            video.volume = Math.max(video.volume - FADE_STEP, 0);
          } else {
            clearInterval(fadeOutInterval);
            // DO NOT mute here, so subsequent hovers can fade in sound
          }
        }, INTERVAL);
      }
    });
  });
});