<?php

namespace App\Http\Controllers;

use App\Models\ContactMessages;
use Illuminate\Http\Request;

class ContactMessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = ContactMessages::orderByDesc('id')->get();
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
        // protected $fillable = ['name', 'Email', 'subject', 'message'];
        $request->validate([
            'name' => 'required|string|min:3',
            'Email' => 'required|email|',
            'subject' => 'required|string ',
            'message' => 'required|string|min:5'

        ]);

        ContactMessages::create([
            'Name' => $request->name,
            'name' => $request->name,
            'Email' => $request->Email,
            'subject' => $request->subject,
            'message' => $request->message,

        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContactMessages  $contactMessages
     * @return \Illuminate\Http\Response
     */
    public function show(ContactMessages $contactMessages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ContactMessages  $contactMessages
     * @return \Illuminate\Http\Response
     */
    public function edit(ContactMessages $contactMessages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContactMessages  $contactMessages
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ContactMessages $contactMessages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactMessages  $contactMessages
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = ContactMessages::where('id', $id);
$data->delete();
    }
}
