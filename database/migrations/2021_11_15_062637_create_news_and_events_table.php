<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsAndEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()

    {
    // protected $fillable  = ['Title', 'Body', 'ImageName', 'CreatorName'];
        Schema::create('news_and_events', function (Blueprint $table) {
            $table->id();
            $table->string('Title');
            $table->text('Body');
            $table->string('ImageName');
            $table->string('CreatorName');
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
        Schema::dropIfExists('news_and_events');
    }
}
