<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'id_service'        => 'required|exists:services,id_service',
        ];
    }
}
