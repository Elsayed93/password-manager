<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Catch-all route to handle any routes managed by Vue Router
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
