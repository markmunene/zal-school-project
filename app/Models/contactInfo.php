<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contactInfo extends Model
{
    use HasFactory;
    
    protected $fillable =['contactIcon','description1', 'description2'];
}
