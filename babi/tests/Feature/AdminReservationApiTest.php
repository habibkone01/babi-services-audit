<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Prestataire;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminReservationApiTest extends TestCase
{
    public function test_admin_can_list_and_update_reservations(): void
    {
        $admin = Utilisateur::create([
            'nom' => 'Admin',
            'prenom' => 'Super',
            'email' => 'admin@example.com',
            'mot_de_passe' => Hash::make('password'),
            'telephone' => '0600000000',
            'adresse' => 'Paris',
            'role' => 'admin',
        ]);

        $client = Utilisateur::create([
            'nom' => 'Client',
            'prenom' => 'Jean',
            'email' => 'client@example.com',
            'mot_de_passe' => Hash::make('password'),
            'telephone' => '0611111111',
            'adresse' => 'Lyon',
            'role' => 'client',
        ]);

        $categorie = Categorie::create([
            'nom_categorie' => 'Beauté',
            'description' => 'Test',
        ]);

        $prestataire = Prestataire::create([
            'nom' => 'Durand',
            'prenom' => 'Paul',
            'email' => 'prestataire@example.com',
            'telephone' => '0622222222',
            'localisation' => 'Paris',
            'note_moyenne' => 4.5,
            'statut' => 'valide',
            'id_categorie' => $categorie->id_categorie,
        ]);

        $service = Service::create([
            'nom_service' => 'Coiffure',
            'description' => 'Test',
            'tarif' => 50,
            'disponibilite' => true,
            'id_prestataire' => $prestataire->id_prestataire,
            'id_categorie' => $categorie->id_categorie,
        ]);

        $reservation = Reservation::create([
            'date_reservation' => '2026-06-30',
            'heure_reservation' => '10:00:00',
            'statut' => 'en_attente',
            'id_utilisateur' => $client->id_utilisateur,
            'id_service' => $service->id_service,
        ]);

        $token = $admin->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin/reservations');

        $response->assertOk();
        $response->assertJsonFragment([
            'id_reservation' => $reservation->id_reservation,
        ]);

        $updateResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->patchJson('/api/admin/reservations/' . $reservation->id_reservation, [
                'statut' => 'confirmee',
            ]);

        $updateResponse->assertOk();
        $this->assertSame('confirmee', $reservation->fresh()->statut);
    }
}
