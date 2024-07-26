# EDWILL TASK MANAGEMENT SYSTEM
# PROGRAMMER EDWILL THEMBA 
# TECHNOLOGIES AND REQUIREMENTS
 1. Back-end (PHP) Laravel
 2. Front-end Vue
 3. MySQL or Mariadb
 4. Node/npm/yarn
# HOW TO RUN THE APPLICATION
1. Download the application from github repository and place it on the folder where your
   local web projects resides for example in windows C:/xampp/htdocs/project-folder or
   linux  /var/www/html/project-folder/
2. Create a database called taskdb, if you have password and different user name modify 
   the .env file and database username on DB_USERNAME= and password on DB_PASSWORD=
3. Open terminal or cmd and navigate to project folder eg  C:/xampp/htdocs/projet-folder
   or  /var/www/html/project-folder/
   - Run this command: composer install  
   - Run this command: npm install /or yarn install
4. Run this command: php artisan serve
5. Run the: php artisan migrate to create the tables
6. Run the: php artisan db:seed to seed the tables with data.
7. Open another terminal and navigate to project folder and run this command: npm run dev
8. After the npm run dev command is executed, open a browser of choice and paste this url
   http://localhost:8000/
# HOW THE APPLICATION IS STRUCTURED
1. Back-end
- 6 Controllers
a.Auth Controller
 -register,login,logout,allusers are subordinates when supervisor want create task and 
  search when seaching a user
b.Complete Task  Controller  
 -index display complete tasks for that user,destroy and destroyAll
c.Incomplete Task Controller
 -index display incomplete tasks for that user,destroy and destroyAll
d. Task Controller
 -index all pending tasks,user_tasks,store,show,update,destroy,search and checkTaskDate
e. Supervisor Task controller
-index,supervisors_task,show_use,store,update,destroy
- 7 Models
a.CompleteTask
b.InCompleteTask
c.Role - associated with role table
d.SupervisorTask
e Task
f.TaskValidator - responsible for validation tasks 
g.User
2. Front-end
a.Vue
b.Vuex
  -  with 6 modules
    auth,application,completeTask,incompleteTask,supervisorTask and tasks
3. Database
  I have added four tables to laravel built in tables
  -roles,tasks,complete_tasks and in_complete_tasks.
# HOW THE APPLICATION WORKS

# RULES
 1. This is task management system that allow users(subordinates) and supervisors to manage tasks, for example both subordinates and supervisors can create, read, update and delete their own tasks.
 2. Supervisors can create, read, update and delete tasks for users(subordinates) that they created for that user, but supervisors cannot have an access to a task create by other supervisors to a user and supervisors can create a task for another supervisor.
 3. You cannot have two or more tasks that are due to the same day,If you try to do that the system will allow you to do that or create a task with date that has expired for example yesterday date.
 4. Tasks that have been ignored if their date comes and pass, are automatically deleted  put under that user incomplete tasks.
 5. Tasks that are completed are placed in that user complete tasks.

