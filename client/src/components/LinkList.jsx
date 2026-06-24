import LinkCard from './LinkCard';

export default function LinkList({ links }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {links.map((link, idx) => (
        <LinkCard key={link._id} link={link} index={idx} />
      ))}
    </div>
  );
}
