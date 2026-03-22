project url - https://roadmap.sh/projects/task-tracker

This is a backend project

# 📝 Task Tracker CLI

A lightweight, zero-dependency Command Line Interface (CLI) built with **Node.js** to manage your daily tasks. This tool uses a local JSON file to persist your data, ensuring your tasks are saved even after you close your terminal.

---

## 🚀 Features
* **Add Tasks:** Quickly create new tasks with unique UUIDs.
* **Update Tasks:** Modify descriptions for existing tasks using their ID.
* **Delete Tasks:** Remove tasks permanently from your list.
* **List & Filter:** View all tasks in a clean table format or filter them by status (`todo`, `in-progress`, `done`).
* **Persistent Storage:** Data is stored locally in `data/config.json`.

---

## 🛠️ Installation

1.  **Clone the repository:**
    ```bash
    git clone 
    cd task-tracker-cli
    ```

2.  **Set up the data directory:**
    The app expects a `data/config.json` file. If it doesn't exist, create it:
    ```bash
    mkdir data
    echo "[]" > data/config.json
    ```

3.  **Link the CLI globally:**
    This allows you to run the `task-cli` command from any directory on your computer.
    ```bash
    npm link
    ```

---

## 📖 Usage

Once linked, use the following commands in your terminal:

### 1. Adding a Task
```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)
# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1
# Listing all tasks
task-cli list
# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
Task Properties
Each task should have the following properties: