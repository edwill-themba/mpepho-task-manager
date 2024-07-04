<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;

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


}
