<?php

namespace Database\Seeders;

use App\Models\ComplaintSubject;
use Illuminate\Database\Seeder;

class ComplaintSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $complaintSubjects = [
            ["subject" => "Küfür, hakaret"],
            ["subject" => "Uygunsuz içerik"],
            ["subject" => "Spam"],
        ];
        foreach ($complaintSubjects as $complaintSubject) {
            ComplaintSubject::create($complaintSubject);
        }
    }
}
