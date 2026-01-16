export default function Contact() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <form className="max-w-md">
        <label className="block mb-2">Name<input className="w-full border rounded px-2 py-1" /></label>
        <label className="block mb-2">Email<input className="w-full border rounded px-2 py-1" /></label>
        <label className="block mb-2">Message<textarea className="w-full border rounded px-2 py-1" /></label>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}
