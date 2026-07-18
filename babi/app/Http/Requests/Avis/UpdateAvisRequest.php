<?php

namespace App\Http\Requests\Avis;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateAvisRequest extends FormRequest
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
            'note'        => 'sometimes|integer|min:1|max:5',
            'commentaire' => 'nullable|string',
            'date_avis'   => 'sometimes|date',
        ];
    }

    public function messages(): array
    {
        return [
            'note.integer'       => 'La note doit être un entier.',
            'note.min'           => 'La note doit être au minimum 1.',
            'note.max'           => 'La note doit être au maximum 5.',
            'commentaire.string' => 'Le commentaire doit être une chaîne de caractères.',
            'date_avis.date'     => 'La date de l\'avis doit être une date valide.',
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
