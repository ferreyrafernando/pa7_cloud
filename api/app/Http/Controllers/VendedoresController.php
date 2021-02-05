<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Vendedor;
use Illuminate\Http\Request;


class VendedoresController extends Controller
{
   
    protected $user;
 
   
    public function index()
    {
        return Vendedor::all();
    }
 
    public function show($id)
    {
        $vendedor = Vendedor::find($id);
    
        if (!$vendedor) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Vendedor with id ' . $id . ' cannot be found'
            ], 400);
        }
    
        return $vendedor;
    }
    
}