<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('assessee_id')->constrained('users')->onDelete('cascade');
            $table->string('period'); // format: "YYYY-MM"
            $table->enum('type', ['manager_to_staff', 'staff_to_staff']);
            $table->decimal('final_score', 5, 2)->nullable();
            $table->enum('status', ['draft', 'submitted', 'completed'])->default('draft');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['assessor_id', 'assessee_id', 'period']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
