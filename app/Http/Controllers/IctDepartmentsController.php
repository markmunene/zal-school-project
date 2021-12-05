<?php

namespace App\Http\Controllers;

use App\Models\FinanceDepartment;
use App\Models\IctDepartments;
use Illuminate\Http\Request;

class IctDepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = IctDepartments::orderbyDesc('id')->get();

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

        IctDepartments::create([
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
     * @param  \App\Models\IctDepartments  $ictDepartments
     * @return \Illuminate\Http\Response
     */
    public function show(IctDepartments $ictDepartments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IctDepartments  $ictDepartments
     * @return \Illuminate\Http\Response
     */
    public function edit(IctDepartments $ictDepartments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IctDepartments  $ictDepartments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        IctDepartments::where('id', $id)->update([
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
     * @param  \App\Models\IctDepartments  $ictDepartments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = IctDepartments::where('id', $id);
        $data->delete();
    }
}
