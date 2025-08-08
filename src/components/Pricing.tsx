// src/components/Pricing.tsx

export default function Pricing() {
  return (
    <section className="bg-[#0e0e0e] text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-gray-400">Choose the plan that fits your learning style and goals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Free Plan */}
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Free Plan</h3>
            <p className="text-3xl font-bold mb-4 text-indigo-500">₹0</p>
            <p className="mb-6 text-gray-300">Perfect to get started with basic features.</p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✓ Browse tutor profiles</li>
              <li>✓ Send up to 3 requests/week</li>
              <li>✓ 1 free 15-min trial session</li>
              <li>✓ Basic messaging</li>
            </ul>
          </div>
          <br></br>
          <button className="mt-8 bg-indigo-500 text-black py-2 rounded-md font-semibold hover:bg-[#00a3cc] transition">
            Get Started
          </button>
        </div>

        {/* Starter Plan */}
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md border-[#00bfff] scale-100">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Starter Learning Pack</h3>
            <p className="text-3xl font-bold mb-4 text-indigo-500">₹199<span className="text-base font-medium"> /session</span></p>
            <p className="mb-6 text-gray-300">Book one full session and keep learning!</p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✓ 60-min session with any tutor</li>
              <li>✓ Access to session notes</li>
              <li>✓ 24-hour chat after session</li>
            </ul>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
<button className="w-full bg-indigo-500 hover:bg-sky-500 text-black font-semibold py-2 rounded-md transition-all duration-300">
  Buy Now
</button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Pro Learning Pack</h3>
            <p className="text-3xl font-bold mb-4 text-indigo-500">₹699<span className="text-base font-medium"> /month</span></p>
            <p className="mb-6 text-gray-300">For serious learners who want more.</p>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✓ Unlimited booking requests</li>
              <li>✓ 4 guaranteed sessions</li>
              <li>✓ Save favorite tutors</li>
              <li>✓ Priority response from mentors</li>
            </ul>
          </div>
          <br></br>
          <button className="mt-8 bg-indigo-500 text-black py-2 rounded-md font-semibold hover:bg-[#00a3cc] transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
