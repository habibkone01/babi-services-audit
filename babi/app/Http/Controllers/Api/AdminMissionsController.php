<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;

class AdminMissionsController extends Controller
{
    public function index()
    {
        $missions = Reservation::with(['utilisateur', 'service.prestataire'])
            ->latest()
            ->get()
            ->map(fn($r) => [
                'id'          => $r->id_reservation,
                'service'     => $r->service?->nom_service,
                'client'      => trim(($r->utilisateur?->prenom ?? '') . ' ' . ($r->utilisateur?->nom ?? '')),
                'prestataire' => trim(($r->service?->prestataire?->prenom ?? '') . ' ' . ($r->service?->prestataire?->nom ?? '')),
                'date'        => $r->created_at,
                'montant'     => $r->service?->tarif,
                'statut'      => $r->statut,
            ]);

        return response()->json($missions);
    }
}