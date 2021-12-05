<?php

namespace App\Http\Controllers;

use App\Models\contactInfo;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = contactInfo::orderByDesc('id')->get();
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
        //
        // protected $fillable = ['contactIcon', 'description1', 'description2'];
        contactInfo::create([
            'contactIcon' => $request->contactIcon,
            'description1' => $request->description1,
            'description2' => $request->description2,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\contactInfo  $contactInfo
     * @return \Illuminate\Http\Response
     */
    public function show(contactInfo $contactInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\contactInfo  $contactInfo
     * @return \Illuminate\Http\Response
     */
    public function edit(contactInfo $contactInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\contactInfo  $contactInfo
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        //
        contactInfo::where('id', $id)->update([
            'contactIcon' => $request->contactIcon,
            'description1' => $request->description1,
            'description2' => $request->description2,

        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\contactInfo  $contactInfo
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        //
        $data = contactInfo::where('id', $id);
        $data->delete();
    }
}
