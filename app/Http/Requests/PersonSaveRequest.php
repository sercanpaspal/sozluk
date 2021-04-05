<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class PersonSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => ["required"],
            "birthdate" => ["required", "date"],
            "gender" => ["required"],
            "addresses" => "required",
            "addresses.*.address" => ["required"],
            "addresses.*.post_code" => ["required", "integer"],
            "addresses.*.city_name" => ["required"],
            "addresses.*.country_name" => ["required"],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'birthdate' => Carbon::parse($this->birthday)->format('Y-m-d'),
        ]);
    }
}
