<?php

namespace App\Http\Controllers;

use App\Models\newsAndEvents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsAndEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $data = newsAndEvents::orderByDesc('id')->get();

    return  $data->toJson();
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
        //    protected $fillable  = ['Title', 'Body', 'ImageName', 'CreatorName'];

        $request->validate([
            'image' =>  'required|image|mimes:png,jpg',
            'Title' => 'string|min:3',
            'Body' => 'string|min:10|required',
        ]);
        $file = $request->file('image');
        $ImageName = uniqid() . '_' . $request->Title . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("NewsImages"), $ImageName);


   
    

     newsAndEvents::create([
         'Title'=>$request->Title,
            'Body' => $request->Body,
            'ImageName' => $ImageName,
            'CreatorName' =>Auth::user()->name
    
    ]);
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\newsAndEvents  $newsAndEvents
     * @return \Illuminate\Http\Response
     */
    public function show(newsAndEvents $newsAndEvents)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\newsAndEvents  $newsAndEvents
     * @return \Illuminate\Http\Response
     */
    public function edit(newsAndEvents $newsAndEvents)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\newsAndEvents  $newsAndEvents
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)

    {
        //
    
        $file = $request->file('image');
        $ImageName ='';
       
    if ($file) {
            # code...
            $post = newsAndEvents::where('id', $id)->first();
            unlink('NewsImages/' . $post->ImageName);
            $ImageName = uniqid() . '_' . $request->Title . '.' . $file->getClientOriginalExtension();

            $file->move(public_path("NewsImages"), $ImageName);
            newsAndEvents::where('id', $id)->update([
                'Title' => $request->Title,
                'Body' => $request->Body,
                'ImageName' => $ImageName,

            ]);
        }
        else{
            newsAndEvents::where('id', $id)->update([
                'Title' => $request->Title,
                'Body' => $request->Body,
            ]);
        }
       

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\newsAndEvents  $newsAndEvents
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $post = newsAndEvents::where('id', $id)->first();
        unlink('NewsImages/' . $post->ImageName);
        $post->delete();
    }
}
