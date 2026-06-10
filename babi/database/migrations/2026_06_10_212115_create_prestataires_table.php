<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
      Schema::create('prestataires', function (Blueprint $table) {
        $table->id('id_prestataire');
        $table->string('nom');
        $table->string('prenom');
        $table->string('email')->unique();
        $table->string('telephone', 20)->nullable();
        $table->string('specialite', 100);
        $table->string('localisation', 255)->nullable();
        $table->decimal('note_moyenne', 3, 2)->default(0);
        $table->boolean('disponible')->default(true);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestataires');
    }
};
