<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccomplishmentsTable extends Migration
{
    /**
     * Run the migrations.
        protected $fillable = ['Header', '', 'Date', 'ImageName', 'Icon'];
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accomplishments', function (Blueprint $table) {
            $table->id();
            $table->string('Header');
            $table->string('Date');
            $table->string('ImageName');
            $table->string('Icon');
            $table->longText('Description');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accomplishments');
    }
}
