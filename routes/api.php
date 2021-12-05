<?php

use App\Http\Controllers\AboutUsHeadersController;
use App\Http\Controllers\AccomplishmentController;
use App\Http\Controllers\BigDataDepartmentController;
use App\Http\Controllers\carouselController;
use App\Http\Controllers\ContactInfoController;
use App\Http\Controllers\ContactMessagesController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\FinanceDepartmentController;
use App\Http\Controllers\IctDepartmentsController;
use App\Http\Controllers\MarkettingSectionController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\MMainController;
use App\Http\Controllers\MRowSectionController;
use App\Http\Controllers\NewsAndEventsController;
use App\Http\Controllers\OtherStaffController;
use App\Http\Controllers\StaffController;
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

Route::get('/contact', [ContactUsController::class, 'index']);
Route::post('/contact/store', [ContactUsController::class, 'store']);
Route::post('/contact/update/{id}', [ContactUsController::class, 'update']);
Route::delete('/contact/{id}', [ContactUsController::class, 'destroy']);

Route::get('/contactInfo', [ContactInfoController::class, 'index']);
Route::post('/contactInfo/store', [ContactInfoController::class, 'store']);
Route::post('/contactInfo/update/{id}', [ContactInfoController::class, 'update']);
Route::delete('/contactInfo/{id}', [ContactInfoController::class, 'destroy']);

Route::get('/finance', [FinanceDepartmentController::class, 'index']);
Route::post('/finance/store', [FinanceDepartmentController::class, 'store']);
Route::post('/finance/update/{id}', [FinanceDepartmentController::class, 'update']);
Route::delete('/finance/{id}', [FinanceDepartmentController::class, 'destroy']);

Route::get('/ictDepartment', [IctDepartmentsController::class, 'index']);
Route::post('/ictDepartment/store', [IctDepartmentsController::class, 'store']);
Route::post('/ictDepartment/update/{id}', [IctDepartmentsController::class, 'update']);
Route::delete('/ictDepartment/{id}', [IctDepartmentsController::class, 'destroy']);

Route::get('/bigdataD', [BigDataDepartmentController::class, 'index']);
Route::post('/bigdataD/store', [BigDataDepartmentController::class, 'store']);
Route::post('/bigdataD/update/{id}', [BigDataDepartmentController::class, 'update']);
Route::delete('/bigdataD/{id}', [BigDataDepartmentController::class, 'destroy']);

Route::get('/accomplishement', [AccomplishmentController::class, 'index']);
Route::post('/accomplishement/store', [AccomplishmentController::class, 'store']);
Route::post('/accomplishement/update/{id}', [AccomplishmentController::class, 'update']);
Route::delete('/accomplishement/{id}', [AccomplishmentController::class, 'destroy']);

Route::get('/aboutHeaders', [AboutUsHeadersController::class, 'index']);
Route::post('/aboutHeaders/store', [AboutUsHeadersController::class, 'store']);
Route::post('/aboutHeaders/update/{id}', [AboutUsHeadersController::class, 'update']);
Route::delete('/aboutHeaders/{id}', [AboutUsHeadersController::class, 'destroy']);

// staff routes
Route::get('/staffD', [StaffController::class, 'index']);
Route::post('/staffD/store', [StaffController::class, 'store']);
Route::post('/staffD/update/{id}', [StaffController::class, 'update']);
Route::delete('/staffD/{id}', [StaffController::class, 'destroy']);

// other Staff routes 
Route::get('/OtherStaff', [OtherStaffController::class, 'index']);
Route::post('/OtherStaff/store', [OtherStaffController::class, 'store']);
Route::post('/OtherStaff/update/{id}', [OtherStaffController::class, 'update']);
Route::delete('/OtherStaff/{id}', [OtherStaffController::class, 'destroy']);

// mission Routes
Route::get('/mission', [MissionController::class, 'index']);
Route::post('/mission/store', [MissionController::class, 'store']);
Route::post('/mission/update/{id}', [MissionController::class, 'update']);
Route::delete('/mission/{id}', [MissionController::class, 'destroy']);


Route::get('/userMessage', [ContactMessagesController::class, 'index']);


Route::post('/userMessage/store', [ContactMessagesController::class, 'store']);
Route::post('/userMessage/update/{id}', [ContactMessagesController::class, 'update']);
Route::delete('/userMessage/{id}', [ContactMessagesController::class, 'destroy']);

Route::post('/storeEditmage',[carouselController::class,'edit']);
Route::delete('/storedeleteImage/{id}', [carouselController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
