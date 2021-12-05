<?php

namespace App\Http\Controllers;

use App\Models\otherStaff;
use Illuminate\Http\Request;

class OtherStaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = otherStaff::get();

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
        // protected $fillable = ['Header', 'Description', 'SubHeader'];
        //
        //
        $request->validate([
            'Header' => 'required|string|min:3',
            'Description' => 'required|string|min:3',
            'SubHeader' => 'required|string|min:3',
        ]);
      
        otherStaff::create([
            'Header' => $request->Header,
         
            'Description' => $request->Description,
            'SubHeader' => $request->SubHeader,
           

        ]);
    }

 
   
    
    public function update(Request $request, $id)
    {
        //
        otherStaff::where('id', $id)->update([
            'Header' => $request->Header,
            'Description' => $request->Description,
            'SubHeader' => $request->SubHeader,
           

        ]);
    }

    public function destroy($id)
    {
        //
        $data = otherStaff::where('id', $id);
        $data->delete();
    }
}
