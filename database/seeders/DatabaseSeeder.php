<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run() : void
    {

        \App\Models\Role::factory()
            ->count(2)
            ->sequence(
                ['name' => 'supervisor'],
                ['name' => 'subordinate']
            )
            ->create();
        \App\Models\User::factory()
            ->count(20)
            ->sequence(
                ['role_id' => 1],
                ['role_id' => 2]
            )->has(\App\Models\Task::factory()
                ->count(6)
                ->sequence(
                    ['priority' => 'high'],
                    ['priority' => 'medium'],
                    ['priority' => 'low']
                ))
            ->create();


    }
}
