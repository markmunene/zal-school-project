<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class staff extends Model
{
    use HasFactory;
    protected $fillable = [ 'ImageName', 'Header','Description', 'HeadedBy', 'EduCationLevel'];
    
}