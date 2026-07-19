<?php

namespace App\Http\Requests\Service;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreServiceRequest extends FormRequest
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
            'nom_service'    => 'required|string|max:100',
            'description'    => 'nullable|string',
            'photo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'photo_path'     => 'nullable|string|max:255',
            'tarif'          => 'required|numeric|min:0',
            'disponibilite'  => ['required', 'boolean'],
            'id_prestataire' => 'required|exists:prestataires,id_prestataire',
            'id_categorie'   => 'required|exists:categories,id_categorie',
        ];
    }

    public function messages(): array
    {
        return [
            'nom_service.required'    => 'Le nom du service est obligatoire.',
            'nom_service.string'      => 'Le nom du service doit être une chaîne de caractères.',
            'nom_service.max'         => 'Le nom du service ne peut pas dépasser 100 caractères.',
            'description.string'      => 'La description doit être une chaîne de caractères.',
            'photo.image'             => 'Le fichier doit être une image.',
            'photo.mimes'             => 'L\'image doit être au format jpg, jpeg, png ou webp.',
            'photo.max'               => 'L\'image ne peut pas dépasser 2 Mo.',
            'tarif.required'          => 'Le tarif est obligatoire.',
            'tarif.numeric'           => 'Le tarif doit être un nombre.',
            'tarif.min'               => 'Le tarif doit être supérieur ou égal à 0.',
            'disponibilite.required'  => 'La disponibilité est obligatoire.',
            'disponibilite.boolean'   => 'La disponibilité doit être vrai ou faux.',
            'id_prestataire.required' => 'Le prestataire est obligatoire.',
            'id_prestataire.exists'   => 'Le prestataire sélectionné n\'existe pas.',
            'id_categorie.required'   => 'La catégorie est obligatoire.',
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
