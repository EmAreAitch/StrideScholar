import { useForm } from '@inertiajs/react'

export default function Form({ post, onSubmit, submitText }) {
  const form = useForm({
    email: post.email || '',
    password: post.password || '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={data.email}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('email', e.target.value)}
        />
        {errors.email && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.email.join(', ')}
          </div>
        )}
      </div>

      <div className="my-5">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={data.password}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('password', e.target.value)}
        />
        {errors.password && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.password.join(', ')}
          </div>
        )}
      </div>

      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="rounded-lg py-3 px-5 bg-blue-600 text-white inline-block font-medium cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}
