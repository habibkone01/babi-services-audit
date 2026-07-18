<?php

namespace App\Http\Requests\Reservation;

use App\Models\Reservation;
use App\Models\Service;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreReservationRequest extends FormRequest
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
            'date_reservation'  => 'required|date',
            'heure_reservation' => 'required|date_format:H:i',
            'id_service'        => [
                'required',
                'exists:services,id_service',
                function ($attribute, $value, $fail) {
                    if (Service::whereKey($value)->where('disponibilite', false)->exists()) {
                        $fail("Ce service n'est pas disponible actuellement.");
                        return;
                    }

                    $creneauPris = Reservation::where('id_service', $value)
                        ->where('date_reservation', $this->input('date_reservation'))
                        ->where('heure_reservation', $this->input('heure_reservation'))
                        ->whereNotIn('statut', ['annulee'])
                        ->exists();

                    if ($creneauPris) {
                        $fail("Ce créneau n'est plus disponible pour ce service.");
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'date_reservation.required'  => 'La date de réservation est obligatoire.',
            'date_reservation.date'      => 'La date de réservation doit être une date valide.',
            'heure_reservation.required' => 'L\'heure de réservation est obligatoire.',
            'heure_reservation.date_format' => 'L\'heure de réservation doit être au format HH:MM.',
            'id_service.required'        => 'Le service est obligatoire.',
            'id_service.exists'          => 'Le service sélectionné n\'existe pas.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors'  => $validator->errors(),
        ], 422));
    }
}
