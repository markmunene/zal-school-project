<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Carousel;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Empty_;

class carouselController extends Controller
{

    public function index(){

        $data = Carousel::orderBy('id', 'desc')->get();

        return $data->toJson();
    }

    public function store(Request $request)
    {
        //  $table->string('imageName');
        // $table->string('image');
        $request->validate([
            'imageName' => 'string|required|min:3|',
            'image' =>  'required|image|mimes:png,jpg'
        ]);

        $file = $request->file('image');
        $imagename = uniqid() . '_' . $request->imageName . '.' . $file->getClientOriginalExtension();

        $file->move(public_path("uploadedImages"), $imagename);


Carousel::create([
            'imageName' => $request->imageName,
            'image' =>  $imagename
]);


    }

    // edit 
    public function edit (Request $req){

        $file = $req->file('image');
        $id  = $req->ImgId;

      

     


        if ($file) {
            $req->validate([
                'imageName' => 'string|required|min:3|',
                'image' =>  '|image|mimes:png,jpg'
            ]);
           
            $imagename = uniqid() . '_' . $req->imageName . '.' . $file->getClientOriginalExtension();

            $file->move(public_path("uploadedImages"), $imagename);

            $post = Carousel::where('id', $id)->get();
            unlink('uploadedImages/' . $post->image);
            Carousel::where('id', $id)->update([
                'imageName' => $req->imageName,
                'image' =>  $imagename
            ]);
        }
        else{
            $req->validate([
                'imageName' => 'required|min:3|',
               
            ]);
            Carousel::where('id', $id)->update([
                'imageName' => $req->imageName,
                
            ]);
        }
     
    }

    public function delete( $id){

        $post = Carousel::where('id', $id)->get();
        unlink('uploadedImages/ '.$post->image);
        $post->delete();

    }
}
