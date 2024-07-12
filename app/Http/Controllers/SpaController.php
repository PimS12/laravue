<?php

namespace App\Http\Controllers;

class SpaController extends Controller
{
    public function __invoke()
    {
        $config = [
            'appName' => config('app.name'),
            'apiUrl' => config('app.url') . '/api',
            'appUrl' => config('app.url'),
            'locale' => app()->getLocale(),
            'locales' => config('app.locales'),
        ];

        // dd($config);

        return view('app', ['config' => $config]);
    }
}
