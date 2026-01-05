document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const items = document.querySelectorAll(".item");

  const FADE_STEP = 0.01;      
  const INTERVAL = 40;          
  const MAX_VOLUME = 0.3;       

  items.forEach(item => {
    const video = item.querySelector("video");
    let fadeInInterval, fadeOutInterval;
    let firstHover = true;     

    if (video) {
      video.muted = true;       
      video.volume = 0;         
    }

    item.addEventListener("mouseenter", () => {
      header.style.opacity = "0";
      setTimeout(() => {
        header.textContent = item.dataset.text || "";
        header.style.opacity = "1";
      }, 180);

      if (video) {
        clearInterval(fadeOutInterval);
        video.play();

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
        clearInterval(fadeInInterval);  

        fadeOutInterval = setInterval(() => {
          if (video.volume > 0) {
            video.volume = Math.max(video.volume - FADE_STEP, 0);
          } else {
            clearInterval(fadeOutInterval);
          }
        }, INTERVAL);
      }
    });
  });
});