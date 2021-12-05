<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = Mission::all();
     return    $data->toJson();
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
       
        // $request->validate([

        //     'SectionIcon' => '|string|min:3',
        //     'Header' => '|string|min:3',
        //     'image' => '|image|mimes:png,jpg',
        //     'ValuesHeader' => '|string|min:3',
        //     'Description' => '|string|min:3',
        //     'ValuesDesc' => '|string|min:3',
        //     'StatTotal' => '|string|min:3',
        //     'StatName' => '|string|min:3',
        //     'SectionName' => '|string|min:3',
        // ]);
        $file = $request->file('image');
        $imagename ='';
        if ($file) {
            # code...
            $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

            $file->move(public_path("uploadedImages"), $imagename);
        }
       

        Mission::create([
            'SectionIcon' => $request->SectionIcon,
            'Header' => $request->Header,
            'ValuesHeader' => $request->ValuesHeader,
            'ImageName' => $imagename,
            'Description' => $request->Description,
            'ValuesDesc' => $request->ValuesDesc,
            'StatTotal' => $request->StatTotal,
            'StatName' => $request->StatName,
            'SectionName' => $request->SectionName,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function show(Mission $mission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function edit(Mission $mission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        //
        $request->validate([

            // 'SectionIcon' => 'required|string|min:3',
            // 'Header' => 'required|string|min:3',
            // // 'image' => 'required|image|mimes:png,jpg',
            // 'ValuesHeader' => 'required|string|min:3',
            // 'Description' => 'required|string|min:3',
            // 'ValuesDesc' => 'required|string|min:3',
            // 'StatTotal' => 'required|string|min:3',
            // 'StatName' => 'required|string|min:3',
            // 'SectionName' => 'required|string|min:3',



        ]);
        // $file = $request->file('image');
        // $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

        // $file->move(public_path("uploadedImages"), $imagename);

        Mission::where('id', $id)->update([
            'SectionIcon' => $request->SectionIcon,
            'Header' => $request->Header,
            'ValuesHeader' => $request->ValuesHeader,
            // 'ImageName' => $imagename,
            'Description' => $request->Description,
            'ValuesDesc' => $request->ValuesDesc,
            'StatTotal' => $request->StatTotal,
            'StatName' => $request->StatName,
            'SectionName' => $request->SectionName,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mission  $mission
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = Mission::where('id', $id)->first();
         $data->delete();
    }
}
