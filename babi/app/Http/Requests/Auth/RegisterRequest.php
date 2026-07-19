<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'nom'          => 'required|string|max:255',
            'prenom'       => 'required|string|max:255',
            'email'        => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'telephone'    => 'nullable|string|max:20',
            'adresse'      => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required'               => 'Le nom est obligatoire.',
            'nom.string'                 => 'Le nom doit être une chaîne de caractères.',
            'nom.max'                    => 'Le nom ne peut pas dépasser 255 caractères.',
            'prenom.required'            => 'Le prénom est obligatoire.',
            'prenom.string'              => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max'                 => 'Le prénom ne peut pas dépasser 255 caractères.',
            'email.required'             => 'L\'adresse email est obligatoire.',
            'email.email'                => 'L\'adresse email doit être valide.',
            'email.unique'               => 'Cette adresse email est déjà utilisée.',
            'mot_de_passe.required'      => 'Le mot de passe est obligatoire.',
            'mot_de_passe.string'        => 'Le mot de passe doit être une chaîne de caractères.',
            'mot_de_passe.min'           => 'Le mot de passe doit contenir au moins 8 caractères.',
            'mot_de_passe.confirmed'     => 'La confirmation du mot de passe ne correspond pas.',
            'telephone.string'           => 'Le téléphone doit être une chaîne de caractères.',
            'telephone.max'              => 'Le téléphone ne peut pas dépasser 20 caractères.',
            'adresse.string'             => 'L\'adresse doit être une chaîne de caractères.',
            'adresse.max'                => 'L\'adresse ne peut pas dépasser 255 caractères.',
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
