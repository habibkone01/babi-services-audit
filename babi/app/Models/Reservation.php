<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $primaryKey = 'id_reservation';

    protected $fillable = [
        'date_reservation',
        'heure_reservation',
        'statut',
        'id_utilisateur',
        'id_service',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'id_service');
    }
}
