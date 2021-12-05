<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissionsTable extends Migration
{
    /**
     * Run the migrations.
     *  protected $fillable = ['',
     'Header', 
     'Description', 
     '',
      'VaaluesHeader', 
      '', 
      'StatTotal', 
      'StatName', 
      'SectionName'
    ];
     * @return void
     */
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->String('Header')->nullable(true);
            $table->String('ImageName')->nullable(true);
            $table->longText('Description')->nullable(true);
            $table->String('SectionIcon')->nullable(true);
            $table->String('ValuesHeader')->nullable(true);
            $table->String('ValuesDesc')->nullable(true);

            $table->string('StatTotal')->nullable(true);
            $table->string('StatName')->nullable(true);

            $table->string('SectionName');


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
        Schema::dropIfExists('missions');
    }
}
