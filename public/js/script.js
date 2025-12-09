const rows = document.querySelectorAll(".row");
const list = document.querySelector(".list");

rows.forEach((row) => {
  // Check items
  const check = row.querySelector(".check");
  const item = row.querySelector(".item");
  // check.addEventListener("click", function () {
  //   item.classList.toggle("done");
  // });

  // Drag and Drop
  row.addEventListener("dragstart", () => {
    row.classList.add("dragging");
  });

  row.addEventListener("dragend", () => {
    row.classList.remove("dragging");
  });
});

list.addEventListener("dragover", function (e) {
  e.preventDefault(); // enable dropping
  const afterElement = getDragAfterElement(list, e.clientY); // clientY = mouse position
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    list.appendChild(draggable);
  } else {
    list.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll(".row:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
