const lists = document.getElementById("lists");
const input = document.getElementById("input");
const add = document.getElementById("add");
const clear = document.getElementById("clear");
const filterButtons = document.querySelectorAll(".filter button");

add.addEventListener("click", () => {
  const itemText = input.value;

  if (itemText !== "") {
    const newListItem = document.createElement("li");
    newListItem.textContent = itemText;

    //toggle done on click
    newListItem.addEventListener("click", (e) => {
      if (!e.target.classList.contains("delete")) {
        newListItem.classList.toggle("done");
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    newListItem.appendChild(deleteBtn);

    lists.appendChild(newListItem);
    input.value = "";
  }
});

//clear all
clear.addEventListener("click", () => {
  lists.innerHTML = "";
});

//delete one
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  }
});

//allow enter key to add to list
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add.click();
  }
});

//filtering
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tasks = lists.querySelectorAll("li");
    tasks.forEach((task) => {
      switch (btn.id) {
        case "all":
          task.style.display = "flex";
          break;
        case "pending":
          task.style.display = task.classList.contains("done")
            ? "none"
            : "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("done")
            ? "flex"
            : "none";
          break;
      }
    });
  });
});
