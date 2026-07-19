<?php

namespace App\Http\Requests\Service;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateServiceRequest extends FormRequest
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
            'nom_service'    => 'sometimes|string|max:100',
            'description'    => 'nullable|string',
            'photo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'photo_path'     => 'nullable|string|max:255',
            'tarif'          => 'sometimes|numeric|min:0',
            'disponibilite'  => ['sometimes', 'boolean'],
            'id_prestataire' => 'sometimes|exists:prestataires,id_prestataire',
            'id_categorie'   => 'sometimes|exists:categories,id_categorie',
        ];
    }

    public function messages(): array
    {
        return [
            'nom_service.string'      => 'Le nom du service doit être une chaîne de caractères.',
            'nom_service.max'         => 'Le nom du service ne peut pas dépasser 100 caractères.',
            'description.string'      => 'La description doit être une chaîne de caractères.',
            'photo.image'             => 'Le fichier doit être une image.',
            'photo.mimes'             => 'L\'image doit être au format jpg, jpeg, png ou webp.',
            'photo.max'               => 'L\'image ne peut pas dépasser 2 Mo.',
            'tarif.numeric'           => 'Le tarif doit être un nombre.',
            'tarif.min'               => 'Le tarif doit être supérieur ou égal à 0.',
            'disponibilite.boolean'   => 'La disponibilité doit être vrai ou faux.',
            'id_prestataire.exists'   => 'Le prestataire sélectionné n\'existe pas.',
            'id_categorie.exists'     => 'La catégorie sélectionnée n\'existe pas.',
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
