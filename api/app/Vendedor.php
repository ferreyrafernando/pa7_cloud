<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $Codigo
 * @property string $Nombre
 * @property string $login
 * @property int $HNMayor40
 * @property int $Supervisor
 * @property Supervisor $supervisor
 */
class Vendedor extends Model
{
    protected $table = 'vendedores';
    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'Codigo';

    /**
     * @var array
     */
    protected $fillable = ['Nombre', 'login', 'Supervisor'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    
    public function supervisor()
    {
        return $this->belongsTo('App\Supervisor', 'Supervisor', 'Codigo');
    }

    public $timestamps = false;

}