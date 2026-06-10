<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prestataire extends Model
{
    protected $primaryKey = 'id_prestataire';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'specialite',
        'localisation',
        'note_moyenne',
        'disponible',
    ];

    public function services()
    {
        return $this->hasMany(Service::class, 'id_prestataire');
    }
}