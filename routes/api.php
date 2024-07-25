<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SupervsorTaskController;
use App\Http\Controllers\InCompleteTaskController;
use App\Http\Controllers\CompleteTaskController;
use App\Models\InCompleteTask;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// public routes
Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::get('task/search/{name}', [TaskController::class, 'search']);

Route::prefix('users')->group(function () {
    Route::get('tasks', [TaskController::class, 'index']);
});

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    //incomplete tasks
    Route::get('incomplete_tasks', [InCompleteTaskController::class, 'index']);
    Route::delete('incomplete_task/{id}', [InCompleteTaskController::class, 'destroy']);
    Route::delete('incomplete_task/all/{user_id}', [InCompleteTaskController::class, 'destroyAll']);
    // complete task
    Route::get('complete_tasks', [CompleteTaskController::class, 'index']);
    Route::delete('complete_task/{id}', [CompleteTaskController::class, 'destroy']);
    Route::delete('complete_task/all/{user_id}', [CompleteTaskController::class, 'destroyAll']);
    // shows all surbordiates
    Route::get('allusers', [AuthController::class, 'allusers']);
    // searches a specific user
    Route::get('user/search/{name}', [AuthController::class, 'search']);
    // tasks that for users
    Route::prefix('users')->group(function () {
        Route::get('mytasks', [TaskController::class, 'user_tasks']);
        Route::post('task', [TaskController::class, 'store']);
        Route::get('task/{id}', [TaskController::class, 'show']);
        Route::put('task/{id}', [TaskController::class, 'update']);
        Route::delete('task/{id}', [TaskController::class, 'destroy']);
    });
    // supervisor routes
    Route::prefix('supervisors')->group(function () {
        Route::get('my_supervisor_task', [SupervsorTaskController::class, 'supervisors_tasks']);
        Route::get('users', [SupervsorTaskController::class, 'index']);
        Route::get('user/{id}', [SupervsorTaskController::class, 'show_user']);
        Route::post('task/user/{id}', [SupervsorTaskController::class, 'store']);
        Route::put('task/{id}', [SupervsorTaskController::class, 'update']);
        Route::delete('task/{id}', [SupervsorTaskController::class, 'destroy']);
    });
    // check if user a task if user wants to update
    Route::get('user_has_task/{user_id}/{task_date}', [TaskController::class, 'chechTaskDate']);
});


