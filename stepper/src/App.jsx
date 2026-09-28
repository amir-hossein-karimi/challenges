import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [itemsList, setItemsList] = useState({
    items: [...Array(9)].map(() => false),
    indexOrder: [],
  });

  console.log({ itemsList });

  const handleClick = (index) => () => {
    console.log({ index });
    if (!itemsList.items[index]) {
      setItemsList((prev) => ({
        items: [...prev.items].map((_, i) => i === index || _),
        indexOrder: [...prev.indexOrder, index],
      }));
    }
  };

  useEffect(() => {
    if (itemsList.items.every((i) => i)) {
      for (let step = 0; step < itemsList.indexOrder.length; step++) {
        const index = itemsList.indexOrder[step];
        setTimeout(() => {
          setItemsList((prev) => ({
            items: [...prev.items].map((_, i) => (i === index ? false : _)),
            indexOrder: prev.indexOrder.filter((x) => x !== index),
          }));
        }, (step + 1) * 1000);
      }
    }
  }, [itemsList]);

  return (
    <div style={{ display: "flex", gap: "32px" }}>
      {itemsList.items.map((item, index) => (
        <div
          onClick={handleClick(index)}
          key={index}
          style={{
            width: "100px",
            height: "100px",
            border: item ? "1px solid red" : "1px solid black",
          }}
        >
          {`${item}`}
        </div>
      ))}
    </div>
  );
}

export default App;
