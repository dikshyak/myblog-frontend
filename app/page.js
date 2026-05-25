async function getPosts() {
  const res = await fetch('http://127.0.0.1:8000/posts/api/posts/', {
    cache: 'no-store'
  })
  const data = await res.json()
  return data
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'sans-serif'
    }}>
      <h1>My Blog</h1>

      {posts.map(post => (
        <article key={post.id} style={{
          marginBottom: '30px',
          borderBottom: '1px solid #eee',
          paddingBottom: '20px'
        }}>
          {post.image && (
            <img
              src={`http://127.0.0.1:8000${post.image}`}
              alt={post.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
            />
          )}
          <h2>
            <a href={`/posts/${post.slug}`} style={{color: '#0070f3'}}>
              {post.title}
            </a>
          </h2>
          <p style={{color: '#666'}}>
            By {post.author} — {new Date(post.created).toLocaleDateString()}
          </p>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  )
}
