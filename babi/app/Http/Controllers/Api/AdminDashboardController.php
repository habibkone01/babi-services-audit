<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestataire;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Stats principales
        $stats = [
            'total_utilisateurs'  => DB::table('utilisateurs')->count(),
            'total_prestataires'  => Prestataire::where('statut', 'valide')->count(),
            'reservations_mois'   => DB::table('reservations')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            'volume_traite'       => DB::table('reservations')
                ->join('services', 'reservations.id_service', '=', 'services.id_service')
                ->whereMonth('reservations.created_at', now()->month)
                ->sum('services.tarif'),
        ];

        // Reservations par mois (12 derniers mois)
        $reservations_par_mois = DB::table('reservations')
            ->selectRaw('MONTH(created_at) as mois, COUNT(*) as total')
            ->whereYear('created_at', now()->year)
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        // Activité récente
        $activite_recente = [
            'derniers_utilisateurs' => DB::table('utilisateurs')
                ->latest()
                ->limit(5)
                ->get(),
            'dernieres_reservations' => DB::table('reservations')
                ->where('statut', 'confirmee')
                ->latest()
                ->limit(5)
                ->get(),
            'derniers_avis' => DB::table('avis')
                ->latest()
                ->limit(5)
                ->get(),
        ];

        // Prestataires à valider
        $a_valider = Prestataire::with('categorie')
            ->where('statut', 'en_attente')
            ->latest()
            ->get();

        return response()->json([
            'stats'                 => $stats,
            'reservations_par_mois' => $reservations_par_mois,
            'activite_recente'      => $activite_recente,
            'a_valider'             => $a_valider,
        ]);
    }

    public function validerPrestataire(string $id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->update(['statut' => 'valide']);
        return response()->json(['message' => 'Prestataire validé']);
    }

    public function rejeterPrestataire(string $id)
    {
        $prestataire = Prestataire::findOrFail($id);
        $prestataire->update(['statut' => 'rejete']);
        return response()->json(['message' => 'Prestataire rejeté']);
    }
}