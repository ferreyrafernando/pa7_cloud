<?php

    namespace App\Http\Middleware;

    use Closure;
    use JWTAuth;
    use Exception;
    use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

    class JwtMiddleware extends BaseMiddleware
    {

        /**
         * Handle an incoming request.
         *
         * @param  \Illuminate\Http\Request  $request
         * @param  \Closure  $next
         * @return mixed
         */
        public function handle($request, Closure $next)
        {
            try {
                $user = JWTAuth::parseToken()->authenticate();
            } catch (Exception $e) {
                if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){


                    return response()->json([
                                'success' => false,
                                'message' => 'Token Invalido',
                                'token' => '',
                                'token_type' => '',
                                'expires_in' => ''
                            ], 401);

                    //return response()->json(['success' => false, 'status' => 'Token Invalido'], 401);
                }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                    //return response()->json(['success' => false, 'status' => 'Token Expirado'], 401);

                    return response()->json([
                                'success' => false,
                                'message' => 'Token Expirado',
                                'token' => '',
                                'token_type' => '',
                                'expires_in' => ''
                            ], 401);

                }else{
                    //return response()->json(['success' => false, 'status' => 'Token No Encontrado'], 401);
                    return response()->json([
                                'success' => false,
                                'message' => 'Token No Encontrado',
                                'token' => '',
                                'token_type' => '',
                                'expires_in' => ''
                            ], 401);
                }
            }
            return $next($request);
        }
    }