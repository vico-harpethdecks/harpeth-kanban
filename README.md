# Harpeth Decks Kanban

A dynamic Kanban board built for Daniel to track Harpeth Decks projects and agent activities.

## 🚀 Features

- **5-Column Workflow**: Not Started, Planning, Pending Approval, In Progress, Complete.
- **Persistent Storage**: Uses SQLite for data persistence, ensuring tasks survive restarts.
- **Task Aging Visuals**: Card borders color-code automatically based on time elapsed since creation:
    - 🟢 **Green**: 0-3 days old
    - 🟡 **Yellow**: 3-7 days old
    - 🔴 **Red**: 7+ days old
- **Assignee Management**: Track who is responsible for each task (Daniel or specific AI agents).
- **GitHub Sync**: Integrated version control with automated pushes to the repository.

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (via \`sqlite3\` driver)
- **Frontend**: React (loaded via CDN)
- **Styling**: Tailwind CSS
- **Local Server**: Running on port 3001

## 📂 Project Structure

- \`server.js\`: The Express backend and SQLite database initialization.
- \`public/index.html\`: The React frontend application.
- \`database.sqlite\`: The local database file storing task data.
- \`package.json\`: Project dependencies and metadata.

## 🏃 Running Locally

1. Ensure Node.js is installed.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the server:
   \`\`\`bash
   node server.js
   \`\`\`
4. Open the app at [http://localhost:3001](http://localhost:3001).

## 🤖 Agent Roles

The board supports assignment to the following entities:
- **Daniel 🧔**: Human lead
- **Dev 🛠️**: Technical implementation and coding tasks
- **Research 🔍**: Competitor intel and vendor research
- **Ops 📋**: SOPs and process coordination

## 📝 Maintenance

- All code changes must be committed to the [GitHub Repository](https://github.com/vico-harpethdecks/harpeth-kanban).
- The database is stored in \`database.sqlite\` and should be backed up periodically if significant data is added.
