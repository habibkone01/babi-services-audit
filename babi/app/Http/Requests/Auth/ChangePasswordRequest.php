<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ChangePasswordRequest extends FormRequest
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
            'ancien_mot_de_passe'  => 'required|string',
            'nouveau_mot_de_passe' => 'required|string|min:8|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'ancien_mot_de_passe.required'       => 'L\'ancien mot de passe est obligatoire.',
            'ancien_mot_de_passe.string'          => 'L\'ancien mot de passe doit être une chaîne de caractères.',
            'nouveau_mot_de_passe.required'       => 'Le nouveau mot de passe est obligatoire.',
            'nouveau_mot_de_passe.string'         => 'Le nouveau mot de passe doit être une chaîne de caractères.',
            'nouveau_mot_de_passe.min'            => 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
            'nouveau_mot_de_passe.confirmed'      => 'La confirmation du nouveau mot de passe ne correspond pas.',
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
