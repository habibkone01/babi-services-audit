<?php

namespace Tests\Feature\Auth;

use App\Models\Utilisateur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TokenTest extends TestCase
{
    use RefreshDatabase;

    public function test_le_token_a_une_date_dexpiration_apres_login(): void
    {
        $utilisateur = Utilisateur::factory()->create();

        $response = $this->postJson('/api/login', [
            'email'        => $utilisateur->email,
            'mot_de_passe' => 'password',
        ]);

        $response->assertOk();

        $token = $utilisateur->tokens()->latest()->first();
        $this->assertNotNull($token->expires_at);
        $this->assertTrue($token->expires_at->isAfter(now()->addHours(23)));
    }

    public function test_rate_limiting_bloque_apres_3_tentatives(): void
    {
        $utilisateur = Utilisateur::factory()->create();

        for ($i = 0; $i < 3; $i++) {
            $this->postJson('/api/login', [
                'email'        => $utilisateur->email,
                'mot_de_passe' => 'mauvais_mot_de_passe',
            ])->assertStatus(401);
        }

        $this->postJson('/api/login', [
            'email'        => $utilisateur->email,
            'mot_de_passe' => 'mauvais_mot_de_passe',
        ])->assertStatus(429);
    }
}
