// start each promise from tasks each time an specific count at the same time

const createTask = (id, delay) => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(id);
    }, delay);
  });

const tasks = [
  createTask(1, 10000),
  createTask(2, 5000),
  createTask(3, 2000),
  createTask(4, 8000),
  createTask(5, 3000),
];

const promisePool = async (tasks, limit) => {
  const results = [];
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex++;

      results[currentIndex] = await tasks[currentIndex]();
    }
  };

  const workers = [];

  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  return results;
};

(async () => {
  try {
    const results = await promisePool(tasks, 2);

    console.log({ results });
  } catch (e) {
    console.log("error rejected", e);
  }
})();
