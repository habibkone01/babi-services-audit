<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use App\Models\Prestataire;
use Illuminate\Http\Request;

class AdminUtilisateursController extends Controller
{
    public function index()
    {
        $utilisateurs = Utilisateur::withCount('reservations')->latest()->get();
        $prestataires = Prestataire::with('categorie')->latest()->get();

        return response()->json([
            'utilisateurs' => $utilisateurs,
            'prestataires' => $prestataires,
        ]);
    }

    public function destroy(string $id, Request $request)
    {
        $utilisateur = Utilisateur::findOrFail($id);

        if ($utilisateur->id_utilisateur === $request->user()->id_utilisateur) {
            return response()->json(['message' => 'Impossible de supprimer votre propre compte'], 403);
        }

        if ($utilisateur->reservations()->count() > 0) {
            return response()->json(['message' => 'Impossible de supprimer un utilisateur ayant des réservations'], 422);
        }

        $utilisateur->tokens()->delete();
        $utilisateur->delete();

        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    public function destroyPrestataire(string $id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->delete();
        return response()->json(['message' => 'Prestataire supprimé']);
    }
}