<?php

namespace App\Http\Requests\Avis;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreAvisRequest extends FormRequest
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
            'note'           => 'required|integer|min:1|max:5',
            'commentaire'    => 'nullable|string',
            'date_avis'      => 'required|date',
            'id_reservation' => 'required|exists:reservations,id_reservation|unique:avis,id_reservation',
        ];
    }

    public function messages(): array
    {
        return [
            'note.required'              => 'La note est obligatoire.',
            'note.integer'               => 'La note doit être un entier.',
            'note.min'                   => 'La note doit être au minimum 1.',
            'note.max'                   => 'La note doit être au maximum 5.',
            'commentaire.string'         => 'Le commentaire doit être une chaîne de caractères.',
            'date_avis.required'         => 'La date de l\'avis est obligatoire.',
            'date_avis.date'             => 'La date de l\'avis doit être une date valide.',
            'id_reservation.required'    => 'La réservation est obligatoire.',
            'id_reservation.exists'      => 'La réservation n\'existe pas.',
            'id_reservation.unique'      => 'Un avis existe déjà pour cette réservation.',
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
