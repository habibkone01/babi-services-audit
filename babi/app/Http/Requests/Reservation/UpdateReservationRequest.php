<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date_reservation'  => 'sometimes|date',
            'heure_reservation' => 'sometimes|date_format:H:i',
            'statut'            => 'sometimes|in:en_attente,confirmee,annulee,terminee',
            'id_utilisateur'    => 'sometimes|exists:utilisateurs,id_utilisateur',
            'id_service'        => 'sometimes|exists:services,id_service',
        ];
    }
}
