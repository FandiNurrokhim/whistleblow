<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\StudyProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecturer>
 */
class LecturerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'study_program_id' => StudyProgram::factory(),
            'nip' => fake()->numerify('19########'),
            'name' => $this->faker->name(),
            'can_supervisor_1' => true,
            'can_supervisor_2' => true,
            'quota' => $this->faker->numberBetween(5, 15),
        ];
    }
}
