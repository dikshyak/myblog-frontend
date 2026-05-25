import Link from 'next/link'

async function getPosts() {
  try {
    const res = await fetch('http://127.0.0.1:8000/posts/api/posts/', {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Failed to fetch posts')
    return await res.json()
  } catch (error) {
    return null
  }
}

export default async function Home() {
  const posts = await getPosts()

  // Error state
  if (!posts) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-6">
            Could not connect to the Django API. Make sure it is running on port 8000.
          </p>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Try again
          </a>
        </div>
      </main>
    )
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No posts yet</h1>
          <p className="text-gray-400">
            Add some posts in the Django admin panel.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-6 mb-10">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white">
            My Blog
          </h1>
          <p className="text-gray-400 mt-1">
            Built with Django + Next.js
          </p>
        </div>
      </header>

      {/* Posts list */}
      <div className="max-w-3xl mx-auto px-6">
        {posts.map(post => (
          <article
            key={post.id}
            className="mb-10 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all"
          >
            {/* Cover image */}
            {post.image && (
              <img
                src={`http://127.0.0.1:8000${post.image}`}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
            )}

            <div className="p-6">
              {/* Title */}
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>

              {/* Meta */}
              <p className="text-gray-500 text-sm mb-3">
                By {post.author} — {new Date(post.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}

              {/* Read more */}
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
