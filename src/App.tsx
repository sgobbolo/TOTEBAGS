import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Ruler, 
  Info, 
  Layout,
  Scissors,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
  ArrowRight
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ToteStyle = "mini" | "standard" | "oversized";

interface BagDimensions {
  width: number;
  height: number;
  handleDrop: number;
}

interface FabricCut {
  name: string;
  width: number;
  height: number;
  quantity: number;
}

export default function App() {
  const [height, setHeight] = useState<number>(170);
  const [style, setStyle] = useState<ToteStyle>("standard");
  const [seamAllowance, setSeamAllowance] = useState<number>(1.5);
  const [showFabric, setShowFabric] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const handleHeightChange = useCallback((vals: number | readonly number[]) => {
    if (Array.isArray(vals) && vals.length > 0) {
      setHeight(vals[0]);
    } else if (typeof vals === 'number') {
      setHeight(vals);
    }
  }, []);

  const handleSeamChange = useCallback((vals: number | readonly number[]) => {
    if (Array.isArray(vals) && vals.length > 0) {
      setSeamAllowance(vals[0]);
    } else if (typeof vals === 'number') {
      setSeamAllowance(vals);
    }
  }, []);

  const handleStyleChange = useCallback((v: string) => {
    setStyle(v as ToteStyle);
  }, []);

  const toggleFabric = useCallback(() => {
    setShowFabric(prev => !prev);
  }, []);

  const dimensions = useMemo((): BagDimensions => {
    const base = typeof height === 'number' && !isNaN(height) ? height : 170;
    const s = style || "standard";
    
    switch (s) {
      case "mini":
        return {
          width: Math.round(base * 0.15) || 0,
          height: Math.round(base * 0.14) || 0,
          handleDrop: Math.round(base * 0.08) || 0,
        };
      case "oversized":
        return {
          width: Math.round(base * 0.28) || 0,
          height: Math.round(base * 0.25) || 0,
          handleDrop: Math.round(base * 0.14) || 0,
        };
      case "standard":
      default:
        return {
          width: Math.round(base * 0.22) || 0,
          height: Math.round(base * 0.20) || 0,
          handleDrop: Math.round(base * 0.12) || 0,
        };
    }
  }, [height, style]);

  const fabricCuts = useMemo((): FabricCut[] => {
    const { width, height: bagHeight, handleDrop } = dimensions;
    const sa = typeof seamAllowance === 'number' && !isNaN(seamAllowance) ? seamAllowance : 1.5;
    const hem = 3; 

    return [
      {
        name: "Pannelli Principali",
        width: (width || 0) + (sa * 2),
        height: (bagHeight || 0) + sa + hem,
        quantity: 2
      },
      {
        name: "Manici",
        width: 8, 
        height: ((handleDrop || 0) * 2.5) + (sa * 2),
        quantity: 2
      }
    ];
  }, [dimensions, seamAllowance]);

  const copyToClipboard = useCallback(() => {
    const text = fabricCuts.map(c => `${c.name}: ${c.width.toFixed(1)} x ${c.height.toFixed(1)} cm (x${c.quantity})`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fabricCuts]);

  // Scaling factor for visualization (1cm = 2.5px approx)
  const scale = 2.5;

  return (
    <div className="min-h-screen bg-brand-warm p-4 md:p-8 flex flex-col items-center">
      <header className="max-w-4xl w-full mb-16 text-center space-y-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold tracking-[0.2em] uppercase border border-brand-accent/20"
        >
          <Scissors className="w-3 h-3" />
          Atelier di Progettazione
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tighter text-brand-ink">
            ToteScale
          </h1>
          <div className="h-px w-24 bg-brand-accent/30 mx-auto" />
        </div>
        <p className="text-xl text-brand-ink/50 max-w-xl mx-auto font-serif italic font-light">
          "L'eleganza della misura, la precisione del taglio."
        </p>
      </header>

      <main className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Controls Section */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md rounded-[32px] overflow-hidden">
            <CardHeader className="bg-brand-secondary/20 pb-8">
              <CardTitle className="text-2xl font-serif italic flex items-center gap-3">
                <Ruler className="w-5 h-5 text-brand-accent" />
                Parametri Sartoriali
              </CardTitle>
              <CardDescription>Definisci le proporzioni del tuo progetto.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              {/* Height Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label htmlFor="height" className="text-sm font-bold uppercase tracking-widest text-brand-ink/60">Altezza Persona</Label>
                  <span className="text-3xl font-serif font-bold text-brand-accent">{height} <span className="text-sm font-sans font-light text-brand-ink/40">cm</span></span>
                </div>
                <div className="px-2">
                  <Slider
                    id="height"
                    min={140}
                    max={210}
                    step={1}
                    value={[height || 170]}
                    onValueChange={handleHeightChange}
                    className="cursor-pointer"
                    aria-label="Altezza Persona"
                  />
                </div>
              </div>

              {/* Style Tabs */}
              <div className="space-y-6">
                <Label className="text-sm font-bold uppercase tracking-widest text-brand-ink/60 flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  Stile della Borsa
                </Label>
                <Tabs value={style} onValueChange={handleStyleChange} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full bg-brand-secondary/30 p-1 h-12 rounded-xl">
                    <TabsTrigger value="mini" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-accent data-[state=active]:shadow-sm">Mini</TabsTrigger>
                    <TabsTrigger value="standard" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-accent data-[state=active]:shadow-sm">Daily</TabsTrigger>
                    <TabsTrigger value="oversized" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand-accent data-[state=active]:shadow-sm">Oversize</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Seam Allowance Slider */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label htmlFor="seam" className="text-sm font-bold uppercase tracking-widest text-brand-ink/60">Margine Cucitura</Label>
                  <span className="text-xl font-serif font-bold text-brand-accent">{seamAllowance.toFixed(1)} <span className="text-xs font-sans font-light text-brand-ink/40">cm</span></span>
                </div>
                <div className="px-2">
                  <Slider
                    id="seam"
                    min={0.5}
                    max={3}
                    step={0.1}
                    value={[seamAllowance || 1.5]}
                    onValueChange={handleSeamChange}
                    className="cursor-pointer"
                    aria-label="Margine Cucitura"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fabric Calculation Toggle */}
          <Button 
            onClick={toggleFabric}
            aria-expanded={showFabric}
            className="w-full py-8 bg-brand-ink text-brand-warm hover:bg-brand-ink/90 transition-all rounded-[24px] shadow-xl group text-lg font-serif italic"
          >
            <Scissors className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
            {showFabric ? "Nascondi Piano di Taglio" : "Calcola Taglio Tessuto"}
            {showFabric ? <ChevronUp className="w-5 h-5 ml-auto" /> : <ChevronDown className="w-5 h-5 ml-auto" />}
          </Button>

          <AnimatePresence>
            {showFabric && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="overflow-hidden"
              >
                <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md border-t-8 border-t-brand-highlight rounded-[32px]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-serif flex items-center gap-3">
                        <Scissors className="w-5 h-5 text-brand-accent" />
                        Piano di Taglio
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-brand-accent hover:bg-brand-accent/10 rounded-full"
                        onClick={copyToClipboard}
                        title="Copia negli appunti"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </Button>
                    </div>
                    <CardDescription className="font-serif italic">Misure precise per il taglio del tessuto.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {fabricCuts.map((cut, idx) => (
                      <div key={idx} className="p-6 bg-brand-highlight/10 rounded-2xl border border-brand-highlight/20 space-y-3 group hover:bg-brand-highlight/20 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/40">{cut.name}</span>
                          <span className="px-3 py-1 bg-brand-accent text-white text-[10px] rounded-full font-bold shadow-sm">x{cut.quantity}</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-serif text-brand-accent">{cut.width.toFixed(1)}</span>
                          <span className="text-sm font-sans font-light text-brand-ink/30">cm (L)</span>
                          <span className="text-brand-ink/10 text-2xl font-light">×</span>
                          <span className="text-4xl font-serif text-brand-accent">{cut.height.toFixed(1)}</span>
                          <span className="text-sm font-sans font-light text-brand-ink/30">cm (A)</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-3 items-start p-4 bg-brand-secondary/10 rounded-xl border border-brand-secondary/20">
                      <Info className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <p className="text-[11px] text-brand-ink/50 leading-relaxed font-serif italic">
                        Il calcolo include un orlo superiore di 3cm e margini di cucitura di {seamAllowance}cm su tutti i lati.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visualization Section */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[850px] viz-container rounded-[48px] border border-white shadow-2xl p-12 relative overflow-hidden sartorial-grid">
          {/* Measuring Tape Border (Top) */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-brand-secondary/40 border-b border-brand-ink/10 flex items-center px-4 overflow-hidden opacity-40">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 shrink-0">
                <div className="h-4 w-px bg-brand-ink/30" />
                <span className="text-[9px] font-mono text-brand-ink/50">{i * 10}</span>
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-3 w-px bg-brand-ink/20" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
                <div className="h-2 w-px bg-brand-ink/10" />
              </div>
            ))}
          </div>

          <div className="relative flex items-end justify-center gap-24 h-full w-full max-w-4xl pt-16">
            {/* Tailor's Mannequin - SVG Version for Robustness */}
            <div className="flex flex-col items-center relative group">
              <motion.div 
                animate={{ height: height * scale }}
                className="relative flex flex-col items-center mannequin-shadow"
              >
                <svg 
                  width="120" 
                  height={height * scale} 
                  viewBox={`0 0 120 ${height * scale}`} 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="overflow-visible"
                >
                  {/* Neck Cap */}
                  <rect x="50" y="0" width="20" height="10" rx="5" fill="#8B5E3C" />
                  
                  {/* Body */}
                  <path 
                    d={`M30 15 C30 15 10 20 10 40 C10 80 30 140 30 160 C30 180 40 190 60 190 C80 190 90 180 90 160 C90 140 110 80 110 40 C110 20 90 15 90 15 L30 15Z`} 
                    fill="#E9DCC9" 
                    stroke="#3D342D" 
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                  />
                  
                  {/* Stitching Lines */}
                  <line x1="60" y1="15" x2="60" y2="190" stroke="#3D342D" strokeWidth="0.2" strokeDasharray="4 4" />
                  <path d="M10 60 Q60 70 110 60" stroke="#3D342D" strokeWidth="0.2" strokeDasharray="4 4" />
                  <path d="M20 120 Q60 130 100 120" stroke="#3D342D" strokeWidth="0.2" strokeDasharray="4 4" />

                  {/* Stand Pole */}
                  <rect x="58" y="190" width="4" height={height * scale - 190} fill="#8B5E3C" fillOpacity="0.8" />
                  
                  {/* Base */}
                  <rect x="35" y={height * scale - 10} width="50" height="4" rx="2" fill="#8B5E3C" />
                  <path d={`M45 ${height * scale - 10} L30 ${height * scale}`} stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                  <path d={`M75 ${height * scale - 10} L90 ${height * scale}`} stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                </svg>
                
                {/* Height Indicator */}
                <div className="absolute -left-24 top-0 bottom-0 flex flex-col justify-between py-8">
                  <div className="h-full border-l-2 border-brand-accent/40 relative">
                    <div className="absolute top-0 left-0 w-4 border-t-2 border-brand-accent/40" />
                    <div className="absolute bottom-0 left-0 w-4 border-t-2 border-brand-accent/40" />
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 whitespace-nowrap text-sm font-serif italic text-brand-accent/80 rotate-90 origin-left tracking-widest">
                      {height} CM
                    </div>
                  </div>
                </div>
              </motion.div>
              <p className="mt-10 text-[11px] font-bold tracking-[0.4em] text-brand-ink/30 uppercase">Manichino Sartoriale</p>
            </div>

            {/* Tote Bag Visualization */}
            <div className="flex flex-col items-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={style + seamAllowance}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Handle */}
                  <motion.div 
                    animate={{ 
                      width: dimensions.width * scale * 0.6,
                      height: dimensions.handleDrop * scale,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="border-[4px] border-brand-accent rounded-t-full mb-[-4px] relative z-20"
                  >
                    <div className="absolute inset-0 border border-dashed border-white/40 rounded-t-full" />
                  </motion.div>

                  {/* Bag Body */}
                  <div className="relative">
                    {/* Seam Allowance Border */}
                    <motion.div
                      animate={{
                        width: ((dimensions.width || 0) + ((seamAllowance || 0) * 2)) * scale,
                        height: ((dimensions.height || 0) + (seamAllowance || 0) + 3) * scale,
                      }}
                      className="absolute border-2 border-dashed border-brand-accent/30 rounded-sm pointer-events-none"
                      style={{ 
                        transform: `translate(-${(seamAllowance || 0) * scale}px, -${3 * scale}px)`,
                      }}
                    />
                    
                    {/* Main Bag Body */}
                    <motion.div 
                      animate={{ 
                        width: (dimensions.width || 0) * scale,
                        height: (dimensions.height || 0) * scale,
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="bg-brand-accent rounded-sm shadow-[0_30px_60px_rgba(198,142,116,0.4)] relative overflow-hidden group z-10 border border-brand-accent/30"
                    >
                      {/* Fabric Texture */}
                      <div className="absolute inset-0 opacity-30 pointer-events-none" 
                           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }} />
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white/40 font-serif text-[12px] tracking-[0.3em] italic uppercase">Atelier ToteScale</div>
                      
                      {/* Top Hem Line */}
                      <div className="absolute left-0 right-0 h-px border-t border-dashed border-white/50" 
                           style={{ top: `${3 * scale}px` }} />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-brand-ink/90 backdrop-blur-[3px]">
                        <div className="text-center text-white space-y-4 p-8">
                          <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-secondary">Progetto Finito</p>
                          <div className="h-px w-12 bg-brand-secondary/40 mx-auto" />
                          <p className="text-4xl font-serif italic">{dimensions.width} <span className="text-sm font-sans font-light opacity-50">x</span> {dimensions.height}</p>
                          <p className="text-[10px] opacity-40 tracking-widest">Dimensioni in cm</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="mt-10 text-[11px] font-bold tracking-[0.4em] text-brand-accent uppercase">Modello {style}</p>
            </div>
          </div>

          {/* Scale Indicator */}
          <div className="absolute bottom-12 right-12 flex items-center gap-6 bg-white/95 backdrop-blur-xl px-8 py-4 rounded-[24px] border border-brand-secondary shadow-2xl">
            <Ruler className="w-5 h-5 text-brand-accent" />
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-16 h-[2px] bg-brand-accent" />
                <span className="text-[12px] font-bold text-brand-ink/80 uppercase tracking-[0.2em]">Scala 1:10</span>
              </div>
              <span className="text-[9px] text-brand-ink/40 uppercase mt-1.5 tracking-widest">Precisione Sartoriale</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 pb-16 text-center space-y-6">
        <div className="flex justify-center gap-12">
          <div className="flex flex-col items-center gap-2 group cursor-help">
            <Minimize2 className="w-5 h-5 text-brand-accent/30 group-hover:text-brand-accent transition-colors" />
            <span className="text-[11px] font-bold text-brand-ink/30 uppercase tracking-widest">Mini</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-help">
            <ArrowRight className="w-5 h-5 text-brand-accent/30 group-hover:text-brand-accent transition-colors" />
            <span className="text-[11px] font-bold text-brand-ink/30 uppercase tracking-widest">Daily</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-help">
            <Maximize2 className="w-5 h-5 text-brand-accent/30 group-hover:text-brand-accent transition-colors" />
            <span className="text-[11px] font-bold text-brand-ink/30 uppercase tracking-widest">Oversize</span>
          </div>
        </div>
        <div className="h-px w-16 bg-brand-accent/20 mx-auto" />
        <p className="text-[12px] text-brand-ink/20 uppercase tracking-[0.3em] font-medium">
          Dalla Proporzione al Progetto &copy; 2026
        </p>
      </footer>
    </div>
  );
}
