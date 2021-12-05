<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinanceDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finance_departments', function (Blueprint $table) {
            $table->id();
            $table->string('SectionTitle');
            $table->string('Header');
            $table->string('SubHeader');
            $table->string('ImageName');
            $table->text('Description');
            $table->string('HeadedBy');
            $table->string('EduCationLevel');
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
        Schema::dropIfExists('finance_departments');
    }
}
