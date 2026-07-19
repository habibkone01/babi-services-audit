<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categorie extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'id_categorie';

    protected $fillable = [
        'nom_categorie',
        'description',
    ];

    public function prestataires()
    {
        return $this->hasMany(Prestataire::class, 'id_categorie');
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'id_categorie');
    }
}
