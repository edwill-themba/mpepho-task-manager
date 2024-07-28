<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Models\TaskValidator;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Mail;
use App\Mail\TaskUpdateMail;

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
            ->join('tasks', function (JoinClause $join) {
                $join->on('users.id', 'tasks.user_id')
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
        $task = new Task;
        $task->task_name = $request->input('task_name');
        $task->task_date = $request->input('task_date');
        $task->user_id = $id;
        $task->supervisor_id = Auth::user()->id;
        $task->priority = $request->input('priority');
        $task->status = 'incomplete';
        // checks if user is a supervisor and user assign to task is a subordinate
        if (Auth::user()->role_id == 1) {
            $user_has_task = (new TaskValidator())->checkUserTask($task->user_id, $task->task_date);
            if ($user_has_task) {
                return response()->json(['message' => 'choose another date the users has a task on this date'], 422);
            }
            // insert and save user data
            $task->save();
            // gets the user
            $user = User::where('id', $task->user_id)->get();
            // gets the supervisor
            $supervisor = User::where('id', Auth::user()->id)->get();
            // data to be send with email
            $data = array(
                'user_name' => $user[0]->name,
                'supervisor' => $supervisor[0]->name,
                'task_name' => $request->input('task_name'),
                'task_date' => $request->input('task_date')
            );
            // sends email to user
            \Mail::to($user[0]->email)->send(new TaskUpdateMail($data));
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
        $task->task_name = $request->input('task_name');
        $task->task_date = $request->input('task_date');
        $task->priority = $request->input('priority');
        $task->status = $request->input('status');
        //check if auth user is a supervisor
        if ($task->user_id == Auth::user()->id || $task->supervisor_id == Auth::user()->id) {
            // if status is complete it inserts the task to complete_tasks table and delete under tasks
            if ($task->status == 'complete') {
                $task_status = (new TaskValidator())->checkCompleteTask($id);
                return response()->json(['massage' => 'thank you for completing this task'], 200);
            } else {
                $task->save();
                 // gets the user
                $user = User::where('id', $task->user_id)->get();
                // gets the supervisor
                $supervisor = User::where('id', Auth::user()->id)->get();
                // data to be send with email
                $data = array(
                    'user_name' => $user[0]->name,
                    'supervisor' => $supervisor[0]->name,
                    'task_name' => $request->input('task_name'),
                    'task_date' => $request->input('task_date')
                );
                // sends email to user
                \Mail::to($user[0]->email)->send(new TaskUpdateMail($data));
                return response()->json(['task' => $task], 200);
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
        // find the task
        $task = Task::find($id);
        // checks if auth user is supervisor
        if ($task->user_id == Auth::user()->id || $task->supervisor_id == Auth::user()->id) {
            $results = (new TaskValidator())->incompleteTasks($id);
            if ($results) {
                return response()->json(['message' => 'task was deleted successfully'], 200);
            }
        } else {
            return response()->json(['message' => 'UnAuthorized'], 401);
        }
    }
}
