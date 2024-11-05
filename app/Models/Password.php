<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @param int $user_id
 * @param string $platform_name
 * @param string $username
 * @param string $encrypted_password
 */
class Password extends Model
{
    protected $fillable = [
        'user_id',
        'platform_name',
        'username',
        'encrypted_password',
        'notes'
    ];

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
