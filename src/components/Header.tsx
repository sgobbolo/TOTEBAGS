// Header component for ToteScale

export const Header = () => {
  return (
    <header className="max-w-4xl w-full mb-16 text-center space-y-6">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-accent bg-opacity-10 text-brand-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        ✂️ Atelier di Progettazione
      </div>
      <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tighter">
        ToteScale
      </h1>
      <p className="text-xl text-brand-ink opacity-50 font-serif italic">
        "L'eleganza della misura, la precisione del taglio."
      </p>
    </header>
  );
};
