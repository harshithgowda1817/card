import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="rounded-2xl bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] p-8 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-white/90">Admin</h1>
            <p className="text-sm text-white/40 mt-1">Sign in to manage your links</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 pl-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff70,0_2px_8px_#000000a0_inset] transition-shadow"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 pl-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff70,0_2px_8px_#000000a0_inset] transition-shadow"
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-400/80 text-center bg-red-500/10 rounded-lg py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] text-white/70 text-sm font-medium hover:text-white/90 active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
