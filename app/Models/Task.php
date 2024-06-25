<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Task extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'task_name',
        'task_date',
        'priority',
    ];

    /**
     * Get the tasks of the user 
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

}
