<?php

use App\Http\Controllers\carouselController;
use App\Http\Controllers\MarkettingSectionController;


use App\Http\Controllers\MMainController;
use App\Http\Controllers\MRowSectionController;
use App\Http\Controllers\NewsAndEventsController;





use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/storeImage' ,[carouselController::class, 'store']);
Route::get('/storeImage', [carouselController::class, 'index']);

Route::get('/MMsection', [MMainController::class,'index']);
Route::post('/MMsection/store', [MMainController::class, 'store']);
Route::post('/MMsection/edit/{id}', [MMainController::class, 'edit']);
Route::delete('/MMsection/{id}', [MMainController::class, 'destroy']);

Route::get('/MRowSection', [MRowSectionController::class, 'index']);
Route::post('/MRowSection/store', [MRowSectionController::class, 'store']);
Route::post('/MRowSection/update/{id}', [MRowSectionController::class, 'update']);
Route::delete('/MRowSection/{id}', [MRowSectionController::class, 'destroy']);

Route::get('/events', [NewsAndEventsController::class, 'index']);
Route::post('/events/store', [NewsAndEventsController::class, 'store']);
Route::post('/events/update/{id}', [NewsAndEventsController::class, 'update']);
Route::delete('/events/{id}', [NewsAndEventsController::class, 'destroy']);


Route::post('/storeEditmage',[carouselController::class,'edit']);
Route::delete('/storedeleteImage/{id}', [carouselController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
