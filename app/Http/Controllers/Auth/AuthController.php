<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    protected $maxLoginAttempts = 10;
    protected $lockoutTime = 300;
 
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'refresh', 'logout']]);
    }

    public function username()
    {
        return 'email';
    }

    protected function validateLogin(Request $request)
    {
        
        $this->validate($request, app(LoginRequest::class)->rules());
    }

    
    protected function attemptLogin(Request $request)
    {
        $credentials = $this->validate($request, app(LoginRequest::class)->rules());

        if (!$token = auth()->attempt($credentials)) {
            return false;
        }
        
        return true;
    }

    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);
        return response()->json([
            'access_token' => (string) auth()->getToken(),
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    protected function hasTooManyLoginAttempts(Request $request)
    {
       return $this->limiter()->tooManyAttempts(
           $this->throttleKey($request), $this->maxLoginAttempts, $this->lockoutTime
       );
    }

    public function me()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        auth()->logout(); 

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}