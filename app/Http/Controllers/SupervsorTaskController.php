<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\TaskValidator;
use App\Models\Task;

class SupervsorTaskController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role_id == 1) {
            $users = DB::table('users')->get();
            return response()->json(['users' => $users], 200);
        } else {
            return response()->json(['message' => 'UnAuthorized, only supervisors can view other users'], 401);
        }
    }

    /**
     * Display a listing of the resource for a user
     * 
     */
    public function supervisors_tasks()
    {
        $supervisor_tasks = DB::table('users')
            ->join('tasks', function ($join) {
                $join->on('users.id', '=', 'tasks.user_id')
                    ->where('tasks.supervisor_id', '=', Auth::user()->id);
            })
            ->get();
        return response()->json(['supervisor_tasks' => $supervisor_tasks], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show_user(string $id)
    {
        $user = DB::table('users')
            ->where('id', $id)
            ->get();
        return response()->json(['user' => $user], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $this->validate($request, [
            'task_name' => 'required|min:3|max:255',
            'task_date' => 'required|date|after:today',
            'priority' => 'required|min:3|max:255',
        ]);
        //get user input
        $task_name = $request->input('task_name');
        $task_date = $request->input('task_date');
        $user_id = $id;
        $supervisor_id = Auth::user()->id;
        $priority = $request->input('priority');
        $status = 'incomplete';
        // checks if user is authorized
        if (Auth::user()->role_id === 1) {
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
        } else {
            return response()->json(['message' => 'unAuthorized'], 401);
        }
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
        // gets the task
        $task = Task::find($id);
        //get user input
        $task_name = $request->input('task_name');
        $task_date = $request->input('task_date');
        $user_id = $task->user_id;
        $supervisor_id = Auth::user()->id;
        $priority = $request->input('priority');
        $status = $request->input('status');
        //find the task and get user id
        if (Auth::user()->role_id == 1 && $task->supervisor_id == Auth::user()->id) {
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
            return response()->json(['message' => 'unAuthorized'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);
        if (Auth::user()->role_id == 1 && Auth::user()->id == $task->supervisor_id) {
            $results = (new TaskValidator())->incompleteTasks($id);
            if ($results) {
                return response()->json(['message' => 'task was deleted successfully'], 200);
            }
        } else {
            return response()->json(['message' => 'UnAuthorized'], 401);
        }
    }
}
