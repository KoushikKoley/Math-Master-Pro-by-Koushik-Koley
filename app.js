/* ===================================================================
   MathLab — Premium Math Practice Engine
   3-file vanilla JS app. No dependencies. Production-ready.
   Modules: State, Storage, MathEngine, Generator, DifficultyEngine,
   AdaptiveEngine, MentalMath, Timer, Scoring, Charts, UI, Keyboard,
   Presets, Achievements, Mistakes.
   =================================================================== */
(() => {
  "use strict";

  /* ============== CONFIG ============== */
  const RANKS = [
    { name: "Rookie", min: 0, icon: "🌱" },
    { name: "Learner", min: 100, icon: "📚" },
    { name: "Calculator", min: 500, icon: "🧮" },
    { name: "Mathlete", min: 2000, icon: "🏅" },
    { name: "Sharpshooter", min: 5000, icon: "🎯" },
    { name: "Mentalist", min: 10000, icon: "🧠" },
    { name: "Number Ninja", min: 25000, icon: "🥷" },
    { name: "Grandmaster", min: 50000, icon: "👑" },
  ];

  const ACHIEVEMENTS = [
    {
      id: "first100",
      icon: "🥉",
      name: "Bronze",
      desc: "Answer 100 questions",
    },
    {
      id: "first1000",
      icon: "🥈",
      name: "Silver",
      desc: "Answer 1,000 questions",
    },
    {
      id: "first10000",
      icon: "🥇",
      name: "Gold",
      desc: "Answer 10,000 questions",
    },
    {
      id: "fast10",
      icon: "⚡",
      name: "Speedster",
      desc: "10 correct under 5 sec each",
    },
    {
      id: "perfect",
      icon: "🎯",
      name: "Flawless",
      desc: "100% on a 20+ question session",
    },
    {
      id: "mental_master",
      icon: "🧠",
      name: "Mental Master",
      desc: "50 mental math correct",
    },
    { id: "streak30", icon: "🔥", name: "On Fire", desc: "30-day streak" },
    {
      id: "boss_slayer",
      icon: "⚔️",
      name: "Boss Slayer",
      desc: "Beat a Boss Challenge",
    },
    {
      id: "marathoner",
      icon: "🏃",
      name: "Marathoner",
      desc: "Finish a 100-question Marathon",
    },
    {
      id: "comeback",
      icon: "💫",
      name: "Comeback",
      desc: "Hit 95%+ after a <60% session",
    },
    {
      id: "hard_mode",
      icon: "💪",
      name: "Hard Mode",
      desc: "Solve a difficulty 8+ question correctly",
    },
    {
      id: "zen_master",
      icon: "🧘",
      name: "Zen Master",
      desc: "Complete a Zen session of 30+ Qs",
    },
  ];

  const PRESETS = {
    "beginner-addition": {
      op: "addition",
      numType: "normal",
      d1: 1,
      d2: 2,
      operands: 2,
      format: "standard",
      questions: 10,
      timer: 0,
      speedMode: "practice",
      negPct: 0,
      noRepeat: true,
      adaptive: true,
      icon: "➕",
      name: "Beginner Addition",
      desc: "1–2 digit, no timer, gentle start.",
    },
    "speed-addition": {
      op: "addition",
      numType: "normal",
      d1: 2,
      d2: 3,
      operands: 2,
      format: "standard",
      questions: 50,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "⚡",
      name: "Speed Addition",
      desc: "2–3 digit, 60-second sprint.",
    },
    "mult-tables": {
      op: "multiplication",
      numType: "normal",
      d1: 1,
      d2: 2,
      operands: 2,
      format: "standard",
      questions: 50,
      timer: 0,
      speedMode: "practice",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "✖️",
      name: "Times Tables",
      desc: "Master ×1–×12 foundations.",
    },
    "integer-challenge": {
      op: "mixed",
      numType: "integer",
      d1: 2,
      d2: 4,
      operands: 3,
      format: "standard",
      questions: 25,
      timer: 0,
      speedMode: "practice",
      negPct: 50,
      noRepeat: true,
      adaptive: true,
      icon: "±",
      name: "Integer Challenge",
      desc: "2–4 digit mixed with negatives.",
    },
    "mental-math": {
      op: "mixed",
      numType: "normal",
      d1: 2,
      d2: 2,
      operands: 3,
      format: "standard",
      questions: 20,
      timer: 120,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: true,
      icon: "🧠",
      name: "Mental Math",
      desc: "3-operand mixed, 2-minute timer.",
    },
    extreme: {
      op: "mixed",
      numType: "integer",
      d1: 6,
      d2: 10,
      operands: 4,
      format: "standard",
      questions: 30,
      timer: 600,
      speedMode: "boss",
      negPct: 40,
      noRepeat: true,
      adaptive: true,
      icon: "🌋",
      name: "Extreme",
      desc: "6–10 digit mixed with negatives. Brutal.",
    },
    "square-drill": {
      op: "square",
      numType: "normal",
      d1: 1,
      d2: 1,
      operands: 2,
      format: "standard",
      questions: 20,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "n²",
      name: "Square Drill",
      desc: "Memorize squares of 1–30.",
    },
    "cube-drill": {
      op: "cube",
      numType: "normal",
      d1: 1,
      d2: 1,
      operands: 2,
      format: "standard",
      questions: 15,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "n³",
      name: "Cube Drill",
      desc: "Cubes of 1–12.",
    },
    "power-drill": {
      op: "pow2",
      numType: "normal",
      d1: 1,
      d2: 1,
      operands: 2,
      format: "standard",
      questions: 15,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "2ⁿ",
      name: "Powers of 2",
      desc: "2¹ through 2¹⁵ from memory.",
    },
    "percent-drill": {
      op: "percent",
      numType: "normal",
      d1: 2,
      d2: 2,
      operands: 2,
      format: "standard",
      questions: 20,
      timer: 90,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "%",
      name: "Percent Drill",
      desc: "Quick percent calculations.",
    },
    "sqrt-drill": {
      op: "sqrt",
      numType: "normal",
      d1: 1,
      d2: 1,
      operands: 2,
      format: "standard",
      questions: 15,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "√",
      name: "Square Roots",
      desc: "Perfect square roots 1–30.",
    },
    "factorial-drill": {
      op: "factorial",
      numType: "normal",
      d1: 1,
      d2: 1,
      operands: 2,
      format: "standard",
      questions: 12,
      timer: 60,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "n!",
      name: "Factorials",
      desc: "1! through 15!.",
    },
    "gcd-drill": {
      op: "gcd",
      numType: "normal",
      d1: 2,
      d2: 2,
      operands: 2,
      format: "standard",
      questions: 20,
      timer: 120,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "gcd",
      name: "GCD Drill",
      desc: "Find greatest common divisors.",
    },
    "lcm-drill": {
      op: "lcm",
      numType: "normal",
      d1: 2,
      d2: 2,
      operands: 2,
      format: "standard",
      questions: 20,
      timer: 120,
      speedMode: "speed",
      negPct: 0,
      noRepeat: true,
      adaptive: false,
      icon: "lcm",
      name: "LCM Drill",
      desc: "Find least common multiples.",
    },
  };

  /* Study modules — reference tables + drill practice. */
  const STUDY_MODULES = [
    {
      id: "squares",
      icon: "n²",
      name: "Squares",
      desc: "Memorize squares 1–30.",
      range: [1, 30],
      op: "square",
      table: (n) => ({
        input: `${n}²`,
        output: MathEngine.formatBigInt(BigInt(n) * BigInt(n)),
      }),
    },
    {
      id: "cubes",
      icon: "n³",
      name: "Cubes",
      desc: "Cubes of 1–12.",
      range: [1, 12],
      op: "cube",
      table: (n) => ({
        input: `${n}³`,
        output: MathEngine.formatBigInt(BigInt(n) ** 3n),
      }),
    },
    {
      id: "sqrt",
      icon: "√",
      name: "Square Roots",
      desc: "Perfect square roots 1–30.",
      range: [1, 30],
      op: "sqrt",
      table: (n) => ({
        input: `√${n * n}`,
        output: MathEngine.formatBigInt(BigInt(n)),
      }),
    },
    {
      id: "cbrt",
      icon: "∛",
      name: "Cube Roots",
      desc: "Perfect cube roots 1–12.",
      range: [1, 12],
      op: "cbrt",
      table: (n) => ({
        input: `∛${n * n * n}`,
        output: MathEngine.formatBigInt(BigInt(n)),
      }),
    },
    {
      id: "pow2",
      icon: "2ⁿ",
      name: "Powers of 2",
      desc: "2¹ through 2¹⁵.",
      range: [1, 15],
      op: "pow2",
      table: (n) => ({
        input: `2^${n}`,
        output: MathEngine.formatBigInt(1n << BigInt(n)),
      }),
    },
    {
      id: "pow10",
      icon: "10ⁿ",
      name: "Powers of 10",
      desc: "10¹ through 10¹⁰.",
      range: [1, 10],
      op: "pow10",
      table: (n) => ({
        input: `10^${n}`,
        output: MathEngine.formatBigInt(10n ** BigInt(n)),
      }),
    },
    {
      id: "factorial",
      icon: "n!",
      name: "Factorials",
      desc: "1! through 15!.",
      range: [1, 15],
      op: "factorial",
      table: (n) => {
        let r = 1n;
        for (let i = 2n; i <= BigInt(n); i++) r *= i;
        return { input: `${n}!`, output: MathEngine.formatBigInt(r) };
      },
    },
    {
      id: "primes",
      icon: "⟐",
      name: "Prime Numbers",
      desc: "First 25 prime numbers.",
      range: [1, 25],
      op: null,
      table: (i) => {
        const primes = [
          2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61,
          67, 71, 73, 79, 83, 89, 97,
        ];
        return { input: `#${i}`, output: String(primes[i - 1]) };
      },
    },
    {
      id: "mult-tables",
      icon: "×",
      name: "Times Tables",
      desc: "Multiplication facts 1–12.",
      range: [2, 12],
      op: "multiplication",
      table: (n) => ({
        input: `${n} × ${n}`,
        output: MathEngine.formatBigInt(BigInt(n) * BigInt(n)),
      }),
    },

    /* ---------- Algebra ---------- */
    {
      id: "algebra-identities",
      icon: "a²",
      name: "Algebra Identities",
      desc: "Core algebraic identities.",
      range: [1, 8],
      op: null,
      table: (i) => {
        const list = [
          { input: "(a+b)²", output: "a² + 2ab + b²" },
          { input: "(a−b)²", output: "a² − 2ab + b²" },
          { input: "a² − b²", output: "(a+b)(a−b)" },
          { input: "(a+b)³", output: "a³ + 3a²b + 3ab² + b³" },
          { input: "(a−b)³", output: "a³ − 3a²b + 3ab² − b³" },
          { input: "a³ + b³", output: "(a+b)(a² − ab + b²)" },
          { input: "a³ − b³", output: "(a−b)(a² + ab + b²)" },
          { input: "(a+b+c)²", output: "a²+b²+c²+2ab+2bc+2ca" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "quadratic",
      icon: "x²",
      name: "Quadratic Formula",
      desc: "Roots of ax²+bx+c=0.",
      range: [1, 1],
      op: null,
      table: () => ({ input: "x =", output: "(-b ± √(b²-4ac)) / 2a" }),
    },
    {
      id: "linear-eq",
      icon: "ax",
      name: "Linear Equations",
      desc: "Solve ax + b = c.",
      range: [1, 8],
      op: null,
      table: (i) => {
        // Generate solvable linear equations with integer roots.
        const a = MathEngine.randInt(2, 9);
        const b = MathEngine.randInt(1, 30);
        const x = MathEngine.randInt(1, 12);
        const c = a * x + b;
        return { input: `${a}x + ${b} = ${c}`, output: String(x) };
      },
    },

    /* ---------- Trigonometry ---------- */
    {
      id: "trig-special",
      icon: "sin",
      name: "Trig Special Angles",
      desc: "sin/cos/tan of 0°, 30°, 45°, 60°, 90°.",
      range: [1, 15],
      op: null,
      table: (i) => {
        const list = [
          { input: "sin 0°", output: "0" },
          { input: "sin 30°", output: "1/2" },
          { input: "sin 45°", output: "√2/2" },
          { input: "sin 60°", output: "√3/2" },
          { input: "sin 90°", output: "1" },
          { input: "cos 0°", output: "1" },
          { input: "cos 30°", output: "√3/2" },
          { input: "cos 45°", output: "√2/2" },
          { input: "cos 60°", output: "1/2" },
          { input: "cos 90°", output: "0" },
          { input: "tan 0°", output: "0" },
          { input: "tan 30°", output: "√3/3" },
          { input: "tan 45°", output: "1" },
          { input: "tan 60°", output: "√3" },
          { input: "tan 90°", output: "undefined" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "trig-identities",
      icon: "sin²",
      name: "Trig Identities",
      desc: "Pythagorean + reciprocal identities.",
      range: [1, 8],
      op: null,
      table: (i) => {
        const list = [
          { input: "sin²θ + cos²θ", output: "1" },
          { input: "1 + tan²θ", output: "sec²θ" },
          { input: "1 + cot²θ", output: "csc²θ" },
          { input: "sin θ / cos θ", output: "tan θ" },
          { input: "cos θ / sin θ", output: "cot θ" },
          { input: "sin(−θ)", output: "−sin θ" },
          { input: "cos(−θ)", output: "cos θ" },
          { input: "tan(−θ)", output: "−tan θ" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "trig-values",
      icon: "π",
      name: "Trig Values (π)",
      desc: "Common radians to remember.",
      range: [1, 6],
      op: null,
      table: (i) => {
        const list = [
          { input: "π/6", output: "30°" },
          { input: "π/4", output: "45°" },
          { input: "π/3", output: "60°" },
          { input: "π/2", output: "90°" },
          { input: "2π/3", output: "120°" },
          { input: "3π/4", output: "135°" },
        ];
        return list[i - 1];
      },
    },

    /* ---------- Geometry ---------- */
    {
      id: "geo-area",
      icon: "A",
      name: "Area Formulas",
      desc: "Areas of common shapes.",
      range: [1, 8],
      op: null,
      table: (i) => {
        const list = [
          { input: "Square", output: "side²" },
          { input: "Rectangle", output: "l × w" },
          { input: "Triangle", output: "(1/2) × b × h" },
          { input: "Circle", output: "π r²" },
          { input: "Parallelogram", output: "b × h" },
          { input: "Trapezoid", output: "(1/2)(b₁+b₂)h" },
          { input: "Rhombus", output: "(d₁×d₂)/2" },
          { input: "Ellipse", output: "π a b" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "geo-volume",
      icon: "V",
      name: "Volume Formulas",
      desc: "Volumes of common solids.",
      range: [1, 7],
      op: null,
      table: (i) => {
        const list = [
          { input: "Cube", output: "side³" },
          { input: "Cuboid", output: "l × w × h" },
          { input: "Cylinder", output: "π r² h" },
          { input: "Cone", output: "(1/3) π r² h" },
          { input: "Sphere", output: "(4/3) π r³" },
          { input: "Hemisphere", output: "(2/3) π r³" },
          { input: "Pyramid", output: "(1/3) × base × h" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "pythagoras",
      icon: "a²+b²",
      name: "Pythagorean Triples",
      desc: "Common integer triples.",
      range: [1, 8],
      op: null,
      table: (i) => {
        const list = [
          { input: "3, 4", output: "5" },
          { input: "5, 12", output: "13" },
          { input: "8, 15", output: "17" },
          { input: "7, 24", output: "25" },
          { input: "20, 21", output: "29" },
          { input: "9, 40", output: "41" },
          { input: "11, 60", output: "61" },
          { input: "12, 35", output: "37" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "geo-perimeter",
      icon: "P",
      name: "Perimeter Formulas",
      desc: "Perimeters of common shapes.",
      range: [1, 5],
      op: null,
      table: (i) => {
        const list = [
          { input: "Square", output: "4 × side" },
          { input: "Rectangle", output: "2(l + w)" },
          { input: "Triangle", output: "a + b + c" },
          { input: "Circle (circumference)", output: "2 π r" },
          { input: "Regular polygon", output: "n × side" },
        ];
        return list[i - 1];
      },
    },

    /* ---------- Differentiation ---------- */
    {
      id: "derivatives",
      icon: "d/dx",
      name: "Common Derivatives",
      desc: "d/dx of basic functions.",
      range: [1, 12],
      op: null,
      table: (i) => {
        const list = [
          { input: "d/dx (xⁿ)", output: "n xⁿ⁻¹" },
          { input: "d/dx (sin x)", output: "cos x" },
          { input: "d/dx (cos x)", output: "−sin x" },
          { input: "d/dx (tan x)", output: "sec² x" },
          { input: "d/dx (eˣ)", output: "eˣ" },
          { input: "d/dx (aˣ)", output: "aˣ ln a" },
          { input: "d/dx (ln x)", output: "1/x" },
          { input: "d/dx (logₐ x)", output: "1/(x ln a)" },
          { input: "d/dx (uv)", output: "u dv/dx + v du/dx" },
          { input: "d/dx (u/v)", output: "(v du/dx − u dv/dx) / v²" },
          { input: "d/dx (f(g(x)))", output: "f'(g(x)) g'(x)" },
          { input: "d/dx (constant)", output: "0" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "deriv-trig",
      icon: "d/dx",
      name: "Trig Derivatives",
      desc: "Derivatives of trig functions.",
      range: [1, 6],
      op: null,
      table: (i) => {
        const list = [
          { input: "d/dx (sin x)", output: "cos x" },
          { input: "d/dx (cos x)", output: "−sin x" },
          { input: "d/dx (tan x)", output: "sec² x" },
          { input: "d/dx (csc x)", output: "−csc x cot x" },
          { input: "d/dx (sec x)", output: "sec x tan x" },
          { input: "d/dx (cot x)", output: "−csc² x" },
        ];
        return list[i - 1];
      },
    },

    /* ---------- Integration ---------- */
    {
      id: "integrals",
      icon: "∫",
      name: "Common Integrals",
      desc: "∫ of basic functions.",
      range: [1, 10],
      op: null,
      table: (i) => {
        const list = [
          { input: "∫ xⁿ dx", output: "xⁿ⁺¹/(n+1) + C" },
          { input: "∫ (1/x) dx", output: "ln|x| + C" },
          { input: "∫ eˣ dx", output: "eˣ + C" },
          { input: "∫ aˣ dx", output: "aˣ/ln a + C" },
          { input: "∫ sin x dx", output: "−cos x + C" },
          { input: "∫ cos x dx", output: "sin x + C" },
          { input: "∫ sec²x dx", output: "tan x + C" },
          { input: "∫ 1/(1+x²) dx", output: "tan⁻¹ x + C" },
          { input: "∫ 1/√(1−x²) dx", output: "sin⁻¹ x + C" },
          { input: "∫ 0 dx", output: "C" },
        ];
        return list[i - 1];
      },
    },
    {
      id: "integral-rules",
      icon: "∫",
      name: "Integration Rules",
      desc: "Substitution and parts rules.",
      range: [1, 5],
      op: null,
      table: (i) => {
        const list = [
          { input: "Substitution", output: "∫f(g)g' dx = ∫f dg" },
          { input: "By parts", output: "∫u dv = uv − ∫v du" },
          { input: "Power rule", output: "∫xⁿ = xⁿ⁺¹/(n+1)" },
          { input: "Constant mult.", output: "∫k f dx = k ∫f dx" },
          { input: "Sum rule", output: "∫(f+g) = ∫f + ∫g" },
        ];
        return list[i - 1];
      },
    },

    /* ---------- Logarithm & Exponent ---------- */
    {
      id: "log-rules",
      icon: "log",
      name: "Logarithm Rules",
      desc: "Properties of logarithms.",
      range: [1, 7],
      op: null,
      table: (i) => {
        const list = [
          { input: "logₐ a", output: "1" },
          { input: "logₐ 1", output: "0" },
          { input: "logₐ (mn)", output: "logₐ m + logₐ n" },
          { input: "logₐ (m/n)", output: "logₐ m − logₐ n" },
          { input: "logₐ (mⁿ)", output: "n logₐ m" },
          { input: "logₐ m = x", output: "aˣ = m" },
          { input: "ln e", output: "1" },
        ];
        return list[i - 1];
      },
    },

    /* ---------- Series & Sequences ---------- */
    {
      id: "series",
      icon: "Σ",
      name: "Series Formulas",
      desc: "Arithmetic & geometric series.",
      range: [1, 6],
      op: null,
      table: (i) => {
        const list = [
          { input: "AP: sum", output: "(n/2)(2a+(n−1)d)" },
          { input: "AP: nth term", output: "a + (n−1)d" },
          { input: "GP: sum", output: "a(rⁿ−1)/(r−1)" },
          { input: "GP: ∞ sum", output: "a/(1−r), |r|<1" },
          { input: "GP: nth term", output: "a rⁿ⁻¹" },
          { input: "Σ k from 1 to n", output: "n(n+1)/2" },
        ];
        return list[i - 1];
      },
    },
  ];

  const SPEED_MODES = [
    {
      id: "practice",
      icon: "📖",
      name: "Practice",
      desc: "No pressure. Learn at your pace.",
      tag: "Relaxed",
    },
    {
      id: "speed",
      icon: "⚡",
      name: "Speed",
      desc: "Answer as quickly as you can. Tracked.",
      tag: "Timed",
    },
    {
      id: "sprint",
      icon: "🔥",
      name: "Sprint",
      desc: "60-second all-out challenge.",
      tag: "60s",
    },
    {
      id: "marathon",
      icon: "🏃",
      name: "Marathon",
      desc: "100 questions. Endurance test.",
      tag: "100 Q",
    },
    {
      id: "mastery",
      icon: "🎯",
      name: "Mastery",
      desc: "Keep going until ≥95% accuracy.",
      tag: "Auto",
    },
    {
      id: "zen",
      icon: "🧘",
      name: "Zen",
      desc: "Unlimited time. Pure accuracy focus.",
      tag: "∞",
    },
    {
      id: "boss",
      icon: "⚔️",
      name: "Boss Challenge",
      desc: "Hard mixed questions. Boss-tier.",
      tag: "Hard",
    },
  ];

  const MENTAL_MODES = [
    {
      id: "addition",
      icon: "➕",
      name: "Addition",
      desc: "Sums of 2–3 numbers.",
    },
    {
      id: "subtraction",
      icon: "➖",
      name: "Subtraction",
      desc: "Quick subtraction drills.",
    },
    {
      id: "multiplication",
      icon: "✖️",
      name: "Multiplication",
      desc: "2-digit × 1-digit and beyond.",
    },
    {
      id: "division",
      icon: "➗",
      name: "Division",
      desc: "Mental division drills.",
    },
    { id: "mixed", icon: "🔀", name: "Mixed", desc: "Random operations." },
    {
      id: "percentage",
      icon: "%",
      name: "Percentage",
      desc: "Find % of a number.",
    },
    {
      id: "complements",
      icon: "⚖️",
      name: "Complements",
      desc: "What adds to 100? 1000?",
    },
    {
      id: "doubling",
      icon: "₂×",
      name: "Double & Half",
      desc: "Doubling and halving.",
    },
    {
      id: "powers10",
      icon: "×10",
      name: "×10 / ÷10",
      desc: "Powers of 10 practice.",
    },
    {
      id: "near100",
      icon: "≈100",
      name: "Near 100",
      desc: "98×97 style mental multiplication.",
    },
    {
      id: "squaring",
      icon: "n²",
      name: "Squaring",
      desc: "Squares of 1–30 and beyond.",
    },
    {
      id: "estimation",
      icon: "~",
      name: "Estimation",
      desc: "Round and estimate answers.",
    },
    {
      id: "patterns",
      icon: "🔄",
      name: "Number Patterns",
      desc: "Find the next in the sequence.",
    },
  ];

  /* ============== STATE ============== */
  const State = {
    route: "dashboard",
    config: {
      op: "addition",
      numType: "normal",
      digits1: 3,
      digits2: 2,
      operands: 2,
      format: "standard",
      divisionMode: "exact",
      carryBorrowMode: "random",
      questions: 20,
      timer: 0,
      speedMode: "practice",
      negPct: 50,
      noRepeat: true,
      adaptive: true,
      noOpRepeat: false,
      parentheses: false,
    },
    session: null, // active session
    mentalSession: null,
    // persistent:
    stats: {
      totalQuestions: 0,
      totalCorrect: 0,
      streak: 0,
      lastPracticeDate: null,
      sessions: [], // { id, date, op, count, correct, accuracy, timeMs, fastestMs, slowestMs, avgMs, difficulty, mode }
      mistakes: [], // { id, date, op, question, yourAnswer, correctAnswer, timeMs, digits, format, category }
      byOp: {
        addition: { c: 0, t: 0 },
        subtraction: { c: 0, t: 0 },
        multiplication: { c: 0, t: 0 },
        division: { c: 0, t: 0 },
        mixed: { c: 0, t: 0 },
      },
      byDigits: {}, // '2': {c:0,t:0}
      byMental: { c: 0, t: 0 },
      achievements: [],
      records: {
        fastestMs: null,
        highestAccuracy: null,
        mostPerMin: null,
        longestStreak: 0,
        bestSprintScore: null,
      },
      daily: {}, // 'YYYY-MM-DD': {c:0,t:0, ms:0}
      settings: {
        name: "Player",
        theme: "dark",
        accent: "electric",
        fontFamily: "inter",
        baseFontSize: 14,
        numberSize: 32,
        highContrast: false,
        reduceMotion: false,
        largeInput: false,
        sound: true,
        autoNext: true,
        tts: false,
        ads: true,
        sidebarWidth: 240,
        sidebarCollapsed: false,
        focusModeAuto: true,
        hiddenPanels: [],
      },
      xp: 0,
      level: 1,
      dailyGoal: 20,
      bookmarks: [],
    },
    recentQuestions: new Set(),
    recentLimit: 100,
  };

  /* ============== STORAGE ============== */
  const Storage = {
    KEY: "mathlab_v1",
    load() {
      try {
        const raw = localStorage.getItem(this.KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        Object.assign(State.stats, data);
        if (!State.stats.settings) State.stats.settings = {};
        Object.assign(
          State.stats.settings,
          {
            name: "Player",
            theme: "dark",
            accent: "electric",
            fontFamily: "inter",
            baseFontSize: 14,
            numberSize: 32,
            highContrast: false,
            reduceMotion: false,
            largeInput: false,
            sound: true,
            autoNext: true,
            tts: false,
            ads: true,
            sidebarWidth: 240,
            sidebarCollapsed: false,
            focusModeAuto: true,
            hiddenPanels: [],
          },
          data.settings || {},
        );
        if (!State.stats.byOp)
          State.stats.byOp = {
            addition: { c: 0, t: 0 },
            subtraction: { c: 0, t: 0 },
            multiplication: { c: 0, t: 0 },
            division: { c: 0, t: 0 },
            mixed: { c: 0, t: 0 },
          };
        if (!State.stats.byDigits) State.stats.byDigits = {};
        if (!State.stats.byMental) State.stats.byMental = { c: 0, t: 0 };
        if (!State.stats.records)
          State.stats.records = {
            fastestMs: null,
            highestAccuracy: null,
            mostPerMin: null,
            longestStreak: 0,
            bestSprintScore: null,
          };
        if (!State.stats.sessions) State.stats.sessions = [];
        if (!State.stats.mistakes) State.stats.mistakes = [];
        if (!State.stats.daily) State.stats.daily = {};
        if (!State.stats.achievements) State.stats.achievements = [];
      } catch (e) {
        console.warn("Storage load failed", e);
      }
    },
    save() {
      try {
        localStorage.setItem(this.KEY, JSON.stringify(State.stats));
      } catch (e) {
        console.warn("Storage save failed", e);
      }
    },
    reset() {
      localStorage.removeItem(this.KEY);
    },
  };

  /* ============== MATH ENGINE (BigInt for arbitrary precision) ============== */
  const MathEngine = {
    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randBigInt(digits) {
      if (digits <= 0) return 0n;
      if (digits === 1) return BigInt(this.randInt(0, 9));
      const highDigits = digits - 1;
      // First digit 1-9, rest 0-9
      let s = String(this.randInt(1, 9));
      for (let i = 0; i < highDigits; i++) s += String(this.randInt(0, 9));
      return BigInt(s);
    },
    // random number with exactly N digits (positive)
    randNumberExactDigits(digits) {
      if (digits <= 0) return 0n;
      if (digits > 1000) digits = 1000;
      return this.randBigInt(digits);
    },
    // generate a number with possible constraints
    generateNumber(opts) {
      const { digits, allowNeg = false, negPct = 0 } = opts;
      let n = this.randNumberExactDigits(digits);
      if (allowNeg && Math.random() * 100 < negPct) n = -n;
      return n;
    },
    applyOp(a, b, op) {
      a = BigInt(a);
      b = BigInt(b);
      switch (op) {
        case "addition":
          return a + b;
        case "subtraction":
          return a - b;
        case "multiplication":
          return a * b;
        case "division":
          if (b === 0n) return null;
          return a / b; // integer division — only used for exact mode
        case "modulo":
          if (b === 0n) return null;
          // BigInt modulo can be negative; normalize to non-negative for educational purposes
          const m = a % b;
          return m < 0n ? (b < 0n ? m - b : m + b) : m;
        case "power": {
          // b must be small non-negative to avoid huge answers
          if (b < 0n || b > 30n) return null;
          let r = 1n;
          for (let i = 0n; i < b; i++) r *= a;
          return r;
        }
        case "gcd": {
          let x = a < 0n ? -a : a,
            y = b < 0n ? -b : b;
          while (y) {
            [x, y] = [y, x % y];
          }
          return x;
        }
        case "lcm": {
          let x = a < 0n ? -a : a,
            y = b < 0n ? -b : b;
          if (x === 0n || y === 0n) return 0n;
          let g = x,
            h = y;
          while (h) {
            [g, h] = [h, g % h];
          }
          return (x / g) * y;
        }
        case "square":
          return a * a;
        case "cube":
          return a * a * a;
        case "pow2": {
          if (a < 0n || a > 60n) return null;
          return 1n << a;
        }
        case "pow10": {
          if (a < 0n || a > 30n) return null;
          let r = 1n;
          for (let i = 0n; i < a; i++) r *= 10n;
          return r;
        }
        case "factorial": {
          if (a < 0n || a > 25n) return null;
          let r = 1n;
          for (let i = 2n; i <= a; i++) r *= i;
          return r;
        }
        case "percent": {
          // a% of b → (a × b) / 100
          return (a * b) / 100n;
        }
        default:
          return null;
      }
    },
    // For unary / sqrt / cbrt we use Number-based math since perfect squares/cubes
    isPerfectSquare(n) {
      n = BigInt(n);
      if (n < 0n) return false;
      const root = this.bigIntSqrt(n);
      return root * root === n;
    },
    bigIntSqrt(n) {
      n = BigInt(n);
      if (n < 0n) return 0n;
      if (n < 2n) return n;
      let x = n,
        y = (n + 1n) / 2n;
      while (y < x) {
        x = y;
        y = (y + n / y) / 2n;
      }
      return x;
    },
    isPerfectCube(n) {
      n = BigInt(n);
      if (n < 0n) n = -n;
      if (n === 0n) return true;
      let lo = 1n,
        hi = 100000n;
      while (lo <= hi) {
        const mid = (lo + hi) / 2n;
        const c = mid * mid * mid;
        if (c === n) return true;
        if (c < n) lo = mid + 1n;
        else hi = mid - 1n;
      }
      return false;
    },
    bigIntCbrt(n) {
      n = BigInt(n);
      const sign = n < 0n;
      if (sign) n = -n;
      if (n === 0n) return 0n;
      let lo = 1n,
        hi = 100000n,
        ans = 0n;
      while (lo <= hi) {
        const mid = (lo + hi) / 2n;
        const c = mid * mid * mid;
        if (c === n) return sign ? -mid : mid;
        if (c < n) {
          ans = mid;
          lo = mid + 1n;
        } else hi = mid - 1n;
      }
      return sign ? -ans : ans;
    },
    formatBigInt(n) {
      // Handle decimals (from division decimal mode) without throwing.
      if (typeof n === "number") {
        if (!isFinite(n)) return "—";
        if (!Number.isInteger(n)) {
          // Trim trailing zeros for cleaner display.
          return String(n)
            .replace(/(\.\d*?)0+$/, "$1")
            .replace(/\.$/, "");
        }
        n = BigInt(n);
      }
      n = BigInt(n);
      const neg = n < 0n;
      let s = (neg ? -n : n).toString();
      // Add thousands separators for large numbers
      if (s.length > 4) {
        s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (neg ? "−" : "") + s;
    },
    // For display purposes (comparison, MCQ)
    parseAnswer(str) {
      if (!str) return null;
      str = String(str)
        .trim()
        .replace(/,/g, "")
        .replace(/−/g, "-")
        .replace(/\s/g, "");
      if (str === "") return null;
      // Try integer (BigInt) first
      if (/^-?\d+$/.test(str)) {
        try {
          return BigInt(str);
        } catch {
          return null;
        }
      }
      // Decimal?
      if (/^-?\d*\.\d+$/.test(str) || /^-?\d+\.\d*$/.test(str)) {
        const f = parseFloat(str);
        return isNaN(f) ? null : f;
      }
      return null;
    },
    answersEqual(a, b) {
      if (a === null || b === null) return false;
      if (typeof a === "bigint" && typeof b === "bigint") return a === b;
      if (typeof a === "number" || typeof b === "number") {
        return Math.abs(Number(a) - Number(b)) < 1e-9;
      }
      if (typeof a === "string" && typeof b === "string") {
        // Normalize: strip spaces, unify minus sign, uppercase R (for "12 R 3")
        const norm = (s) =>
          s.replace(/\s/g, "").replace(/−/g, "-").replace(/r/g, "R");
        return norm(a) === norm(b);
      }
      return a === b;
    },
    // Difficulty engine
    computeDifficulty(config, q) {
      let score = 1;
      // Digit complexity (log scale-ish)
      score += Math.min(3, Math.log10(Math.max(1, config.digits1)) * 1.2);
      score += Math.min(3, Math.log10(Math.max(1, config.digits2)) * 1.2);
      // Operand complexity
      score += Math.min(2, (config.operands - 2) * 0.6);
      // Operation complexity
      const opComplexity = {
        addition: 0.3,
        subtraction: 0.6,
        multiplication: 1.2,
        division: 1.8,
        mixed: 1.5,
        square: 0.8,
        cube: 1.4,
        sqrt: 1.0,
        cbrt: 1.6,
        power: 2.0,
        factorial: 1.0,
        percent: 1.2,
        modulo: 0.9,
        pow2: 0.6,
        pow10: 0.4,
        gcd: 1.5,
        lcm: 1.8,
        "trig-value": 1.6,
        "geo-area": 1.4,
        "geo-volume": 1.8,
        pythagorean: 1.4,
        "linear-eq-solve": 1.7,
        "log-calc": 1.6,
      };
      score += opComplexity[config.op] || 0.5;
      if (config.numType === "integer") score += 1.2;
      if (config.negPct > 0 && config.numType === "integer")
        score += (config.negPct / 100) * 0.8;
      if (config.format !== "standard") score += 0.4;
      if (config.parentheses) score += 0.6;
      if (config.divisionMode === "decimal") score += 0.4;
      if (config.divisionMode === "remainder") score += 0.3;
      return Math.min(10, Math.round(score * 10) / 10);
    },
  };

  /* ============== QUESTION GENERATOR ============== */
  const Generator = {
    // Smart number generators
    smartNumber(digits, mode) {
      if (mode === "endingZero") {
        // number with last digits 0
        const d = Math.max(1, digits - 1);
        const high = MathEngine.randNumberExactDigits(d);
        return high * 10n;
      }
      if (mode === "repeatedDigits") {
        const d = Math.min(9, Math.max(1, digits));
        const c = BigInt(MathEngine.randInt(1, 9));
        let n = 0n;
        for (let i = 0; i < d; i++) n = n * 10n + c;
        return n;
      }
      if (mode === "near100") {
        // 98, 102, 97, 103...
        return BigInt(MathEngine.randInt(95, 105));
      }
      if (mode === "near1000") {
        return BigInt(MathEngine.randInt(990, 1010));
      }
      if (mode === "smallDigits") {
        // digits 1-3 only
        let s = "";
        const d = Math.max(1, digits);
        for (let i = 0; i < d; i++) s += String(MathEngine.randInt(1, 3));
        return BigInt(s);
      }
      return MathEngine.randNumberExactDigits(digits);
    },

    // Generate a question based on config
    generate(config) {
      const op = config.op === "mixed" ? this.pickMixedOp(config) : config.op;
      const allowNeg = config.numType === "integer";
      const negPct = config.negPct || 0;
      let attempts = 0;
      while (attempts++ < 30) {
        try {
          const q = this.buildQuestion(config, op, allowNeg, negPct);
          if (!q) continue;
          const sig = this.signature(q);
          if (config.noRepeat && State.recentQuestions.has(sig)) continue;
          if (State.recentQuestions.size >= State.recentLimit) {
            // pop oldest by clearing some
            State.recentQuestions = new Set(
              [...State.recentQuestions].slice(-50),
            );
          }
          State.recentQuestions.add(sig);
          q.difficulty = MathEngine.computeDifficulty(config, q);
          return q;
        } catch (e) {
          continue;
        }
      }
      // fallback simple
      const a = MathEngine.generateNumber({ digits: config.digits1 });
      const b = MathEngine.generateNumber({ digits: config.digits2 });
      const q = {
        kind: "standard",
        op,
        operands: [a, b],
        answer: MathEngine.applyOp(a, b, op),
        display: `${MathEngine.formatBigInt(a)} ${this.opSym(op)} ${MathEngine.formatBigInt(b)}`,
        difficulty: 5,
      };
      q.difficulty = MathEngine.computeDifficulty(config, q);
      return q;
    },

    pickMixedOp(config) {
      const ops = ["addition", "subtraction", "multiplication", "division"];
      if (config.noOpRepeat && State.session && State.session.lastOp) {
        const filtered = ops.filter((o) => o !== State.session.lastOp);
        return filtered[MathEngine.randInt(0, filtered.length - 1)];
      }
      return ops[MathEngine.randInt(0, 3)];
    },

    opSym(op) {
      return (
        {
          addition: "+",
          subtraction: "−",
          multiplication: "×",
          division: "÷",
          modulo: "mod",
          power: "^",
          gcd: "gcd",
          lcm: "lcm",
          percent: "% of",
          square: "²",
          cube: "³",
          sqrt: "√",
          cbrt: "∛",
          pow2: "2^",
          pow10: "10^",
          factorial: "!",
        }[op] || "+"
      );
    },

    // Check whether an operation is unary (takes one operand).
    isUnary(op) {
      return [
        "square",
        "cube",
        "sqrt",
        "cbrt",
        "factorial",
        "pow2",
        "pow10",
      ].includes(op);
    },

    // Check whether an operation is "special" (custom generator, not standard arithmetic).
    isSpecial(op) {
      return [
        "trig-value",
        "geo-area",
        "geo-volume",
        "pythagorean",
        "linear-eq-solve",
        "log-calc",
      ].includes(op);
    },

    // Check whether an operation takes exactly two operands (a OP b form).
    isBinary(op) {
      return [
        "addition",
        "subtraction",
        "multiplication",
        "division",
        "modulo",
        "power",
        "gcd",
        "lcm",
        "percent",
      ].includes(op);
    },

    buildQuestion(config, op, allowNeg, negPct) {
      // Special ops (trig, geometry, pythagorean, linear-eq, log) — custom generators.
      if (this.isSpecial(op)) {
        return this.buildSpecial(config, op);
      }
      // Unary ops (square, cube, sqrt, etc.) — single operand.
      if (this.isUnary(op)) {
        return this.buildUnary(config, op, allowNeg, negPct);
      }
      const operands = [];
      const numOperands = config.operands || 2;
      for (let i = 0; i < numOperands; i++) {
        const digits =
          i === 0
            ? config.digits1
            : i === 1
              ? config.digits2
              : Math.max(1, Math.min(config.digits1, config.digits2));
        operands.push(MathEngine.generateNumber({ digits, allowNeg, negPct }));
      }
      // Division fix: avoid zero divisor
      for (let i = 1; i < operands.length; i++) {
        if (op === "division" && operands[i] === 0n)
          operands[i] = BigInt(MathEngine.randInt(1, 9));
        if (op === "modulo" && operands[i] === 0n)
          operands[i] = BigInt(MathEngine.randInt(1, 9));
        if (op === "power" && operands[i] < 0n)
          operands[i] = BigInt(MathEngine.randInt(1, 5));
        if (op === "power" && operands[i] > 30n)
          operands[i] = BigInt(MathEngine.randInt(2, 10));
      }

      // Compose expression and answer based on format
      return this.buildFormat(config, op, operands, allowNeg, negPct);
    },

    // Build a question for a unary operation (one operand).
    buildUnary(config, op, allowNeg, negPct) {
      let n;
      // Constrain operand ranges for operations where large answers are impractical.
      if (op === "square" || op === "sqrt") {
        n = BigInt(MathEngine.randInt(1, 30));
      } else if (op === "cube" || op === "cbrt") {
        n = BigInt(MathEngine.randInt(1, 12));
      } else if (op === "factorial") {
        n = BigInt(MathEngine.randInt(1, 15));
      } else if (op === "pow2") {
        n = BigInt(MathEngine.randInt(1, 15));
      } else if (op === "pow10") {
        n = BigInt(MathEngine.randInt(1, 10));
      } else {
        n = MathEngine.generateNumber({
          digits: config.digits1,
          allowNeg,
          negPct,
        });
      }
      // For sqrt/cbrt we generate from the answer so the question has a clean answer.
      if (op === "sqrt") {
        const root = n;
        const sq = root * root;
        return {
          kind: "standard",
          op,
          operands: [sq],
          answer: root,
          display: `√${MathEngine.formatBigInt(sq)}`,
        };
      }
      if (op === "cbrt") {
        const root = n;
        const cb = root * root * root;
        return {
          kind: "standard",
          op,
          operands: [cb],
          answer: root,
          display: `∛${MathEngine.formatBigInt(cb)}`,
        };
      }
      // Compute the answer for the unary op
      const answer = MathEngine.applyOp(n, 0n, op);
      if (answer === null) return null;
      const sym = this.opSym(op);
      let display;
      if (op === "factorial") display = `${MathEngine.formatBigInt(n)}!`;
      else if (op === "pow2") display = `2^${MathEngine.formatBigInt(n)}`;
      else if (op === "pow10") display = `10^${MathEngine.formatBigInt(n)}`;
      else if (op === "square") display = `${MathEngine.formatBigInt(n)}²`;
      else if (op === "cube") display = `${MathEngine.formatBigInt(n)}³`;
      else display = `${sym}${MathEngine.formatBigInt(n)}`;
      return { kind: "standard", op, operands: [n], answer, display };
    },

    // Special generator for trig values, geometry, pythagorean, linear-eq, log.
    buildSpecial(config, op) {
      const r = MathEngine.randInt.bind(MathEngine);
      const fmt = MathEngine.formatBigInt.bind(MathEngine);
      if (op === "trig-value") {
        // sin/cos/tan of 0°, 30°, 45°, 60°, 90° → numeric (decimal) answers
        const funcs = ["sin", "cos", "tan"];
        const angles = [0, 30, 45, 60, 90];
        const f = funcs[r(0, 2)];
        const a = angles[r(0, 4)];
        // tan 90° is undefined — skip
        if (f === "tan" && a === 90) return this.buildSpecial(config, op);
        const values = {
          sin_0: 0,
          sin_30: 0.5,
          sin_45: Math.SQRT2 / 2,
          sin_60: Math.sqrt(3) / 2,
          sin_90: 1,
          cos_0: 1,
          cos_30: Math.sqrt(3) / 2,
          cos_45: Math.SQRT2 / 2,
          cos_60: 0.5,
          cos_90: 0,
          tan_0: 0,
          tan_30: Math.sqrt(3) / 3,
          tan_45: 1,
          tan_60: Math.sqrt(3),
        };
        const v = values[`${f}_${a}`];
        // Round to 3 decimals for the answer key
        const rounded = Math.round(v * 1000) / 1000;
        return {
          kind: "standard",
          op,
          operands: [BigInt(a)],
          answer: rounded, // Number, not BigInt
          display: `${f} ${a}°`,
          acceptDecimal: true,
          hint: `Use the unit-circle values. ${f}(${a}°) is one of: 0, 0.5, √2/2, √3/2, 1, √3/3, √3.`,
        };
      }
      if (op === "geo-area") {
        // Area of common shapes with given dimensions (integer answers).
        const shapes = [
          "square",
          "rectangle",
          "triangle",
          "circle-approx",
          "parallelogram",
        ];
        const s = shapes[r(0, shapes.length - 1)];
        if (s === "square") {
          const side = r(3, 15);
          return {
            kind: "standard",
            op,
            operands: [BigInt(side)],
            answer: BigInt(side * side),
            display: `Area of square (side=${side})`,
            hint: `Area = side² = ${side}²`,
          };
        }
        if (s === "rectangle") {
          const l = r(3, 20),
            w = r(2, 15);
          return {
            kind: "standard",
            op,
            operands: [BigInt(l), BigInt(w)],
            answer: BigInt(l * w),
            display: `Area of rectangle (${l} × ${w})`,
            hint: `Area = length × width`,
          };
        }
        if (s === "triangle") {
          // ensure even product so /2 gives integer
          let b = r(2, 20),
            h = r(2, 20);
          if ((b * h) % 2 !== 0) b++;
          return {
            kind: "standard",
            op,
            operands: [BigInt(b), BigInt(h)],
            answer: BigInt((b * h) / 2),
            display: `Area of triangle (base=${b}, height=${h})`,
            hint: `Area = (base × height) / 2`,
          };
        }
        if (s === "parallelogram") {
          const b = r(3, 20),
            h = r(2, 15);
          return {
            kind: "standard",
            op,
            operands: [BigInt(b), BigInt(h)],
            answer: BigInt(b * h),
            display: `Area of parallelogram (base=${b}, height=${h})`,
            hint: `Area = base × height`,
          };
        }
        // circle-approx (π ≈ 3.14, r small so area is integer-ish when rounded)
        const r1 = r(1, 9);
        const area = Math.round(Math.PI * r1 * r1 * 100) / 100;
        return {
          kind: "standard",
          op,
          operands: [BigInt(r1)],
          answer: area,
          display: `Area of circle (r=${r1}) — round to 2 decimals`,
          acceptDecimal: true,
          hint: `Area = π r² ≈ 3.14159 × ${r1}²`,
        };
      }
      if (op === "geo-volume") {
        const shapes = [
          "cube",
          "cuboid",
          "cylinder-approx",
          "cone-approx",
          "sphere-approx",
        ];
        const s = shapes[r(0, shapes.length - 1)];
        if (s === "cube") {
          const side = r(2, 10);
          return {
            kind: "standard",
            op,
            operands: [BigInt(side)],
            answer: BigInt(side * side * side),
            display: `Volume of cube (side=${side})`,
            hint: `Volume = side³`,
          };
        }
        if (s === "cuboid") {
          const l = r(2, 10),
            w = r(2, 10),
            h = r(2, 10);
          return {
            kind: "standard",
            op,
            operands: [BigInt(l), BigInt(w), BigInt(h)],
            answer: BigInt(l * w * h),
            display: `Volume of cuboid (${l} × ${w} × ${h})`,
            hint: `Volume = l × w × h`,
          };
        }
        if (s === "cylinder-approx") {
          const rad = r(1, 6),
            h = r(2, 10);
          const vol = Math.round(Math.PI * rad * rad * h * 100) / 100;
          return {
            kind: "standard",
            op,
            operands: [BigInt(rad), BigInt(h)],
            answer: vol,
            display: `Volume of cylinder (r=${rad}, h=${h}) — round to 2 decimals`,
            acceptDecimal: true,
            hint: `Volume = π r² h`,
          };
        }
        if (s === "cone-approx") {
          const rad = r(1, 6),
            h = r(3, 12);
          const vol = Math.round(((Math.PI * rad * rad * h) / 3) * 100) / 100;
          return {
            kind: "standard",
            op,
            operands: [BigInt(rad), BigInt(h)],
            answer: vol,
            display: `Volume of cone (r=${rad}, h=${h}) — round to 2 decimals`,
            acceptDecimal: true,
            hint: `Volume = (1/3) π r² h`,
          };
        }
        // sphere-approx
        const rad = r(1, 5);
        const vol = Math.round((4 / 3) * Math.PI * rad * rad * rad * 100) / 100;
        return {
          kind: "standard",
          op,
          operands: [BigInt(rad)],
          answer: vol,
          display: `Volume of sphere (r=${rad}) — round to 2 decimals`,
          acceptDecimal: true,
          hint: `Volume = (4/3) π r³`,
        };
      }
      if (op === "pythagorean") {
        // Use known triples for clean integer answers
        const triples = [
          [3, 4, 5],
          [5, 12, 13],
          [8, 15, 17],
          [7, 24, 25],
          [20, 21, 29],
          [9, 40, 41],
          [11, 60, 61],
          [12, 35, 37],
        ];
        const t = triples[r(0, triples.length - 1)];
        // Randomly ask for hypotenuse (given two legs) or a leg (given hypotenuse + other leg)
        const askHyp = r(0, 1) === 0;
        if (askHyp) {
          return {
            kind: "standard",
            op,
            operands: [BigInt(t[0]), BigInt(t[1])],
            answer: BigInt(t[2]),
            display: `Find hypotenuse: a=${t[0]}, b=${t[1]}`,
            hint: `c = √(a² + b²) = √(${t[0]}² + ${t[1]}²)`,
          };
        }
        // ask for a leg
        const leg = r(0, 1);
        const given = leg === 0 ? t[0] : t[1];
        const other = leg === 0 ? t[1] : t[0];
        return {
          kind: "standard",
          op,
          operands: [BigInt(other), BigInt(t[2])],
          answer: BigInt(given),
          display: `Find missing leg: b=${other}, c=${t[2]} (hypotenuse)`,
          hint: `a = √(c² − b²) = √(${t[2]}² − ${other}²)`,
        };
      }
      if (op === "linear-eq-solve") {
        // ax + b = c, integer x
        const a = r(2, 9);
        const b = r(1, 30);
        const x = r(1, 12);
        const c = a * x + b;
        return {
          kind: "standard",
          op,
          operands: [BigInt(a), BigInt(b), BigInt(c)],
          answer: BigInt(x),
          display: `Solve for x: ${a}x + ${b} = ${c}`,
          hint: `Subtract ${b} from both sides, then divide by ${a}.`,
        };
      }
      if (op === "log-calc") {
        // log_b(n) where b^n = known
        const bases = [2, 3, 5, 10];
        const base = bases[r(0, 3)];
        const exp = r(1, 6);
        const n = Math.pow(base, exp);
        // For base 10, also offer log10 of multiples of 10
        const style = r(0, 1);
        if (style === 0) {
          // log_base(base^exp) = exp
          return {
            kind: "standard",
            op,
            operands: [BigInt(base), BigInt(n)],
            answer: BigInt(exp),
            display: `log_${base}(${n})`,
            hint: `log_b(b^n) = n. So log_${base}(${base}^${exp}) = ${exp}.`,
          };
        }
        // log10 of a power of 10
        const power = r(1, 6);
        const val = Math.pow(10, power);
        return {
          kind: "standard",
          op,
          operands: [BigInt(val)],
          answer: BigInt(power),
          display: `log₁₀(${val})`,
          hint: `log₁₀(10^n) = n`,
        };
      }
      return null;
    },

    buildFormat(config, op, operands, allowNeg, negPct) {
      const fmt = config.format || "standard";
      if (fmt === "standard") return this.buildStandard(config, op, operands);
      if (fmt === "missing") return this.buildMissing(op, operands);
      if (fmt === "reverse") return this.buildReverse(op, operands);
      if (fmt === "comparison") return this.buildComparison(op, operands);
      if (fmt === "multiple")
        return this.buildMultipleChoice(op, operands, config);
      if (fmt === "boolean") return this.buildBoolean(op, operands, config);
      return this.buildStandard(config, op, operands);
    },

    // Standard: a + b = ?
    buildStandard(config, op, operands) {
      if (operands.length === 2) {
        let [a, b] = operands;
        let answer;
        if (op === "division") {
          if (b === 0n) b = BigInt(MathEngine.randInt(1, 9));
          const r = this.handleDivision(a, b, config);
          if (!r) return null;
          // In 'exact' mode the dividend may be regenerated to guarantee divisibility.
          if (r.a !== undefined) a = r.a;
          answer = r.answer;
          const display = `${MathEngine.formatBigInt(a)} ${this.opSym(op)} ${MathEngine.formatBigInt(b)}`;
          return {
            kind: "standard",
            op,
            operands: [a, b],
            answer,
            display,
            acceptDecimal: r.decimal,
            isRemainder: !!r.remainder,
          };
        }
        if (op === "modulo" || op === "gcd" || op === "lcm" || op === "power") {
          if (b === 0n) b = BigInt(MathEngine.randInt(1, 9));
          if (op === "power") {
            if (b < 0n || b > 30n) b = BigInt(MathEngine.randInt(2, 8));
          }
        }
        answer = MathEngine.applyOp(a, b, op);
        if (answer === null) return null;
        const sym = this.opSym(op);
        let display;
        if (op === "percent") {
          // 25% of 80 = ?
          display = `${MathEngine.formatBigInt(a)}% of ${MathEngine.formatBigInt(b)}`;
        } else if (op === "power") {
          display = `${MathEngine.formatBigInt(a)} ^ ${MathEngine.formatBigInt(b)}`;
        } else if (op === "gcd") {
          display = `gcd(${MathEngine.formatBigInt(a)}, ${MathEngine.formatBigInt(b)})`;
        } else if (op === "lcm") {
          display = `lcm(${MathEngine.formatBigInt(a)}, ${MathEngine.formatBigInt(b)})`;
        } else if (op === "modulo") {
          display = `${MathEngine.formatBigInt(a)} mod ${MathEngine.formatBigInt(b)}`;
        } else {
          display = `${MathEngine.formatBigInt(a)} ${sym} ${MathEngine.formatBigInt(b)}`;
        }
        return { kind: "standard", op, operands: [a, b], answer, display };
      }
      // multi-operand expression (only valid for + − × ÷ and mixed)
      return this.buildMulti(config, op, operands);
    },

    buildMulti(config, op, operands) {
      // Build expression with mixed ops if config.op === 'mixed'
      const useMixed = config.op === "mixed";
      const opsList = [];
      for (let i = 0; i < operands.length - 1; i++) {
        if (useMixed) {
          const ops = ["addition", "subtraction", "multiplication", "division"];
          let chosen;
          if (config.noOpRepeat && opsList.length > 0) {
            const filtered = ops.filter(
              (o) => o !== opsList[opsList.length - 1],
            );
            chosen = filtered[MathEngine.randInt(0, filtered.length - 1)];
          } else {
            chosen = ops[MathEngine.randInt(0, 3)];
          }
          opsList.push(chosen);
        } else {
          opsList.push(op);
        }
      }
      // Avoid zero divisor for division
      for (let i = 0; i < opsList.length; i++) {
        if (opsList[i] === "division" && operands[i + 1] === 0n) {
          operands[i + 1] = BigInt(MathEngine.randInt(1, 9));
        }
      }

      let display = MathEngine.formatBigInt(operands[0]);
      for (let i = 0; i < opsList.length; i++) {
        display += ` ${this.opSym(opsList[i])} ${MathEngine.formatBigInt(operands[i + 1])}`;
      }

      let answer;
      if (config.parentheses && operands.length >= 3) {
        // Insert one pair of parentheses — naive: group middle two
        // Just compute left-to-right with precedence (we'll keep simple for display)
        answer = this.evalExpr(operands, opsList);
        // rewrite display with parentheses around middle pair
        const mid = Math.floor((opsList.length - 1) / 2);
        const newDisplay = this.formatWithParens(operands, opsList, mid);
        return {
          kind: "standard",
          op: config.op,
          operands,
          ops: opsList,
          answer,
          display: newDisplay,
        };
      } else {
        answer = this.evalExpr(operands, opsList);
        return {
          kind: "standard",
          op: config.op,
          operands,
          ops: opsList,
          answer,
          display,
        };
      }
    },

    // Build display string with parentheses inserted around a chosen pair of operands.
    // e.g. operands=[a,b,c,d], ops=['+','×','+'], pairStart=1 → "a + (b × c) + d"
    formatWithParens(operands, ops, pairStart) {
      const parts = [MathEngine.formatBigInt(operands[0])];
      for (let i = 0; i < ops.length; i++) {
        const openParen = i === pairStart ? "(" : "";
        const closeParen = i === pairStart + 1 ? ")" : "";
        parts.push(
          ` ${this.opSym(ops[i])} ${openParen}${MathEngine.formatBigInt(operands[i + 1])}${closeParen}`,
        );
      }
      return parts.join("");
    },

    // Simple left-to-right evaluation (precedence honored: × ÷ before + −)
    evalExpr(operands, ops) {
      // First pass: handle × and ÷
      const nums = [...operands];
      const opQueue = [...ops];
      // multiply/divide pass
      let i = 0;
      while (i < opQueue.length) {
        if (opQueue[i] === "multiplication" || opQueue[i] === "division") {
          const a = nums[i],
            b = nums[i + 1];
          if (opQueue[i] === "division" && b === 0n) return null;
          const r =
            opQueue[i] === "multiplication"
              ? a * b
              : b === 0n
                ? null
                : this.integerDiv(a, b);
          if (r === null) return null;
          nums.splice(i, 2, r);
          opQueue.splice(i, 1);
        } else {
          i++;
        }
      }
      // Second pass: + and -
      let result = nums[0];
      for (let j = 0; j < opQueue.length; j++) {
        if (opQueue[j] === "addition") result = result + nums[j + 1];
        else if (opQueue[j] === "subtraction") result = result - nums[j + 1];
      }
      return result;
    },

    integerDiv(a, b) {
      if (b === 0n) return null;
      return a / b;
    },

    handleDivision(a, b, config) {
      if (b === 0n) return null;
      const mode = config.divisionMode || "exact";
      if (mode === "exact") {
        // Generate b such that a is divisible by b: pick divisor, then multiply
        // Easier: regenerate a = b * quotient
        const q = BigInt(
          MathEngine.randInt(
            1,
            Math.max(
              2,
              Math.min(
                9999,
                Number(10n ** BigInt(Math.max(1, config.digits1 - 1))),
              ),
            ),
          ),
        );
        const newA = b * q;
        return { answer: q, decimal: false, a: newA };
      }
      if (mode === "remainder") {
        const q = a / b;
        const r = a % b;
        // answer format: "q R r"
        return {
          answer: `${q.toString()} R ${r.toString()}`,
          remainder: r,
          quotient: q,
          decimal: false,
        };
      }
      if (mode === "decimal") {
        // for decimal, allow fraction
        if (a % b === 0n) {
          return { answer: a / b, decimal: false };
        }
        // provide decimal answer
        const q = Number(a) / Number(b);
        const rounded = Math.round(q * 1000) / 1000;
        return { answer: rounded, decimal: true };
      }
      return { answer: a / b, decimal: false };
    },

    // Missing: a + ? = c (replace first operand)
    buildMissing(op, operands) {
      const [a, b] = operands;
      let c;
      if (op === "division") {
        // a × ? = c  → ? = c / a — but we want a ÷ ? = c
        // Generate c divisible: c = a / something
        const q = BigInt(MathEngine.randInt(1, 12));
        const cc = a * q;
        const display = `${MathEngine.formatBigInt(cc)} ÷ ${MathEngine.formatBigInt(a)} = ?`;
        return {
          kind: "missing",
          op,
          operands: [cc, a],
          answer: q,
          display,
          missingIndex: 1,
        };
      }
      c = MathEngine.applyOp(a, b, op);
      if (c === null) return null;
      const display = `${MathEngine.formatBigInt(a)} ${this.opSym(op)} ? = ${MathEngine.formatBigInt(c)}`;
      return {
        kind: "missing",
        op,
        operands: [a, b],
        answer: b,
        display,
        missingIndex: 1,
      };
    },

    // Reverse: ? + b = c (replace first operand)
    buildReverse(op, operands) {
      const [a, b] = operands;
      let c;
      if (op === "division") {
        // ? ÷ b = c → ? = b × c
        const q = BigInt(MathEngine.randInt(1, 12));
        const cc = b * q;
        const display = `? ÷ ${MathEngine.formatBigInt(b)} = ${MathEngine.formatBigInt(cc)}`;
        return {
          kind: "reverse",
          op,
          operands: [cc, b],
          answer: cc,
          display,
          missingIndex: 0,
        };
      }
      c = MathEngine.applyOp(a, b, op);
      if (c === null) return null;
      const display = `? ${this.opSym(op)} ${MathEngine.formatBigInt(b)} = ${MathEngine.formatBigInt(c)}`;
      return {
        kind: "reverse",
        op,
        operands: [a, b],
        answer: a,
        display,
        missingIndex: 0,
      };
    },

    // Comparison: a + b □ c (>, <, =)
    buildComparison(op, operands) {
      const [a, b] = operands;
      let c;
      if (op === "division") {
        const q = BigInt(MathEngine.randInt(1, 12));
        c = a * q;
        // use c as the comparison target
        const actual = MathEngine.applyOp(a, b, op);
        if (actual === null) return null;
        // adjust c near actual
        const offsets = [
          -MathEngine.randInt(1, 50),
          0,
          MathEngine.randInt(1, 50),
        ];
        c = actual + BigInt(offsets[MathEngine.randInt(0, 2)]);
      } else {
        const actual = MathEngine.applyOp(a, b, op);
        if (actual === null) return null;
        const offsets = [
          -BigInt(MathEngine.randInt(1, 50)),
          0n,
          BigInt(MathEngine.randInt(1, 50)),
        ];
        c = actual + offsets[MathEngine.randInt(0, 2)];
      }
      const actual = MathEngine.applyOp(a, b, op);
      let answer;
      if (actual === c) answer = "=";
      else if (actual > c) answer = ">";
      else answer = "<";
      const display = `${MathEngine.formatBigInt(a)} ${this.opSym(op)} ${MathEngine.formatBigInt(b)}  □  ${MathEngine.formatBigInt(c)}`;
      return {
        kind: "comparison",
        op,
        operands: [a, b],
        answer,
        display,
        compareTarget: c,
      };
    },

    // Multiple choice
    buildMultipleChoice(op, operands, config) {
      const base = this.buildStandard(
        config || { divisionMode: "exact", digits1: 1, digits2: 1 },
        op,
        operands,
      );
      if (!base) return null;
      const correct = base.answer;
      if (typeof correct === "string") {
        // remainder-mode answers can't be sensibly presented as MC; fall back to exact
        const exactBase = this.buildStandard(
          { divisionMode: "exact", digits1: 1, digits2: 1 },
          op,
          operands,
        );
        if (!exactBase) return null;
        return this.buildMultipleChoice(op, operands, {
          divisionMode: "exact",
          digits1: 1,
          digits2: 1,
        });
      }
      const options = new Set([correct]);
      let tries = 0;
      while (options.size < 4 && tries++ < 20) {
        // create plausible wrong answers
        const variants = [
          correct + BigInt(MathEngine.randInt(1, 9)),
          correct - BigInt(MathEngine.randInt(1, 9)),
          correct + BigInt(MathEngine.randInt(10, 99)),
          correct * 2n,
          correct + (correct % 10n),
        ];
        const v = variants[MathEngine.randInt(0, variants.length - 1)];
        if (!options.has(v) && v !== correct) options.add(v);
      }
      while (options.size < 4) options.add(correct + BigInt(options.size));
      const arr = [...options].sort(() => Math.random() - 0.5);
      return {
        kind: "multiple",
        op,
        operands,
        answer: correct,
        display: base.display,
        options: arr,
        optionLetters: ["A", "B", "C", "D"],
      };
    },

    // True/False
    buildBoolean(op, operands, config) {
      const base = this.buildStandard(
        config || { divisionMode: "exact", digits1: 1, digits2: 1 },
        op,
        operands,
      );
      if (!base) return null;
      const correct = base.answer;
      if (typeof correct === "string") {
        // can't sensibly show remainder-mode as T/F; regenerate with exact
        return this.buildBoolean(op, operands, {
          divisionMode: "exact",
          digits1: 1,
          digits2: 1,
        });
      }
      const isTrue = Math.random() < 0.5;
      let displayed;
      if (isTrue) {
        displayed = correct;
      } else {
        // wrong answer
        const variants = [
          correct + BigInt(MathEngine.randInt(1, 9)),
          correct - BigInt(MathEngine.randInt(1, 9)),
          correct * 2n,
        ];
        displayed = variants[MathEngine.randInt(0, variants.length - 1)];
      }
      const display = `${base.display} = ${MathEngine.formatBigInt(displayed)}`;
      return {
        kind: "boolean",
        op,
        operands,
        answer: isTrue,
        displayed,
        display,
      };
    },

    signature(q) {
      return q.display;
    },
  };

  /* ============== ADAPTIVE ENGINE ============== */
  const Adaptive = {
    // Adjust config based on user history for (op, digits) bucket
    suggest(config) {
      if (!config.adaptive) return config;
      const key = `${config.op}-${Math.max(config.digits1, config.digits2)}`;
      const bucket = State.stats.byDigits[key];
      if (!bucket || bucket.t < 8) return config;
      const acc = bucket.c / bucket.t;
      const newConfig = { ...config };
      if (acc >= 0.9) {
        // bump difficulty
        newConfig.digits1 = Math.min(100, config.digits1 + 1);
        newConfig.digits2 = Math.min(100, config.digits2 + 1);
      } else if (acc < 0.6) {
        newConfig.digits1 = Math.max(1, config.digits1 - 1);
        newConfig.digits2 = Math.max(1, config.digits2 - 1);
      }
      return newConfig;
    },
    record(op, digits, isCorrect) {
      const key = `${op}-${digits}`;
      if (!State.stats.byDigits[key])
        State.stats.byDigits[key] = { c: 0, t: 0 };
      State.stats.byDigits[key].t++;
      if (isCorrect) State.stats.byDigits[key].c++;
      if (!State.stats.byOp[op]) State.stats.byOp[op] = { c: 0, t: 0 };
      State.stats.byOp[op].t++;
      if (isCorrect) State.stats.byOp[op].c++;
    },
  };

  /* ============== TIMER ============== */
  const Timer = {
    intervals: [],
    start(callback, ms) {
      const id = setInterval(callback, ms);
      this.intervals.push(id);
      return id;
    },
    stop(id) {
      clearInterval(id);
      this.intervals = this.intervals.filter((i) => i !== id);
    },
    stopAll() {
      this.intervals.forEach(clearInterval);
      this.intervals = [];
    },
  };

  /* ============== SOUND ============== */
  const Sound = {
    ctx: null,
    ensure() {
      if (!this.ctx)
        try {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {}
      return this.ctx;
    },
    tone(freq, ms = 80, type = "sine", vol = 0.06) {
      if (!State.stats.settings.sound) return;
      const ctx = this.ensure();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1000);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + ms / 1000);
    },
    correct() {
      this.tone(660, 60, "sine", 0.05);
      setTimeout(() => this.tone(880, 80, "sine", 0.05), 60);
    },
    wrong() {
      this.tone(180, 200, "sawtooth", 0.04);
    },
    complete() {
      [523, 659, 784, 1047].forEach((f, i) =>
        setTimeout(() => this.tone(f, 120, "sine", 0.06), i * 110),
      );
    },
    tick() {
      this.tone(440, 30, "sine", 0.02);
    },
  };

  /* ============== SESSION MANAGER ============== */
  const SessionManager = {
    start(config) {
      const adaptiveConfig = Adaptive.suggest(config);
      const session = {
        id: Date.now(),
        config: adaptiveConfig,
        originalConfig: config,
        questions: [],
        current: 0,
        correctCount: 0,
        startTime: Date.now(),
        questionStart: 0,
        times: [],
        mistakes: [],
        paused: false,
        pausedAt: 0,
        pausedTotal: 0,
        timerEndsAt: config.timer > 0 ? Date.now() + config.timer * 1000 : null,
        ended: false,
        fastUnder5: 0,
        maxDifficultySolved: 0,
      };
      State.session = session;
      return session;
    },

    next() {
      const s = State.session;
      if (!s) return null;
      if (s.config.speedMode === "mastery" && s.questions.length > 0) {
        const acc = s.correctCount / s.questions.length;
        if (s.questions.length >= 20 && acc >= 0.95) {
          this.end("mastery reached");
          return null;
        }
      }
      if (s.config.speedMode === "marathon" && s.questions.length >= 100) {
        this.end("marathon complete");
        return null;
      }
      if (
        s.config.speedMode === "sprint" &&
        s.questions.length >= 100 &&
        s.config.timer === 60
      ) {
        // sprint can run on timer
      }
      if (
        s.questions.length >= s.config.questions &&
        s.config.speedMode !== "mastery" &&
        s.config.speedMode !== "zen" &&
        s.config.speedMode !== "marathon"
      ) {
        this.end("complete");
        return null;
      }
      s.questionStart = Date.now();
      s.current++;
      const q = Generator.generate(s.config);
      s.questions.push(q);
      if (s.config.op === "mixed") s.lastOp = q.op;
      return q;
    },

    answer(value) {
      const s = State.session;
      if (!s) return null;
      const q = s.questions[s.questions.length - 1];
      if (!q) return null;
      let isCorrect = false;
      if (q.kind === "comparison") isCorrect = value === q.answer;
      else if (q.kind === "boolean") isCorrect = value === q.answer;
      else if (q.kind === "multiple") {
        // value is the chosen option
        isCorrect = MathEngine.answersEqual(value, q.answer);
      } else {
        isCorrect = MathEngine.answersEqual(value, q.answer);
      }
      const elapsed = Date.now() - s.questionStart;
      s.times.push(elapsed);
      if (isCorrect) {
        s.correctCount++;
        if (elapsed < 5000) s.fastUnder5++;
        if (q.difficulty > s.maxDifficultySolved)
          s.maxDifficultySolved = q.difficulty;
        Sound.correct();
      } else {
        Sound.wrong();
        const mistake = {
          id: Date.now() + Math.random(),
          date: Date.now(),
          op: q.op,
          question: q.display,
          yourAnswer: String(value),
          correctAnswer: String(q.answer),
          timeMs: elapsed,
          digits: Math.max(s.config.digits1, s.config.digits2),
          format: q.kind,
          difficulty: q.difficulty,
          category: this.categorize(q),
        };
        s.mistakes.push(mistake);
        State.stats.mistakes.push(mistake);
        if (State.stats.mistakes.length > 500)
          State.stats.mistakes = State.stats.mistakes.slice(-500);
      }
      Adaptive.record(
        q.op,
        Math.max(s.config.digits1, s.config.digits2),
        isCorrect,
      );
      State.stats.totalQuestions++;
      if (isCorrect) State.stats.totalCorrect++;
      return { isCorrect, q, elapsed };
    },

    categorize(q) {
      if (q.op === "subtraction" || q.op === "addition") {
        return q.difficulty > 6 ? "Carry/Borrow error" : "Basic calculation";
      }
      if (q.op === "multiplication") return "Multiplication step error";
      if (q.op === "division") return "Division error";
      return "Mixed expression";
    },

    end(reason) {
      const s = State.session;
      if (!s || s.ended) return;
      s.ended = true;
      s.endTime = Date.now();
      s.endReason = reason;
      Timer.stopAll();
      if (s.questions.length === 0) {
        State.session = null;
        return;
      }
      // Build session record
      const correct = s.correctCount;
      const total = s.questions.length;
      const accuracy = total > 0 ? (correct / total) * 100 : 0;
      const totalTime = (s.endTime - s.startTime - s.pausedTotal) / 1000;
      const validTimes = s.times.length > 0 ? s.times : [0];
      const fastestMs = Math.min(...validTimes);
      const slowestMs = Math.max(...validTimes);
      const avgMs = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
      const perMin = totalTime > 0 ? (total / totalTime) * 60 : 0;
      const record = {
        id: s.id,
        date: s.startTime,
        op: s.config.op,
        mode: s.config.speedMode,
        count: total,
        correct,
        accuracy: Math.round(accuracy * 10) / 10,
        timeSec: Math.round(totalTime),
        avgMs: Math.round(avgMs),
        fastestMs: Math.round(fastestMs),
        slowestMs: Math.round(slowestMs),
        difficulty:
          Math.round(
            (s.questions.reduce((a, q) => a + (q.difficulty || 5), 0) / total) *
              10,
          ) / 10,
        perMin: Math.round(perMin * 10) / 10,
        mistakes: s.mistakes.length,
      };
      State.stats.sessions.unshift(record);
      if (State.stats.sessions.length > 200)
        State.stats.sessions = State.stats.sessions.slice(0, 200);
      // Update streak
      this.updateStreak();
      // Update records
      if (
        !State.stats.records.fastestMs ||
        fastestMs < State.stats.records.fastestMs
      )
        State.stats.records.fastestMs = Math.round(fastestMs);
      if (
        !State.stats.records.highestAccuracy ||
        accuracy > State.stats.records.highestAccuracy
      )
        State.stats.records.highestAccuracy = Math.round(accuracy * 10) / 10;
      if (
        !State.stats.records.mostPerMin ||
        perMin > State.stats.records.mostPerMin
      )
        State.stats.records.mostPerMin = Math.round(perMin * 10) / 10;
      if (accuracy === 100 && total >= 20) AchievementManager.unlock("perfect");
      if (s.fastUnder5 >= 10) AchievementManager.unlock("fast10");
      if (s.maxDifficultySolved >= 8) AchievementManager.unlock("hard_mode");
      if (s.config.speedMode === "boss" && accuracy >= 60)
        AchievementManager.unlock("boss_slayer");
      if (s.config.speedMode === "marathon" && total >= 100)
        AchievementManager.unlock("marathoner");
      if (s.config.speedMode === "zen" && total >= 30)
        AchievementManager.unlock("zen_master");
      // 100/1000/10000
      if (State.stats.totalQuestions >= 100)
        AchievementManager.unlock("first100");
      if (State.stats.totalQuestions >= 1000)
        AchievementManager.unlock("first1000");
      if (State.stats.totalQuestions >= 10000)
        AchievementManager.unlock("first10000");
      // comeback detection
      if (State.stats.sessions.length >= 2) {
        const prev = State.stats.sessions[1];
        if (prev && prev.accuracy < 60 && accuracy >= 95)
          AchievementManager.unlock("comeback");
      }
      // daily
      const today = new Date().toISOString().slice(0, 10);
      if (!State.stats.daily[today])
        State.stats.daily[today] = { c: 0, t: 0, ms: 0 };
      State.stats.daily[today].c += correct;
      State.stats.daily[today].t += total;
      State.stats.daily[today].ms += s.endTime - s.startTime - s.pausedTotal;
      // Award XP based on this session's performance
      if (typeof XPSystem !== "undefined") {
        const totalMs = s.endTime - s.startTime - s.pausedTotal;
        XPSystem.awardXP(correct, record.difficulty, totalMs);
      }
      Storage.save();
      Sound.complete();
      // Show ad after session completes
      if (typeof AdManager !== "undefined") AdManager.showAfterSessionAd();
    },

    updateStreak() {
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);
      if (State.stats.lastPracticeDate === todayStr) return; // already counted today
      const yesterday = new Date(today.getTime() - 86400000)
        .toISOString()
        .slice(0, 10);
      if (State.stats.lastPracticeDate === yesterday) {
        State.stats.streak++;
      } else if (State.stats.lastPracticeDate !== todayStr) {
        State.stats.streak = 1;
      }
      State.stats.lastPracticeDate = todayStr;
      if (State.stats.streak > State.stats.records.longestStreak)
        State.stats.records.longestStreak = State.stats.streak;
      if (State.stats.streak >= 30) AchievementManager.unlock("streak30");
    },
  };

  /* ============== MENTAL MATH ============== */
  const MentalMath = {
    start(mode) {
      const session = {
        mode,
        current: 0,
        correct: 0,
        total: 0,
        streak: 0,
        maxStreak: 0,
        questions: [],
        startTime: Date.now(),
        thinkTime: 3,
      };
      State.mentalSession = session;
      return session;
    },
    next() {
      const s = State.mentalSession;
      if (!s) return null;
      s.current++;
      const q = this.generate(s.mode);
      s.questions.push(q);
      return q;
    },
    answer(value) {
      const s = State.mentalSession;
      if (!s) return null;
      const q = s.questions[s.questions.length - 1];
      const isCorrect = MathEngine.answersEqual(value, q.answer);
      s.total++;
      if (isCorrect) {
        s.correct++;
        s.streak++;
        if (s.streak > s.maxStreak) s.maxStreak = s.streak;
        Sound.correct();
      } else {
        s.streak = 0;
        Sound.wrong();
      }
      State.stats.byMental.t++;
      if (isCorrect) State.stats.byMental.c++;
      State.stats.totalQuestions++;
      if (isCorrect) State.stats.totalCorrect++;
      if (s.correct >= 50) AchievementManager.unlock("mental_master");
      Storage.save();
      return { isCorrect, q };
    },
    end() {
      const s = State.mentalSession;
      if (!s) return;
      // record session as mental
      const accuracy = s.total > 0 ? (s.correct / s.total) * 100 : 0;
      const record = {
        id: Date.now(),
        date: s.startTime,
        op: "mental-" + s.mode,
        mode: "mental",
        count: s.total,
        correct: s.correct,
        accuracy: Math.round(accuracy * 10) / 10,
        timeSec: Math.round((Date.now() - s.startTime) / 1000),
        avgMs: 0,
        fastestMs: 0,
        slowestMs: 0,
        difficulty: 5,
        perMin: 0,
        mistakes: s.total - s.correct,
      };
      State.stats.sessions.unshift(record);
      if (State.stats.sessions.length > 200)
        State.stats.sessions = State.stats.sessions.slice(0, 200);
      SessionManager.updateStreak();
      const today = new Date().toISOString().slice(0, 10);
      if (!State.stats.daily[today])
        State.stats.daily[today] = { c: 0, t: 0, ms: 0 };
      State.stats.daily[today].c += s.correct;
      State.stats.daily[today].t += s.total;
      State.stats.daily[today].ms += Date.now() - s.startTime;
      State.mentalSession = null;
      Storage.save();
      Sound.complete();
      return record;
    },
    generate(mode) {
      const r = MathEngine.randInt.bind(MathEngine);
      switch (mode) {
        case "addition": {
          const a = r(10, 99),
            b = r(10, 99),
            c = r(10, 99);
          const which = r(0, 2);
          const ans = [a + b, a + b + c, a + b + c][which];
          if (which === 0)
            return { prompt: `${a} + ${b}`, answer: BigInt(a + b) };
          return { prompt: `${a} + ${b} + ${c}`, answer: BigInt(a + b + c) };
        }
        case "subtraction": {
          let a = r(50, 999),
            b = r(10, a);
          return { prompt: `${a} − ${b}`, answer: BigInt(a - b) };
        }
        case "multiplication": {
          const a = r(10, 99),
            b = r(2, 12);
          return { prompt: `${a} × ${b}`, answer: BigInt(a * b) };
        }
        case "division": {
          const b = r(2, 12),
            q = r(2, 99);
          const a = b * q;
          return { prompt: `${a} ÷ ${b}`, answer: BigInt(q) };
        }
        case "mixed": {
          const ops = ["addition", "subtraction", "multiplication", "division"];
          return this.generate(ops[r(0, 3)]);
        }
        case "percentage": {
          const base = [100, 200, 50, 80, 250, 1000][r(0, 5)];
          const pct = [10, 25, 50, 75, 5, 20, 40, 60][r(0, 7)];
          const ans = (base * pct) / 100;
          return {
            prompt: `${pct}% of ${base}`,
            answer: ans,
            decimal: !Number.isInteger(ans),
          };
        }
        case "complements": {
          const target = [100, 1000, 10000][r(0, 2)];
          const a = r(1, target - 1);
          return { prompt: `${a} + ? = ${target}`, answer: BigInt(target - a) };
        }
        case "doubling": {
          const isDouble = Math.random() < 0.5;
          const a = r(10, 999);
          if (isDouble) return { prompt: `Double ${a}`, answer: BigInt(a * 2) };
          return {
            prompt: `Half of ${a % 2 === 0 ? a : a - 1}`,
            answer: BigInt(Math.floor((a % 2 === 0 ? a : a - 1) / 2)),
          };
        }
        case "powers10": {
          const isMul = Math.random() < 0.5;
          const a = r(1, 999);
          const power = [10, 100, 1000][r(0, 2)];
          if (isMul)
            return { prompt: `${a} × ${power}`, answer: BigInt(a * power) };
          return { prompt: `${a * power} ÷ ${power}`, answer: BigInt(a) };
        }
        case "near100": {
          // 98 × 97 style
          const a = r(95, 105),
            b = r(95, 105);
          return { prompt: `${a} × ${b}`, answer: BigInt(a * b) };
        }
        case "squaring": {
          const a = r(11, 30);
          return { prompt: `${a}²`, answer: BigInt(a * a) };
        }
        case "estimation": {
          const a = r(100, 9999),
            b = r(10, 999);
          const actual = Math.round(a * b);
          // ask to estimate (closest thousand)
          return {
            prompt: `Estimate: ${a} × ${b} (nearest thousand)`,
            answer: BigInt(Math.round(actual / 1000) * 1000),
            acceptRange: 999,
          };
        }
        case "patterns": {
          const types = [
            () => {
              const start = r(2, 9);
              const d = start;
              return {
                prompt: `${d}, ${d * 2}, ${d * 3}, ${d * 4}, ?`,
                answer: BigInt(d * 5),
              };
            },
            () => {
              const start = r(2, 5);
              return {
                prompt: `${start}, ${start * start}, ${start * start * start}, ?`,
                answer: BigInt(start * start * start * start),
              };
            },
            () => {
              const a = r(10, 50);
              return {
                prompt: `${a}, ${a + 3}, ${a + 6}, ${a + 9}, ?`,
                answer: BigInt(a + 12),
              };
            },
            () => {
              const a = r(2, 9);
              return {
                prompt: `${a}, ${a * 2}, ${a * 4}, ${a * 8}, ?`,
                answer: BigInt(a * 16),
              };
            },
          ];
          return types[r(0, types.length - 1)]();
        }
        default:
          return this.generate("addition");
      }
    },
  };

  /* ============== ACHIEVEMENTS ============== */
  const AchievementManager = {
    unlock(id) {
      if (State.stats.achievements.includes(id)) return false;
      State.stats.achievements.push(id);
      Storage.save();
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) UI.toast(`🏆 Achievement unlocked: ${ach.name}`, "success");
      UI.renderAchievements();
      return true;
    },
    isUnlocked(id) {
      return State.stats.achievements.includes(id);
    },
  };

  /* ============== CHARTS (canvas, no deps) ============== */
  const Charts = {
    drawLine(canvas, data, opts = {}) {
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);
      if (!data.length) {
        this.drawEmpty(ctx, w, h, opts.emptyText || "No data yet");
        return;
      }
      const pad = { l: 40, r: 16, t: 16, b: 28 };
      const cw = w - pad.l - pad.r,
        ch = h - pad.t - pad.b;
      const max = Math.max(100, ...data.map((d) => d.value));
      const min = Math.min(0, ...data.map((d) => d.value));
      const range = max - min || 1;
      // grid
      ctx.strokeStyle = getCss("--border");
      ctx.fillStyle = getCss("--text-dim");
      ctx.font = "11px Inter, sans-serif";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + ch * (i / 4);
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(w - pad.r, y);
        ctx.stroke();
        const v = Math.round(max - (range * i) / 4);
        ctx.fillText(v + "%", 6, y + 4);
      }
      // line
      const accent = getCss("--accent-blue");
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = pad.l + (cw * i) / Math.max(1, data.length - 1);
        const y = pad.t + ch * (1 - (d.value - min) / range);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      // area fill
      ctx.lineTo(pad.l + cw, pad.t + ch);
      ctx.lineTo(pad.l, pad.t + ch);
      ctx.closePath();
      ctx.fillStyle = accent + "20";
      ctx.fill();
      // points
      ctx.fillStyle = accent;
      data.forEach((d, i) => {
        const x = pad.l + (cw * i) / Math.max(1, data.length - 1);
        const y = pad.t + ch * (1 - (d.value - min) / range);
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      // labels
      ctx.fillStyle = getCss("--text-dim");
      ctx.font = "10px Inter, sans-serif";
      data.forEach((d, i) => {
        if (i % Math.ceil(data.length / 7) !== 0 && i !== data.length - 1)
          return;
        const x = pad.l + (cw * i) / Math.max(1, data.length - 1);
        ctx.fillText(d.label, x - 14, h - 8);
      });
    },
    drawBars(canvas, data, opts = {}) {
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);
      if (!data.length) {
        this.drawEmpty(ctx, w, h, opts.emptyText || "No data yet");
        return;
      }
      const pad = { l: 40, r: 16, t: 16, b: 36 };
      const cw = w - pad.l - pad.r,
        ch = h - pad.t - pad.b;
      const max = Math.max(1, ...data.map((d) => d.value));
      const barW = (cw / data.length) * 0.7;
      const gap = (cw / data.length) * 0.3;
      data.forEach((d, i) => {
        const bh = ch * (d.value / max);
        const x = pad.l + (cw / data.length) * i + gap / 2;
        const y = pad.t + ch - bh;
        const grad = ctx.createLinearGradient(x, y, x, y + bh);
        grad.addColorStop(0, getCss("--accent-blue"));
        grad.addColorStop(1, getCss("--accent-purple"));
        ctx.fillStyle = grad;
        ctx.beginPath();
        this.roundRect(ctx, x, y, barW, bh, 6);
        ctx.fill();
        ctx.fillStyle = getCss("--text");
        ctx.font = "11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(d.value, x + barW / 2, y - 4);
        ctx.fillStyle = getCss("--text-dim");
        ctx.font = "10px Inter, sans-serif";
        ctx.fillText(d.label, x + barW / 2, h - 16);
      });
      ctx.textAlign = "left";
    },
    drawEmpty(ctx, w, h, text) {
      ctx.fillStyle = getCss("--text-dim");
      ctx.font = "13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(text, w / 2, h / 2);
      ctx.textAlign = "left";
    },
    roundRect(ctx, x, y, w, h, r) {
      // Clamp radius to be non-negative and at most half of width/height.
      r = Math.max(0, Math.min(r, w / 2, h / 2));
      if (r === 0) {
        // For zero radius, just draw a plain rectangle (avoids arcTo issues).
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        return;
      }
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    },
  };
  function getCss(varName) {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim() || "#888"
    );
  }

  /* ============== UI ============== */
  const UI = {
    el(id) {
      return document.getElementById(id);
    },
    $$(sel) {
      return document.querySelectorAll(sel);
    },

    init() {
      try {
        this.bindNav();
        this.bindConfig();
        this.bindPractice();
        this.bindMental();
        this.bindSettings();
        this.bindModals();
        this.bindKeyboard();
        this.bindStudy();
        this.applyTheme();
        this.applyAccent();
        this.applyFont();
        this.applySettings();
        this.applyPanelVisibility();
        this.renderDashboard();
        this.renderPresets();
        this.renderChallenges();
        this.renderAchievements();
        this.renderMental();
        this.renderMistakes();
        this.renderProgress();
        this.updateRank();
        this.updateSidebarStreak();
        this.bindNewButtons();
        try {
          SidebarControl.init();
        } catch (e) {
          console.error("SidebarControl:", e.message);
        }
        try {
          QuickSettings.init();
        } catch (e) {
          console.error("QuickSettings:", e.message);
        }
        try {
          TargetedPractice.init();
        } catch (e) {
          console.error("TargetedPractice:", e.message);
        }
        try {
          Study.renderGrid();
        } catch (e) {
          console.error("Study.renderGrid:", e.message);
        }
        try {
          AdManager.init();
        } catch (e) {
          console.error("AdManager init:", e.message);
        }
        try {
          NumberPad.init();
        } catch (e) {
          console.error("NumberPad init:", e.message);
        }
        try {
          DailyGoal.init();
        } catch (e) {
          console.error("DailyGoal init:", e.message);
        }
        try {
          XPSystem.renderBar();
        } catch (e) {
          console.error("XP render:", e.message);
        }
        this.toast(
          "Welcome to MathLab — created by Koushik Koley. Press ? for shortcuts.",
          "success",
        );
      } catch (e) {
        console.error("UI.init FATAL:", e.message, e.stack);
      }
    },

    bindNewButtons() {
      // Hint button
      const hintBtn = document.getElementById("hintBtn");
      if (hintBtn)
        hintBtn.addEventListener("click", () => HintSystem.showHint());
      // Bookmark button
      const bookmarkBtn = document.getElementById("bookmarkBtn");
      if (bookmarkBtn)
        bookmarkBtn.addEventListener("click", () => this.toggleBookmark());
      // TTS button
      const ttsBtn = document.getElementById("ttsBtn");
      if (ttsBtn) ttsBtn.addEventListener("click", () => this.toggleTTS());
      // Print certificate (added dynamically in results, but bind handler anyway)
      document.addEventListener("click", (e) => {
        if (e.target.id === "printCertificateBtn") {
          const record = State.stats.sessions[0];
          if (record) Certificate.generate(record);
        }
        if (e.target.id === "shareResultsBtn") {
          const record = State.stats.sessions[0];
          if (record) this.shareResults(record);
        }
      });
    },

    toggleBookmark() {
      const s = State.session;
      if (!s) {
        UI.toast("Start a practice first to bookmark questions", "warn");
        return;
      }
      const q = s.questions[s.questions.length - 1];
      if (!q) return;
      const added = BookmarkManager.toggle(q.display, String(q.answer));
      UI.toast(
        added ? "🔖 Question bookmarked" : "Removed bookmark",
        added ? "success" : "info",
      );
    },

    toggleTTS() {
      State.stats.settings.tts = !State.stats.settings.tts;
      Storage.save();
      UI.toast(
        `Voice ${State.stats.settings.tts ? "ON 🔊" : "OFF 🔇"}`,
        "success",
      );
      if (State.stats.settings.tts && State.session) {
        const q = State.session.questions[State.session.questions.length - 1];
        if (q) TTS.speakQuestion(q.display);
      }
    },

    shareResults(record) {
      const text = `I just completed a MathLab session: ${record.accuracy}% accuracy (${record.correct}/${record.count}) on ${record.op}! Created by Koushik Koley.`;
      if (navigator.share) {
        navigator.share({ title: "MathLab Results", text }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => UI.toast("Results copied to clipboard", "success"));
      } else {
        prompt("Copy your results:", text);
      }
    },

    bindStudy() {
      const closeRef = document.getElementById("studyCloseRef");
      if (closeRef)
        closeRef.addEventListener("click", () => Study.closeReference());
      const startDrill = document.getElementById("studyStartDrill");
      if (startDrill)
        startDrill.addEventListener("click", () => {
          Study.startDrill();
          SidebarControl.enterFocusModeIfAuto();
        });
      const submit = document.getElementById("studySubmitBtn");
      if (submit) submit.addEventListener("click", () => Study.submit());
      const ans = document.getElementById("studyAnswerInput");
      if (ans)
        ans.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            Study.submit();
          }
        });
      const skip = document.getElementById("studySkipBtn");
      if (skip) skip.addEventListener("click", () => Study.skip());
      const next = document.getElementById("studyNextBtn");
      if (next) next.addEventListener("click", () => Study.nextQuestion());
      const quit = document.getElementById("studyQuitBtn");
      if (quit) quit.addEventListener("click", () => Study.quit());
      // Flashcard mode buttons
      const showAns = document.getElementById("studyShowAnswerBtn");
      if (showAns) showAns.addEventListener("click", () => Study.showAnswer());
      const gotIt = document.getElementById("studyGotItBtn");
      if (gotIt)
        gotIt.addEventListener("click", () => Study.flashcardResult(true));
      const missed = document.getElementById("studyMissedBtn");
      if (missed)
        missed.addEventListener("click", () => Study.flashcardResult(false));
    },

    // ---- Navigation ----
    bindNav() {
      this.$$(".nav-item").forEach((btn) => {
        btn.addEventListener("click", () => this.navigate(btn.dataset.route));
      });
      this.$$("[data-route-link]").forEach((btn) => {
        btn.addEventListener("click", () =>
          this.navigate(btn.dataset.routeLink),
        );
      });
      this.$$("[data-action]").forEach((btn) => {
        btn.addEventListener("click", () =>
          this.handleAction(btn.dataset.action),
        );
      });
      // sidebarToggle is the mobile-only hamburger button; collapse/expand is now handled
      // by SidebarControl via the floating sidebarCollapseBtn. Bind either if present.
      const toggle = this.el("sidebarToggle");
      if (toggle) toggle.addEventListener("click", () => this.toggleSidebar());
      const backdrop = this.el("sidebarBackdrop");
      if (backdrop)
        backdrop.addEventListener("click", () => this.toggleSidebar(false));
    },
    navigate(route) {
      State.route = route;
      this.$$(".nav-item").forEach((b) =>
        b.classList.toggle("active", b.dataset.route === route),
      );
      this.$$(".route").forEach((r) =>
        r.classList.toggle("active", r.dataset.route === route),
      );
      const titles = {
        dashboard: ["Dashboard", "Your math journey at a glance"],
        practice: ["Practice", "Build a custom practice session"],
        targeted: ["Targeted Practice", "Drill your weak numbers"],
        mental: ["Mental Math", "Train your mental calculation"],
        study: ["Study", "Reference tables and drills"],
        challenges: ["Challenges", "Test your skills with structured modes"],
        progress: ["Progress", "Track your improvement over time"],
        mistakes: ["Mistakes", "Review and learn from your errors"],
        glossary: ["Glossary", "Searchable math definitions"],
        settings: ["Settings", "Customize MathLab"],
      };
      const [t, s] = titles[route] || ["MathLab", ""];
      this.el("pageTitle").textContent = t;
      this.el("pageSubtitle").textContent = s;
      if (route === "dashboard") {
        this.renderDashboard();
        DailyGoal.render();
        XPSystem.renderBar();
      }
      if (route === "progress") this.renderProgress();
      if (route === "mistakes") this.renderMistakes();
      if (route === "challenges") this.renderChallenges();
      if (route === "mental") this.renderMental();
      if (route === "study") Study.renderGrid();
      if (route === "glossary") this.renderGlossary();
      if (window.innerWidth <= 860) this.toggleSidebar(false);
    },

    renderGlossary() {
      const list = document.getElementById("glossaryList");
      if (!list) return;
      const search = (
        document.getElementById("glossarySearch")?.value || ""
      ).toLowerCase();
      const filtered = GLOSSARY.filter(
        (g) =>
          g.term.toLowerCase().includes(search) ||
          g.def.toLowerCase().includes(search),
      );
      if (filtered.length === 0) {
        list.innerHTML = '<p class="empty">No terms match your search.</p>';
        return;
      }
      list.innerHTML = filtered
        .map(
          (g) => `
      <div class="glossary-item">
        <div class="glossary-term">${g.term}</div>
        <div class="glossary-def">${g.def}</div>
      </div>
    `,
        )
        .join("");
    },
    toggleSidebar(open) {
      const sb = this.el("sidebar");
      const bd = this.el("sidebarBackdrop");
      if (open === false) {
        sb.classList.remove("open");
        bd.classList.remove("show");
        return;
      }
      sb.classList.toggle("open");
      bd.classList.toggle("show");
    },

    handleAction(action) {
      switch (action) {
        case "quick-practice":
          this.applyPreset("beginner-addition");
          this.navigate("practice");
          setTimeout(() => this.startPractice(), 100);
          break;
        case "quick-mental":
          this.navigate("mental");
          break;
        case "quick-sprint":
          this.applyPreset("speed-addition");
          this.navigate("practice");
          setTimeout(() => this.startPractice(), 100);
          break;
        case "quick-marathon":
          this.applyPreset("beginner-addition");
          this.el("speedMode").value = "marathon";
          this.el("questionsInput").value = 100;
          this.el("questionsRange").value = 100;
          State.config.speedMode = "marathon";
          State.config.questions = 100;
          this.navigate("practice");
          setTimeout(() => this.startPractice(), 100);
          break;
        case "quick-boss":
          this.applyPreset("extreme");
          this.navigate("practice");
          setTimeout(() => this.startPractice(), 100);
          break;
        case "quick-study":
          this.navigate("study");
          break;
      }
    },

    // ---- Config Panel ----
    bindConfig() {
      // Operation
      this.$$("#opGrid .chip").forEach((c) =>
        c.addEventListener("click", () => {
          this.$$("#opGrid .chip").forEach((x) => x.classList.remove("active"));
          c.classList.add("active");
          State.config.op = c.dataset.op;
          this.toggleOpSpecificUI();
          this.updateDifficultyPreview();
        }),
      );
      // Number type
      this.$$("#numTypeGrid .chip").forEach((c) =>
        c.addEventListener("click", () => {
          this.$$("#numTypeGrid .chip").forEach((x) =>
            x.classList.remove("active"),
          );
          c.classList.add("active");
          State.config.numType = c.dataset.numtype;
          this.el("negControl").hidden = State.config.numType !== "integer";
          this.updateDifficultyPreview();
        }),
      );
      // Digits
      const bindRange = (rangeId, inputId, key) => {
        const r = this.el(rangeId),
          i = this.el(inputId);
        const sync = (v) => {
          v = Math.max(1, Math.min(100, parseInt(v) || 1));
          r.value = v;
          i.value = v;
          State.config[key] = v;
          this.updateDifficultyPreview();
        };
        r.addEventListener("input", () => sync(r.value));
        i.addEventListener("input", () => sync(i.value));
      };
      bindRange("digits1Range", "digits1Input", "digits1");
      bindRange("digits2Range", "digits2Input", "digits2");
      bindRange("operandsRange", "operandsInput", "operands");
      // Questions
      const qr = this.el("questionsRange"),
        qi = this.el("questionsInput");
      const syncQ = (v) => {
        v = Math.max(1, Math.min(500, parseInt(v) || 1));
        qr.value = v;
        qi.value = v;
        State.config.questions = v;
      };
      qr.addEventListener("input", () => syncQ(qr.value));
      qi.addEventListener("input", () => syncQ(qi.value));
      // Neg pct
      this.el("negPctRange").addEventListener("input", (e) => {
        State.config.negPct = parseInt(e.target.value);
        this.el("negPctOut").textContent = e.target.value + "%";
        this.updateDifficultyPreview();
      });
      // Format
      this.el("questionFormat").addEventListener("change", (e) => {
        State.config.format = e.target.value;
        this.updateDifficultyPreview();
      });
      // Division mode
      this.el("divisionMode").addEventListener("change", (e) => {
        State.config.divisionMode = e.target.value;
        this.updateDifficultyPreview();
      });
      // Carry borrow
      this.el("carryBorrowMode").addEventListener("change", (e) => {
        State.config.carryBorrowMode = e.target.value;
      });
      // Timer
      this.$$("#timerGrid .chip").forEach((c) =>
        c.addEventListener("click", () => {
          this.$$("#timerGrid .chip").forEach((x) =>
            x.classList.remove("active"),
          );
          c.classList.add("active");
          const v = c.dataset.timer;
          this.el("timerCustom").hidden = v !== "custom";
          if (v === "custom") {
            State.config.timer = parseInt(this.el("timerCustom").value) || 0;
          } else {
            State.config.timer = parseInt(v);
            this.updateDifficultyPreview();
          }
        }),
      );
      this.el("timerCustom").addEventListener("input", (e) => {
        if (this.el("timerCustom").hidden) return;
        State.config.timer = Math.max(5, parseInt(e.target.value) || 0);
        this.updateDifficultyPreview();
      });
      // Speed mode
      this.el("speedMode").addEventListener("change", (e) => {
        State.config.speedMode = e.target.value;
        this.updateDifficultyPreview();
      });
      // Toggles
      this.el("noRepeatToggle").addEventListener(
        "change",
        (e) => (State.config.noRepeat = e.target.checked),
      );
      this.el("adaptiveToggle").addEventListener(
        "change",
        (e) => (State.config.adaptive = e.target.checked),
      );
      this.el("noOpRepeatToggle").addEventListener(
        "change",
        (e) => (State.config.noOpRepeat = e.target.checked),
      );
      this.el("parenthesesToggle").addEventListener(
        "change",
        (e) => (State.config.parentheses = e.target.checked),
      );
      // Start
      this.el("startPracticeBtn").addEventListener("click", () =>
        this.startPractice(),
      );
      // Preset dropdown
      this.el("loadPresetSelect").addEventListener("click", (e) => {
        e.stopPropagation();
        this.el("presetDropdown").hidden = !this.el("presetDropdown").hidden;
      });
      document.addEventListener(
        "click",
        () => (this.el("presetDropdown").hidden = true),
      );
      this.$$("#presetDropdown button").forEach((b) =>
        b.addEventListener("click", () => this.applyPreset(b.dataset.preset)),
      );
    },

    toggleOpSpecificUI() {
      this.el("divisionOptions").hidden = State.config.op !== "division";
      const cb = this.el("carryBorrowOptions");
      cb.hidden = !(
        State.config.op === "addition" || State.config.op === "subtraction"
      );
      // For unary ops (square, cube, sqrt, etc.) hide operands control since only 1 is used
      const unary = Generator.isUnary(State.config.op);
      const operandsGroup =
        document.getElementById("operandsRange")?.parentElement;
      const digits2Group =
        document.getElementById("digits2Range")?.parentElement;
      if (operandsGroup) operandsGroup.style.opacity = unary ? "0.4" : "1";
      if (digits2Group) digits2Group.style.opacity = unary ? "0.4" : "1";
    },

    updateDifficultyPreview() {
      const score = MathEngine.computeDifficulty(State.config, {});
      this.el("difficultyFill").style.width = score * 10 + "%";
      this.el("difficultyScore").textContent = score.toFixed(1) + " / 10";
    },

    applyPreset(id) {
      const p = PRESETS[id];
      if (!p) return;
      State.config = {
        op: p.op,
        numType: p.numType,
        digits1: p.d1,
        digits2: p.d2,
        operands: p.operands,
        format: p.format,
        divisionMode: "exact",
        carryBorrowMode: "random",
        questions: p.questions,
        timer: p.timer,
        speedMode: p.speedMode,
        negPct: p.negPct,
        noRepeat: p.noRepeat !== false,
        adaptive: p.adaptive !== false,
        noOpRepeat: false,
        parentheses: false,
      };
      // Reflect in UI
      this.$$("#opGrid .chip").forEach((c) =>
        c.classList.toggle("active", c.dataset.op === p.op),
      );
      this.$$("#numTypeGrid .chip").forEach((c) =>
        c.classList.toggle("active", c.dataset.numtype === p.numType),
      );
      this.el("digits1Range").value = p.d1;
      this.el("digits1Input").value = p.d1;
      this.el("digits2Range").value = p.d2;
      this.el("digits2Input").value = p.d2;
      this.el("operandsRange").value = p.operands;
      this.el("operandsInput").value = p.operands;
      this.el("questionsRange").value = p.questions;
      this.el("questionsInput").value = p.questions;
      this.el("questionFormat").value = p.format;
      this.el("speedMode").value = p.speedMode;
      this.el("negPctRange").value = p.negPct;
      this.el("negPctOut").textContent = p.negPct + "%";
      this.el("negControl").hidden = p.numType !== "integer";
      this.el("noRepeatToggle").checked = p.noRepeat !== false;
      this.el("adaptiveToggle").checked = p.adaptive !== false;
      this.$$("#timerGrid .chip").forEach((c) =>
        c.classList.toggle(
          "active",
          parseInt(c.dataset.timer) === p.timer ||
            (c.dataset.timer === "custom" && p.timer > 600),
        ),
      );
      this.toggleOpSpecificUI();
      this.updateDifficultyPreview();
      this.toast(`Loaded preset: ${p.name}`, "success");
    },

    // ---- Practice ----
    bindPractice() {
      this.el("submitBtn").addEventListener("click", () => this.submitAnswer());
      this.el("answerInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.submitAnswer();
        }
      });
      this.el("nextBtn").addEventListener("click", () => this.nextQuestion());
      this.el("skipBtn").addEventListener("click", () => this.skipQuestion());
      this.el("pauseBtn").addEventListener("click", () => this.pausePractice());
      this.el("resumeBtn").addEventListener("click", () =>
        this.resumePractice(),
      );
      this.el("endEarlyBtn").addEventListener("click", () =>
        this.endPracticeEarly(),
      );
      // Comparison / boolean chips
      this.$$("#comparisonOptions .chip").forEach((c) =>
        c.addEventListener("click", () =>
          this.submitComparison(c.dataset.compare),
        ),
      );
      this.$$("#booleanOptions .chip").forEach((c) =>
        c.addEventListener("click", () =>
          this.submitBoolean(c.dataset.bool === "true"),
        ),
      );
    },

    startPractice() {
      const config = { ...State.config };
      const session = SessionManager.start(config);
      this.el("practiceIdle").hidden = true;
      this.el("practiceResults").hidden = true;
      this.el("practicePaused").hidden = true;
      this.el("practiceActive").hidden = false;
      this.el("practiceActions").hidden = true;
      this.el("feedback").hidden = true;
      this.el("comparisonOptions").hidden = true;
      this.el("mcOptions").hidden = true;
      this.el("booleanOptions").hidden = true;
      this.el("answerWrap").hidden = false;
      // Auto-enter focus mode (collapses sidebar so practice area becomes big)
      const focusToggle = document.getElementById("focusModeAutoToggle");
      if (!focusToggle || focusToggle.checked)
        SidebarControl.enterFocusModeIfAuto();
      this.startSessionTimer();
      this.renderQuestion();
    },

    startSessionTimer() {
      const s = State.session;
      if (!s) return;
      Timer.stopAll();
      let timeLeft = s.config.timer;
      const update = () => {
        if (!State.session || State.session.ended) return;
        if (s.paused) return;
        const elapsed = Math.floor(
          (Date.now() - s.startTime - s.pausedTotal) / 1000,
        );
        if (s.config.timer > 0) {
          const left = s.config.timer - elapsed;
          this.el("liveTimer").textContent = this.formatTime(left);
          if (left <= 0) {
            this.endPractice("timeout");
            return;
          }
        } else {
          this.el("liveTimer").textContent = this.formatTime(elapsed);
        }
        this.el("liveScore").textContent = s.correctCount;
        this.el("liveCorrect").textContent =
          `${s.correctCount}/${s.questions.length}`;
        const total =
          s.config.speedMode === "zen" ||
          s.config.speedMode === "mastery" ||
          s.config.speedMode === "marathon"
            ? s.questions.length
            : s.config.questions;
        const pct =
          total > 0 ? (s.questions.length / Math.max(1, total)) * 100 : 0;
        this.el("progressFill").style.width = pct + "%";
        this.el("progressText").textContent =
          `${s.questions.length} / ${total === 0 ? "∞" : total}`;
      };
      update();
      Timer.start(update, 200);
    },

    formatTime(sec) {
      if (sec < 0) sec = 0;
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    },

    renderQuestion() {
      const s = State.session;
      if (!s) return;
      const q = SessionManager.next();
      if (!q) {
        this.showResults();
        return;
      }
      // Only append " = ?" for simple standard/MC questions that don't already contain "="
      const needsEquals =
        (q.kind === "standard" || q.kind === "multiple") &&
        !q.display.includes("=") &&
        !q.display.endsWith("?");
      const fullDisplay = q.display + (needsEquals ? " = ?" : "");
      this.el("questionText").textContent = fullDisplay;
      this.el("feedback").hidden = true;
      this.el("practiceActions").hidden = true;
      this.el("answerInput").value = "";
      // Speak the question aloud if TTS is enabled
      if (State.stats.settings.tts) TTS.speakQuestion(fullDisplay);
      // Hide/show appropriate input
      const isNumeric =
        q.kind === "standard" || q.kind === "missing" || q.kind === "reverse";
      this.el("answerWrap").hidden = !isNumeric;
      this.el("comparisonOptions").hidden = q.kind !== "comparison";
      this.el("booleanOptions").hidden = q.kind !== "boolean";
      this.el("mcOptions").hidden = q.kind !== "multiple";
      if (q.kind === "multiple") this.renderMCOptions(q);
      if (isNumeric) setTimeout(() => this.el("answerInput").focus(), 50);
    },

    renderMCOptions(q) {
      const wrap = this.el("mcOptions");
      wrap.innerHTML = "";
      q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "mc-option";
        btn.dataset.value = String(opt);
        btn.innerHTML = `<span class="mc-letter">${q.optionLetters[i]}</span><span>${MathEngine.formatBigInt(opt)}</span>`;
        btn.addEventListener("click", () => this.submitMC(opt, btn));
        wrap.appendChild(btn);
      });
    },

    submitAnswer() {
      const s = State.session;
      if (!s) return;
      const q = s.questions[s.questions.length - 1];
      if (!q) return;
      const val = this.el("answerInput").value.trim();
      // Division remainder mode: answer is a "q R r" string. Accept that format before numeric parse.
      if (
        q.isRemainder &&
        typeof q.answer === "string" &&
        q.answer.includes("R")
      ) {
        const normalized = val
          .replace(/−/g, "-")
          .replace(/\s*/g, "")
          .replace(/^r$/i, "R")
          .replace(/r/i, "R");
        const result = SessionManager.answer(normalized);
        this.showFeedback(result);
        return;
      }
      const parsed = MathEngine.parseAnswer(val);
      if (parsed === null) {
        this.toast(
          q.isRemainder
            ? 'Format: quotient R remainder (e.g. "12 R 3")'
            : "Please enter a valid number",
          "warn",
        );
        this.el("answerInput").focus();
        return;
      }
      const result = SessionManager.answer(parsed);
      this.showFeedback(result);
    },

    submitMC(value, btn) {
      const result = SessionManager.answer(value);
      // Highlight: green on the correct option, red on the user's wrong pick.
      const wrap = this.el("mcOptions");
      wrap.querySelectorAll(".mc-option").forEach((b) => {
        const optVal = MathEngine.parseAnswer(b.dataset.value);
        if (MathEngine.answersEqual(optVal, result.q.answer))
          b.classList.add("correct");
        else if (b === btn && !result.isCorrect) b.classList.add("wrong");
      });
      this.showFeedback(result, true);
    },

    submitComparison(value) {
      const result = SessionManager.answer(value);
      this.showFeedback(result);
    },

    submitBoolean(value) {
      const result = SessionManager.answer(value);
      this.showFeedback(result);
    },

    showFeedback(result, isMC = false) {
      const fb = this.el("feedback");
      fb.hidden = false;
      fb.className = "feedback " + (result.isCorrect ? "correct" : "wrong");
      if (result.isCorrect) {
        fb.innerHTML = `<strong>✓ Correct!</strong> <span class="feedback-detail">Solved in ${(result.elapsed / 1000).toFixed(1)}s</span>`;
      } else {
        fb.innerHTML = `<strong>✗ Not quite.</strong> <span class="feedback-detail">Correct: ${MathEngine.formatBigInt(result.q.answer)}</span>`;
      }
      this.el("practiceActions").hidden = false;
      this.el("answerWrap").hidden = true;
      this.el("comparisonOptions").hidden = true;
      this.el("booleanOptions").hidden = true;
      this.el("mcOptions").hidden = isMC ? false : true;
      if (State.stats.settings.autoNext && result.isCorrect) {
        setTimeout(() => this.nextQuestion(), 700);
      } else {
        this.el("nextBtn").focus();
      }
      Storage.save();
      this.renderDashboard();
      // Refresh daily goal + XP bar after each answer
      if (typeof DailyGoal !== "undefined") DailyGoal.render();
      if (typeof XPSystem !== "undefined") XPSystem.renderBar();
      // Speak the correct/wrong feedback if TTS is on
      if (State.stats.settings.tts) {
        TTS.speak(
          result.isCorrect
            ? "Correct!"
            : "The correct answer is " +
                MathEngine.formatBigInt(result.q.answer),
        );
      }
    },

    nextQuestion() {
      const s = State.session;
      if (!s || s.ended) return;
      // Check if we should end (e.g. sprint is timer-based; marathon ends at 100)
      if (s.config.speedMode === "zen" || s.config.speedMode === "mastery") {
        // continue
      } else if (
        s.questions.length >= s.config.questions &&
        s.config.speedMode !== "marathon"
      ) {
        this.showResults();
        return;
      }
      this.renderQuestion();
    },

    skipQuestion() {
      const s = State.session;
      if (!s) return;
      // Treat as wrong but don't record as mistake (or maybe do)
      const q = s.questions[s.questions.length - 1];
      if (q) {
        s.times.push(0);
        Adaptive.record(
          q.op,
          Math.max(s.config.digits1, s.config.digits2),
          false,
        );
        State.stats.totalQuestions++;
      }
      this.nextQuestion();
    },

    pausePractice() {
      const s = State.session;
      if (!s) return;
      s.paused = true;
      s.pausedAt = Date.now();
      this.el("practiceActive").hidden = true;
      this.el("practicePaused").hidden = false;
    },
    resumePractice() {
      const s = State.session;
      if (!s) return;
      s.paused = false;
      s.pausedTotal += Date.now() - s.pausedAt;
      this.el("practiceActive").hidden = false;
      this.el("practicePaused").hidden = true;
      setTimeout(() => this.el("answerInput").focus(), 50);
    },
    endPracticeEarly() {
      this.endPractice("ended early");
    },

    endPractice(reason) {
      SessionManager.end(reason);
      this.showResults();
    },

    showResults() {
      const s = State.session;
      if (!s) return;
      SessionManager.end("complete");
      SidebarControl.exitFocusMode();
      const record = State.stats.sessions[0];
      if (!record) {
        this.resetPracticeUI();
        return;
      }
      const total = record.count;
      const correct = record.correct;
      const acc = record.accuracy;
      const emoji =
        acc >= 90 ? "🎉" : acc >= 70 ? "👍" : acc >= 50 ? "💪" : "📚";
      // Insights
      const opStats = State.stats.byOp;
      const sortedOps = Object.entries(opStats)
        .filter(([k, v]) => v.t > 0)
        .sort((a, b) => b[1].c / b[1].t - a[1].c / a[1].t);
      const strong = sortedOps
        .slice(0, 2)
        .map(([k, v]) => `${k} (${Math.round((v.c / v.t) * 100)}%)`);
      const weak = sortedOps
        .slice(-2)
        .reverse()
        .map(([k, v]) => `${k} (${Math.round((v.c / v.t) * 100)}%)`);

      const html = `
      <div class="result-hero">
        <div class="result-emoji">${emoji}</div>
        <h2>Session Complete</h2>
        <div class="result-score">${acc}%</div>
        <div class="result-score-label">Accuracy</div>
      </div>
      <div class="result-stats">
        <div class="result-stat"><span class="result-stat-value">${correct}/${total}</span><span class="result-stat-label">Correct</span></div>
        <div class="result-stat"><span class="result-stat-value">${(record.avgMs / 1000).toFixed(1)}s</span><span class="result-stat-label">Avg Time</span></div>
        <div class="result-stat"><span class="result-stat-value">${(record.fastestMs / 1000).toFixed(1)}s</span><span class="result-stat-label">Fastest</span></div>
        <div class="result-stat"><span class="result-stat-value">${record.perMin}/min</span><span class="result-stat-label">Speed</span></div>
      </div>
      <div class="result-insights">
        <div class="result-insight good">
          <h4>✓ Strong Areas</h4>
          <ul>${strong.length ? strong.map((x) => `<li>${x}</li>`).join("") : "<li>Keep practicing to see insights</li>"}</ul>
        </div>
        <div class="result-insight warn">
          <h4>⚠ Needs Work</h4>
          <ul>${weak.length ? weak.map((x) => `<li>${x}</li>`).join("") : "<li>No weak spots detected</li>"}</ul>
        </div>
      </div>
      <div class="result-actions">
        <button class="btn btn-ghost" id="reviewMistakesBtn">Review Mistakes</button>
        <button class="btn btn-primary" id="tryAgainBtn">Try Again</button>
        <button class="btn btn-ghost" id="newChallengeBtn">New Challenge</button>
        ${acc >= 80 ? '<button class="btn btn-ghost" id="printCertificateBtn">Print Certificate</button>' : ""}
        <button class="btn btn-ghost" id="shareResultsBtn">Share Results</button>
      </div>
      <div id="sessionAdSlot" class="ad-slot" hidden></div>
    `;
      this.el("practiceActive").hidden = true;
      this.el("practiceResults").hidden = false;
      this.el("practiceResults").innerHTML = html;
      this.el("reviewMistakesBtn").addEventListener("click", () =>
        this.navigate("mistakes"),
      );
      this.el("tryAgainBtn").addEventListener("click", () =>
        this.startPractice(),
      );
      this.el("newChallengeBtn").addEventListener("click", () => {
        this.resetPracticeUI();
        this.navigate("practice");
      });
      this.renderDashboard();
      // Show ad AFTER the HTML is in the DOM (so the slot exists to be populated)
      if (typeof AdManager !== "undefined") AdManager.showAfterSessionAd();
      if (typeof XPSystem !== "undefined") XPSystem.renderBar();
      if (typeof DailyGoal !== "undefined") DailyGoal.render();
    },

    resetPracticeUI() {
      State.session = null;
      this.el("practiceResults").hidden = true;
      this.el("practiceActive").hidden = true;
      this.el("practicePaused").hidden = true;
      this.el("practiceIdle").hidden = false;
    },

    // ---- Mental Math ----
    bindMental() {
      // Cards bound in renderMental
      this.el("mentalSubmit").addEventListener("click", () =>
        this.submitMental(),
      );
      this.el("mentalAnswer").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.submitMental();
        }
      });
      this.el("mentalQuitBtn").addEventListener("click", () =>
        this.quitMental(),
      );
    },

    renderMental() {
      const grid = this.el("mentalGrid");
      grid.innerHTML = "";
      MENTAL_MODES.forEach((m) => {
        const card = document.createElement("button");
        card.className = "mental-card";
        card.innerHTML = `<span class="mm-icon">${m.icon}</span><div class="mm-name">${m.name}</div><div class="mm-desc">${m.desc}</div>`;
        card.addEventListener("click", () => this.startMental(m.id));
        grid.appendChild(card);
      });
    },

    startMental(mode) {
      MentalMath.start(mode);
      this.el("mentalGrid").parentElement.querySelector(
        ".section-desc",
      ).hidden = true;
      this.el("mentalActiveCard").hidden = false;
      this.renderMentalQuestion();
    },

    renderMentalQuestion() {
      const s = State.mentalSession;
      if (!s) return;
      const q = MentalMath.next();
      if (!q) {
        this.endMental();
        return;
      }
      this.el("mentalPrompt").textContent = q.prompt;
      this.el("mentalFeedback").hidden = true;
      // Think phase
      this.el("mentalThink").hidden = false;
      this.el("mentalAnswer").hidden = true;
      let count = 3;
      this.el("mentalCount").textContent = count;
      const tick = () => {
        count--;
        if (count <= 0) {
          this.el("mentalThink").hidden = true;
          this.el("mentalAnswerWrap").hidden = false;
          this.el("mentalAnswer").hidden = false;
          setTimeout(() => this.el("mentalAnswer").focus(), 30);
          return;
        }
        this.el("mentalCount").textContent = count;
        setTimeout(tick, 700);
      };
      setTimeout(tick, 700);
      this.updateMentalStats();
    },

    submitMental() {
      const s = State.mentalSession;
      if (!s) return;
      const val = this.el("mentalAnswer").value.trim();
      const parsed = MathEngine.parseAnswer(val);
      if (parsed === null) {
        this.toast("Enter a valid number", "warn");
        return;
      }
      const result = MentalMath.answer(parsed);
      const fb = this.el("mentalFeedback");
      fb.hidden = false;
      fb.className = "feedback " + (result.isCorrect ? "correct" : "wrong");
      if (result.isCorrect)
        fb.innerHTML = `<strong>✓ Correct!</strong> <span class="feedback-detail">Streak: ${s.streak}</span>`;
      else
        fb.innerHTML = `<strong>✗</strong> <span class="feedback-detail">Answer: ${typeof result.q.answer === "bigint" ? MathEngine.formatBigInt(result.q.answer) : result.q.answer}</span>`;
      this.el("mentalAnswer").value = "";
      this.updateMentalStats();
      setTimeout(
        () => this.renderMentalQuestion(),
        result.isCorrect && State.stats.settings.autoNext ? 700 : 1200,
      );
    },

    updateMentalStats() {
      const s = State.mentalSession;
      if (!s) return;
      this.el("mentalCorrect").textContent = `${s.correct}/${s.total}`;
      this.el("mentalStreak").textContent = s.streak;
      this.el("mentalProgressText").textContent = `${s.total} answered`;
      this.el("mentalProgressFill").style.width =
        Math.min(100, s.total * 5) + "%";
    },

    quitMental() {
      this.endMental();
    },

    endMental() {
      const record = MentalMath.end();
      this.el("mentalActiveCard").hidden = true;
      this.el("mentalGrid").parentElement.querySelector(
        ".section-desc",
      ).hidden = false;
      if (record)
        this.toast(
          `Mental math done: ${record.accuracy}% accuracy (${record.correct}/${record.count})`,
          record.accuracy >= 70 ? "success" : "warn",
        );
      this.renderDashboard();
    },

    // ---- Presets (dashboard) ----
    renderPresets() {
      const grid = this.el("dashboardPresets");
      grid.innerHTML = "";
      Object.entries(PRESETS).forEach(([id, p]) => {
        const card = document.createElement("button");
        card.className = "preset-card";
        card.innerHTML = `<span class="pc-icon">${p.icon}</span><div class="pc-name">${p.name}</div><div class="pc-desc">${p.desc}</div>`;
        card.addEventListener("click", () => {
          this.applyPreset(id);
          this.navigate("practice");
          setTimeout(() => this.startPractice(), 100);
        });
        grid.appendChild(card);
      });
    },

    // ---- Challenges ----
    renderChallenges() {
      const grid = this.el("challengeGrid");
      grid.innerHTML = "";
      SPEED_MODES.forEach((m) => {
        const card = document.createElement("button");
        card.className = "challenge-card";
        card.innerHTML = `<span class="ch-tag">${m.tag}</span><span class="ch-icon">${m.icon}</span><div class="ch-name">${m.name}</div><div class="ch-desc">${m.desc}</div>`;
        card.addEventListener("click", () => this.startChallenge(m.id));
        grid.appendChild(card);
      });
    },

    startChallenge(mode) {
      State.config.speedMode = mode;
      this.el("speedMode").value = mode;
      if (mode === "sprint") {
        State.config.timer = 60;
        State.config.questions = 999;
        this.$$("#timerGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.timer === "60"),
        );
        this.el("questionsRange").value = 200;
        this.el("questionsInput").value = 200;
      } else if (mode === "marathon") {
        State.config.timer = 0;
        State.config.questions = 100;
        this.$$("#timerGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.timer === "0"),
        );
        this.el("questionsRange").value = 100;
        this.el("questionsInput").value = 100;
      } else if (mode === "boss") {
        State.config.op = "mixed";
        State.config.numType = "integer";
        State.config.digits1 = 6;
        State.config.digits2 = 8;
        State.config.operands = 4;
        State.config.negPct = 40;
        State.config.timer = 600;
        State.config.questions = 30;
        this.$$("#opGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.op === "mixed"),
        );
        this.$$("#numTypeGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.numtype === "integer"),
        );
        this.el("digits1Range").value = 6;
        this.el("digits1Input").value = 6;
        this.el("digits2Range").value = 8;
        this.el("digits2Input").value = 8;
        this.el("operandsRange").value = 4;
        this.el("operandsInput").value = 4;
        this.el("negPctRange").value = 40;
        this.el("negPctOut").textContent = "40%";
        this.el("questionsRange").value = 30;
        this.el("questionsInput").value = 30;
        this.$$("#timerGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.timer === "600"),
        );
      } else if (mode === "zen") {
        State.config.timer = 0;
        State.config.questions = 999;
        this.$$("#timerGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.timer === "0"),
        );
      } else if (mode === "mastery") {
        State.config.timer = 0;
        State.config.questions = 999;
        this.$$("#timerGrid .chip").forEach((c) =>
          c.classList.toggle("active", c.dataset.timer === "0"),
        );
      } else if (mode === "speed") {
        State.config.timer = 0;
        State.config.questions = 30;
      }
      this.navigate("practice");
      setTimeout(() => this.startPractice(), 100);
    },

    // ---- Achievements ----
    renderAchievements() {
      const grid = this.el("achievementGrid");
      grid.innerHTML = "";
      ACHIEVEMENTS.forEach((a) => {
        const unlocked = AchievementManager.isUnlocked(a.id);
        const card = document.createElement("div");
        card.className = "achievement" + (unlocked ? " unlocked" : "");
        card.innerHTML = `<span class="ach-icon">${a.icon}</span><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div>`;
        grid.appendChild(card);
      });
      this.el("achCount").textContent =
        `${State.stats.achievements.length} unlocked`;
    },

    // ---- Dashboard ----
    renderDashboard() {
      const today = new Date().toISOString().slice(0, 10);
      const todayStats = State.stats.daily[today] || { c: 0, t: 0 };
      this.el("dashTodayQuestions").textContent = todayStats.t;
      this.el("dashTodayAccuracy").textContent =
        todayStats.t > 0
          ? Math.round((todayStats.c / todayStats.t) * 100) + "%"
          : "—";
      this.el("dashStreak").textContent = State.stats.streak || 0;

      // Strengths / weaknesses
      const opsWithStats = Object.entries(State.stats.byOp).filter(
        ([k, v]) => v.t >= 5,
      );
      const sorted = opsWithStats.sort(
        (a, b) => b[1].c / b[1].t - a[1].c / a[1].t,
      );
      const strongList = this.el("dashStrong");
      const weakList = this.el("dashWeak");
      if (sorted.length === 0) {
        strongList.innerHTML =
          '<li class="empty">No data yet — start practicing to see insights.</li>';
        weakList.innerHTML =
          '<li class="empty">No data yet — start practicing to see insights.</li>';
      } else {
        strongList.innerHTML = sorted
          .slice(0, 3)
          .map(
            ([k, v]) =>
              `<li class="good"><span class="label">${this.capitalize(k)}</span><span class="pct">${Math.round((v.c / v.t) * 100)}%</span></li>`,
          )
          .join("");
        weakList.innerHTML = sorted
          .slice(-3)
          .reverse()
          .map(
            ([k, v]) =>
              `<li class="warn"><span class="label">${this.capitalize(k)}</span><span class="pct">${Math.round((v.c / v.t) * 100)}%</span></li>`,
          )
          .join("");
      }

      // PRs
      const prs = [];
      if (State.stats.records.fastestMs)
        prs.push(
          `Fastest answer: ${(State.stats.records.fastestMs / 1000).toFixed(2)}s`,
        );
      if (State.stats.records.highestAccuracy !== null)
        prs.push(`Best accuracy: ${State.stats.records.highestAccuracy}%`);
      if (State.stats.records.mostPerMin)
        prs.push(`Most/min: ${State.stats.records.mostPerMin}`);
      if (State.stats.records.longestStreak)
        prs.push(`Longest streak: ${State.stats.records.longestStreak} days`);
      this.el("dashPRs").innerHTML = prs.length
        ? prs.map((p) => `<li>${p}</li>`).join("")
        : '<li class="empty">No records yet.</li>';

      // Recent sessions
      const recent = State.stats.sessions.slice(0, 5);
      this.el("dashRecentSessions").innerHTML = recent.length
        ? recent.map((s) => this.sessionItemHTML(s)).join("")
        : '<p class="empty">No sessions yet — your practice history appears here.</p>';

      this.updateSidebarStreak();
      this.updateRank();
    },

    sessionItemHTML(s) {
      const d = new Date(s.date);
      const dateStr =
        d.toLocaleDateString() +
        " " +
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const accClass =
        s.accuracy >= 80 ? "good" : s.accuracy >= 60 ? "warn" : "bad";
      const opLabel = s.op.startsWith("mental")
        ? `Mental ${s.op.replace("mental-", "")}`
        : this.capitalize(s.op);
      return `<div class="session-item">
      <div class="session-main">
        <span class="session-title">${opLabel} • ${s.mode}</span>
        <span class="session-meta">${dateStr} • ${s.count} questions • ${s.timeSec}s • Diff ${s.difficulty}/10</span>
      </div>
      <div class="session-acc ${accClass}">${s.accuracy}%</div>
    </div>`;
    },

    // ---- Mistakes ----
    renderMistakes() {
      const filter = this.el("mistakeFilter").value;
      let mistakes = State.stats.mistakes.slice().reverse();
      if (filter !== "all") mistakes = mistakes.filter((m) => m.op === filter);
      const list = this.el("mistakeList");
      if (mistakes.length === 0) {
        list.innerHTML =
          '<p class="empty">No mistakes recorded. Time to make some — that\'s how we learn!</p>';
      } else {
        list.innerHTML = mistakes
          .slice(0, 50)
          .map(
            (m) => `
        <div class="mistake-item">
          <div class="mistake-main">
            <div class="mistake-q">${m.question}</div>
            <div class="mistake-answers"><span class="wrong">Your: ${m.yourAnswer}</span><span class="right">Correct: ${m.correctAnswer}</span></div>
            <div class="mistake-meta">
              <span>${this.capitalize(m.op)}</span>
              <span>${m.digits} digits</span>
              <span>${m.category}</span>
              <span>Diff ${m.difficulty}</span>
              <span>${(m.timeMs / 1000).toFixed(1)}s</span>
            </div>
          </div>
          <div class="mistake-actions">
            <button class="btn btn-ghost btn-sm" data-explain="${m.question}">Explain</button>
            <button class="btn btn-ghost btn-sm" data-retry="${m.question}">Retry</button>
          </div>
        </div>
      `,
          )
          .join("");
        list
          .querySelectorAll("[data-explain]")
          .forEach((b) =>
            b.addEventListener("click", () =>
              this.showExplain(b.dataset.explain),
            ),
          );
        list
          .querySelectorAll("[data-retry]")
          .forEach((b) =>
            b.addEventListener("click", () =>
              this.retryMistake(b.dataset.retry),
            ),
          );
      }
      // Weaknesses
      const weakGrid = this.el("weaknessGrid");
      const buckets = Object.entries(State.stats.byDigits)
        .filter(([k, v]) => v.t >= 3)
        .map(([k, v]) => ({ k, acc: v.c / v.t, t: v.t }));
      const weakBuckets = buckets
        .filter((b) => b.acc < 0.7)
        .sort((a, b) => a.acc - b.acc)
        .slice(0, 6);
      if (weakBuckets.length === 0) {
        weakGrid.innerHTML =
          '<p class="empty">Practice more to reveal patterns in your mistakes.</p>';
      } else {
        weakGrid.innerHTML = weakBuckets
          .map(
            (b) => `
        <div class="weakness-item">
          <span class="w-label">${b.k.replace("-", " • ")} (digits)</span>
          <span class="w-stat">${Math.round(b.acc * 100)}% • ${b.t} Q</span>
        </div>`,
          )
          .join("");
      }
      this.el("clearMistakesBtn").onclick = () => {
        if (confirm("Clear all recorded mistakes? This cannot be undone.")) {
          State.stats.mistakes = [];
          Storage.save();
          this.renderMistakes();
          this.toast("Mistakes cleared", "success");
        }
      };
      this.el("mistakeFilter").onchange = () => this.renderMistakes();
    },

    retryMistake(question) {
      // Find the mistake and rebuild question
      const m = State.stats.mistakes.find((x) => x.question === question);
      if (!m) return;
      State.config.op = m.op;
      State.config.format = "standard";
      State.config.questions = 1;
      this.applyPreset("beginner-addition");
      State.config.op = m.op;
      State.config.questions = 1;
      this.el("questionsRange").value = 1;
      this.el("questionsInput").value = 1;
      this.$$("#opGrid .chip").forEach((c) =>
        c.classList.toggle("active", c.dataset.op === m.op),
      );
      this.navigate("practice");
      setTimeout(() => this.startPractice(), 100);
    },

    showExplain(question) {
      this.el("explainBody").innerHTML = `
      <div style="font-family:var(--font-mono);font-size:22px;text-align:center;margin-bottom:18px">${question}</div>
      <p style="color:var(--text-muted);font-size:14px;line-height:1.6">Break this down step by step:</p>
      <ol style="margin-left:20px;color:var(--text);font-size:14px;line-height:1.8">
        <li>Identify the operation(s) and order of operations (× ÷ before + −).</li>
        <li>Work from right to left for each digit column when adding/subtracting.</li>
        <li>For multiplication, use partial products or the standard algorithm.</li>
        <li>For division, estimate first, then refine. Check your answer by multiplying back.</li>
        <li>Double-check signs if working with negative numbers.</li>
      </ol>
      <p style="color:var(--text-muted);font-size:13px;margin-top:14px">Tip: practice this kind of question repeatedly until it becomes automatic.</p>
    `;
      this.openModal("explainModal");
    },

    // ---- Progress ----
    renderProgress() {
      this.el("totalQuestions").textContent =
        State.stats.totalQuestions.toLocaleString();
      this.el("overallAccuracy").textContent =
        State.stats.totalQuestions > 0
          ? Math.round(
              (State.stats.totalCorrect / State.stats.totalQuestions) * 100,
            ) + "%"
          : "—";
      this.el("totalSessions").textContent = State.stats.sessions.length;

      // Accuracy chart (last 14 days)
      const days = 14;
      const data = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        const key = d.toISOString().slice(0, 10);
        const s = State.stats.daily[key];
        data.push({
          label: d.toLocaleDateString([], { month: "numeric", day: "numeric" }),
          value: s && s.t > 0 ? Math.round((s.c / s.t) * 100) : 0,
        });
      }
      // Filter to days with activity for cleaner chart
      const activeData = data.filter((d) => d.value > 0);
      Charts.drawLine(
        this.el("accuracyChart"),
        activeData.length > 1 ? activeData : data,
      );

      // Operation chart
      const opData = Object.entries(State.stats.byOp)
        .filter(([k, v]) => v.t > 0)
        .map(([k, v]) => ({
          label: this.capitalize(k).slice(0, 4),
          value: v.t,
        }));
      Charts.drawBars(this.el("operationChart"), opData);

      // Digit chart
      const digData = Object.entries(State.stats.byDigits)
        .filter(([k, v]) => v.t > 0)
        .map(([k, v]) => ({ label: k.replace("-", "/"), value: v.t }));
      Charts.drawBars(this.el("digitChart"), digData);

      // Sessions list
      const list = this.el("fullSessionList");
      const sessions = State.stats.sessions.slice(0, 50);
      list.innerHTML = sessions.length
        ? sessions.map((s) => this.sessionItemHTML(s)).join("")
        : '<p class="empty">No sessions yet.</p>';

      // Range toggle
      this.$$("[data-range]").forEach((b) =>
        b.addEventListener("click", () => {
          this.$$("[data-range]").forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          const days = parseInt(b.dataset.range);
          const d = [];
          for (let i = days - 1; i >= 0; i--) {
            const dt = new Date(Date.now() - i * 86400000);
            const key = dt.toISOString().slice(0, 10);
            const s = State.stats.daily[key];
            d.push({
              label: dt.toLocaleDateString([], {
                month: "numeric",
                day: "numeric",
              }),
              value: s && s.t > 0 ? Math.round((s.c / s.t) * 100) : 0,
            });
          }
          const active = d.filter((x) => x.value > 0);
          Charts.drawLine(
            this.el("accuracyChart"),
            active.length > 1 ? active : d,
          );
        }),
      );

      this.el("clearHistoryBtn").onclick = () => {
        if (
          confirm(
            "Clear all session history? Mistakes and totals will be kept.",
          )
        ) {
          State.stats.sessions = [];
          State.stats.daily = {};
          Storage.save();
          this.renderProgress();
          this.toast("History cleared", "success");
        }
      };
    },

    // ---- Settings ----
    bindSettings() {
      this.el("settingsName").value = State.stats.settings.name;
      this.el("settingsName").addEventListener("input", (e) => {
        State.stats.settings.name = e.target.value || "Player";
        this.applySettings();
        Storage.save();
      });
      this.$$("[data-theme-set]").forEach((b) =>
        b.addEventListener("click", () => {
          this.$$("[data-theme-set]").forEach((x) =>
            x.classList.remove("active"),
          );
          b.classList.add("active");
          State.stats.settings.theme = b.dataset.themeSet;
          this.applyTheme();
          Storage.save();
        }),
      );
      // Accent swatches
      this.$$("#accentGrid .accent-swatch").forEach((b) =>
        b.addEventListener("click", () => {
          State.stats.settings.accent = b.dataset.accent;
          this.applyAccent();
          Storage.save();
          QuickSettings.sync();
        }),
      );
      // Font family chips
      this.$$("#fontFamilyGrid .chip").forEach((b) =>
        b.addEventListener("click", () => {
          State.stats.settings.fontFamily = b.dataset.font;
          this.applyFont();
          Storage.save();
          QuickSettings.sync();
        }),
      );
      // Base font size
      const bfs = this.el("baseFontSizeRange");
      if (bfs) {
        bfs.value = State.stats.settings.baseFontSize;
        this.el("baseFontSizeOut").textContent =
          State.stats.settings.baseFontSize + "px";
        bfs.addEventListener("input", (e) => {
          State.stats.settings.baseFontSize = parseInt(e.target.value);
          this.el("baseFontSizeOut").textContent = e.target.value + "px";
          this.applyFont();
          Storage.save();
        });
      }
      this.el("numberSizeRange").value = State.stats.settings.numberSize;
      this.el("numberSizeOut").textContent =
        State.stats.settings.numberSize + "px";
      this.el("numberSizeRange").addEventListener("input", (e) => {
        State.stats.settings.numberSize = parseInt(e.target.value);
        this.el("numberSizeOut").textContent = e.target.value + "px";
        this.applySettings();
        Storage.save();
      });
      this.el("highContrastToggle").checked = State.stats.settings.highContrast;
      this.el("highContrastToggle").addEventListener("change", (e) => {
        State.stats.settings.highContrast = e.target.checked;
        this.applySettings();
        Storage.save();
      });
      this.el("reduceMotionToggle").checked = State.stats.settings.reduceMotion;
      this.el("reduceMotionToggle").addEventListener("change", (e) => {
        State.stats.settings.reduceMotion = e.target.checked;
        this.applySettings();
        Storage.save();
      });
      this.el("largeInputToggle").checked = State.stats.settings.largeInput;
      this.el("largeInputToggle").addEventListener("change", (e) => {
        State.stats.settings.largeInput = e.target.checked;
        this.applySettings();
        Storage.save();
      });
      this.el("soundToggle").checked = State.stats.settings.sound;
      this.el("soundToggle").addEventListener("change", (e) => {
        State.stats.settings.sound = e.target.checked;
        Storage.save();
      });
      this.el("autoNextToggle").checked = State.stats.settings.autoNext;
      this.el("autoNextToggle").addEventListener("change", (e) => {
        State.stats.settings.autoNext = e.target.checked;
        Storage.save();
      });
      this.el("exportDataBtn").onclick = () => {
        const blob = new Blob([JSON.stringify(State.stats, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mathlab-data-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.toast("Data exported", "success");
      };
      this.el("resetDataBtn").onclick = () => {
        if (
          confirm(
            "Reset ALL progress, including streaks, achievements, and history? This cannot be undone.",
          )
        ) {
          Storage.reset();
          location.reload();
        }
      };
    },

    applyTheme() {
      const t = State.stats.settings.theme;
      if (t === "auto") {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
      } else {
        document.documentElement.dataset.theme = t;
      }
      this.$$("[data-theme-set]").forEach((b) =>
        b.classList.toggle("active", b.dataset.themeSet === t),
      );
    },

    applyAccent() {
      document.documentElement.dataset.accent =
        State.stats.settings.accent || "electric";
      this.$$(".accent-swatch").forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.accent === State.stats.settings.accent,
        ),
      );
    },

    applyFont() {
      document.documentElement.dataset.font =
        State.stats.settings.fontFamily || "inter";
      document.documentElement.style.fontSize =
        (State.stats.settings.baseFontSize || 14) + "px";
      this.$$("#fontFamilyGrid .chip").forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.font === State.stats.settings.fontFamily,
        ),
      );
    },

    applyPanelVisibility() {
      const hidden = State.stats.settings.hiddenPanels || [];
      document.querySelectorAll(".nav-item").forEach((item) => {
        const r = item.dataset.route;
        if (hidden.includes(r)) {
          item.dataset.hidden = "true";
        } else {
          delete item.dataset.hidden;
        }
      });
    },

    applySettings() {
      document.documentElement.style.setProperty(
        "--num-size",
        State.stats.settings.numberSize + "px",
      );
      document.documentElement.dataset.contrast = State.stats.settings
        .highContrast
        ? "high"
        : "normal";
      document.documentElement.dataset.motion = State.stats.settings
        .reduceMotion
        ? "reduced"
        : "normal";
      document.documentElement.dataset.largeinput =
        State.stats.settings.largeInput;
      this.updateRank();
      this.updateSidebarStreak();
    },

    updateRank() {
      const total = State.stats.totalQuestions;
      let rank = RANKS[0];
      for (const r of RANKS) if (total >= r.min) rank = r;
      this.el("userRank").textContent = `${rank.icon} ${rank.name}`;
      this.el("userName").textContent = State.stats.settings.name || "Player";
      this.el("avatarLetter").textContent = (State.stats.settings.name || "P")
        .charAt(0)
        .toUpperCase();
    },

    updateSidebarStreak() {
      this.el("sidebarStreakCount").textContent = State.stats.streak || 0;
    },

    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },

    // ---- Modals ----
    bindModals() {
      // Theme toggle button in topbar (cycles dark ↔ light)
      const tt = this.el("themeToggle");
      if (tt) {
        tt.addEventListener("click", () => {
          const cur = State.stats.settings.theme;
          // If auto, switch to opposite of system preference; otherwise swap
          let next;
          if (cur === "auto") {
            const prefersDark = matchMedia(
              "(prefers-color-scheme: dark)",
            ).matches;
            next = prefersDark ? "light" : "dark";
          } else {
            next = cur === "dark" ? "light" : "dark";
          }
          State.stats.settings.theme = next;
          this.applyTheme();
          Storage.save();
          QuickSettings.sync();
        });
      }
      this.el("keyboardHelp").addEventListener("click", () =>
        this.openModal("keyboardModal"),
      );
      this.$$("[data-modal-close]").forEach((b) =>
        b.addEventListener("click", () => this.closeModal()),
      );
      this.el("modalBackdrop").addEventListener("click", () =>
        this.closeModal(),
      );
      // Glossary search
      const gs = document.getElementById("glossarySearch");
      if (gs) gs.addEventListener("input", () => this.renderGlossary());
    },
    openModal(id) {
      this.el(id).hidden = false;
      this.el("modalBackdrop").hidden = false;
    },
    closeModal() {
      this.el("keyboardModal").hidden = true;
      this.el("explainModal").hidden = true;
      this.el("modalBackdrop").hidden = true;
    },

    // ---- Keyboard ----
    bindKeyboard() {
      document.addEventListener("keydown", (e) => {
        // typing in inputs — only handle Enter/Esc
        const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(
          e.target.tagName,
        );
        if (typing) {
          if (
            e.key === "Escape" &&
            State.session &&
            State.session.paused === false
          ) {
            this.pausePractice();
          }
          if (e.key === "Escape") {
            // close settings panel if open
            const sp = document.getElementById("settingsPanel");
            if (sp && !sp.hidden) {
              QuickSettings.close();
              e.preventDefault();
              return;
            }
          }
          return;
        }
        if (e.key === "Escape") {
          this.closeModal();
          this.toggleSidebar(false);
          const sp = document.getElementById("settingsPanel");
          if (sp && !sp.hidden) {
            QuickSettings.close();
            return;
          }
          return;
        }
        if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
          this.openModal("keyboardModal");
          return;
        }
        if (e.shiftKey && (e.key === "T" || e.key === "t")) {
          e.preventDefault();
          State.stats.settings.theme =
            State.stats.settings.theme === "dark" ? "light" : "dark";
          this.applyTheme();
          Storage.save();
          return;
        }
        // C — collapse / expand sidebar
        if (e.key === "c" || e.key === "C") {
          SidebarControl.toggleCollapse();
          return;
        }
        // F — toggle focus mode
        if (e.key === "f" || e.key === "F") {
          SidebarControl.toggleFocusMode();
          return;
        }
        // S — open quick settings panel
        if (e.key === "s" || e.key === "S") {
          const sp = document.getElementById("settingsPanel");
          if (sp && !sp.hidden) QuickSettings.close();
          else QuickSettings.open();
          return;
        }
        // Number keys for nav (updated for new routes)
        const numMap = {
          1: "dashboard",
          2: "practice",
          3: "targeted",
          4: "mental",
          5: "study",
          6: "challenges",
          7: "progress",
          8: "mistakes",
          9: "settings",
          0: "glossary",
        };
        if (numMap[e.key]) {
          // Skip if hidden
          if (!State.stats.settings.hiddenPanels.includes(numMap[e.key])) {
            this.navigate(numMap[e.key]);
          }
          return;
        }
        if (e.key === "m" || e.key === "M") {
          this.navigate("mental");
          return;
        }
        // New shortcuts for v3
        if (e.key === "h" || e.key === "H") {
          HintSystem.showHint();
          return;
        }
        if (e.key === "b" || e.key === "B") {
          this.toggleBookmark();
          return;
        }
        if (e.key === "v" || e.key === "V") {
          this.toggleTTS();
          return;
        }
        if (e.key === "g" || e.key === "G") {
          this.navigate("glossary");
          return;
        }
        if (e.key === "r" || e.key === "R") {
          if (State.session && !State.session.ended) {
            if (confirm("Restart current session?")) {
              this.endPractice("restart");
              setTimeout(() => this.startPractice(), 200);
            }
          }
          return;
        }
        if (e.key === " ") {
          if (State.session && !State.session.ended) {
            const fb = this.el("feedback");
            if (!fb.hidden) {
              e.preventDefault();
              this.nextQuestion();
            }
          }
        }
      });
    },

    // ---- Toast ----
    toasts: [],
    toast(msg, type = "info") {
      const wrap = this.el("toastContainer");
      const t = document.createElement("div");
      t.className = "toast " + type;
      t.textContent = msg;
      wrap.appendChild(t);
      setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateX(40px)";
        setTimeout(() => t.remove(), 320);
      }, 3000);
    },
  };

  /* ============== SIDEBAR CONTROL (resize, collapse, focus mode) ============== */
  const SidebarControl = {
    init() {
      this.bindResize();
      this.bindCollapse();
      this.bindFocusMode();
      this.restore();
    },
    restore() {
      // Restore saved width
      const w = State.stats.settings.sidebarWidth || 240;
      document.documentElement.style.setProperty("--sidebar-w", w + "px");
      if (State.stats.settings.sidebarCollapsed) {
        document.getElementById("app").dataset.sidebarCollapsed = "true";
      }
    },
    bindResize() {
      const handle = document.getElementById("sidebarResizeHandle");
      if (!handle) return;
      let dragging = false,
        startX = 0,
        startW = 0;
      const onMove = (e) => {
        if (!dragging) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = x - startX;
        let newW = startW + delta;
        newW = Math.max(180, Math.min(400, newW));
        document.documentElement.style.setProperty("--sidebar-w", newW + "px");
        handle.classList.add("dragging");
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        handle.classList.remove("dragging");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        // persist
        const cur = getComputedStyle(document.documentElement)
          .getPropertyValue("--sidebar-w")
          .trim();
        State.stats.settings.sidebarWidth = parseInt(cur) || 240;
        Storage.save();
        // reposition collapse button (CSS handles via var)
      };
      const onDown = (e) => {
        dragging = true;
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        const cur = getComputedStyle(document.documentElement)
          .getPropertyValue("--sidebar-w")
          .trim();
        startW = parseInt(cur) || 240;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        e.preventDefault();
      };
      handle.addEventListener("mousedown", onDown);
      handle.addEventListener("touchstart", onDown, { passive: false });
      document.addEventListener("mousemove", onMove);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchend", onUp);
      // keyboard resize
      handle.addEventListener("keydown", (e) => {
        const cur =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--sidebar-w",
            ),
          ) || 240;
        let newW = cur;
        if (e.key === "ArrowLeft") newW = Math.max(180, cur - 16);
        else if (e.key === "ArrowRight") newW = Math.min(400, cur + 16);
        else return;
        document.documentElement.style.setProperty("--sidebar-w", newW + "px");
        State.stats.settings.sidebarWidth = newW;
        Storage.save();
        e.preventDefault();
      });
    },
    bindCollapse() {
      const btn = document.getElementById("sidebarCollapseBtn");
      if (!btn) return;
      btn.addEventListener("click", () => this.toggleCollapse());
    },
    toggleCollapse(force) {
      const app = document.getElementById("app");
      const isCollapsed = app.dataset.sidebarCollapsed === "true";
      const next = force === undefined ? !isCollapsed : force;
      app.dataset.sidebarCollapsed = String(next);
      State.stats.settings.sidebarCollapsed = next;
      Storage.save();
    },
    bindFocusMode() {
      const btn = document.getElementById("focusModeBtn");
      if (!btn) return;
      btn.addEventListener("click", () => this.toggleFocusMode());
    },
    toggleFocusMode(force) {
      const app = document.getElementById("app");
      const isOn = app.classList.contains("focus-mode");
      const next = force === undefined ? !isOn : force;
      app.classList.toggle("focus-mode", next);
    },
    enterFocusModeIfAuto() {
      if (State.stats.settings.focusModeAuto) this.toggleFocusMode(true);
    },
    exitFocusMode() {
      this.toggleFocusMode(false);
    },
  };

  /* ============== QUICK SETTINGS (slide-out panel) ============== */
  const QuickSettings = {
    init() {
      this.bindToggle();
      this.bindControls();
      this.sync();
    },
    bindToggle() {
      document
        .getElementById("settingsGearBtn")
        .addEventListener("click", () => this.open());
      document
        .getElementById("closeSettingsPanel")
        .addEventListener("click", () => this.close());
      document
        .getElementById("settingsBackdrop")
        .addEventListener("click", () => this.close());
      document
        .getElementById("openFullSettings")
        .addEventListener("click", () => {
          this.close();
          UI.navigate("settings");
        });
    },
    open() {
      document.getElementById("settingsBackdrop").hidden = false;
      document.getElementById("settingsPanel").hidden = false;
      this.sync();
    },
    close() {
      document.getElementById("settingsBackdrop").hidden = true;
      document.getElementById("settingsPanel").hidden = true;
    },
    bindControls() {
      // Theme buttons
      document.querySelectorAll("[data-quick-theme]").forEach((b) =>
        b.addEventListener("click", () => {
          State.stats.settings.theme = b.dataset.quickTheme;
          UI.applyTheme();
          Storage.save();
          this.sync();
        }),
      );
      // Accent swatches (both grids)
      document
        .querySelectorAll(
          "#accentGridQuick .accent-swatch, #accentGrid .accent-swatch",
        )
        .forEach((b) =>
          b.addEventListener("click", () => {
            State.stats.settings.accent = b.dataset.accent;
            UI.applyAccent();
            Storage.save();
            this.sync();
          }),
        );
      // Font family
      document
        .getElementById("quickFontFamily")
        .addEventListener("change", (e) => {
          State.stats.settings.fontFamily = e.target.value;
          UI.applyFont();
          Storage.save();
        });
      document.querySelectorAll("#fontFamilyGrid .chip").forEach((b) =>
        b.addEventListener("click", () => {
          State.stats.settings.fontFamily = b.dataset.font;
          UI.applyFont();
          Storage.save();
          this.sync();
        }),
      );
      // Font size
      const qfs = document.getElementById("quickFontSize");
      qfs.value = State.stats.settings.baseFontSize;
      qfs.addEventListener("input", (e) => {
        State.stats.settings.baseFontSize = parseInt(e.target.value);
        document.getElementById("quickFontSizeOut").textContent =
          e.target.value + "px";
        UI.applyFont();
        Storage.save();
      });
      // Number size
      const qns = document.getElementById("quickNumberSize");
      qns.value = State.stats.settings.numberSize;
      qns.addEventListener("input", (e) => {
        State.stats.settings.numberSize = parseInt(e.target.value);
        document.getElementById("quickNumberSizeOut").textContent =
          e.target.value + "px";
        UI.applySettings();
        Storage.save();
      });
      // Toggles
      const bindQuickToggle = (id, key, callback) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.checked = State.stats.settings[key];
        el.addEventListener("change", (e) => {
          State.stats.settings[key] = e.target.checked;
          if (callback) callback();
          UI.applySettings();
          Storage.save();
          this.sync();
        });
      };
      bindQuickToggle("quickHighContrast", "highContrast");
      bindQuickToggle("quickReduceMotion", "reduceMotion");
      bindQuickToggle("quickLargeInput", "largeInput");
      bindQuickToggle("quickSound", "sound");
      bindQuickToggle("quickAutoNext", "autoNext");
      // Main settings page also has its own toggles; bind them in UI.bindSettings (existing)
    },
    sync() {
      // Reflect current settings in the slide-out
      document
        .querySelectorAll("[data-quick-theme]")
        .forEach((b) =>
          b.classList.toggle(
            "active",
            b.dataset.quickTheme === State.stats.settings.theme,
          ),
        );
      document
        .querySelectorAll(".accent-swatch")
        .forEach((b) =>
          b.classList.toggle(
            "active",
            b.dataset.accent === State.stats.settings.accent,
          ),
        );
      document
        .querySelectorAll("#fontFamilyGrid .chip")
        .forEach((b) =>
          b.classList.toggle(
            "active",
            b.dataset.font === State.stats.settings.fontFamily,
          ),
        );
      document.getElementById("quickFontFamily").value =
        State.stats.settings.fontFamily;
      document.getElementById("quickFontSize").value =
        State.stats.settings.baseFontSize;
      document.getElementById("quickFontSizeOut").textContent =
        State.stats.settings.baseFontSize + "px";
      document.getElementById("quickNumberSize").value =
        State.stats.settings.numberSize;
      document.getElementById("quickNumberSizeOut").textContent =
        State.stats.settings.numberSize + "px";
      document.getElementById("quickHighContrast").checked =
        State.stats.settings.highContrast;
      document.getElementById("quickReduceMotion").checked =
        State.stats.settings.reduceMotion;
      document.getElementById("quickLargeInput").checked =
        State.stats.settings.largeInput;
      document.getElementById("quickSound").checked =
        State.stats.settings.sound;
      document.getElementById("quickAutoNext").checked =
        State.stats.settings.autoNext;
      // Render panel visibility toggles
      this.renderPanelToggles("quickPanelToggles");
      this.renderPanelToggles("panelVisibilityToggles");
      // Render shortcuts table
      this.renderShortcutsTable("shortcutsTable");
      this.renderShortcutsTable("modalShortcutsTable");
    },
    renderPanelToggles(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (container.children.length > 0) return; // already rendered
      const panels = [
        { id: "dashboard", label: "Dashboard" },
        { id: "practice", label: "Practice" },
        { id: "targeted", label: "Targeted Practice" },
        { id: "mental", label: "Mental Math" },
        { id: "study", label: "Study" },
        { id: "challenges", label: "Challenges" },
        { id: "progress", label: "Progress" },
        { id: "mistakes", label: "Mistakes" },
        { id: "glossary", label: "Glossary" },
        { id: "settings", label: "Settings" },
      ];
      container.innerHTML = panels
        .map(
          (p) => `
      <label class="toggle">
        <input type="checkbox" data-panel-vis="${p.id}" ${!State.stats.settings.hiddenPanels.includes(p.id) ? "checked" : ""} />
        <span>${p.label}</span>
      </label>
    `,
        )
        .join("");
      container.querySelectorAll("[data-panel-vis]").forEach((cb) =>
        cb.addEventListener("change", (e) => {
          const id = e.target.dataset.panelVis;
          const hidden = State.stats.settings.hiddenPanels;
          const idx = hidden.indexOf(id);
          if (e.target.checked) {
            if (idx >= 0) hidden.splice(idx, 1);
          } else {
            if (idx < 0) hidden.push(id);
          }
          UI.applyPanelVisibility();
          Storage.save();
          // sync the other container
          const other =
            containerId === "quickPanelToggles"
              ? "panelVisibilityToggles"
              : "quickPanelToggles";
          const otherCb = document.querySelector(
            `#${other} [data-panel-vis="${id}"]`,
          );
          if (otherCb) otherCb.checked = e.target.checked;
        }),
      );
    },
    renderShortcutsTable(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      if (container.children.length > 0) return;
      const shortcuts = [
        ["Enter", "Submit answer / Next question"],
        ["Space", "Next question (after answer)"],
        ["Esc", "Pause session / Close modal"],
        ["C", "Collapse / expand sidebar"],
        ["F", "Toggle focus mode"],
        ["S", "Open quick settings panel"],
        ["T (Shift)", "Toggle dark/light theme"],
        ["R", "Restart current session"],
        ["M", "Go to Mental Math"],
        ["H", "Show hint for current question"],
        ["B", "Bookmark current question"],
        ["V", "Read question aloud (text-to-speech)"],
        ["G", "Go to Glossary"],
        ["1", "Dashboard"],
        ["2", "Practice"],
        ["3", "Targeted Practice"],
        ["4", "Mental Math"],
        ["5", "Study"],
        ["6", "Challenges"],
        ["7", "Progress"],
        ["8", "Mistakes"],
        ["9", "Settings"],
        ["0", "Glossary"],
        ["?", "Show this shortcuts help"],
      ];
      container.innerHTML = shortcuts
        .map(
          ([k, d]) => `
      <tr><td><kbd>${k}</kbd></td><td>${d}</td></tr>
    `,
        )
        .join("");
    },
  };

  /* ============== STUDY MODULE (reference + drill) ============== */
  const Study = {
    current: null, // module id
    session: null, // active drill

    startModule(id) {
      const m = STUDY_MODULES.find((x) => x.id === id);
      if (!m) return;
      this.current = m;
      this.renderReference();
      document
        .getElementById("studyGrid")
        .parentElement.querySelector(".section-desc").hidden = true;
      document.getElementById("studyActiveCard").hidden = true;
    },

    renderReference() {
      const m = this.current;
      if (!m) return;
      document.getElementById("studyRefTitle").textContent =
        m.name + " — Reference";
      const wrap = document.getElementById("studyTableWrap");
      wrap.innerHTML = "";
      for (let i = m.range[0]; i <= m.range[1]; i++) {
        const cell = m.table(i);
        const div = document.createElement("div");
        div.className = "study-table-cell";
        div.innerHTML = `<span class="stc-input">${cell.input}</span><span class="stc-equals"> = </span><span class="stc-output">${cell.output}</span>`;
        wrap.appendChild(div);
      }
      document.getElementById("studyReferenceCard").hidden = false;
    },

    closeReference() {
      document.getElementById("studyReferenceCard").hidden = true;
      document
        .getElementById("studyGrid")
        .parentElement.querySelector(".section-desc").hidden = false;
      this.current = null;
    },

    startDrill() {
      const m = this.current;
      if (!m) {
        UI.toast("Pick a study module first", "warn");
        return;
      }
      // Determine if this module uses numeric answers (text-input drill)
      // or formula answers (flashcard "show answer" drill).
      const sample = m.table(m.range[0]);
      const isNumeric = MathEngine.parseAnswer(sample.output) !== null;
      this.session = {
        module: m.id,
        op: m.op || m.id,
        isNumeric,
        current: 0,
        correct: 0,
        total: 0,
        streak: 0,
        maxStreak: 0,
        startTime: Date.now(),
        questionStart: 0,
        questions: [],
        target: 20,
      };
      document.getElementById("studyReferenceCard").hidden = true;
      document.getElementById("studyActiveCard").hidden = false;
      this.nextQuestion();
    },

    nextQuestion() {
      const s = this.session;
      if (!s) return;
      if (s.total >= s.target) {
        this.endDrill();
        return;
      }
      s.questionStart = Date.now();
      s.current++;
      const m = STUDY_MODULES.find((x) => x.id === s.module);
      const n = MathEngine.randInt(m.range[0], m.range[1]);
      const cell = m.table(n);
      const q = {
        prompt: cell.input,
        output: cell.output,
        answer: MathEngine.parseAnswer(cell.output),
      };
      s.questions.push(q);
      // For numeric mode, append " = ?" only if the prompt doesn't already end with " = " or contain "="
      let display = q.prompt;
      if (s.isNumeric && !q.prompt.includes("=") && !q.prompt.endsWith("?")) {
        display = q.prompt + " = ?";
      } else if (
        s.isNumeric &&
        q.prompt.includes("=") &&
        !q.prompt.endsWith("?")
      ) {
        display = q.prompt + "  →  ?";
      }
      document.getElementById("studyQuestionText").textContent = display;
      document.getElementById("studyAnswerInput").value = "";
      document.getElementById("studyFeedback").hidden = true;
      document.getElementById("studyActions").hidden = true;
      // Show/hide appropriate UI based on numeric vs flashcard mode
      document.getElementById("studyAnswerWrap").hidden = !s.isNumeric;
      document.getElementById("flashcardReveal").hidden = s.isNumeric;
      document.getElementById("flashcardAnswer").hidden = true;
      document.getElementById("flashcardActions").hidden = true;
      if (s.isNumeric) {
        setTimeout(
          () => document.getElementById("studyAnswerInput").focus(),
          30,
        );
      }
      this.updateStats();
    },

    // Flashcard mode: reveal the answer
    showAnswer() {
      const s = this.session;
      if (!s) return;
      const q = s.questions[s.questions.length - 1];
      if (!q) return;
      document.getElementById("flashcardReveal").hidden = true;
      const ans = document.getElementById("flashcardAnswer");
      ans.hidden = false;
      ans.textContent = q.output;
      document.getElementById("flashcardActions").hidden = false;
    },

    // Flashcard mode: user self-assessed got/missed
    flashcardResult(isCorrect) {
      const s = this.session;
      if (!s) return;
      s.total++;
      if (isCorrect) {
        s.correct++;
        s.streak++;
        if (s.streak > s.maxStreak) s.maxStreak = s.streak;
        Sound.correct();
      } else {
        s.streak = 0;
        Sound.wrong();
      }
      State.stats.totalQuestions++;
      if (isCorrect) State.stats.totalCorrect++;
      if (!State.stats.byOp[s.op]) State.stats.byOp[s.op] = { c: 0, t: 0 };
      State.stats.byOp[s.op].t++;
      if (isCorrect) State.stats.byOp[s.op].c++;
      this.updateStats();
      Storage.save();
      setTimeout(() => this.nextQuestion(), 500);
    },

    submit() {
      const s = this.session;
      if (!s) return;
      const q = s.questions[s.questions.length - 1];
      if (!q) return;
      const val = document.getElementById("studyAnswerInput").value.trim();
      const parsed = MathEngine.parseAnswer(val);
      if (parsed === null) {
        UI.toast("Enter a valid number", "warn");
        return;
      }
      const isCorrect = MathEngine.answersEqual(parsed, q.answer);
      s.total++;
      if (isCorrect) {
        s.correct++;
        s.streak++;
        if (s.streak > s.maxStreak) s.maxStreak = s.streak;
        Sound.correct();
      } else {
        s.streak = 0;
        Sound.wrong();
      }
      State.stats.totalQuestions++;
      if (isCorrect) State.stats.totalCorrect++;
      if (!State.stats.byOp[s.op]) State.stats.byOp[s.op] = { c: 0, t: 0 };
      State.stats.byOp[s.op].t++;
      if (isCorrect) State.stats.byOp[s.op].c++;
      const fb = document.getElementById("studyFeedback");
      fb.hidden = false;
      fb.className = "feedback " + (isCorrect ? "correct" : "wrong");
      if (isCorrect)
        fb.innerHTML = `<strong>✓ Correct!</strong> <span class="feedback-detail">Streak: ${s.streak}</span>`;
      else
        fb.innerHTML = `<strong>✗</strong> <span class="feedback-detail">Answer: ${MathEngine.formatBigInt(q.answer)}</span>`;
      document.getElementById("studyActions").hidden = false;
      this.updateStats();
      Storage.save();
      if (State.stats.settings.autoNext && isCorrect) {
        setTimeout(() => this.nextQuestion(), 700);
      }
    },

    skip() {
      const s = this.session;
      if (!s) return;
      s.total++;
      State.stats.totalQuestions++;
      s.streak = 0;
      this.nextQuestion();
    },

    updateStats() {
      const s = this.session;
      if (!s) return;
      document.getElementById("studyLiveCorrect").textContent =
        `${s.correct}/${s.total}`;
      document.getElementById("studyLiveStreak").textContent = s.streak;
      document.getElementById("studyProgressText").textContent =
        `${s.total} / ${s.target}`;
      document.getElementById("studyProgressFill").style.width =
        (s.total / s.target) * 100 + "%";
    },

    endDrill() {
      const s = this.session;
      if (!s) return;
      const acc = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
      const record = {
        id: Date.now(),
        date: s.startTime,
        op: "study-" + s.module,
        mode: "study",
        count: s.total,
        correct: s.correct,
        accuracy: acc,
        timeSec: Math.round((Date.now() - s.startTime) / 1000),
        avgMs: 0,
        fastestMs: 0,
        slowestMs: 0,
        difficulty: 5,
        perMin: 0,
        mistakes: s.total - s.correct,
      };
      State.stats.sessions.unshift(record);
      if (State.stats.sessions.length > 200)
        State.stats.sessions = State.stats.sessions.slice(0, 200);
      SessionManager.updateStreak();
      const today = new Date().toISOString().slice(0, 10);
      if (!State.stats.daily[today])
        State.stats.daily[today] = { c: 0, t: 0, ms: 0 };
      State.stats.daily[today].c += s.correct;
      State.stats.daily[today].t += s.total;
      State.stats.daily[today].ms += Date.now() - s.startTime;
      Storage.save();
      Sound.complete();
      this.session = null;
      document.getElementById("studyActiveCard").hidden = true;
      document
        .getElementById("studyGrid")
        .parentElement.querySelector(".section-desc").hidden = false;
      UI.toast(
        `Study drill complete: ${acc}% (${s.correct}/${s.total})`,
        acc >= 70 ? "success" : "warn",
      );
      UI.renderDashboard();
      SidebarControl.exitFocusMode();
    },

    quit() {
      this.session = null;
      document.getElementById("studyActiveCard").hidden = true;
      document
        .getElementById("studyGrid")
        .parentElement.querySelector(".section-desc").hidden = false;
      SidebarControl.exitFocusMode();
    },

    renderGrid() {
      const grid = document.getElementById("studyGrid");
      if (!grid) return;
      grid.innerHTML = "";

      // Group modules by category for clearer organization.
      const categories = [
        {
          id: "arithmetic",
          label: "Arithmetic",
          match: [
            "squares",
            "cubes",
            "sqrt",
            "cbrt",
            "pow2",
            "pow10",
            "factorial",
            "primes",
            "mult-tables",
          ],
        },
        {
          id: "algebra",
          label: "Algebra",
          match: [
            "algebra-identities",
            "quadratic",
            "linear-eq",
            "log-rules",
            "series",
          ],
        },
        {
          id: "trigonometry",
          label: "Trigonometry",
          match: ["trig-special", "trig-identities", "trig-values"],
        },
        {
          id: "geometry",
          label: "Geometry",
          match: ["geo-area", "geo-volume", "pythagoras", "geo-perimeter"],
        },
        {
          id: "calculus",
          label: "Calculus",
          match: ["derivatives", "deriv-trig", "integrals", "integral-rules"],
        },
      ];

      categories.forEach((cat) => {
        const modules = STUDY_MODULES.filter((m) => cat.match.includes(m.id));
        if (modules.length === 0) return;
        // Section header
        const header = document.createElement("div");
        header.className = "study-section-header";
        header.innerHTML = `<span class="study-section-title">${cat.label}</span><span class="study-section-line"></span>`;
        grid.appendChild(header);
        // Cards
        modules.forEach((m) => {
          const card = document.createElement("button");
          card.className = "study-card";
          const count = m.range[1] - m.range[0] + 1;
          card.innerHTML = `<span class="sc-tag">${count} ${count === 1 ? "formula" : "facts"}</span><span class="sc-icon">${m.icon}</span><div class="sc-name">${m.name}</div><div class="sc-desc">${m.desc}</div>`;
          card.addEventListener("click", () => this.startModule(m.id));
          grid.appendChild(card);
        });
      });
    },
  };

  /* ============== TARGETED PRACTICE ============== */
  const TargetedPractice = {
    numbers: [],
    ops: new Set(["addition", "subtraction", "multiplication"]),
    companionDigits: 2,
    session: null,

    init() {
      this.bindControls();
    },

    bindControls() {
      const input = document.getElementById("targetNumbersInput");
      const preview = document.getElementById("targetedPreview");
      if (input) {
        input.addEventListener("input", () => this.parseInput());
      }
      // Operation chips
      document.querySelectorAll("#targetedOps .chip").forEach((c) => {
        c.addEventListener("click", () => {
          const op = c.dataset.tOp;
          if (this.ops.has(op)) {
            if (this.ops.size > 1) {
              this.ops.delete(op);
              c.classList.remove("active");
            }
          } else {
            this.ops.add(op);
            c.classList.add("active");
          }
        });
      });
      // Companion digit chips
      document
        .querySelectorAll("#targetedCompanionDigits .chip")
        .forEach((c) => {
          c.addEventListener("click", () => {
            document
              .querySelectorAll("#targetedCompanionDigits .chip")
              .forEach((x) => x.classList.remove("active"));
            c.classList.add("active");
            this.companionDigits = parseInt(c.dataset.cd);
          });
        });
      // Timer chips
      document.querySelectorAll("#targetedTimerGrid .chip").forEach((c) => {
        c.addEventListener("click", () => {
          document
            .querySelectorAll("#targetedTimerGrid .chip")
            .forEach((x) => x.classList.remove("active"));
          c.classList.add("active");
        });
      });
      // Range slider
      const qr = document.getElementById("targetedQuestionsRange"),
        qi = document.getElementById("targetedQuestionsInput");
      const sync = (v) => {
        v = Math.max(5, Math.min(200, parseInt(v) || 5));
        qr.value = v;
        qi.value = v;
      };
      qr.addEventListener("input", () => sync(qr.value));
      qi.addEventListener("input", () => sync(qi.value));

      // Submit / skip / next / quit
      document
        .getElementById("startTargetedBtn")
        .addEventListener("click", () => this.start());
      document
        .getElementById("targetedSubmitBtn")
        .addEventListener("click", () => this.submit());
      document
        .getElementById("targetedAnswerInput")
        .addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            this.submit();
          }
        });
      document
        .getElementById("targetedSkipBtn")
        .addEventListener("click", () => this.skip());
      document
        .getElementById("targetedNextBtn")
        .addEventListener("click", () => this.nextQuestion());
      document
        .getElementById("targetedQuitBtn")
        .addEventListener("click", () => this.quit());
    },

    parseInput() {
      const raw = document.getElementById("targetNumbersInput").value;
      const parts = raw
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      this.numbers = [];
      const preview = document.getElementById("targetedPreview");
      const chips = [];
      for (const p of parts) {
        // Accept negative numbers
        const cleaned = p.replace(/−/g, "-");
        if (/^-?\d+$/.test(cleaned)) {
          try {
            const n = BigInt(cleaned);
            this.numbers.push(n);
            chips.push(
              `<span class="target-chip">${MathEngine.formatBigInt(n)}<span class="tc-remove" data-num="${cleaned}">×</span></span>`,
            );
          } catch {}
        }
      }
      if (chips.length === 0) {
        preview.innerHTML =
          '<span class="hint">Numbers you enter will appear as chips here…</span>';
      } else {
        preview.innerHTML = chips.join("");
        preview.querySelectorAll(".tc-remove").forEach((r) =>
          r.addEventListener("click", (e) => {
            const num = e.target.dataset.num;
            const cur = document.getElementById("targetNumbersInput").value;
            const updated = cur
              .split(/[,\s]+/)
              .filter((x) => x !== num)
              .join(", ");
            document.getElementById("targetNumbersInput").value = updated;
            this.parseInput();
          }),
        );
      }
    },

    start() {
      if (this.numbers.length === 0) {
        UI.toast("Type at least one number to target", "warn");
        document.getElementById("targetNumbersInput").focus();
        return;
      }
      if (this.ops.size === 0) {
        UI.toast("Select at least one operation", "warn");
        return;
      }
      const total =
        parseInt(document.getElementById("targetedQuestionsInput").value) || 30;
      const timerActive = document.querySelector(
        "#targetedTimerGrid .chip.active",
      );
      const timer = timerActive ? parseInt(timerActive.dataset.tTimer) : 0;
      const role = document.getElementById("targetedRole").value;
      const exactDiv = document.getElementById("targetedExactDiv").checked;
      const allowNeg = document.getElementById("targetedAllowNeg").checked;
      const focusMode = document.getElementById("targetedFocusMode").checked;

      this.session = {
        numbers: [...this.numbers],
        ops: [...this.ops],
        companionDigits: this.companionDigits,
        role,
        exactDiv,
        allowNeg,
        total,
        timer,
        current: 0,
        correct: 0,
        startTime: Date.now(),
        questionStart: 0,
        times: [],
        questions: [],
        mistakes: [],
        ended: false,
      };
      document.getElementById("targetedActiveCard").hidden = false;
      if (focusMode) SidebarControl.enterFocusModeIfAuto();
      this.nextQuestion();
      if (timer > 0) this.startTimer();
    },

    startTimer() {
      const s = this.session;
      Timer.stopAll();
      const update = () => {
        if (!s || s.ended) return;
        const elapsed = Math.floor((Date.now() - s.startTime) / 1000);
        const left = s.timer - elapsed;
        document.getElementById("targetedLiveTimer").textContent =
          UI.formatTime(left);
        if (left <= 0) {
          this.end("timeout");
          return;
        }
      };
      update();
      Timer.start(update, 250);
    },

    nextQuestion() {
      const s = this.session;
      if (!s) return;
      if (s.current >= s.total) {
        this.end("complete");
        return;
      }
      s.questionStart = Date.now();
      s.current++;
      const q = this.generateQuestion();
      s.questions.push(q);
      document.getElementById("targetedQuestionText").textContent =
        q.display + " = ?";
      document.getElementById("targetedAnswerInput").value = "";
      document.getElementById("targetedFeedback").hidden = true;
      document.getElementById("targetedActions").hidden = true;
      setTimeout(
        () => document.getElementById("targetedAnswerInput").focus(),
        30,
      );
      document.getElementById("targetedProgressText").textContent =
        `${s.current} / ${s.total}`;
      document.getElementById("targetedProgressFill").style.width =
        (s.current / s.total) * 100 + "%";
    },

    generateQuestion() {
      const s = this.session;
      const targetNum = s.numbers[MathEngine.randInt(0, s.numbers.length - 1)];
      let op = s.ops[MathEngine.randInt(0, s.ops.length - 1)];
      if (op === "mixed")
        op = ["addition", "subtraction", "multiplication", "division"][
          MathEngine.randInt(0, 3)
        ];

      // Generate companion number
      const companionDigits = s.companionDigits;
      let companion = MathEngine.generateNumber({
        digits: companionDigits,
        allowNeg: s.allowNeg,
        negPct: s.allowNeg ? 30 : 0,
      });
      if (companion === 0n && (op === "division" || op === "multiplication"))
        companion = BigInt(MathEngine.randInt(1, 9));

      // Decide role: which one is the user's number?
      const useFirst =
        s.role === "first"
          ? true
          : s.role === "second"
            ? false
            : Math.random() < 0.5;
      let a, b;
      if (useFirst) {
        a = targetNum;
        b = companion;
      } else {
        a = companion;
        b = targetNum;
      }

      // For exact division: if target is divisor, may need to regenerate dividend
      if (op === "division" && s.exactDiv) {
        // Regenerate dividend so it's divisible
        if (Math.abs(Number(b)) > 0) {
          // pick quotient
          const q = BigInt(
            MathEngine.randInt(
              1,
              Math.min(9999, Math.max(2, Number(Math.abs(b)) * 10)),
            ),
          );
          a = b * q;
        }
      }
      if (op === "division" && b === 0n) b = BigInt(MathEngine.randInt(1, 9));

      const answer = MathEngine.applyOp(a, b, op);
      if (answer === null) {
        // fallback
        return this.generateQuestion();
      }
      const sym = Generator.opSym(op);
      const display = `${MathEngine.formatBigInt(a)} ${sym} ${MathEngine.formatBigInt(b)}`;
      return { op, a, b, answer, display };
    },

    submit() {
      const s = this.session;
      if (!s) return;
      const q = s.questions[s.questions.length - 1];
      const val = document.getElementById("targetedAnswerInput").value.trim();
      const parsed = MathEngine.parseAnswer(val);
      if (parsed === null) {
        UI.toast("Enter a valid number", "warn");
        return;
      }
      const isCorrect = MathEngine.answersEqual(parsed, q.answer);
      const elapsed = Date.now() - s.questionStart;
      s.times.push(elapsed);
      if (isCorrect) {
        s.correct++;
        Sound.correct();
      } else {
        Sound.wrong();
        s.mistakes.push({
          id: Date.now(),
          date: Date.now(),
          op: q.op,
          question: q.display,
          yourAnswer: val,
          correctAnswer: String(q.answer),
          timeMs: elapsed,
          digits: s.companionDigits,
          format: "standard",
          difficulty: 5,
          category: "Targeted digit practice",
        });
        State.stats.mistakes.push(...s.mistakes);
        if (State.stats.mistakes.length > 500)
          State.stats.mistakes = State.stats.mistakes.slice(-500);
      }
      Adaptive.record(
        q.op,
        Math.max(String(q.a).length, String(q.b).length),
        isCorrect,
      );
      State.stats.totalQuestions++;
      if (isCorrect) State.stats.totalCorrect++;
      const fb = document.getElementById("targetedFeedback");
      fb.hidden = false;
      fb.className = "feedback " + (isCorrect ? "correct" : "wrong");
      if (isCorrect)
        fb.innerHTML = `<strong>✓ Correct!</strong> <span class="feedback-detail">${(elapsed / 1000).toFixed(1)}s</span>`;
      else
        fb.innerHTML = `<strong>✗</strong> <span class="feedback-detail">Answer: ${MathEngine.formatBigInt(q.answer)}</span>`;
      document.getElementById("targetedActions").hidden = false;
      document.getElementById("targetedLiveScore").textContent = s.correct;
      document.getElementById("targetedLiveCorrect").textContent =
        `${s.correct}/${s.current}`;
      Storage.save();
      if (State.stats.settings.autoNext && isCorrect) {
        setTimeout(() => this.nextQuestion(), 700);
      }
    },

    skip() {
      const s = this.session;
      if (!s) return;
      s.current++;
      State.stats.totalQuestions++;
      this.nextQuestion();
    },

    end(reason) {
      const s = this.session;
      if (!s || s.ended) return;
      s.ended = true;
      Timer.stopAll();
      const acc = s.current > 0 ? Math.round((s.correct / s.current) * 100) : 0;
      const record = {
        id: Date.now(),
        date: s.startTime,
        op: "targeted",
        mode: "targeted",
        count: s.current,
        correct: s.correct,
        accuracy: acc,
        timeSec: Math.round((Date.now() - s.startTime) / 1000),
        avgMs: s.times.length
          ? Math.round(s.times.reduce((a, b) => a + b, 0) / s.times.length)
          : 0,
        fastestMs: s.times.length ? Math.round(Math.min(...s.times)) : 0,
        slowestMs: s.times.length ? Math.round(Math.max(...s.times)) : 0,
        difficulty: 5,
        perMin: 0,
        mistakes: s.mistakes.length,
      };
      State.stats.sessions.unshift(record);
      if (State.stats.sessions.length > 200)
        State.stats.sessions = State.stats.sessions.slice(0, 200);
      SessionManager.updateStreak();
      const today = new Date().toISOString().slice(0, 10);
      if (!State.stats.daily[today])
        State.stats.daily[today] = { c: 0, t: 0, ms: 0 };
      State.stats.daily[today].c += s.correct;
      State.stats.daily[today].t += s.current;
      State.stats.daily[today].ms += Date.now() - s.startTime;
      Storage.save();
      Sound.complete();
      SidebarControl.exitFocusMode();
      document.getElementById("targetedActiveCard").hidden = true;
      UI.toast(
        `Targeted practice complete: ${acc}% (${s.correct}/${s.current})`,
        acc >= 70 ? "success" : "warn",
      );
      this.session = null;
      UI.renderDashboard();
    },

    quit() {
      if (this.session) this.end("quit");
      SidebarControl.exitFocusMode();
      document.getElementById("targetedActiveCard").hidden = true;
    },
  };

  /* ============== AD MANAGER (Google AdSense integration) ==============
   Shows ads in 3 locations as requested:
   1. After completing each practice set (in results screen)
   2. Every 15 minutes (periodic auto-refresh)
   3. When closing/leaving the app (beforeunload)

   To enable real ads: replace AD_CLIENT_ID with your AdSense publisher ID
   (ca-pub-XXXXXXXXXXXXXXXX) and uncomment the ins.adsbygoogle blocks.
   Until then, a styled placeholder is shown so the layout is correct.
=================================================================== */
  const AdManager = {
    // Replace with your AdSense publisher ID, e.g. 'ca-pub-1234567890123456'
    AD_CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX",
    AD_SLOT: "1234567890",
    REFRESH_MS: 15 * 60 * 1000, // 15 minutes
    enabled: true,
    refreshTimer: null,
    lastShownAt: 0,

    init() {
      if (!this.enabled) return;
      // Load AdSense script (only if real publisher ID is set)
      if (this.AD_CLIENT_ID && !this.AD_CLIENT_ID.includes("XXXX")) {
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.AD_CLIENT_ID}`;
        s.crossOrigin = "anonymous";
        document.head.appendChild(s);
      }
      // Start 15-minute auto-refresh timer
      this.refreshTimer = setInterval(
        () => this.showPeriodicAd(),
        this.REFRESH_MS,
      );
      // Show ad when user closes the app/tab
      window.addEventListener("beforeunload", () => this.showOnCloseAd());
      // Show ad when user switches away (visibilitychange — most reliable "closing" signal)
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") this.showOnCloseAd();
      });
    },

    // Render a styled ad placeholder (or real AdSense ins if configured)
    renderAdHTML(label) {
      if (this.AD_CLIENT_ID && !this.AD_CLIENT_ID.includes("XXXX")) {
        // Real AdSense ad unit
        return `<ins class="adsbygoogle" style="display:block"
        data-ad-client="${this.AD_CLIENT_ID}"
        data-ad-slot="${this.AD_SLOT}"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`;
      }
      // Styled placeholder (replace with real ads in production)
      return `<div class="ad-placeholder">
      <div class="ad-placeholder-label">Advertisement</div>
      <div class="ad-placeholder-content">
        <span class="ad-icon">📢</span>
        <div>
          <strong>${label}</strong>
          <p>Your Google AdSense ad appears here. Configure your publisher ID in <code>app.js → AdManager.AD_CLIENT_ID</code> to enable live ads.</p>
        </div>
      </div>
    </div>`;
    },

    // 1. Show ad after practice session completes
    showAfterSessionAd() {
      if (!this.enabled) return;
      const container = document.getElementById("sessionAdSlot");
      if (!container) return;
      container.innerHTML = this.renderAdHTML(
        "Practice complete — sponsored break",
      );
      container.hidden = false;
      this.lastShownAt = Date.now();
      this.tryRefreshAdsense(container);
    },

    // 2. Show ad every 15 minutes (periodic)
    showPeriodicAd() {
      if (!this.enabled) return;
      // Only show if user is actively practicing or has been active
      if (State.stats.totalQuestions === 0) return;
      this.toast("Sponsored break — your 15-min refresh");
      const container = document.getElementById("periodicAdSlot");
      if (container) {
        container.innerHTML =
          this.renderAdHTML("Periodic ad — every 15 min") +
          '<span class="ad-close" title="Dismiss" onclick="this.parentElement.hidden=true">×</span>';
        container.hidden = false;
        this.tryRefreshAdsense(container);
      }
      this.lastShownAt = Date.now();
    },

    // 3. Show ad when closing the app (uses beforeunload / visibilitychange)
    showOnCloseAd() {
      if (!this.enabled) return;
      // Throttle: don't show more than once per 30s
      if (Date.now() - this.lastShownAt < 30000) return;
      // Try to open a small "closing" ad in a new window (only reliable way to show on exit)
      // This is intentionally subtle and only fires when a real AdSense ID is configured.
      if (this.AD_CLIENT_ID && !this.AD_CLIENT_ID.includes("XXXX")) {
        try {
          const adWin = window.open("", "_blank", "width=600,height=400");
          if (adWin) {
            adWin.document
              .write(`<!doctype html><meta charset="utf-8"><title>MathLab — Sponsored</title>
            <style>body{margin:0;font-family:Inter,sans-serif;background:#0a0e1f;color:#f5f6fa;text-align:center;padding:40px}
            h1{font-size:20px}a{color:#4f7cff}</style>
            <h1>Thank you for using MathLab</h1>
            <p>Created by Koushik Koley</p>
            <div style="margin:24px auto;max-width:480px">
              <ins class="adsbygoogle" style="display:block" data-ad-client="${this.AD_CLIENT_ID}" data-ad-slot="${this.AD_SLOT}" data-ad-format="auto" data-full-width-responsive="true"></ins>
            </div>
            <p><a href="javascript:window.close()">Close</a></p>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`);
            adWin.document.close();
          }
        } catch (e) {
          /* popup blocked — silently ignore */
        }
      }
      this.lastShownAt = Date.now();
    },

    tryRefreshAdsense(container) {
      // Trigger AdSense to display the new ad
      try {
        const ads = container.querySelectorAll("ins.adsbygoogle");
        ads.forEach(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {}
        });
      } catch (e) {}
    },

    toast(msg) {
      if (typeof UI !== "undefined" && UI.toast) UI.toast(msg, "info");
    },
  };

  /* ============== MOBILE NUMBER PAD ============== */
  const NumberPad = {
    init() {
      this.render();
      this.bind();
      this.updateVisibility();
      window.addEventListener("resize", () => this.updateVisibility());
    },
    render() {
      // Create the number pad once and append to body
      if (document.getElementById("numberPad")) return;
      const pad = document.createElement("div");
      pad.id = "numberPad";
      pad.className = "number-pad";
      pad.setAttribute("role", "dialog");
      pad.setAttribute("aria-label", "Number pad");
      pad.innerHTML = `
      <div class="np-row">
        <button class="np-key" data-np="7">7</button>
        <button class="np-key" data-np="8">8</button>
        <button class="np-key" data-np="9">9</button>
        <button class="np-key np-key-action" data-np="back" title="Backspace">⌫</button>
      </div>
      <div class="np-row">
        <button class="np-key" data-np="4">4</button>
        <button class="np-key" data-np="5">5</button>
        <button class="np-key" data-np="6">6</button>
        <button class="np-key np-key-action" data-np="submit" title="Submit">✓</button>
      </div>
      <div class="np-row">
        <button class="np-key" data-np="1">1</button>
        <button class="np-key" data-np="2">2</button>
        <button class="np-key" data-np="3">3</button>
        <button class="np-key np-key-action" data-np="neg" title="Toggle sign">±</button>
      </div>
      <div class="np-row">
        <button class="np-key np-key-wide" data-np="0">0</button>
        <button class="np-key" data-np=".">.</button>
        <button class="np-key" data-np="R" title="Remainder (for division)">R</button>
      </div>
    `;
      document.body.appendChild(pad);
    },
    bind() {
      document.querySelectorAll(".np-key").forEach((k) => {
        k.addEventListener("click", () => this.handleKey(k.dataset.np));
      });
    },
    handleKey(key) {
      // Find the currently focused answer input
      let input = document.activeElement;
      if (!input || !input.classList.contains("answer-input")) {
        // Fallback: try the visible answer input on the active route
        input =
          document.querySelector(
            ".practice-active:not([hidden]) .answer-input",
          ) ||
          document.querySelector(".study-active:not([hidden]) .answer-input") ||
          document.querySelector(
            ".targeted-active:not([hidden]) .answer-input",
          ) ||
          document.querySelector(".mental-answer .answer-input");
      }
      if (!input) return;
      if (key === "back") {
        input.value = input.value.slice(0, -1);
      } else if (key === "submit") {
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        const btn = input.parentElement?.querySelector(".btn-primary");
        if (btn) btn.click();
      } else if (key === "neg") {
        if (input.value.startsWith("-")) input.value = input.value.slice(1);
        else input.value = "-" + input.value;
      } else {
        input.value += key;
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    },
    updateVisibility() {
      const pad = document.getElementById("numberPad");
      if (!pad) return;
      // Show on touch devices when an answer input is on screen
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const hasActiveInput = !!document.querySelector(
        ".practice-active:not([hidden]) .answer-input, .study-active:not([hidden]) .answer-input, .targeted-active:not([hidden]) .answer-input, .mental-answer:not([hidden]) input",
      );
      pad.style.display = isTouch && hasActiveInput ? "grid" : "none";
    },
  };

  /* ============== HINT SYSTEM ============== */
  const HintSystem = {
    showHint() {
      const s = State.session;
      let hint = null;
      if (s) {
        const q = s.questions[s.questions.length - 1];
        if (q && q.hint) hint = q.hint;
        else if (q && q.op) hint = this.defaultHint(q);
      } else {
        // mental / study / targeted sessions
        const ts = State.mentalSession;
        if (ts) {
          const q = ts.questions[ts.questions.length - 1];
          if (q)
            hint =
              "Think about the patterns: powers of 10, complements, or doubling.";
        }
        const ss = Study.session;
        if (ss) {
          const q = ss.questions[ss.questions.length - 1];
          if (q && q.output)
            hint =
              "Try to recall the formula, then reveal the answer to check.";
        }
        const tps = TargetedPractice.session;
        if (tps) {
          const q = tps.questions[tps.questions.length - 1];
          if (q)
            hint =
              "These are your weak numbers — slow down and verify each step.";
        }
      }
      if (hint) UI.toast("💡 Hint: " + hint, "info");
      else UI.toast("No hint available for this question", "warn");
    },
    defaultHint(q) {
      const op = q.op;
      const hints = {
        addition: "Add the rightmost digits first, carry over if sum ≥ 10.",
        subtraction:
          "Subtract right to left. Borrow 1 from the next column if needed.",
        multiplication:
          "Use partial products. Break the bigger number into tens + ones.",
        division:
          "Estimate first, then refine. Multiply back to check your answer.",
        square: "n² = n × n. Memorize small squares (1–15) for speed.",
        cube: "n³ = n × n × n.",
        sqrt: "Find the number that, when squared, gives the radicand.",
        power: "a^b means a multiplied by itself b times.",
        factorial: "n! = n × (n-1) × (n-2) × ... × 1.",
        percent: "x% of y = (x × y) / 100. Find 10% first, then multiply.",
        modulo: "a mod b is the remainder when a is divided by b.",
        gcd: "GCD = largest number that divides both. Use the Euclidean algorithm.",
        lcm: "LCM × GCD = a × b. Find GCD first, then divide the product by it.",
        mixed: "Apply order of operations: parentheses, × ÷, then + −.",
      };
      return hints[op] || "Break the problem into smaller steps.";
    },
  };

  /* ============== XP / LEVELING SYSTEM ============== */
  const XPSystem = {
    // XP per correct answer scales with difficulty
    awardXP(correctCount, difficulty, totalMs) {
      let xp = correctCount * 10;
      xp += Math.round(difficulty * 5 * correctCount);
      // speed bonus: +2 XP per question under 5 sec
      if (totalMs && totalMs > 0) {
        const avgMs = totalMs / correctCount;
        if (avgMs < 5000) xp += correctCount * 2;
      }
      if (!State.stats.xp) State.stats.xp = 0;
      if (!State.stats.level) State.stats.level = 1;
      State.stats.xp += xp;
      const newLevel = this.levelFor(State.stats.xp);
      if (newLevel > State.stats.level) {
        State.stats.level = newLevel;
        UI.toast(`🎉 Level up! You reached Level ${newLevel}`, "success");
      }
      Storage.save();
      return xp;
    },
    levelFor(xp) {
      // Each level requires 250 * level XP (cumulative)
      // Level 1: 0, Level 2: 250, Level 3: 750, Level 4: 1500, etc.
      let level = 1,
        need = 250,
        total = 0;
      while (xp >= total + need) {
        total += need;
        level++;
        need = 250 * level;
      }
      return level;
    },
    xpForNextLevel() {
      const lvl = State.stats.level || 1;
      let total = 0,
        need = 250;
      for (let i = 1; i < lvl; i++) {
        total += need;
        need = 250 * (i + 1);
      }
      const nextThreshold = total + need;
      return { current: State.stats.xp - total, needed: need, nextThreshold };
    },
    renderBar() {
      const el = document.getElementById("xpBar");
      if (!el) return;
      const { current, needed } = this.xpForNextLevel();
      const pct = Math.min(100, (current / needed) * 100);
      el.innerHTML = `
      <div class="xp-info">
        <span class="xp-level">Lvl ${State.stats.level || 1}</span>
        <span class="xp-text">${State.stats.xp || 0} XP</span>
      </div>
      <div class="xp-track"><div class="xp-fill" style="width:${pct}%"></div></div>
      <div class="xp-progress">${current} / ${needed} XP to next level</div>
    `;
    },
  };

  /* ============== DAILY GOAL TRACKER ============== */
  const DailyGoal = {
    init() {
      this.render();
      document
        .getElementById("setDailyGoalBtn")
        ?.addEventListener("click", () => this.setGoal());
    },
    getTodayKey() {
      return new Date().toISOString().slice(0, 10);
    },
    getGoal() {
      return State.stats.dailyGoal || 20;
    },
    getTodayCount() {
      const today = this.getTodayKey();
      return State.stats.daily?.[today]?.t || 0;
    },
    setGoal() {
      const input = prompt(
        "Set your daily question goal (5–500):",
        this.getGoal(),
      );
      if (input === null) return;
      const n = Math.max(5, Math.min(500, parseInt(input) || 20));
      State.stats.dailyGoal = n;
      Storage.save();
      this.render();
      UI.toast(`Daily goal set to ${n} questions`, "success");
    },
    render() {
      const card = document.getElementById("dailyGoalCard");
      if (!card) return;
      const goal = this.getGoal();
      const today = this.getTodayCount();
      const pct = Math.min(100, (today / goal) * 100);
      const done = today >= goal;
      card.innerHTML = `
      <div class="card-header">
        <h3>Daily Goal</h3>
        <button class="btn btn-ghost btn-sm" id="setDailyGoalBtn">Set goal</button>
      </div>
      <div class="daily-goal-progress">
        <div class="dg-circle ${done ? "done" : ""}" style="--dg-pct: ${pct}%">
          <span class="dg-count">${today}</span>
          <span class="dg-target">/ ${goal}</span>
        </div>
        <div class="dg-bar">
          <div class="dg-fill" style="width:${pct}%"></div>
        </div>
        <div class="dg-label">${done ? "🎉 Goal reached! Great work." : `${goal - today} more to reach your goal`}</div>
      </div>
    `;
      document
        .getElementById("setDailyGoalBtn")
        ?.addEventListener("click", () => this.setGoal());
    },
  };

  /* ============== BOOKMARK MANAGER ============== */
  const BookmarkManager = {
    add(question, answer) {
      if (!State.stats.bookmarks) State.stats.bookmarks = [];
      State.stats.bookmarks.unshift({
        id: Date.now(),
        question,
        answer,
        date: Date.now(),
      });
      if (State.stats.bookmarks.length > 200)
        State.stats.bookmarks = State.stats.bookmarks.slice(0, 200);
      Storage.save();
    },
    remove(id) {
      if (!State.stats.bookmarks) return;
      State.stats.bookmarks = State.stats.bookmarks.filter((b) => b.id !== id);
      Storage.save();
    },
    toggle(question, answer) {
      if (!State.stats.bookmarks) State.stats.bookmarks = [];
      const existing = State.stats.bookmarks.find(
        (b) => b.question === question,
      );
      if (existing) {
        this.remove(existing.id);
        return false;
      } else {
        this.add(question, answer);
        return true;
      }
    },
  };

  /* ============== TTS (Text-to-Speech) ============== */
  const TTS = {
    speak(text) {
      if (!State.stats.settings.tts) return;
      if (!("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.95;
        u.pitch = 1;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    },
    speakQuestion(text) {
      // Clean up math notation for speech
      const clean = text
        .replace(/²/g, " squared")
        .replace(/³/g, " cubed")
        .replace(/√/g, " square root of ")
        .replace(/∛/g, " cube root of ")
        .replace(/×/g, " times ")
        .replace(/÷/g, " divided by ")
        .replace(/\+/g, " plus ")
        .replace(/−/g, " minus ")
        .replace(/=/g, " equals ")
        .replace(/\?/g, "");
      this.speak(clean);
    },
  };

  /* ============== CERTIFICATE GENERATOR ============== */
  const Certificate = {
    generate(record) {
      const win = window.open("", "_blank", "width=800,height=600");
      if (!win) {
        UI.toast("Please allow popups to view certificate", "warn");
        return;
      }
      const date = new Date().toLocaleDateString();
      const name = State.stats.settings.name || "Student";
      win.document
        .write(`<!doctype html><meta charset="utf-8"><title>MathLab Certificate — ${name}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
      body { margin:0; padding:40px; font-family:Inter,sans-serif; background:linear-gradient(135deg,#0a0e1f,#1a1f3a); color:#0f172a; }
      .cert { max-width:720px; margin:0 auto; background:#fff; padding:60px 50px; border:2px solid #4f7cff; border-radius:16px; box-shadow:0 20px 50px rgba(0,0,0,.3); position:relative; }
      .cert::before { content:''; position:absolute; inset:8px; border:1px dashed #a855f7; border-radius:10px; pointer-events:none; }
      .brand { font-size:42px; font-family:'Playfair Display',serif; font-weight:900; background:linear-gradient(135deg,#4f7cff,#a855f7); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:8px; }
      .title { font-size:32px; font-weight:800; margin:24px 0 8px; letter-spacing:-.02em; }
      .subtitle { color:#64748b; font-size:14px; text-transform:uppercase; letter-spacing:.08em; margin-bottom:32px; }
      .name { font-size:42px; font-weight:800; color:#0f172a; margin:24px 0; text-align:center; }
      .body { color:#475569; line-height:1.7; font-size:15px; text-align:center; margin:24px 0 32px; }
      .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin:32px 0; padding:24px; background:linear-gradient(135deg,#f0f4ff,#faf5ff); border-radius:12px; }
      .stat { text-align:center; }
      .stat-value { font-size:28px; font-weight:800; color:#4f7cff; }
      .stat-label { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:.04em; margin-top:4px; }
      .sign { display:flex; justify-content:space-between; align-items:flex-end; margin-top:48px; padding-top:24px; border-top:2px solid #e2e8f0; }
      .sign-block { text-align:center; }
      .sign-name { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#0f172a; }
      .sign-title { font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:.04em; }
      .date { font-size:13px; color:#475569; }
      .seal { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,#4f7cff,#a855f7); display:flex; align-items:center; justify-content:center; color:#fff; font-size:36px; font-weight:700; }
    </style>
    <div class="cert">
      <div class="brand">∑ MathLab</div>
      <div class="subtitle">Certificate of Achievement</div>
      <div class="title">This certifies that</div>
      <div class="name">${name}</div>
      <div class="body">has successfully completed a math practice session with distinction,<br>demonstrating proficiency in mathematical operations and mental calculation.</div>
      <div class="stats">
        <div class="stat"><div class="stat-value">${record.count}</div><div class="stat-label">Questions</div></div>
        <div class="stat"><div class="stat-value">${record.accuracy}%</div><div class="stat-label">Accuracy</div></div>
        <div class="stat"><div class="stat-value">${record.difficulty}/10</div><div class="stat-label">Difficulty</div></div>
      </div>
      <div class="sign">
        <div class="sign-block"><div class="sign-name">Koushik Koley</div><div class="sign-title">Creator, MathLab</div></div>
        <div class="seal">∑</div>
        <div class="sign-block"><div class="date">${date}</div><div class="sign-title">Date</div></div>
      </div>
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},500);}</script>`);
      win.document.close();
    },
  };

  /* ============== MATH GLOSSARY ============== */
  const GLOSSARY = [
    {
      term: "Integer",
      def: "A whole number (positive, negative, or zero). Examples: -3, 0, 7.",
    },
    {
      term: "Prime number",
      def: "A number greater than 1 with only two divisors: 1 and itself. Examples: 2, 3, 5, 7, 11.",
    },
    {
      term: "Factorial (n!)",
      def: "The product of all positive integers up to n. 5! = 5×4×3×2×1 = 120. By convention, 0! = 1.",
    },
    {
      term: "GCD (Greatest Common Divisor)",
      def: "The largest number that divides two numbers evenly. GCD of 12 and 18 is 6.",
    },
    {
      term: "LCM (Least Common Multiple)",
      def: "The smallest number that is a multiple of two numbers. LCM of 4 and 6 is 12.",
    },
    {
      term: "Modulo (mod)",
      def: "The remainder after division. 17 mod 5 = 2 because 17 ÷ 5 = 3 remainder 2.",
    },
    { term: "Square (n²)", def: "A number multiplied by itself. 5² = 25." },
    {
      term: "Square root (√)",
      def: "The inverse of squaring. √25 = 5 because 5² = 25.",
    },
    { term: "Cube (n³)", def: "A number multiplied by itself twice. 3³ = 27." },
    { term: "Cube root (∛)", def: "The inverse of cubing. ∛27 = 3." },
    {
      term: "Exponent / Power",
      def: "How many times to multiply a base by itself. 2⁴ = 2×2×2×2 = 16.",
    },
    {
      term: "Percent (%)",
      def: "Out of 100. 25% of 80 = (25 × 80) / 100 = 20.",
    },
    {
      term: "Sine (sin)",
      def: "Trig ratio: opposite / hypotenuse in a right triangle. sin 30° = 0.5.",
    },
    {
      term: "Cosine (cos)",
      def: "Trig ratio: adjacent / hypotenuse. cos 60° = 0.5.",
    },
    {
      term: "Tangent (tan)",
      def: "Trig ratio: opposite / adjacent = sin / cos. tan 45° = 1.",
    },
    {
      term: "Pythagorean theorem",
      def: "In a right triangle: a² + b² = c², where c is the hypotenuse.",
    },
    {
      term: "Linear equation",
      def: "An equation of the form ax + b = c. Solve by isolating x.",
    },
    {
      term: "Quadratic formula",
      def: "For ax² + bx + c = 0: x = (-b ± √(b²-4ac)) / 2a.",
    },
    {
      term: "Logarithm (log)",
      def: "The inverse of exponentiation. log₂(8) = 3 because 2³ = 8.",
    },
    {
      term: "Derivative (d/dx)",
      def: "The rate of change of a function. d/dx(x²) = 2x.",
    },
    {
      term: "Integral (∫)",
      def: "The area under a curve. The reverse of differentiation. ∫2x dx = x² + C.",
    },
    {
      term: "Pi (π)",
      def: "The ratio of a circle's circumference to its diameter. Approximately 3.14159.",
    },
    {
      term: "Arithmetic progression (AP)",
      def: "A sequence where each term differs by a constant. 3, 7, 11, 15 (d=4).",
    },
    {
      term: "Geometric progression (GP)",
      def: "A sequence where each term is multiplied by a constant ratio. 2, 6, 18, 54 (r=3).",
    },
    {
      term: "Equation",
      def: "A statement that two expressions are equal. 2x + 3 = 11.",
    },
    {
      term: "Variable",
      def: "A symbol (often x, y, n) representing an unknown value.",
    },
    {
      term: "Coefficient",
      def: "The number multiplying a variable. In 5x, the coefficient is 5.",
    },
    {
      term: "Constant",
      def: "A fixed number in an expression. In 3x + 7, the constant is 7.",
    },
    {
      term: "Hypotenuse",
      def: "The longest side of a right triangle, opposite the 90° angle.",
    },
    { term: "Area", def: "The 2D space inside a shape. Square units." },
    { term: "Volume", def: "The 3D space inside a solid. Cubic units." },
    { term: "Perimeter", def: "The total length around a 2D shape." },
  ];

  /* ============== BOOT ============== */
  Storage.load();
  document.addEventListener("DOMContentLoaded", () => UI.init());
  if (document.readyState !== "loading") UI.init();
})();
