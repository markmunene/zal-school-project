<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BigDataDepartment extends Model
{
    use HasFactory;

    protected $fillable = ['SectionTitle', 'ImageName','Header', 'SubHeader','Description','HeadedBy', 'EduCationLevel'];
}
