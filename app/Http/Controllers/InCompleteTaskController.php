<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

class InCompleteTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomplete_tasks = DB::table('in_complete_tasks')
            ->where('user_id', Auth::user()->id)
            ->get();
        return response()->json(['incomplete_tasks' => $incomplete_tasks], 200);
    }


}
