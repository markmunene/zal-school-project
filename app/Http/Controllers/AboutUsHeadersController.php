<?php

namespace App\Http\Controllers;

use App\Models\aboutUsHeaders;
use Illuminate\Http\Request;

class AboutUsHeadersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = aboutUsHeaders::orderByDesc('id')->get();
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
      
        aboutUsHeaders::create([
            'sectionTitle' => $request->sectionTitle,
            'sectionHeader' => $request->sectionHeader,
            'sectionSubHeader' => $request->sectionSubHeader,
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\aboutUsHeaders  $aboutUsHeaders
     * @return \Illuminate\Http\Response
     */
    public function show(aboutUsHeaders $aboutUsHeaders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\aboutUsHeaders  $aboutUsHeaders
     * @return \Illuminate\Http\Response
     */
    public function edit(aboutUsHeaders $aboutUsHeaders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\aboutUsHeaders  $aboutUsHeaders
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        //
        aboutUsHeaders::where('id', $id)->update([
            'sectionTitle' => $request->sectionTitle,
            'sectionHeader' => $request->sectionHeader,
            'sectionSubHeader' => $request->sectionSubHeader,

        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\aboutUsHeaders  $aboutUsHeaders
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = aboutUsHeaders::where('id', $id);
        $data->delete();
    }
}
