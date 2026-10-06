function getResult() {
  return Math.random() < 0.7 ? "fail" : "success";
}

const ApiMock = () => {
  return new Promise((resolve, reject) => {
    const apiRes = getResult();
    setTimeout(() => {
      if (apiRes === "fail") {
        reject("failed");
      } else {
        resolve("success");
      }
    }, 1000);
  });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async (fn, retries) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      const delay = 1000 * 2 ** attempt;

      await sleep(delay);
    }
  }
};

(async () => {
  console.log("started");

  try {
    const res = await retry(ApiMock, 3);
    console.log({ res });
  } catch (error) {
    console.log("error:", error);
  }
})();
