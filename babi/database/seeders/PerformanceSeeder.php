<?php

namespace Database\Seeders;

use App\Models\Avis;
use App\Models\Categorie;
use App\Models\Prestataire;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Utilisateur;
use Illuminate\Database\Seeder;

class PerformanceSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Categorie::factory()->count(10)->create();

        $prestataires = Prestataire::factory()
            ->count(100)
            ->sequence(fn ($sequence) => [
                'id_categorie' => $categories->random()->id_categorie,
            ])
            ->create();

        $services = Service::factory()
            ->count(500)
            ->sequence(fn ($sequence) => [
                'id_prestataire' => $prestataires->random()->id_prestataire,
                'id_categorie'   => $categories->random()->id_categorie,
            ])
            ->create();

        $utilisateurs = Utilisateur::factory()->count(1000)->create();

        $reservations = Reservation::factory()
            ->count(1200)
            ->sequence(fn ($sequence) => [
                'id_utilisateur' => $utilisateurs->random()->id_utilisateur,
                'id_service'     => $services->random()->id_service,
                'statut'         => collect(['confirmee', 'terminee', 'annulee'])->random(),
            ])
            ->create();

        $reservationsTerminees = $reservations->where('statut', 'terminee')->values();
        $avisCount = min(300, $reservationsTerminees->count());

        $reservationsTerminees->take($avisCount)->each(function ($reservation) {
            Avis::factory()->create([
                'id_reservation' => $reservation->id_reservation,
                'id_utilisateur' => $reservation->id_utilisateur,
            ]);
        });
    }
}
