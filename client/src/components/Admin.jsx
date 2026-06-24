import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken, authHeaders } from '../auth';
import { GitHubLogo, LinkedInLogo, TwitterLogo, InstagramLogo, YouTubeLogo, WebsiteLogo, EmailLogo } from './logos';

const platforms = [
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'x', label: 'X (Twitter)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'website', label: 'Website' },
  { value: 'email', label: 'Email' },
  { value: 'link', label: 'Custom Link' },
];

const platformIcons = {
  github: GitHubLogo,
  linkedin: LinkedInLogo,
  x: TwitterLogo,
  instagram: InstagramLogo,
  youtube: YouTubeLogo,
  website: WebsiteLogo,
  email: EmailLogo,
  link: WebsiteLogo,
};

const emptyLink = { title: '', url: '', platform: 'link', order: 0, active: true };

export default function Admin() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [links, setLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [linkForm, setLinkForm] = useState(emptyLink);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchProfile();
    fetchLinks();
  }, []);

  async function fetchProfile() {
    const res = await fetch('/api/profile');
    const data = await res.json();
    if (data.name) setProfile({ name: data.name, bio: data.bio || '' });
  }

  async function fetchLinks() {
    const res = await fetch('/api/links/all', { headers: authHeaders() });
    const data = await res.json();
    setLinks(data);
  }

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(profile),
      });
      if (res.ok) showMsg('Profile saved');
      else showMsg('Failed to save profile');
    } catch {
      showMsg('Error saving profile');
    } finally {
      setSaving(false);
    }
  }

  async function saveLink() {
    setSaving(true);
    try {
      const isEdit = editingLink;
      const url = isEdit ? `/api/links/${editingLink}` : '/api/links';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(linkForm),
      });
      if (res.ok) {
        showMsg(isEdit ? 'Link updated' : 'Link added');
        setLinkForm(emptyLink);
        setEditingLink(null);
        setShowAddForm(false);
        fetchLinks();
      } else {
        showMsg('Failed to save link');
      }
    } catch {
      showMsg('Error saving link');
    } finally {
      setSaving(false);
    }
  }

  async function deleteLink(id) {
    if (!confirm('Delete this link?')) return;
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok) {
        showMsg('Link deleted');
        fetchLinks();
      }
    } catch {
      showMsg('Error deleting link');
    }
  }

  function editLink(link) {
    setLinkForm({
      title: link.title,
      url: link.url,
      platform: link.platform,
      order: link.order,
      active: link.active,
    });
    setEditingLink(link._id);
    setShowAddForm(true);
  }

  function cancelForm() {
    setLinkForm(emptyLink);
    setEditingLink(null);
    setShowAddForm(false);
  }

  function showMsg(text) {
    setMsg(text);
    setTimeout(() => setMsg(''), 2500);
  }

  function handleLogout() {
    clearToken();
    navigate('/');
  }

  function moveLink(link, direction) {
    const idx = links.findIndex(l => l._id === link._id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= links.length) return;

    const updated = [...links];
    const tempOrder = updated[idx].order;
    updated[idx].order = updated[swapIdx].order;
    updated[swapIdx].order = tempOrder;
    updated.sort((a, b) => a.order - b.order);
    setLinks(updated);

    Promise.all([
      fetch(`/api/links/${updated[idx]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ order: updated[idx].order }),
      }),
      fetch(`/api/links/${updated[swapIdx]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ order: updated[swapIdx].order }),
      }),
    ]);
  }

  const Icon = linkForm.platform && platformIcons[linkForm.platform]
    ? platformIcons[linkForm.platform]
    : WebsiteLogo;

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 py-8">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {msg && (
          <div className="text-xs text-white/60 text-center bg-white/5 rounded-lg py-2 shadow-[0_0.5px_0_#ffffff30,0_2px_6px_#00000090_inset]">
            {msg}
          </div>
        )}

        <div className="rounded-2xl bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70">Profile</h2>
            <button
              onClick={handleLogout}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Sign out
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-white/40 mb-1 pl-1">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff70,0_2px_8px_#000000a0_inset] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1 pl-1">Bio</label>
              <input
                type="text"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff70,0_2px_8px_#000000a0_inset] transition-shadow"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="self-start px-4 py-2 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] text-white/60 text-xs font-medium hover:text-white/90 active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>

        <div className="rounded-2xl bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70">Links</h2>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                + Add
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="rounded-xl bg-[#121212] shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <select
                  value={linkForm.platform}
                  onChange={(e) => setLinkForm({ ...linkForm, platform: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#1a1a1a] text-white/70 text-sm shadow-[0_0.5px_0_#ffffff30,0_1px_4px_#00000090_inset] outline-none appearance-none cursor-pointer"
                >
                  {platforms.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={linkForm.title}
                onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                placeholder="Link title"
                className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff30,0_1px_4px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff50,0_1px_6px_#000000b0_inset] transition-shadow"
              />
              <input
                type="text"
                value={linkForm.url}
                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                placeholder="https://…"
                className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-white/80 text-sm placeholder-white/20 shadow-[0_0.5px_0_#ffffff30,0_1px_4px_#00000090_inset] outline-none focus:shadow-[0_0.5px_0_#ffffff50,0_1px_6px_#000000b0_inset] transition-shadow"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={linkForm.order}
                  onChange={(e) => setLinkForm({ ...linkForm, order: parseInt(e.target.value) || 0 })}
                  placeholder="Order"
                  className="w-16 px-2.5 py-2 rounded-lg bg-[#1a1a1a] text-white/70 text-xs shadow-[0_0.5px_0_#ffffff30,0_1px_4px_#00000090_inset] outline-none"
                />
                <label className="flex items-center gap-2 text-xs text-white/40 cursor-pointer ml-2">
                  <input
                    type="checkbox"
                    checked={linkForm.active}
                    onChange={(e) => setLinkForm({ ...linkForm, active: e.target.checked })}
                    className="accent-white/50"
                  />
                  Active
                </label>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={cancelForm}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] text-white/40 text-xs hover:text-white/70 active:scale-[0.97] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveLink}
                    disabled={saving || !linkForm.title || !linkForm.url}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] text-white/60 text-xs font-medium hover:text-white/90 active:scale-[0.97] transition-all disabled:opacity-40"
                  >
                    {saving ? '…' : editingLink ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {links.map((link, idx) => {
              const LIcon = platformIcons[link.platform] || WebsiteLogo;
              return (
                <div
                  key={link._id}
                  className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_0.5px_0px_#ffffff1a_inset,0_1px_0.5px_#ffffff25_inset,0_6px_6px_-6px_#00000070,0_10px_10px_-10px_#00000060]"
                >
                  <button
                    onClick={() => moveLink(link, -1)}
                    disabled={idx === 0}
                    className="text-white/15 hover:text-white/40 disabled:opacity-0 transition-colors"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5l-7 7h14l-7-7z"/></svg>
                  </button>
                  <button
                    onClick={() => moveLink(link, 1)}
                    disabled={idx === links.length - 1}
                    className="text-white/15 hover:text-white/40 disabled:opacity-0 transition-colors"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 19l7-7H5l7 7z"/></svg>
                  </button>

                  <div className="w-7 h-7 rounded-md bg-[#121212] shadow-[0_0.5px_0_#ffffff30,0_1px_4px_#00000090_inset] flex items-center justify-center shrink-0">
                    <LIcon className="w-3.5 h-3.5 text-white/50" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/70 truncate">{link.title}</div>
                    <div className="text-[11px] text-white/30 truncate">{link.url}</div>
                  </div>

                  {!link.active && (
                    <span className="text-[10px] text-white/20 px-1.5 py-0.5 rounded bg-white/5">draft</span>
                  )}

                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => editLink(link)}
                      className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-3 h-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button
                      onClick={() => deleteLink(link._id)}
                      className="p-1.5 rounded-md bg-white/5 hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-3 h-3 text-white/40 hover:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
            {links.length === 0 && !showAddForm && (
              <div className="text-xs text-white/20 text-center py-6">
                No links yet. Click "+ Add" to create one.
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
            View public page
          </a>
        </div>
      </div>
    </div>
  );
}
