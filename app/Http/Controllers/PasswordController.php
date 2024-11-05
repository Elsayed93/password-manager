<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;

class PasswordController extends Controller
{

    // TODO correct the docs here, return ...
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        return $request->user()->passwords;
    }

    /**
     * Store a newly created resource in storage
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform_name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'encrypted_password' => 'required|string|max:30',
            'notes' => 'nullable|string',
        ]);

        $password = $request->user()->passwords()->create($validated);

        return response()->json($password);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Password $password
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Password $password)
    {
        $validated = $request->validate([
            'platform_name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'encrypted_password' => 'required|string|max:30',
        ]);

        $password->update($validated);

        return response()->json($password);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Password $password
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Password $password)
    {        
        $password->delete();

        return response()->json(['message' => 'Password deleted']);
    }
}
