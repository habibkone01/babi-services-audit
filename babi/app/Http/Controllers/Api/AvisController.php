<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Http\Requests\Avis\StoreAvisRequest;
use App\Http\Requests\Avis\UpdateAvisRequest;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Avis::with(['utilisateur', 'reservation'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAvisRequest $request)
    {
        $avis = Avis::create($request->validated());
        return response()->json($avis, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $avis = Avis::with(['utilisateur', 'reservation'])->findOrFail($id);
        return response()->json($avis);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAvisRequest $request, string $id)
    {
        $avis = Avis::findOrFail($id);
        $avis->update($request->validated());
        return response()->json($avis);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $avis = Avis::findOrFail($id);
        $avis->delete();
        return response()->json(['message' => 'Avis supprimé']);
    }
}
