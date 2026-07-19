<?php

namespace App\Http\Requests\Categorie;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreCategorieRequest extends FormRequest
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
            'nom_categorie' => 'required|string|max:100|unique:categories',
            'description'   => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nom_categorie.required' => 'Le nom de la catégorie est obligatoire.',
            'nom_categorie.string'   => 'Le nom de la catégorie doit être une chaîne de caractères.',
            'nom_categorie.max'      => 'Le nom de la catégorie ne peut pas dépasser 100 caractères.',
            'nom_categorie.unique'   => 'Cette catégorie existe déjà.',
            'description.string'     => 'La description doit être une chaîne de caractères.',
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
