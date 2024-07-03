<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() : void
    {
        Schema::create('complete_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_name');
            $table->string('task_date');
            $table->enum('priority', ['high', 'medium', 'low'])->default('low');
            $table->integer('user_id');
            $table->integer('supervisor_id')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down() : void
    {
        Schema::dropIfExists('complete_tasks');
    }
};
