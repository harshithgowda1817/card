import { motion } from 'motion/react';

export default function Profile({ name, bio }) {
  const avatarLetter = name ? name.charAt(0).toUpperCase() : 'H';

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
        className="w-20 h-20 rounded-full bg-gradient-to-b from-[#202020] to-[#191919] shadow-[0_1px_0.5px_#ffffff1a_inset,0_1px_1px_#ffffff35_inset,0_10px_10px_-9px_#00000070,0_20px_20px_-14px_#00000060,0_0px_6px_0px_#00000060] flex items-center justify-center"
      >
        <span className="text-2xl font-semibold text-white/80 select-none">{avatarLetter}</span>
      </motion.div>

      <div className="text-center">
        <h1 className="text-xl font-semibold text-white/90">{name}</h1>
        {bio && <p className="text-sm text-white/50 mt-0.5">{bio}</p>}
      </div>
    </motion.div>
  );
}
