export default function Footer() {
  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-white/20">
      <span>&copy; {new Date().getFullYear()}</span>
      <span className="w-1 h-1 rounded-full bg-white/10" />
      <span>Harshit Gowda B M</span>
    </div>
  );
}
