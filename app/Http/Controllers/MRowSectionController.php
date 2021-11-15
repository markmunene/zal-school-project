<?php

namespace App\Http\Controllers;

use App\Models\RowMarketing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MRowSectionController extends Controller
{
    public function index()
    {


        $data = RowMarketing::orderBy('id', 'desc')->get();

        return $data->toJson();
    }

    public function store(Request $request)
    {
        // protected $fillable = ['sectionIcon', 'MRowBody', 'MRowHeader'];

        $request->validate([
            'sectionIcon' => 'required|string|min:3',
            'MRowBody' => 'required|min:30|string',
            'MRowHeader' => 'required|min:5'
        ]);

      

        $del = true;

        if ($del) {

            RowMarketing::create([
                'MRowBody' => $request->MRowBody,
                'MRowHeader' => $request->MRowHeader,
                'sectionIcon' => $request->sectionIcon

            ]);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RowMarketing  $RowMarketing
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request ,$id)
    {
        
        $RowData = RowMarketing::find($id);
        $RowData->MRowBody = $request->MRowBody;
        $RowData->MRowHeader = $request->MRowHeader;
        $RowData->sectionIcon =$request->sectionIcon;
        $RowData->save();

        // RowMarketing::where('id', $id)->update([
        //     'MRowBody' => $request->MRowBody,
        //     'MRowHeader' => $request->MRowHeader,
        //     'sectionIcon' => $imagename
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RowMarketing  $RowMarketing
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $post = RowMarketing::where('id', $id)->first();

        unlink('uploadedIcons/'.$post->sectionIcon);
        $post->delete();
    }
}
