import { GitHubLogo, LinkedInLogo, TwitterLogo } from './logos';

const socialLinks = [
  { icon: GitHubLogo, url: 'https://github.com/harshithgowda1817', label: 'GitHub' },
  { icon: LinkedInLogo, url: 'https://www.linkedin.com/in/harshith-gowda-8783382a7/', label: 'LinkedIn' },
  { icon: TwitterLogo, url: 'https://x.com/Harshithg1817', label: 'X' },
];

export default function Profile({ name, bio }) {
  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] flex items-center justify-center">
        <span className="text-2xl font-semibold text-white/80 select-none">{initials}</span>
      </div>

      <div className="text-center">
        <h1 className="text-xl font-semibold text-white/90">{name}</h1>
        {bio && <p className="text-sm text-white/50 mt-0.5">{bio}</p>}
      </div>

      <div className="flex items-center gap-3">
        {socialLinks.map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 rounded-full bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_4px_6px_-4px_#00000070,0_8px_8px_-8px_#00000060] flex items-center justify-center text-white/60 hover:text-white/90 transition-colors duration-150 active:scale-[0.95]"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
