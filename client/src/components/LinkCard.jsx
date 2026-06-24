import { GitHubLogo, LinkedInLogo, TwitterLogo, InstagramLogo, YouTubeLogo, WebsiteLogo, EmailLogo } from './logos';

const platformMap = {
  github: { icon: GitHubLogo, color: 'text-white/80' },
  linkedin: { icon: LinkedInLogo, color: 'text-white/80' },
  x: { icon: TwitterLogo, color: 'text-white/80' },
  instagram: { icon: InstagramLogo, color: 'text-white/80' },
  youtube: { icon: YouTubeLogo, color: 'text-white/80' },
  website: { icon: WebsiteLogo, color: 'text-white/80' },
  email: { icon: EmailLogo, color: 'text-white/80' },
};

export default function LinkCard({ link }) {
  const platform = platformMap[link.platform] || { icon: WebsiteLogo, color: 'text-white/80' };
  const Icon = platform.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 w-full px-5 py-3.5 rounded-xl bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] hover:shadow-[0_1px_0.5px_#ffffff2a_inset,0_1px_1px_#ffffff45_inset,0_12px_12px_-9px_#00000080,0_22px_22px_-14px_#00000070,0_0px_8px_0px_#00000070] active:scale-[0.98] transition-all duration-150"
    >
      <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_0.5px_0_#ffffff50,0_2px_6px_#00000090_inset] flex items-center justify-center">
        <Icon className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors duration-150" />
      </div>
      <span className="text-[15px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-150 truncate">
        {link.title}
      </span>
      <svg className="ml-auto w-4 h-4 shrink-0 text-white/30 group-hover:text-white/60 transition-colors duration-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    </a>
  );
}
