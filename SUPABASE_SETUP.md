# Supabase Setup Guide

This guide will help you connect your Next.js project to Supabase while keeping your existing NextAuth setup.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. A Supabase project created

## Step 1: Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon/Public Key** (starts with `eyJ`)
   - **Service Role Key** (starts with `eyJ`) - Optional, for admin operations

## Step 2: Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For admin operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration (if not already set)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth Provider Credentials (if not already set)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Step 3: Database Setup (Optional)

If you want to use the example component, create these tables in your Supabase database:

### Users Table (for NextAuth integration)
```sql
create table users (
  id text primary key,
  email text unique not null,
  name text,
  image text,
  provider text,
  provider_account_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table users enable row level security;

-- Allow users to read their own data
create policy "Users can view own profile" on users
  for select using (auth.uid()::text = id);

-- Allow users to update their own data
create policy "Users can update own profile" on users
  for update using (auth.uid()::text = id);
```

### Posts Table (for the example component)
```sql
create table posts (
  id bigserial primary key,
  title text not null,
  content text not null,
  author_id text not null references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table posts enable row level security;

-- Allow anyone to read posts
create policy "Anyone can view posts" on posts
  for select using (true);

-- Allow authenticated users to create posts
create policy "Authenticated users can create posts" on posts
  for insert with check (auth.uid()::text = author_id);

-- Allow users to update their own posts
create policy "Users can update own posts" on posts
  for update using (auth.uid()::text = author_id);

-- Allow users to delete their own posts
create policy "Users can delete own posts" on posts
  for delete using (auth.uid()::text = author_id);
```

## Step 4: Usage Examples

### Basic Supabase Client Usage

```typescript
import { useSupabase } from '@/lib/hooks/useSupabase'

export default function MyComponent() {
  const supabase = useSupabase()

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
    
    if (error) {
      console.error('Error:', error)
    } else {
      console.log('Data:', data)
    }
  }

  return (
    <button onClick={fetchData}>
      Fetch Data
    </button>
  )
}
```

### Server-Side Operations

```typescript
import { createSupabaseServerClient } from '@/lib/supabase'

export default async function ServerComponent() {
  const supabase = createSupabaseServerClient()
  
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
  
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Real-time Subscriptions

```typescript
import { useEffect } from 'react'
import { useSupabase } from '@/lib/hooks/useSupabase'

export default function RealtimeComponent() {
  const supabase = useSupabase()

  useEffect(() => {
    const subscription = supabase
      .channel('posts_channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Change received!', payload)
          // Handle real-time updates
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <div>Real-time component</div>
}
```

## Step 5: Authentication Integration

You have two options for authentication:

### Option 1: NextAuth + Supabase (Current Setup)
- Use NextAuth for authentication (GitHub, Google, etc.)
- Store user data in Supabase for additional profile information
- This is already configured in your `auth.ts` file

### Option 2: Pure Supabase Auth
If you prefer to use only Supabase for authentication, you can:

1. Remove NextAuth dependencies
2. Use Supabase Auth providers
3. Update your components to use `useSupabaseAuth()` hook

## Step 6: Type Safety (Optional)

Generate TypeScript types for your database:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Generate types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > types/supabase.ts
```

Then update `lib/supabase.ts` to use your types:

```typescript
import { Database } from '@/types/supabase'

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Make sure `.env.local` is in the project root and restart your dev server
2. **Database connection errors**: Verify your Supabase URL and keys are correct
3. **RLS errors**: Ensure your Row Level Security policies are set up correctly
4. **NextAuth integration issues**: Check that user IDs are being passed correctly between NextAuth and Supabase

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Documentation](https://nextjs.org/docs)

## Next Steps

1. Set up your environment variables
2. Create your database tables
3. Test the connection with the example component at `/components/examples/SupabaseExample.tsx`
4. Build your application features using the Supabase client

Happy coding! 🚀