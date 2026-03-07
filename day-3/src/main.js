const viewElement = document.querySelector("arcgis-scene");
await viewElement.viewOnReady();
const initialViewpoint = viewElement.view.viewpoint?.clone();

viewElement.view.ui.components = [];

const getSlideByTitle = (title) =>
  viewElement.map?.presentation?.slides?.find(
    (slide) => slide.title?.text === title,
  );

const applySlideFromLink = async (event) => {
  const link = event.currentTarget;
  const slideTitle = link.dataset.slideTitle;
  const slide = getSlideByTitle(slideTitle);

  if (!slide) {
    console.warn(`Slide not found: ${slideTitle}`);
    return;
  }

  await slide.applyTo(viewElement.view, {
    animate: true,
    speedFactor: 0.7,
  });
};

const slideLinks = document.querySelectorAll(".slide-link[data-slide-title]");
const homeLink = document.querySelector("#home");

const goToInitialView = async () => {
  if (!initialViewpoint) {
    return;
  }

  await viewElement.view.goTo(initialViewpoint, {
    animate: true,
    speedFactor: 0.7,
  });
};

slideLinks.forEach((link) => {
  link.addEventListener("click", applySlideFromLink);
  link.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      applySlideFromLink(event);
    }
  });
});

homeLink?.addEventListener("click", goToInitialView);
homeLink?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    goToInitialView();
  }
});
