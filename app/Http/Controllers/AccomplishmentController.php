<?php

namespace App\Http\Controllers;

use App\Models\accomplishment;
use Illuminate\Http\Request;

class AccomplishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = accomplishment::orderBy('id', 'Desc')->get();
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
        $request->validate([
            'Header' => 'required|min:3|string',
            'Description' => 'required|min:3|string',
            'image' => 'image|mimes:png,jpg|required',
            'Header' => 'required|min:3|string',
        ]);

        $file = $request->file('image');
        $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("uploadedImages"), $imagename);
        
        accomplishment::create([
            'Header' => $request->Header,
            'Description' => $request->Description,
            'Date' => $request->Date,
            'ImageName' => $imagename,
            'Icon' => $request->Icon,
        ]);

    }

    public function update(Request $request, $id)
    {

        // protected $fillable = ['Header', 'Description', 'Date', 'ImageName', 'Icon'];
        accomplishment::where('id', $id)->update([
            'Header' => $request->Header,
            'Description' => $request->Description, 
            'Date' => $request->Date,
           
            'Icon' => $request->Icon,
        ]);
    }

    public function destroy($id)
    {
        $data = accomplishment::where('id', $id)->get();
        $data->delete();
    }
}
