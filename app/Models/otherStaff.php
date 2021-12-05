<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class otherStaff extends Model
{
    use HasFactory;
    protected $fillable = ['Header', 'Description', 'SubHeader'];
}
