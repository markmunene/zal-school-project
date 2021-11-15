<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RowMarketing extends Model
{
    use HasFactory;

    protected $fillable =['sectionIcon', 'MRowBody', 'MRowHeader'];
}
