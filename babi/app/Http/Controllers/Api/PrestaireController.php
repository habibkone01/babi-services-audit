<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestataire;
use App\Http\Requests\Prestataire\StorePrestaireRequest;
use App\Http\Requests\Prestataire\UpdatePrestaireRequest;

class PrestaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Prestataire::with('services')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrestaireRequest $request)
    {
        $prestataire = Prestataire::create($request->validated());
        return response()->json($prestataire, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $prestataire = Prestataire::with(['services', 'categorie'])->findOrFail($id);
        return response()->json($prestataire);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrestaireRequest $request, string $id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->update($request->validated());
        return response()->json($prestataire);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->delete();
        return response()->json(['message' => 'Prestataire supprimé']);
    }
}