async function getPost(slug) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/posts/api/posts/${slug}/`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error:', error)
    return null
  }
}

export default async function PostDetail({ params }) {
  const slug = (await params).slug
  const post = await getPost(slug)

  if (!post) {
    return <main style={{maxWidth:'700px',margin:'40px auto',padding:'0 20px',fontFamily:'sans-serif'}}><h1>Post not found</h1></main>
  }

  return (
    <main style={{
      maxWidth: '700px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      {post.image && (
        <img
          src={`http://127.0.0.1:8000${post.image}`}
          alt={post.title}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        />
      )}
      <h1>{post.title}</h1>
      <p style={{color: '#999'}}>
        By {post.author} — {post.created}
      </p>
      {post.excerpt && (
        <p style={{fontWeight: 'bold'}}>{post.excerpt}</p>
      )}
      <div>{post.content}</div>
      <br/>
      <a href="/" style={{color: '#0070f3'}}>← Back to all posts</a>
    </main>
  )
}