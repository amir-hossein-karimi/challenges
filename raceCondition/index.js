const mockRequest = (entry, signal) => {
  return new Promise((resolve, reject) => {
    const apiDelay = Math.floor(Math.random() * 10) + 1;

    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(() => {
      resolve(`${entry} + ${apiDelay * 1000}`);
    }, apiDelay * 1000);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
};

const apiHandler = () => {
  let controller = null;

  return (entry) => {
    // Cancel the previous request
    if (controller) {
      controller.abort();
    }

    // Create a fresh controller for this request
    controller = new AbortController();

    return mockRequest(entry, controller.signal);
  };
};

(async () => {
  const handler = apiHandler();

  ["r", "re", "rea", "reac", "react"].forEach((entry) => {
    handler(entry)
      .then((res) => console.log("Success:", res))
      .catch((err) => {
        // Cancellation is expected; only report real errors
        if (err.name !== "AbortError") {
          console.error("Request failed:", err);
        }
      });
  });
})();
