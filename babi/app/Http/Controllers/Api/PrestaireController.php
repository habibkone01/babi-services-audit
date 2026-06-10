<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestataire;
use Illuminate\Http\Request;

class PrestaireController extends Controller
{
    public function index()
    {
        return response()->json(Prestataire::with('services')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom'          => 'required|string|max:100',
            'prenom'       => 'required|string|max:100',
            'email'        => 'required|email|unique:prestataires',
            'telephone'    => 'nullable|string|max:20',
            'specialite'   => 'required|string|max:100',
            'localisation' => 'nullable|string|max:255',
            'disponible'   => 'boolean',
        ]);

        $prestataire = Prestataire::create($validated);
        return response()->json($prestataire, 201);
    }

    public function show($id)
    {
        $prestataire = Prestataire::with('services')->findOrFail($id);
        return response()->json($prestataire);
    }

    public function update(Request $request, $id)
    {
        $prestataire = Prestataire::findOrFail($id);

        $validated = $request->validate([
            'nom'          => 'sometimes|string|max:100',
            'prenom'       => 'sometimes|string|max:100',
            'email'        => 'sometimes|email|unique:prestataires,email,' . $id . ',id_prestataire',
            'telephone'    => 'nullable|string|max:20',
            'specialite'   => 'sometimes|string|max:100',
            'localisation' => 'nullable|string|max:255',
            'disponible'   => 'boolean',
        ]);

        $prestataire->update($validated);
        return response()->json($prestataire);
    }

    public function destroy($id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->delete();
        return response()->json(['message' => 'Prestataire supprimé']);
    }
}