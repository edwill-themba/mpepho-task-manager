<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition() : array
    {

        return [
            'task_name' => $this->faker->sentence($nbWords = 3, $variableNbWords = true),
            'task_date' => $this->faker->dateTimeBetween($startDate = 'now', $endDate = '7 months', $timezone = null),
            'priority' => $this->faker->randomElement(['high', 'medium', 'low']),
            'supervisor_id' => null,
            'status' => 'incomplete'
        ];
    }
}
