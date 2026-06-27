<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminReglagesController extends Controller
{
    public function index()
    {
        $rows = DB::table('settings')->get()->keyBy('key');

        return response()->json([
            'nom_plateforme' => $rows['nom_plateforme']->value ?? 'Babi Services',
            'email_contact'  => $rows['email_contact']->value  ?? '',
            'commission'     => $rows['commission']->value      ?? '10',
            'devise'         => $rows['devise']->value          ?? 'FCFA',
            'maintenance'    => ($rows['maintenance']->value    ?? '0') === '1',
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'nom_plateforme' => 'required|string|max:100',
            'email_contact'  => 'required|email',
            'commission'     => 'required|numeric|min:0|max:100',
            'devise'         => 'required|string|max:10',
            'maintenance'    => 'boolean',
        ]);

        foreach ($data as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key],
                ['value' => is_bool($value) ? ($value ? '1' : '0') : $value]
            );
        }

        return response()->json(['message' => 'Réglages mis à jour']);
    }
}