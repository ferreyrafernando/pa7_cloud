<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\OficialSubite;
use Illuminate\Http\Request;


class OficialesController extends Controller
{
   
    protected $user;
 
   
    public function index()
    {
        return OficialSubite::all();
    }
 
    public function show($id)
    {
        $oficial = OficialSubite::find($id);
    
        if (!$oficial) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Oficial with id ' . $id . ' cannot be found'
            ], 400);
        }
    
        return $oficial;
    }
    
}