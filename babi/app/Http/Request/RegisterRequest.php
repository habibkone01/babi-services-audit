<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom'        => 'required|string|max:255',
            'prenom'     => 'required|string|max:255',
            'email'      => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'telephone'  => 'nullable|string|max:20',
            'adresse'    => 'nullable|string|max:255',
        ];
    }
}
