<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class InCompleteTask extends Model
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
        'status'
    ];
    /**
     * each incomplete task belongs to a user
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    protected $timestamp = true;



}
