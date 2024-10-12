export default function Post({ post }) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Email:</strong>
        {post.email?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Password:</strong>
        {post.password?.toString()}
      </p>
    </div>
  )
}
