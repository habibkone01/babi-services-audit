<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $table = 'avis';

    protected $primaryKey = 'id_avis';

    protected $fillable = [
        'note',
        'commentaire',
        'date_avis',
        'id_utilisateur',
        'id_reservation',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class, 'id_reservation');
    }
}
