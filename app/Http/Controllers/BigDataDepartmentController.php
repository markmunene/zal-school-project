<?php

namespace App\Http\Controllers;

use App\Models\BigDataDepartment;
use Illuminate\Http\Request;

class BigDataDepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = BigDataDepartment::orderbyDesc('id')->get();

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
        // protected $fillable = ['SectionTitle', 'Header', 'SubHeader', 'Description', 'HeadedBy', 'EduCationLevel'];
        $request->validate([
            'SectionTitle' => 'required|string|min:3',
            'Header' => 'required|string|min:3',
            'image' => 'required|image|mimes:png,jpg',
            'SubHeader' => 'required|string|min:3',
            'Description' => 'required|string|min:3',
            'HeadedBy' => 'required|string|min:3',
            'EduCationLevel' => 'required|string|min:3',

        ]);
        $file = $request->file('image');
        $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("uploadedImages"), $imagename);

        BigDataDepartment::create([
            'SectionTitle' => $request->SectionTitle,
            'Header' => $request->Header,
            'SubHeader' => $request->SubHeader,
            'ImageName' => $imagename,
            'Description' => $request->Description,
            'HeadedBy' => $request->HeadedBy,
            'EduCationLevel' => $request->EduCationLevel,

        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BigDataDepartment  $bigDataDepartment
     * @return \Illuminate\Http\Response
     */
    public function show(BigDataDepartment $bigDataDepartment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BigDataDepartment  $bigDataDepartment
     * @return \Illuminate\Http\Response
     */
    public function edit(BigDataDepartment $bigDataDepartment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BigDataDepartment  $bigDataDepartment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        BigDataDepartment::where('id', $id)->update([
            'SectionTitle' => $request->SectionTitle,
            'Header' => $request->Header,
            'SubHeader' => $request->SubHeader,
            'Description' => $request->Description,
            'HeadedBy' => $request->HeadedBy,
            'EduCationLevel' => $request->EduCationLevel,

        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BigDataDepartment  $bigDataDepartment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = BigDataDepartment::where('id', $id);
        $data->delete();
    }
}
