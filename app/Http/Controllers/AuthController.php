<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use DB;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Adds new user to the database
     * 
     * @return user
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => ' required|min:3|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5|max:100|confirmed'
        ]);
        //creates an instance of a user
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role_id = 2; // default subordinate
        $user->save();
        //create a token associated with a user
        $token = $user->createToken('registration_token')->plainTextToken;
        // returns user and token if created
        return response()->json(['user' => $user, 'token' => $token], 201);
    }
    /**
     * Authenticate the user by issuing a token
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $user->createToken($request->header('User-Agent'))->plainTextToken;
    }
    /**
     * Remove the token authenticate the current request
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'you have successfully logged out'], 200);
    }

    /**
     * Display a listing of all users that are surbordiates
     */
    public function allusers()
    {
        // check if the user is a supervisor
        if (Auth::user()->role_id == 1) {
            $users = DB::table('users')
                ->where('role_id', 2)
                ->get();
            return response()->json(['users' => $users], 200);
        } else {
            return response()->json(['message' => 'Not Authorized'], 401);
        }
    }

    /**
     * Search a resource on the database
     * @param query
     * @return results
     */
    public function search(string $query)
    {
        if (Auth::user()->role_id == 1) {
            $search_results = DB::table('users')
                ->where('name', 'like', '%' . $query . '%')
                ->orWhere('email', 'like', '%' . $query . '%')
                ->get();
            return response()->json(['search_results' => $search_results], 200);
        } else {
            return response()->json(['message' => 'Not Authorized'], 401);
        }
    }
}
