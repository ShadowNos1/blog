<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::create([
            'title' => 'Первый пост',
            'content' => 'Содержимое первой статьи для нашего блога.'
        ]);

        Article::create([
            'title' => 'Проверка связи',
            'content' => 'Если вы видите этот текст, значит API и БД работают!'
        ]);
    }
}