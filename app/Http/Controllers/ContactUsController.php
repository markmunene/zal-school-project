<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = ContactUs::orderByDesc('id')->get();
        return $data->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // protected $fillable = ['sectionTitle', 'sectionHeader', 'sectionSubHeader'];
        // $request->validate(['sectionTitle'=>'']);

        ContactUs::create([
            'sectionTitle' => $request->sectionTitle,
            'sectionHeader' => $request->sectionHeader,
            'sectionSubHeader' => $request->sectionSubHeader,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContactUs  $contactUs
     * @return \Illuminate\Http\Response
     */
    public function show(ContactUs $contactUs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ContactUs  $contactUs
     * @return \Illuminate\Http\Response
     */
    public function edit(ContactUs $contactUs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContactUs  $contactUs
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        //
        ContactUs::where('id', $id)->update([
            'sectionTitle' => $request->sectionTitle,
            'sectionHeader' => $request->sectionHeader,
            'sectionSubHeader' => $request->sectionSubHeader,

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactUs  $contactUs
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = ContactUs::where('id', $id);
        $data->delete();
    }
}
