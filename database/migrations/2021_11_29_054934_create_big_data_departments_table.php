<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBigDataDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // protected $fillable = ['SectionTitle', 'Header', 'SubHeader', 'Description', 'HeadedBy', 'EduCationLevel'];

        Schema::create('big_data_departments', function (Blueprint $table) {
            $table->id();
            $table->string('SectionTitle');
            $table->string('Header');
            $table->string('SubHeader');
            $table->string('ImageName');
            $table->text('Description' );
            $table->string('HeadedBy' );

            $table->string('EduCationLevel' );
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
        Schema::dropIfExists('big_data_departments');
    }
}
