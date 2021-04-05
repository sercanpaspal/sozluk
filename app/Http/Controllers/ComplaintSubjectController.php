<?php

namespace App\Http\Controllers;

use App\Models\ComplaintSubject;

class ComplaintSubjectController extends Controller
{
    public function options()
    {
        return ComplaintSubject::get()->map(function ($complaintSubject) {
            return [
                "value" => $complaintSubject->id,
                "label" => $complaintSubject->subject,
            ];
        });
    }
}
