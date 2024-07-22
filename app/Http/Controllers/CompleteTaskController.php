<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Models\CompleteTask;

class CompleteTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $complete_tasks = DB::table('complete_tasks')
            ->where('user_id', Auth::user()->id)
            ->get();

        return response()->json(['complete_tasks' => $complete_tasks], 200);
    }
    /**
     * Remove the all resource from storage.
     */
    public function destroyAll(string $user_id)
    {
        if (Auth::user()->id == $user_id) {
            \DB::table('complete_tasks')
                ->where('user_id', $user_id)
                ->delete();
            return response()->json(['message' => 'all tasks was removed successfully'], 200);
        } else {
            return response()->json(['message' => 'Not Authorized'], 401);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = CompleteTask::find($id);
        if (Auth::user()->id == $task->user_id) {
            \DB::table('complete_tasks')
                ->where('id', $id)
                ->delete();
            return response()->json(['message' => 'task was removed successfully'], 200);
        } else {
            return response()->json(['message' => 'Not Authorized'], 401);
        }
    }
}
