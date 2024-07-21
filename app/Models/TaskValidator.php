<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;
use DB;

class TaskValidator extends Model
{
    use HasFactory;
    /**
     * removes all the expired and abandonned
     * by users
     */
    public function removeExpiredTasks()
    {
        $today = now();
        \DB::table('tasks')->where('task_date', '<', $today)->delete();
    }
    /**
     * checks if user has task deadline on the date
     * 
     * @param user_id,date
     * @return boolean
     */
    public function checkUserTask($user_id, $task_date)
    {
        $found = false;
        $tdates = DB::table('tasks')
            ->select('task_date')
            ->where('user_id', $user_id)
            ->get();
        // loop dates
        foreach ($tdates as $date) {
            if ((substr($date->task_date, 0, 10)) == (substr($task_date, 0, 10))) {
                $found = true;
                break;
            }
        }
        if ($found) {
            return 1;
        } else {
            return 0;
        }
    }
    /**
     * checks task id and id for update purpose
     * if are ids are same means is a same task
     * 
     * @param id
     * @param task_id
     * @return integer
     */
    public function getTaskID($task)
    {
        $task_id = DB::table('tasks')
            ->select('id')
            ->where('task_date', $task->task_date)
            ->get();

        return $task_id;
    }
    /**
     * check if users has completed task
     * 
     * @param id
     */
    public function checkCompleteTask($id)
    {
        //updates status and set it to complete 
        \DB::table('tasks')
            ->where('id', $id)
            ->update(['status' => 'complete']);
        // gets the records of the id 
        $task_record = DB::table('tasks')
            ->where('id', $id)
            ->get();
        // insert task to complete task table
        foreach ($task_record as $task) {
            \DB::table('complete_tasks')
                ->insert([
                    'task_name' => $task->task_name,
                    'task_date' => $task->task_date,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'user_id' => $task->user_id,
                    'supervisor_id' => $task->supervisor_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        }
        // deletes the task from tasks table
        \DB::table('tasks')->where('id', $id)->delete();

    }
    /**
     * inserts into incomplete tasks table
     * removes from the tasks table
     * 
     * @param id
     * @return boolean
     */
    public function incompleteTasks($id)
    {
        // get the records of the task
        $task_record = DB::table('tasks')
            ->where('id', $id)
            ->get();

        foreach ($task_record as $task) {
            \DB::table('in_complete_tasks')
                ->insert([
                    'task_name' => $task->task_name,
                    'task_date' => $task->task_date,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'user_id' => $task->user_id,
                    'supervisor_id' => $task->supervisor_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
        }

        $results = DB::table('tasks')->where('id', $id)->delete();

        if ($results) {
            return true;
        }
    }
    /**
     * checks if user to get task is supervisor 
     * if users supervisor the operation will not
     * continue
     * 
     * @param id
     * @return string
     */
    public function isUserSupervisor($id)
    {
        $r_id = 0;
        $is_supervisor = DB::table('users')
            ->select('role_id')
            ->where('id', $id)
            ->get();

        foreach ($is_supervisor as $role) {
            $r_id = $role->role_id;
        }
        return $r_id;
    }

}
