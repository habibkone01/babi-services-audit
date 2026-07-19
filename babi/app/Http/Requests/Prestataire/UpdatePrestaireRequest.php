<?php

namespace App\Http\Requests\Prestataire;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePrestaireRequest extends FormRequest
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
            'nom'          => 'sometimes|string|max:100',
            'prenom'       => 'sometimes|string|max:100',
            'email'        => 'sometimes|email|unique:prestataires,email,' . $this->route('prestataire') . ',id_prestataire',
            'telephone'    => 'nullable|string|max:20',
            'localisation' => 'nullable|string|max:255',
            'note_moyenne' => 'nullable|decimal:0,2',
            'id_categorie' => 'sometimes|exists:categories,id_categorie',
        ];
    }

    public function messages(): array
    {
        return [
            'nom.string'            => 'Le nom doit être une chaîne de caractères.',
            'nom.max'               => 'Le nom ne peut pas dépasser 100 caractères.',
            'prenom.string'         => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max'            => 'Le prénom ne peut pas dépasser 100 caractères.',
            'email.email'           => 'L\'adresse email doit être valide.',
            'email.unique'          => 'Cette adresse email est déjà utilisée.',
            'telephone.string'      => 'Le téléphone doit être une chaîne de caractères.',
            'telephone.max'         => 'Le téléphone ne peut pas dépasser 20 caractères.',
            'localisation.string'   => 'La localisation doit être une chaîne de caractères.',
            'localisation.max'      => 'La localisation ne peut pas dépasser 255 caractères.',
            'note_moyenne.decimal'  => 'La note moyenne doit être un nombre décimal.',
            'id_categorie.exists'   => 'La catégorie sélectionnée n\'existe pas.',
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
