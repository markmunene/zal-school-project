<?php

namespace App\Http\Controllers;

use App\Models\MarkettingSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MMainController extends Controller
{
    
    public function index()
    {
        $data = MarkettingSection::orderBy('id', 'desc')->get();

        return $data->toJson();
    }


    public function store(Request $request)
    {
        // protected $fillable = ['MMainBody', 'MMainHeader'];
        $request->validate([
            'MMainBody' => 'required|min:30|string',
            'MMainHeader' => 'required|min:5'
        ]);
        // $del = DB::table('marketting_sections')->delete();

        $del =true;
        if ($del) {
            # code...
            MarkettingSection::create([
                'MMainHeader' => $request->MMainHeader,
                'MMainBody' => $request->MMainBody

            ]);
        }
        
    }


    public function edit(Request $request,$id)
    {
        $request->validate([
            'MMainBody' => 'required',
            'MMainHeader' => 'required|min:5'
        ]);

        // $id =  $request->MsectionId;

        if ($id) {
            
            DB::table('marketting_sections')->where('id', $id)->update([
                'MMainHeader' => $request->MMainHeader,
                'MMainBody' => $request->MMainBody
            ]);
            
        }


       

        // dd($id);
    }

   
    public function destroy($id)
    {
        //
        $post = MarkettingSection::where('id', $id);
        $post->delete();
    }
}
