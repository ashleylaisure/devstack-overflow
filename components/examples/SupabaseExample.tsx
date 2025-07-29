'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSupabase } from '@/lib/hooks/useSupabase'

interface Post {
  id: number
  title: string
  content: string
  author_id: string
  created_at: string
}

export default function SupabaseExample() {
  const { data: session } = useSession()
  const supabase = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState({ title: '', content: '' })

  // Fetch posts from Supabase
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    if (!session?.user?.id || !newPost.title.trim() || !newPost.content.trim()) {
      return
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: newPost.title,
            content: newPost.content,
            author_id: session.user.id,
          }
        ])
        .select()

      if (error) {
        console.error('Error creating post:', error)
      } else {
        setNewPost({ title: '', content: '' })
        fetchPosts() // Refresh posts
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <div className="p-4">Loading posts...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supabase + NextAuth Example</h1>
      
      {session ? (
        <div className="mb-8 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            Welcome, {session.user?.name || session.user?.email}!
          </p>
          <p className="text-sm text-green-600">
            You're authenticated with NextAuth and can interact with Supabase.
          </p>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">
            Please sign in to create posts.
          </p>
        </div>
      )}

      {/* Create Post Form */}
      {session && (
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Post content"
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              className="w-full p-2 border rounded h-24"
            />
            <button
              onClick={createPost}
              disabled={!newPost.title.trim() || !newPost.content.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Create Post
            </button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts from Supabase</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found. Create one above!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.content}</p>
                <p className="text-sm text-gray-400">
                  Created: {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}