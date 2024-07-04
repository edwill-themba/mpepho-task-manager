<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\TaskValidator;
use App\Models\Task;


class TaskController extends Controller
{

    public function __construct()
    {
        // removes all the abandoned task which date expired
        (new TaskValidator())->removeExpiredTasks();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = DB::table('users')
            ->join('tasks', 'users.id', '=', 'tasks.user_id')
            ->select('tasks.*', 'users.name', 'users.email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['tasks' => $tasks], 200);
    }

    /**
     * Display a listing of resourse of a user
     */
    public function user_tasks()
    {
        $myTasks = DB::table('tasks')
            ->where('tasks.user_id', '=', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['myTasks' => $myTasks], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'task_name' => 'required|min:3|max:255',
            'task_date' => 'required|date|after:today',
            'priority' => 'required|min:3|max:255',
        ]);
        //get user input
        $task_name = $request->input('task_name');
        $task_date = $request->input('task_date');
        $user_id = Auth::user()->id;
        $supervisor_id = null;
        $priority = $request->input('priority');
        $status = 'incomplete';
        // checks if user has a task on this day
        $user_has_task = (new TaskValidator())->checkUserTask($user_id, $task_date);
        if ($user_has_task) {
            return response()->json(['message' => 'choose another date the users has a task on this date'], 422);
        }
        // insert user data
        $task = DB::table('tasks')->insert([
            'task_name' => $task_name,
            'task_date' => $task_date,
            'priority' => $priority,
            'user_id' => $user_id,
            'supervisor_id' => $supervisor_id,
            'status' => $status,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        return response()->json(['task' => $task], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = DB::table('tasks')
            ->where('id', $id)
            ->get();
        return response()->json(['task' => $task], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->validate($request, [
            'task_name' => 'required|min:3|max:255',
            'task_date' => 'required|date|after:today',
            'priority' => 'required|min:3|max:255',
            'status' => 'required|min:3|max:255'
        ]);
        //get user input
        $task_name = $request->input('task_name');
        $task_date = $request->input('task_date');
        $user_id = Auth::user()->id;
        $supervisor_id = null;
        $priority = $request->input('priority');
        $status = $request->input('status');
        $task = Task::find($id);
        if (Auth::user()->id == $task->user_id) {
         // checks if user has a task on this day
            $user_has_task = (new TaskValidator())->checkUserTask($user_id, $task_date);
            if ($user_has_task && $task->id != $id) {
                return response()->json(['message' => 'choose another date the users has a task on this date'], 422);
            }
        //check status before updating 
        // if status is complete it inserts the task to complete_tasks table and delete under tasks
            if ($status == 'complete') {
                $task_status = (new TaskValidator())->checkCompleteTask($id);
                return response()->json(['massage' => 'thank you for completing this task'], 200);
            } else {
                \DB::table('tasks')
                    ->where('id', $id)
                    ->update([
                        'task_name' => $task_name,
                        'task_date' => $task_date,
                        'priority' => $priority,
                        'status' => $status,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                return response()->json(['message' => 'task was successfully updated'], 200);
            }
        } else {
            return response()->json(['message' => 'UnAuthorized'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        //check if user is authorized
        if (Auth::user()->id == $task->user_id) {
            $results = (new TaskValidator())->incompleteTasks($id);
            if ($results) {
                return response()->json(['message' => 'task was deleted successfully'], 200);
            }
        } else {
            return response()->json(['message' => 'UnAuthorized'], 401);
        }
    }

    /**
     * Search the specific resource from storage
     * 
     * @param query
     */
    public function search(string $query)
    {
        $search_results = DB::table('tasks')
            ->where('task_name', 'like', '%' . $query . '%')
            ->orWhere('task_date', 'like', '%' . $query . '%')
            ->get();


        return response()->json(['search_results' => $search_results], 200);
    }
}
