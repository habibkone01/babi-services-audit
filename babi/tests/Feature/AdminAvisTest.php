<?php

namespace Tests\Feature;

use App\Models\Avis;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Prestataire;
use App\Models\Utilisateur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminAvisTest extends TestCase
{
    use RefreshDatabase;

    public function test_liste_avis_signales_necessite_un_admin(): void
    {
        $client = Utilisateur::factory()->create();
        Sanctum::actingAs($client);

        $this->getJson('/api/admin/avis/signales')->assertStatus(403);
    }

    public function test_admin_peut_voir_les_avis_signales(): void
    {
        $admin = Utilisateur::factory()->admin()->create();
        $avisSignale = Avis::factory()->create(['signale' => true, 'motif_signalement' => 'Injurieux']);
        $avisNormal = Avis::factory()->create(['signale' => false]);

        Sanctum::actingAs($admin);

        $response = $this->getJson('/api/admin/avis/signales');

        $response->assertOk();
        $this->assertCount(1, $response->json());
        $this->assertEquals($avisSignale->id_avis, $response->json('0.id_avis'));
    }

    public function test_admin_peut_supprimer_un_avis(): void
    {
        $admin = Utilisateur::factory()->admin()->create();
        $avis = Avis::factory()->create(['signale' => true]);
        Sanctum::actingAs($admin);

        $this->deleteJson("/api/admin/avis/{$avis->id_avis}")->assertOk();
        $this->assertDatabaseMissing('avis', ['id_avis' => $avis->id_avis]);
    }

    public function test_client_ne_peut_pas_supprimer_un_avis_via_admin(): void
    {
        $client = Utilisateur::factory()->create();
        $avis = Avis::factory()->create(['signale' => true]);
        Sanctum::actingAs($client);

        $this->deleteJson("/api/admin/avis/{$avis->id_avis}")->assertStatus(403);
        $this->assertDatabaseHas('avis', ['id_avis' => $avis->id_avis]);
    }

    public function test_admin_peut_innocenter_un_avis_signale(): void
    {
        $admin = Utilisateur::factory()->admin()->create();
        $avis = Avis::factory()->create([
            'signale'           => true,
            'motif_signalement' => 'Injurieux',
            'signale_par'       => Utilisateur::factory()->create()->id_utilisateur,
        ]);
        Sanctum::actingAs($admin);

        $this->patchJson("/api/admin/avis/{$avis->id_avis}/innocenter")->assertOk();

        $avis->refresh();
        $this->assertFalse($avis->signale);
        $this->assertNull($avis->motif_signalement);
        $this->assertNull($avis->signale_par);
    }

    public function test_suppression_avis_signale_recalcule_la_note(): void
    {
        $admin = Utilisateur::factory()->admin()->create();
        $prestataire = Prestataire::factory()->create();
        $service = Service::factory()->create(['id_prestataire' => $prestataire->id_prestataire]);

        $reservation1 = Reservation::factory()->terminee()->create(['id_service' => $service->id_service]);
        Avis::factory()->create(['id_reservation' => $reservation1->id_reservation, 'note' => 5]);

        $reservation2 = Reservation::factory()->terminee()->create(['id_service' => $service->id_service]);
        $avisSignale = Avis::factory()->create([
            'id_reservation' => $reservation2->id_reservation,
            'note'           => 1,
            'signale'        => true,
        ]);

        // Avant suppression : moyenne = (5 + 1) / 2 = 3 (avis signalé inclus)
        $this->assertEquals(3, $prestataire->fresh()->note_moyenne);

        Sanctum::actingAs($admin);
        $this->deleteJson("/api/admin/avis/{$avisSignale->id_avis}")->assertOk();

        // Après suppression : moyenne = 5 (seul l'avis à 5 reste)
        $this->assertEquals(5, $prestataire->fresh()->note_moyenne);
    }
}
