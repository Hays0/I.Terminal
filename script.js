const input = document.getElementById("input");
const output = document.getElementById("output");

// Load stored data or create empty object
let store = JSON.parse(localStorage.getItem("terminalStore")) || {};

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const command = input.value.trim();
    handleCommand(command);
    input.value = "";
  }
});


function handleCommand(command) {
  print("> " + command);

  const parts = command.split(" ");
  const cmd = parts[0];

  if (cmd === "help") {
    print("Commands: help, set, get, delete, list, clear");
  }

  else if (cmd === "set") {
    const key = parts[1];
    const value = parts.slice(2).join(" ");
    store[key] = value;
    save();
    print("Saved.");
  }

  else if (cmd === "get") {
    const key = parts[1];
    print(store[key] || "Not found.");
  }

  else if (cmd === "delete") {
    const key = parts[1];
    delete store[key];
    save();
    print("Deleted.");
  }

  else if (cmd === "list") {
    print(JSON.stringify(store, null, 2));
  }

  else if (cmd === "clear") {
    output.innerHTML = "";
  }

  else {
    print("Unknown command.");
  }
}

function print(text) {
  output.innerHTML += text + "\n";
}

function save() {
  localStorage.setItem("terminalStore", JSON.stringify(store));
}

function showIntro() {
  print("Minimal Web Terminal v1.0");
  print("----------------------------------");
  print("Available Commands:");
  print("help   - Show commands");
  print("set    - Store a value");
  print("get    - Retrieve a value");
  print("delete - Remove a value");
  print("list   - Show all stored values");
  print("clear  - Clear terminal");
  print("");
}

showIntro();