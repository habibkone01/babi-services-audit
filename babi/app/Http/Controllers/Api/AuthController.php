<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Utilisateur;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $utilisateur = Utilisateur::create([
            'nom'          => $request->nom,
            'prenom'       => $request->prenom,
            'email'        => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'telephone'    => $request->telephone,
            'adresse'      => $request->adresse,
            'role'         => 'client',
        ]);

        $token = $utilisateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $utilisateur,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if (!$utilisateur || !Hash::check($request->mot_de_passe, $utilisateur->mot_de_passe)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        $token = $utilisateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $utilisateur,
            'token' => $token,
        ]);
    }

    public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function me(): JsonResponse
    {
        return response()->json(auth()->user());
    }
}
