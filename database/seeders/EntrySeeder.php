<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Entry::factory()->count(50)->create();
    }
}
