<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller {
    public function index() {
        return Article::latest()->get();
    }

    public function show($id) {
        return Article::with('comments')->findOrFail($id);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);
        return Article::create($data);
    }

    public function storeComment(Request $request, $id) {
        $article = Article::findOrFail($id);
        $data = $request->validate([
            'author_name' => 'required|string',
            'content' => 'required|string',
        ]);
        return $article->comments()->create($data);
    }
}