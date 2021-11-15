<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRowMarketingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('row_marketings', function (Blueprint $table) {
    // protected $fillable = ['sectionIcon', 'MRowBody', 'MRowHeader'];
            $table->id();
            $table->string('sectionIcon');
            $table->text('MRowBody');
            $table->string('MRowHeader');
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
        Schema::dropIfExists('row_marketings');
    }
}
