<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    protected $fillable = ['platform_name', 'username', 'encrypted_password'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Automatically encrypt/decrypt passwords
    public function setEncryptedPasswordAttribute($value)
    {
        $this->attributes['encrypted_password'] = encrypt($value);
    }

    public function getEncryptedPasswordAttribute($value)
    {
        return decrypt($value);
    }
}
