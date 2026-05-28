<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained('assessments')->onDelete('cascade');
            $table->foreignId('criteria_id')->constrained('assessment_criteria')->onDelete('cascade');
            $table->tinyInteger('score')->unsigned(); // 1-5
            $table->text('note')->nullable();
            $table->timestamps();

            $table->unique(['assessment_id', 'criteria_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_answers');
    }
};
