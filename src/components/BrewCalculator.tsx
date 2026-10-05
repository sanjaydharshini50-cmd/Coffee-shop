import { useState, useEffect, useRef } from 'react';
import { BREW_GUIDES, BrewGuide } from '../data/coffeeData';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Clock, Scale } from 'lucide-react';

export function BrewCalculator() {
  const [selectedMethodId, setSelectedMethodId] = useState<string>('v60');
  const [coffeeDose, setCoffeeDose] = useState<number>(20); // grams
  const [ratioOffset, setRatioOffset] = useState<number>(0); // subtle strength adjustment (-1 stronger, +1 lighter)

  // Stopwatch state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeGuide: BrewGuide = BREW_GUIDES.find((g) => g.id === selectedMethodId) || BREW_GUIDES[0];
  const activeRatio = activeGuide.defaultRatio + ratioOffset;
  const totalWater = Math.round(coffeeDose * activeRatio);
  const bloomWater = Math.round(coffeeDose * activeGuide.bloomWaterRatio);

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-2">
            <span>Barista Laboratory</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Tool</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E140D] font-normal tracking-tight [text-wrap:balance]">
            Precision Brew Ratio & Pour Timer
          </h2>
          <p className="text-sm text-[#5F4E42] mt-3 leading-relaxed">
            Dial in single-origin clarity at home. Select your brewing method, set your coffee dose in grams, and follow our roaster-calibrated pour schedule and live brew stopwatch.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#EFE9DF] rounded-xl overflow-x-auto mb-8 max-w-2xl">
          {BREW_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => {
                setSelectedMethodId(guide.id);
                resetTimer();
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedMethodId === guide.id
                  ? 'bg-white text-[#20150E] shadow-xs'
                  : 'text-[#6B5A4D] hover:text-[#20150E]'
              }`}
            >
              {guide.name}
            </button>
          ))}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-xs space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#695547] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#9C7A58]" />
                  <span>Coffee Dose (Grounds)</span>
                </label>
                <span className="font-mono tabular-nums text-lg font-bold text-[#20150E]">
                  {coffeeDose} g
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="45"
                step="1"
                value={coffeeDose}
                onChange={(e) => setCoffeeDose(Number(e.target.value))}
                className="w-full accent-[#221711] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A6D] mt-1 font-mono">
                <span>12g (1 small cup)</span>
                <span>20g (Standard mug)</span>
                <span>40g (Carafe for 2)</span>
              </div>
            </div>

            {/* Brew Strength Ratio Offset */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#695547]">
                  Brew Ratio (Coffee : Water)
                </label>
                <span className="font-mono tabular-nums text-xs font-bold text-[#20150E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5DDD0]">
                  1 : {activeRatio}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { offset: -1, label: 'Bolder', ratio: `1:${activeGuide.defaultRatio - 1}` },
                  { offset: 0, label: 'Balanced (Standard)', ratio: `1:${activeGuide.defaultRatio}` },
                  { offset: 1, label: 'Lighter & Tea-like', ratio: `1:${activeGuide.defaultRatio + 1}` },
                ].map((r) => (
                  <button
                    key={r.offset}
                    type="button"
                    onClick={() => setRatioOffset(r.offset)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      ratioOffset === r.offset
                        ? 'border-[#221711] bg-[#FAF8F5] text-[#221711]'
                        : 'border-[#E2D8C8] text-[#7A675A] hover:border-[#C4B4A2]'
                    }`}
                  >
                    <p className="text-xs font-semibold">{r.label}</p>
                    <p className="text-[10px] font-mono tabular-nums text-[#8C7665] mt-0.5">{r.ratio}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Output Specs Cards */}
            <div className="pt-4 border-t border-[#F2ECE3] grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D6]">
                <div className="flex items-center gap-1.5 text-[#8C7A6D] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#C49257]" />
                  <span>Total Water</span>
                </div>
                <p className="font-mono tabular-nums text-xl font-bold text-[#20150E]">
                  {totalWater} g
                </p>
                <p className="text-[10px] text-[#8C7A6D] mt-0.5">Pour target weight</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D6]">
                <div className="flex items-center gap-1.5 text-[#8C7A6D] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#C49257]" />
                  <span>Bloom Water</span>
                </div>
                <p className="font-mono tabular-nums text-xl font-bold text-[#20150E]">
                  {bloomWater} g
                </p>
                <p className="text-[10px] text-[#8C7A6D] mt-0.5">{activeGuide.bloomTimeSec}s saturation</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D6]">
                <div className="flex items-center gap-1.5 text-[#8C7A6D] mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#C49257]" />
                  <span>Water Temp</span>
                </div>
                <p className="font-mono tabular-nums text-base font-bold text-[#20150E]">
                  {activeGuide.tempC}°C <span className="text-xs font-normal text-[#8C7A6D]">({activeGuide.tempF}°F)</span>
                </p>
                <p className="text-[10px] text-[#8C7A6D] mt-0.5">Off the boil</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE3D6]">
                <div className="flex items-center gap-1.5 text-[#8C7A6D] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#C49257]" />
                  <span>Grind & Time</span>
                </div>
                <p className="text-xs font-bold text-[#20150E] truncate">
                  {activeGuide.grind.split(' ')[0]}
                </p>
                <p className="text-[10px] text-[#8C7A6D] mt-0.5">{activeGuide.timeEstimate}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Schedule & Live Stopwatch */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E5DDD0] shadow-xs flex flex-col justify-between">
            <div>
              {/* Header with Stopwatch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D6]">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#20150E]">{activeGuide.name} Schedule</h3>
                  <p className="text-xs text-[#7A675A] mt-0.5">{activeGuide.description}</p>
                </div>

                {/* Stopwatch Widget */}
                <div className="flex items-center gap-3 bg-[#FAF8F5] p-2 px-3 rounded-lg border border-[#E5DDD0]">
                  <span className="font-mono tabular-nums text-2xl font-bold text-[#20150E]">
                    {formatTimer(timerSeconds)}
                  </span>

                  <button
                    onClick={toggleTimer}
                    className={`p-2 rounded-md transition-colors ${
                      isTimerRunning
                        ? 'bg-[#A34825] text-white hover:bg-[#86381C]'
                        : 'bg-[#221711] text-white hover:bg-[#3D291D]'
                    }`}
                    aria-label={isTimerRunning ? 'Pause timer' : 'Start brew timer'}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={resetTimer}
                    className="p-2 rounded-md border border-[#D5C9B8] text-[#5C4A3E] hover:bg-[#EFE9DF] transition-colors"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Sequence */}
              <div className="mt-6 space-y-4">
                {activeGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3.5 rounded-lg border border-[#F0EBE1] hover:border-[#D5C9B8] transition-colors"
                  >
                    <div className="shrink-0 text-center w-24">
                      <span className="font-mono tabular-nums text-xs font-semibold text-[#8C6239] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE3D6] block">
                        {step.time}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#20150E]">{step.action}</h4>
                      <p className="text-xs text-[#5F4E42] mt-1 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roaster Pro-Tip note */}
            <div className="mt-6 pt-4 border-t border-[#F2ECE3] text-xs text-[#7A675A] flex items-center justify-between">
              <span>Tip: Always preheat your ceramic or glass vessel and rinse paper filters with hot water to remove woody taste.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
