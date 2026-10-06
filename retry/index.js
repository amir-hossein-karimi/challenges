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

const retry = async (api, times) => {
  let attempt = 0;

  while (attempt <= times) {
    try {
      return await api();
    } catch (error) {
      if (attempt === times) {
        throw error;
      }

      attempt++;

      console.log(`Retrying in ${attempt} second(s)...`);

      await sleep(attempt * 1000);
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
