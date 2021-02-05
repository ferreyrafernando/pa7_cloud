<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('login', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {

                return response()->json([
                                'success' => false,
                                'message' => 'Credenciales Incorrectas',
                                'token' => '',
                                'token_type' => '',
                                'expires_in' => ''
                            ], 400);

                //return response()->json(['success' => false, 'error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json([
                                'success' => false,
                                'message' => 'No se pudo generar token',
                                'token' => '',
                                'token_type' => '',
                                'expires_in' => ''
                            ], 500);
            //return response()->json(['success' => false, 'error' => 'could_not_create_token'], 500);
        }


		return response()->json([
            'success' => true,
            'message' => 'Token generado correctamente',
            'token' => $token,
            'token_type' => 'bearer',
            'user_data' => Auth::user(),
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
        //return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    public function getAuthenticatedUser()
    {
        try {

                if (! $user = JWTAuth::parseToken()->authenticate()) {
                        return response()->json(['success' => false, 'error' => 'user_not_found'], 404);
                }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                return response()->json(['success' => false, 'error' => 'token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                return response()->json(['success' => false, 'error' => 'token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

                return response()->json(['success' => false, 'error' => 'token_absent'], $e->getStatusCode());

        }

        return response()->json(['success' => true, 'user' => $user]);
    }

     public function guard()
    {
        return Auth::guard();
    }
}