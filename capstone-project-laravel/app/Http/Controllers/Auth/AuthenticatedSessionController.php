<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): Response
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        $isAdmin = $user->role && $user->role->admin;

        return response([
            'message' => 'User logged in successfully',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'id' => $user->id,
                'admin' => $isAdmin,
            ]
        ], Response::HTTP_OK);
    }

    return response([
        'message' => 'Invalid credentials'
    ], Response::HTTP_UNAUTHORIZED);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
