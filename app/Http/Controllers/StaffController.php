<?php

namespace App\Http\Controllers;

use App\Models\staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // protected $fillable = ['ImageName', 'Header', 'SubHeader', 'Description', 'HeadedBy', 'EduCationLevel'];
        $data = staff::get();

        return $data->toJson();
        //
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
        $request->validate([
            
            'Header' => 'required|string|min:3',
            'image' => 'required|image|mimes:png,jpg',
           
            'Description' => 'required|string|min:3',
            'HeadedBy' => 'required|string|min:3',
            'EduCationLevel' => 'required|string|min:3',

        ]);
        $file = $request->file('image');
        $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("uploadedImages"), $imagename);

        staff::create([  
            'Header' => $request->Header,
            'ImageName' => $imagename,
            'Description' => $request->Description,
            'HeadedBy' => $request->HeadedBy,
            'EduCationLevel' => $request->EduCationLevel,

        ]);
    }
    

  
    public function show(staff $staff)
    {
        //
    }

    public function edit(staff $staff)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        //
        staff::where('id', $id)->update([
           
            'Header' => $request->Header,
           
            'Description' => $request->Description,
            'HeadedBy' => $request->HeadedBy,
            'EduCationLevel' => $request->EduCationLevel,

        ]);
    }

    public function destroy($id)
    {
        //
        $data = staff::where('id', $id);
        $data->delete();
    }
}
