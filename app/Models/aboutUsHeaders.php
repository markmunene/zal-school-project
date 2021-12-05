<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class aboutUsHeaders extends Model
{
    use HasFactory;
    protected $fillable = ['sectionTitle', 'sectionHeader', 'sectionSubHeader'];

}
