# Installation Guidelines
## 1. Clone the repository
git clone https://github.com/gdgmit/SCanteen-GDGOpenMitation-WebUIs.git
## 2. Pull the latest changes from the main branch
Navigate to the cloned folder,

git checkout main

git pull origin main
## 3. Install the dependencies
npm install
## 4. Run the project
npm run dev

Now you can see 3 buttons for each user in the homepage. Write your code in the corresponding user's folder that is, components/[username]

# Task Submission
After the completion of your tasks,
## 1. Navigate to your branch
git checkout task[task_num]

Note: Replace [task_num] with the specific task number (e.g., task1)
## 2. Commit your changes
git add .

git commit -m "Describe the changes made for task[task_num]"
## 3. Push your branch to the remote repository
git push origin task[task_num]
## 4. Create a pull request(PR) to the main branch
