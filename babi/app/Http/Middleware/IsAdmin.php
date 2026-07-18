<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            Log::error('Accès refusé (403)', [
                'ip'   => $request->ip(),
                'url'  => $request->fullUrl(),
                'user' => $request->user()?->email ?? 'non authentifié',
            ]);
            $eventId = \Sentry\captureMessage('Accès refusé (403) : ' . $request->fullUrl());
            \Sentry\State\HubAdapter::getInstance()->getClient()?->flush(2);
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        return $next($request);
    }
}
