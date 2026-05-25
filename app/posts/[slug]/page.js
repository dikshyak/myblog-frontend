import Link from 'next/link'

async function getPost(slug) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/posts/api/posts/${slug}/`,
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('Post not found')
    return await res.json()
  } catch (error) {
    return null
  }
}

export default async function PostDetail({ params }) {
  const slug = (await params).slug
  const post = await getPost(slug)

  // Error state
  if (!post) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Post not found
          </h1>
          <p className="text-gray-400 mb-6">
            This post does not exist or was removed.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to all posts
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-6 mb-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Back to all posts
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-20">

        {/* Cover image */}
        {post.image && (
          <img
            src={`http://127.0.0.1:8000${post.image}`}
            alt={post.title}
            className="w-full h-72 object-cover rounded-xl mb-8"
          />
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-800">
          <span>By <span className="text-gray-300">{post.author}</span></span>
          <span>•</span>
          <span>{new Date(post.created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-300 font-medium mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

      </div>
    </main>
  )
}
