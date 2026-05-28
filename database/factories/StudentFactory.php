<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\StudyProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
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
            'nim' => fake()->numerify('22########'),
            'name' => $this->faker->name(),
        ];
    }
}
