navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration
      .unregister()
      .then(() => console.log("Service worker unregistered"));
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
