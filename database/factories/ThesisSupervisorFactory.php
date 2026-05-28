<?php

namespace Database\Factories;

use App\Models\Lecturer;
use App\Models\ThesisSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ThesisSupervisor>
 */
class ThesisSupervisorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement([
            'draft',
            'submitted',
            'rejected',
            'approved'
        ]);

        return [
            'thesis_submission_id' => ThesisSubmission::factory(),
            'lecturer_id' => Lecturer::factory(),
            'role' => $this->faker->randomElement(['primary', 'secondary']),
            'approval_status' => $status,
            'rejection_reason' => $this->faker->optional()->sentence(),
            'approved_at' => $status === 'accepted' ? now() : null,
        ];
    }
}
