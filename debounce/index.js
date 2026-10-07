const search = (query) => {
  console.log("API call:", query);
};

const debounce = (api, delay) => {
  let timer = null;

  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      api.apply(this, args);
      timer = null;
    }, delay);
  };
};

const debouncedSearch = debounce(search, 1000);

debouncedSearch("r");
debouncedSearch("re");
debouncedSearch("rea");
debouncedSearch("reac");
debouncedSearch("react");
debouncedSearch("react 2");
debouncedSearch("react 3");
