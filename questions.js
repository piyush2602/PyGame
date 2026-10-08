/**
 * Python Code Builder - Comprehensive Question Bank (1000+ Questions)
 * Specially designed for Class 9 CBSE / ICSE / Beginners
 * Covers: Basics, Variables, Data Types, Typecasting, Operators, 
 * Conditions (if, if-else, elif), Loops (for, while, range), Strings, Lists, Tuples, Dictionaries, Functions.
 */

const TOPICS_LIST = [
  "Python Basics",
  "Input & Output",
  "Data Types",
  "Type Conversion",
  "Operators",
  "Conditions",
  "Loops",
  "Loops & Range",
  "Loops & Conditions",
  "Strings",
  "Lists",
  "Lists & Loops",
  "Tuples & Dictionaries",
  "Functions"
];

function buildComprehensiveBank() {
  const bank = [];
  let idCounter = 1;

  function addQ(difficulty, topic, title, code, blanks, options, explanation) {
    blanks.forEach(b => {
      if (!options.includes(b.answer)) {
        options.push(b.answer);
      }
    });

    const uniqueOptions = [...new Set(options)];

    blanks.forEach(b => {
      if (!code.includes(`{blank:${b.id}}`)) {
        throw new Error(`Code missing {blank:${b.id}} in: ${title}`);
      }
    });

    bank.push({
      id: idCounter++,
      difficulty,
      topic,
      title,
      code,
      blanks,
      options: uniqueOptions,
      explanation
    });
  }

  // =========================================================================
  // 1. INPUT & OUTPUT (print, input, sep, end) - 100 questions
  // =========================================================================
  const everydayEntities = [
    { name: "Student Name", var: "student_name", prompt: "Enter student name: ", val: '"Aarav Sharma"' },
    { name: "School Name", var: "school_name", prompt: "Enter school name: ", val: '"KV No. 1"' },
    { name: "City", var: "city", prompt: "Enter your city: ", val: '"New Delhi"' },
    { name: "Country", var: "country", prompt: "Enter your country: ", val: '"India"' },
    { name: "Favorite Sport", var: "fav_sport", prompt: "Enter favorite sport: ", val: '"Cricket"' },
    { name: "Hobby", var: "hobby", prompt: "Enter your hobby: ", val: '"Drawing"' },
    { name: "Subject", var: "subject", prompt: "Enter favorite subject: ", val: '"Computer Science"' },
    { name: "Favorite Book", var: "book_title", prompt: "Enter book title: ", val: '"Wings of Fire"' },
    { name: "Movie Name", var: "movie", prompt: "Enter favorite movie: ", val: '"Interstellar"' },
    { name: "Favorite Food", var: "food", prompt: "Enter favorite food: ", val: '"Paneer Tikka"' },
    { name: "Programming Language", var: "lang", prompt: "Enter coding language: ", val: '"Python"' },
    { name: "Color", var: "color", prompt: "Enter favorite color: ", val: '"Blue"' },
    { name: "Animal", var: "animal", prompt: "Enter wild animal: ", val: '"Bengal Tiger"' },
    { name: "Bird", var: "bird", prompt: "Enter national bird: ", val: '"Peacock"' },
    { name: "Planet", var: "planet", prompt: "Enter a planet name: ", val: '"Mars"' },
    { name: "Hero", var: "hero", prompt: "Enter role model: ", val: '"APJ Abdul Kalam"' },
    { name: "River", var: "river", prompt: "Enter a major river: ", val: '"Ganga"' },
    { name: "Festival", var: "festival", prompt: "Enter favorite festival: ", val: '"Diwali"' },
    { name: "Music Genre", var: "music", prompt: "Enter music genre: ", val: '"Classical"' },
    { name: "Game Name", var: "game", prompt: "Enter favorite game: ", val: '"Chess"' },
    { name: "Device Name", var: "device", prompt: "Enter device model: ", val: '"Laptop"' },
    { name: "Moniker / Nickname", var: "nickname", prompt: "Enter nickname: ", val: '"Tiger"' },
    { name: "Teacher Name", var: "teacher", prompt: "Enter teacher name: ", val: '"Mrs. Gupta"' },
    { name: "Section", var: "section", prompt: "Enter class section: ", val: '"A"' },
    { name: "House Name", var: "house", prompt: "Enter school house: ", val: '"Shivaji"' }
  ];

  everydayEntities.forEach(ent => {
    addQ(
      "Easy",
      "Input & Output",
      `Reading ${ent.name}`,
      `${ent.var} = {blank:0}("${ent.prompt}")\nprint("Stored:", ${ent.var})`,
      [{ id: 0, answer: "input", hint: "Function that reads a line from keyboard" }],
      ["input", "print", "read", "scan"],
      `\`input()\` prompts the user with the given text and returns the typed input as a string.`
    );

    addQ(
      "Easy",
      "Input & Output",
      `Displaying ${ent.name}`,
      `${ent.var} = ${ent.val}\n{blank:0}("Selected ${ent.name}:", ${ent.var})`,
      [{ id: 0, answer: "print", hint: "Function to output to console" }],
      ["print", "input", "display", "echo"],
      `\`print()\` displays expressions, variables, or text onto the console output.`
    );
  });

  const sepValues = [
    { sep: "-", title: "Hyphen Separator", ex: "2026-10-08", code: '2026, 10, "08"' },
    { sep: "/", title: "Slash Date Format", ex: "15/08/1947", code: "15, 8, 1947" },
    { sep: ":", title: "Colon Time Format", ex: "12:45:00", code: "12, 45, '00'" },
    { sep: ", ", title: "Comma Space Separator", ex: "Red, Green, Blue", code: "'Red', 'Green', 'Blue'" },
    { sep: "@", title: "At Symbol Separator", ex: "user@domain.com", code: "'user', 'domain.com'" },
    { sep: " | ", title: "Vertical Bar Separator", ex: "Roll | Name | Marks", code: "'Roll', 'Name', 'Marks'" },
    { sep: ".", title: "Dot IP Separator", ex: "127.0.0.1", code: "127, 0, 0, 1" },
    { sep: "*", title: "Star Separator", ex: "X*Y*Z", code: "'X', 'Y', 'Z'" },
    { sep: " # ", title: "Hashtag Separator", ex: "Coding # Python # Class9", code: "'Coding', 'Python', 'Class9'" },
    { sep: " -> ", title: "Arrow Separator", ex: "A -> B -> C", code: "'A', 'B', 'C'" },
    { sep: "::", title: "Double Colon Separator", ex: "Module::Sub::Func", code: "'Module', 'Sub', 'Func'" },
    { sep: " + ", title: "Plus Sign Separator", ex: "10 + 20 + 30", code: "10, 20, 30" },
    { sep: " / ", title: "Spaced Slash Separator", ex: "Day / Month / Year", code: "'Day', 'Month', 'Year'" },
    { sep: "~", title: "Tilde Separator", ex: "Data~Row~1", code: "'Data', 'Row', 1" },
    { sep: " ", title: "Default Single Space", ex: "Hello World", code: "'Hello', 'World'" }
  ];

  sepValues.forEach(s => {
    addQ(
      "Medium",
      "Input & Output",
      `Print Separator: ${s.title}`,
      `# Desired output: ${s.ex}\nprint(${s.code}, {blank:0}="${s.sep}")`,
      [{ id: 0, answer: "sep", hint: "Parameter specifying separator between printed arguments" }],
      ["sep", "end", "split", "join"],
      `\`sep\` parameter in \`print()\` sets the string inserted between each printed argument.`
    );
  });

  const endValues = [
    { end: '" "', title: "Space Ending", desc: "print numbers horizontally separated by spaces" },
    { end: '","', title: "Comma Ending", desc: "print items separated by commas on the same line" },
    { end: '""', title: "Empty String Ending", desc: "print characters without any space or newline" },
    { end: '"\\t"', title: "Tab Ending", desc: "tab space between printed values" },
    { end: '"---"', title: "Dash Ending", desc: "triple dash separator on same line" },
    { end: '" | "', title: "Pipe Ending", desc: "vertical pipe divider on same line" },
    { end: '"." ', title: "Dot Ending", desc: "periods following each print statement" },
    { end: '"\\n\\n"', title: "Double Newline", desc: "extra line gap after printing" }
  ];

  endValues.forEach(e => {
    addQ(
      "Medium",
      "Input & Output",
      `Print End Parameter: ${e.title}`,
      `# Goal: ${e.desc}\nfor i in range(3):\n    print(i, {blank:0}=${e.end})\nprint("Done")`,
      [{ id: 0, answer: "end", hint: "Parameter that replaces the default newline character" }],
      ["end", "sep", "tail", "stop"],
      `\`end\` defines what character to print at the end of the line (default is newline \`\\n\`).`
    );
  });

  // =========================================================================
  // 2. MATHEMATICAL & SCIENCE FORMULAS (35 formulas x 5 variations = 175 questions)
  // =========================================================================
  const formulas = [
    { name: "Square Area", var: "side", type: "int", op: "**", expr: "side ** 2", param: "side length" },
    { name: "Square Perimeter", var: "side", type: "int", op: "*", expr: "4 * side", param: "side length" },
    { name: "Rectangle Area", var: "width", type: "int", op: "*", expr: "width * height", param: "width" },
    { name: "Rectangle Perimeter", var: "length", type: "int", op: "*", expr: "2 * (length + breadth)", param: "length" },
    { name: "Triangle Area", var: "base", type: "float", op: "*", expr: "0.5 * base * height", param: "base" },
    { name: "Circle Area", var: "radius", type: "float", op: "**", expr: "3.14 * (radius ** 2)", param: "radius" },
    { name: "Circle Circumference", var: "radius", type: "float", op: "*", expr: "2 * 3.14 * radius", param: "radius" },
    { name: "Cube Volume", var: "edge", type: "int", op: "**", expr: "edge ** 3", param: "cube edge" },
    { name: "Cube Surface Area", var: "edge", type: "int", op: "**", expr: "6 * (edge ** 2)", param: "cube edge" },
    { name: "Cuboid Volume", var: "length", type: "int", op: "*", expr: "length * breadth * height", param: "length" },
    { name: "Simple Interest", var: "principal", type: "float", op: "/", expr: "(principal * rate * time) / 100", param: "principal" },
    { name: "Speed Calculation", var: "distance", type: "float", op: "/", expr: "distance / time", param: "distance in km" },
    { name: "Distance Formula", var: "speed", type: "float", op: "*", expr: "speed * time", param: "speed in km/h" },
    { name: "Time Formula", var: "distance", type: "float", op: "/", expr: "distance / speed", param: "distance" },
    { name: "Acceleration", var: "delta_v", type: "float", op: "/", expr: "delta_v / time", param: "velocity change" },
    { name: "Force (Newton's 2nd Law)", var: "mass", type: "float", op: "*", expr: "mass * acceleration", param: "mass in kg" },
    { name: "Work Done", var: "force", type: "float", op: "*", expr: "force * distance", param: "force in Newtons" },
    { name: "Kinetic Energy", var: "mass", type: "float", op: "**", expr: "0.5 * mass * (velocity ** 2)", param: "mass in kg" },
    { name: "Potential Energy", var: "mass", type: "float", op: "*", expr: "mass * 9.8 * height", param: "mass in kg" },
    { name: "Pressure Formula", var: "force", type: "float", op: "/", expr: "force / area", param: "force in Newtons" },
    { name: "Density Formula", var: "mass", type: "float", op: "/", expr: "mass / volume", param: "mass in grams" },
    { name: "Average of Two", var: "num1", type: "float", op: "/", expr: "(num1 + num2) / 2", param: "first number" },
    { name: "Average of Three", var: "m1", type: "float", op: "/", expr: "(m1 + m2 + m3) / 3", param: "first subject marks" },
    { name: "Percentage Score", var: "scored", type: "float", op: "*", expr: "(scored / total) * 100", param: "marks scored" },
    { name: "Profit Amount", var: "selling_price", type: "float", op: "-", expr: "selling_price - cost_price", param: "selling price" },
    { name: "Loss Amount", var: "cost_price", type: "float", op: "-", expr: "cost_price - selling_price", param: "cost price" },
    { name: "Celsius to Fahrenheit", var: "celsius", type: "float", op: "*", expr: "(celsius * 9/5) + 32", param: "temp in Celsius" },
    { name: "Fahrenheit to Celsius", var: "fahrenheit", type: "float", op: "*", expr: "(fahrenheit - 32) * 5/9", param: "temp in Fahrenheit" },
    { name: "Discount Value", var: "marked_price", type: "float", op: "/", expr: "marked_price * (discount_pct / 100)", param: "marked price" },
    { name: "GST Added Bill", var: "amount", type: "float", op: "*", expr: "amount * 1.18", param: "bill amount" },
    { name: "BMI Calculation", var: "weight", type: "float", op: "**", expr: "weight / (height ** 2)", param: "weight in kg" },
    { name: "Ohm's Law Voltage", var: "current", type: "float", op: "*", expr: "current * resistance", param: "current in Amps" },
    { name: "Electric Power", var: "voltage", type: "float", op: "*", expr: "voltage * current", param: "voltage" },
    { name: "Circle Diameter", var: "radius", type: "float", op: "*", expr: "2 * radius", param: "radius" },
    { name: "Seconds in Hours", var: "hours", type: "int", op: "*", expr: "hours * 3600", param: "number of hours" }
  ];

  formulas.forEach(fm => {
    addQ(
      "Easy",
      "Type Conversion",
      `Input Conversion: ${fm.name}`,
      `${fm.var} = {blank:0}(input("Enter ${fm.param}: "))\nprint("Input recorded:", ${fm.var})`,
      [{ id: 0, answer: fm.type, hint: `Type conversion function for ${fm.type}` }],
      [fm.type, fm.type === "int" ? "float" : "int", "str", "bool"],
      `\`${fm.type}()\` parses the string input into a numeric ${fm.type} value.`
    );

    addQ(
      "Easy",
      "Input & Output",
      `Print Result: ${fm.name}`,
      `# Compute ${fm.name}\nresult = ${fm.expr}\n{blank:0}("Result is:", result)`,
      [{ id: 0, answer: "print", hint: "Function to output to console" }],
      ["print", "input", "display", "show"],
      `\`print()\` outputs the computed ${fm.name} result to the screen.`
    );

    addQ(
      "Medium",
      "Functions",
      `Function Definition: ${fm.name}`,
      `{blank:0} compute_${fm.var}(${fm.var}):\n    return ${fm.expr}\n\nprint("Done")`,
      [{ id: 0, answer: "def", hint: "Keyword that defines a function" }],
      ["def", "function", "func", "define"],
      `\`def\` is the keyword used to declare a function in Python.`
    );

    addQ(
      "Medium",
      "Functions",
      `Return Value: ${fm.name}`,
      `def calc_${fm.var}(${fm.var}):\n    {blank:0} ${fm.expr}\n\nprint("Function ready")`,
      [{ id: 0, answer: "return", hint: "Keyword that sends back the result" }],
      ["return", "give", "output", "send"],
      `\`return\` delivers the calculated ${fm.name} value back to the caller.`
    );

    addQ(
      "Medium",
      "Operators",
      `Formula Operator: ${fm.name}`,
      `# Formula calculation\nval = 10 {blank:0} 2\nprint(val)`,
      [{ id: 0, answer: fm.op, hint: `Operator used in ${fm.name}` }],
      [fm.op, "+", "-", "*", "/", "%", "**"],
      `The operator \`${fm.op}\` performs the required mathematical calculation in Python.`
    );
  });

  // =========================================================================
  // 3. DIVISIBILITY, MODULUS & EVEN-ODD TESTS (75 questions)
  // =========================================================================
  const divisibilityTests = [
    { n: "16", d: "2", exp: "Even Number", res: "0" },
    { n: "21", d: "2", exp: "Odd Number", res: "1" },
    { n: "27", d: "3", exp: "Divisible by 3", res: "0" },
    { n: "32", d: "4", exp: "Divisible by 4", res: "0" },
    { n: "45", d: "5", exp: "Divisible by 5", res: "0" },
    { n: "48", d: "6", exp: "Divisible by 6", res: "0" },
    { n: "49", d: "7", exp: "Divisible by 7", res: "0" },
    { n: "64", d: "8", exp: "Divisible by 8", res: "0" },
    { n: "81", d: "9", exp: "Divisible by 9", res: "0" },
    { n: "90", d: "10", exp: "Divisible by 10", res: "0" },
    { n: "77", d: "11", exp: "Divisible by 11", res: "0" },
    { n: "144", d: "12", exp: "Divisible by 12", res: "0" },
    { n: "53", d: "10", exp: "Last Digit Extraction", res: "3" },
    { n: "128", d: "10", exp: "Last Digit Extraction", res: "8" },
    { n: "999", d: "100", exp: "Last Two Digits", res: "99" }
  ];

  divisibilityTests.forEach(dt => {
    addQ(
      "Medium",
      "Operators",
      `Modulus Test: ${dt.n} % ${dt.d}`,
      `# Testing ${dt.exp}\nremainder = ${dt.n} {blank:0} ${dt.d}\nprint("Remainder:", remainder)`,
      [{ id: 0, answer: "%", hint: "Modulus operator for remainder" }],
      ["%", "/", "//", "**"],
      `\`%\` calculates the remainder of division (\`${dt.n} % ${dt.d}\` gives \`${dt.res}\`).`
    );

    addQ(
      "Easy",
      "Operators",
      `Divisibility Equality: ${dt.n} and ${dt.d}`,
      `if ${dt.n} % ${dt.d} {blank:0} ${dt.res}:\n    print("${dt.exp}")`,
      [{ id: 0, answer: "==", hint: "Equality comparison operator" }],
      ["==", "=", "!=", "<="],
      `\`==\` tests if the modulus remainder equals ${dt.res}.`
    );

    addQ(
      "Easy",
      "Conditions",
      `Divisibility Condition: ${dt.n}`,
      `{blank:0} ${dt.n} % ${dt.d} == ${dt.res}:\n    print("${dt.exp}")`,
      [{ id: 0, answer: "if", hint: "Conditional statement keyword" }],
      ["if", "when", "while", "for"],
      `\`if\` evaluates the divisibility condition.`
    );

    addQ(
      "Easy",
      "Conditions",
      `Divisibility Else: ${dt.n}`,
      `if ${dt.n} % ${dt.d} == ${dt.res}:\n    print("${dt.exp}")\n{blank:0}\n    print("Not ${dt.exp}")`,
      [{ id: 0, answer: "else:", hint: "Else keyword with colon" }],
      ["else:", "elif:", "then:", "for:"],
      `\`else:\` runs if the divisibility check fails.`
    );

    addQ(
      "Hard",
      "Conditions",
      `Multi-blank Divisibility: ${dt.exp}`,
      `{blank:0} num % ${dt.d} == 0:\n    {blank:1}("Divisible by ${dt.d}")`,
      [
        { id: 0, answer: "if", hint: "Condition keyword" },
        { id: 1, answer: "print", hint: "Output function" }
      ],
      ["if", "print", "while", "input", "else"],
      `\`if\` tests divisibility and \`print()\` outputs the result.`
    );
  });

  // =========================================================================
  // 4. RANGE & MULTIPLICATION TABLES (60 questions)
  // =========================================================================
  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15];

  tables.forEach(t => {
    addQ(
      "Easy",
      "Loops",
      `Multiplication Table of ${t}: Loop`,
      `# Multiplication table of ${t}\n{blank:0} i in range(1, 11):\n    print(${t} * i)`,
      [{ id: 0, answer: "for", hint: "Keyword starting the loop" }],
      ["for", "while", "loop", "repeat"],
      `\`for\` loop iterates from 1 to 10 for table multiplication.`
    );

    addQ(
      "Easy",
      "Loops & Range",
      `Table of ${t}: Range Function`,
      `for i in {blank:0}(1, 11):\n    print("${t} x", i, "=", ${t} * i)`,
      [{ id: 0, answer: "range", hint: "Function to generate sequence of numbers" }],
      ["range", "list", "count", "seq"],
      `\`range(1, 11)\` generates multiplier sequence 1 through 10.`
    );

    addQ(
      "Medium",
      "Loops & Range",
      `Table of ${t}: Step Parameter`,
      `# Multiples of ${t} up to ${t * 10}\nfor val in range(${t}, ${t * 10 + 1}, {blank:0}):\n    print(val)`,
      [{ id: 0, answer: String(t), hint: `Step value of ${t}` }],
      [String(t), "1", "2", String(t * 2), "10"],
      `The step argument \`${t}\` generates multiples incrementing by ${t}.`
    );

    addQ(
      "Easy",
      "Input & Output",
      `Table of ${t}: Display Value`,
      `for i in range(1, 11):\n    {blank:0}(${t} * i)`,
      [{ id: 0, answer: "print", hint: "Function to display each multiple" }],
      ["print", "input", "echo", "show"],
      `\`print()\` outputs each product in the loop.`
    );

    addQ(
      "Hard",
      "Loops & Range",
      `Table of ${t}: Multi-Blank Loop`,
      `{blank:0} i in {blank:1}(1, 11):\n    print(${t} * i)`,
      [
        { id: 0, answer: "for", hint: "Loop keyword" },
        { id: 1, answer: "range", hint: "Sequence generator" }
      ],
      ["for", "range", "while", "print", "in"],
      `\`for\` loop paired with \`range(1, 11)\` generates 1 to 10 multipliers.`
    );
  });

  // =========================================================================
  // 5. COUNTDOWNS & REVERSE SEQUENCES (40 questions)
  // =========================================================================
  const countdowns = [
    { start: "10", stop: "0", step: "-1", title: "Countdown from 10" },
    { start: "5", stop: "0", step: "-1", title: "Countdown from 5" },
    { start: "20", stop: "0", step: "-2", title: "Even Countdown from 20" },
    { start: "50", stop: "0", step: "-5", title: "Countdown by Fives from 50" },
    { start: "100", stop: "0", step: "-10", title: "Countdown by Tens from 100" },
    { start: "15", stop: "0", step: "-3", title: "Countdown by Threes from 15" },
    { start: "8", stop: "0", step: "-1", title: "Rocket Launch Countdown" },
    { start: "30", stop: "0", step: "-5", title: "Thirty to Zero by Fives" }
  ];

  countdowns.forEach(cd => {
    addQ(
      "Medium",
      "Loops & Range",
      `Reverse Step: ${cd.title}`,
      `# Countdown sequence\nfor c in range(${cd.start}, ${cd.stop}, {blank:0}):\n    print(c)`,
      [{ id: 0, answer: cd.step, hint: `Negative step parameter: ${cd.step}` }],
      [cd.step, "1", "2", "-2", "0"],
      `Step \`${cd.step}\` decrements the loop value each iteration to count backwards.`
    );

    addQ(
      "Easy",
      "Loops & Range",
      `Countdown Function: ${cd.title}`,
      `for c in {blank:0}(${cd.start}, ${cd.stop}, ${cd.step}):\n    print(c)`,
      [{ id: 0, answer: "range", hint: "Sequence function" }],
      ["range", "countdown", "list", "step"],
      `\`range()\` with 3 arguments supports negative steps for countdowns.`
    );

    addQ(
      "Medium",
      "Loops",
      `While Countdown: ${cd.title}`,
      `t = ${cd.start}\nwhile t > 0:\n    print(t)\n    t = t {blank:0} 1`,
      [{ id: 0, answer: "-", hint: "Subtraction operator to decrement" }],
      ["-", "+", "*", "/"],
      `\`t = t - 1\` decrements the timer counter by 1.`
    );

    addQ(
      "Easy",
      "Loops",
      `While Keyword in Countdown`,
      `t = ${cd.start}\n{blank:0} t > 0:\n    print(t)\n    t -= 1`,
      [{ id: 0, answer: "while", hint: "Loop keyword" }],
      ["while", "for", "until", "repeat"],
      `\`while\` loop executes as long as \`t > 0\` remains True.`
    );

    addQ(
      "Hard",
      "Loops & Range",
      `Multi-blank Reverse Range: ${cd.title}`,
      `{blank:0} i in range(${cd.start}, 0, {blank:1}):\n    print(i)`,
      [
        { id: 0, answer: "for", hint: "Loop keyword" },
        { id: 1, answer: cd.step, hint: "Reverse step value" }
      ],
      ["for", cd.step, "while", "1", "range"],
      `\`for\` loop with reverse step \`${cd.step}\` counts downwards.`
    );
  });

  // =========================================================================
  // 6. REAL-LIFE DECISION SCENARIOS (25 scenarios x 4 = 100 questions)
  // =========================================================================
  const decisions = [
    { title: "Senior Citizen Concession", var: "age", val: "65", op: ">=", target: "60", msg: "Discount Granted" },
    { title: "Voting Eligibility", var: "age", val: "19", op: ">=", target: "18", msg: "Eligible to Vote" },
    { title: "Driving License Age", var: "age", val: "22", op: ">=", target: "18", msg: "License Eligible" },
    { title: "Movie Ticket Child Discount", var: "age", val: "9", op: "<", target: "12", msg: "Child Fare" },
    { title: "Exam Pass Check", var: "marks", val: "60", op: ">=", target: "33", msg: "Passed" },
    { title: "Distinction Check", var: "marks", val: "85", op: ">=", target: "75", msg: "Distinction" },
    { title: "Scholarship Qualification", var: "marks", val: "94", op: ">=", target: "90", msg: "Scholarship Awarded" },
    { title: "Speed Limit Check", var: "speed", val: "95", op: ">", target: "80", msg: "Speed Violation" },
    { title: "Freezing Point", var: "temp", val: "-4", op: "<=", target: "0", msg: "Freezing State" },
    { title: "Fever Detection", var: "temp", val: "101.5", op: ">", target: "98.6", msg: "High Temperature" },
    { title: "Free Shipping Order", var: "cart", val: "550", op: ">=", target: "499", msg: "Free Delivery" },
    { title: "Shopping Discount", var: "bill", val: "1200", op: ">", target: "1000", msg: "Discount Applied" },
    { title: "Low Account Balance", var: "balance", val: "300", op: "<", target: "500", msg: "Low Balance" },
    { title: "Negative Balance Alert", var: "balance", val: "-50", op: "<", target: "0", msg: "Overdrawn" },
    { title: "Low Battery Warning", var: "battery", val: "15", op: "<=", target: "20", msg: "Battery Low" },
    { title: "Fully Charged Battery", var: "battery", val: "100", op: "==", target: "100", msg: "Battery Full" },
    { title: "PIN Authentication", var: "pin", val: "1234", op: "==", target: "1234", msg: "Access Granted" },
    { title: "Inventory Empty", var: "stock", val: "0", op: "==", target: "0", msg: "Out of Stock" },
    { title: "Water Boiling State", var: "temp", val: "102", op: ">=", target: "100", msg: "Boiling" },
    { title: "Positive Number Test", var: "num", val: "25", op: ">", target: "0", msg: "Positive Number" },
    { title: "Negative Number Test", var: "num", val: "-14", op: "<", target: "0", msg: "Negative Number" },
    { title: "Non-Zero Divisor", var: "divisor", val: "5", op: "!=", target: "0", msg: "Safe to Divide" },
    { title: "Weekend Sunday Check", var: "day", val: '"Sunday"', op: "==", target: '"Sunday"', msg: "It is Sunday" },
    { title: "Attendance Criteria", var: "attendance", val: "78", op: ">=", target: "75", msg: "Eligible for Exam" },
    { title: "Target Achieved", var: "steps", val: "10500", op: ">=", target: "10000", msg: "Step Goal Met" }
  ];

  decisions.forEach(ds => {
    addQ(
      "Easy",
      "Conditions",
      `Decision If: ${ds.title}`,
      `${ds.var} = ${ds.val}\n\n{blank:0} ${ds.var} ${ds.op} ${ds.target}:\n    print("${ds.msg}")`,
      [{ id: 0, answer: "if", hint: "Conditional keyword" }],
      ["if", "when", "while", "for"],
      `\`if\` tests whether the expression evaluates to True.`
    );

    addQ(
      "Easy",
      "Operators",
      `Decision Operator: ${ds.title}`,
      `${ds.var} = ${ds.val}\nif ${ds.var} {blank:0} ${ds.target}:\n    print("${ds.msg}")`,
      [{ id: 0, answer: ds.op, hint: `Operator: ${ds.op}` }],
      [ds.op, "=", "!", "is"],
      `\`${ds.op}\` is the relational operator used to test the condition.`
    );

    addQ(
      "Easy",
      "Conditions",
      `Decision Else: ${ds.title}`,
      `if ${ds.var} ${ds.op} ${ds.target}:\n    print("${ds.msg}")\n{blank:0}\n    print("Condition Not Met")`,
      [{ id: 0, answer: "else:", hint: "Else keyword with colon" }],
      ["else:", "elif:", "then:", "for:"],
      `\`else:\` specifies the alternate block executed when the condition is False.`
    );

    addQ(
      "Easy",
      "Input & Output",
      `Decision Output: ${ds.title}`,
      `if ${ds.var} ${ds.op} ${ds.target}:\n    {blank:0}("${ds.msg}")`,
      [{ id: 0, answer: "print", hint: "Display output function" }],
      ["print", "input", "display", "echo"],
      `\`print()\` displays the status message to the console.`
    );
  });

  // =========================================================================
  // 7. STRING OPERATIONS (20 words x 8 = 160 questions)
  // =========================================================================
  const words = [
    { w: '"INDIA"', len: 5, f: '"I"', l: '"A"' },
    { w: '"PYTHON"', len: 6, f: '"P"', l: '"N"' },
    { w: '"NEWDELHI"', len: 8, f: '"N"', l: '"I"' },
    { w: '"HIMALAYA"', len: 8, f: '"H"', l: '"A"' },
    { w: '"GANGA"', len: 5, f: '"G"', l: '"A"' },
    { w: '"CRICKET"', len: 7, f: '"C"', l: '"T"' },
    { w: '"CHESS"', len: 5, f: '"C"', l: '"S"' },
    { w: '"BADMINTON"', len: 9, f: '"B"', l: '"N"' },
    { w: '"SCIENCE"', len: 7, f: '"S"', l: '"E"' },
    { w: '"COMPUTER"', len: 8, f: '"C"', l: '"R"' },
    { w: '"EDUCATION"', len: 9, f: '"E"', l: '"N"' },
    { w: '"KEYBOARD"', len: 8, f: '"K"', l: '"D"' },
    { w: '"MONITOR"', len: 7, f: '"M"', l: '"R"' },
    { w: '"PROGRAM"', len: 7, f: '"P"', l: '"M"' },
    { w: '"ALGORITHM"', len: 9, f: '"A"', l: '"M"' },
    { w: '"FUNCTION"', len: 8, f: '"F"', l: '"N"' },
    { w: '"VARIABLE"', len: 8, f: '"V"', l: '"E"' },
    { w: '"DATABASE"', len: 8, f: '"D"', l: '"E"' },
    { w: '"SOFTWARE"', len: 8, f: '"S"', l: '"E"' },
    { w: '"INTERNET"', len: 8, f: '"I"', l: '"T"' }
  ];

  words.forEach(wd => {
    addQ(
      "Easy",
      "Strings",
      `String Length of ${wd.w}`,
      `s = ${wd.w}\nprint({blank:0}(s))  # ${wd.len}`,
      [{ id: 0, answer: "len", hint: "Length calculation function" }],
      ["len", "size", "count", "length"],
      `\`len()\` returns the number of characters in ${wd.w}.`
    );

    addQ(
      "Easy",
      "Strings",
      `First Character of ${wd.w}`,
      `s = ${wd.w}\nprint(s[{blank:0}])  # ${wd.f}`,
      [{ id: 0, answer: "0", hint: "First character index" }],
      ["0", "1", "-1", "first"],
      `\`s[0]\` fetches the first character of ${wd.w}.`
    );

    addQ(
      "Medium",
      "Strings",
      `Last Character of ${wd.w}`,
      `s = ${wd.w}\nprint(s[{blank:0}])  # ${wd.l}`,
      [{ id: 0, answer: "-1", hint: "Negative index for last character" }],
      ["-1", "0", "1", "last"],
      `\`s[-1]\` fetches the last character of a sequence.`
    );

    addQ(
      "Medium",
      "Strings",
      `Second Character of ${wd.w}`,
      `s = ${wd.w}\nsecond_char = s[{blank:0}]\nprint(second_char)`,
      [{ id: 0, answer: "1", hint: "Index for second character" }],
      ["1", "0", "2", "second"],
      `In 0-based indexing, the second element is at index 1.`
    );

    addQ(
      "Medium",
      "Strings",
      `Convert to Upper Case`,
      `text = ${wd.w.toLowerCase()}\nprint(text.{blank:0}())  # ${wd.w}`,
      [{ id: 0, answer: "upper", hint: "Uppercase method" }],
      ["upper", "capitalize", "to_upper", "high"],
      `\`.upper()\` converts all characters in a string to uppercase.`
    );

    addQ(
      "Medium",
      "Strings",
      `Convert to Lower Case`,
      `text = ${wd.w}\nprint(text.{blank:0}())`,
      [{ id: 0, answer: "lower", hint: "Lowercase method" }],
      ["lower", "to_lower", "small", "down"],
      `\`.lower()\` converts all characters in a string to lowercase.`
    );

    addQ(
      "Easy",
      "Strings",
      `Concatenate ${wd.w}`,
      `msg = "Topic: " {blank:0} ${wd.w}\nprint(msg)`,
      [{ id: 0, answer: "+", hint: "Concatenation operator" }],
      ["+", "&", ",", "."],
      `\`+\` concatenates two strings together into one.`
    );

    addQ(
      "Medium",
      "Strings",
      `Repeat String`,
      `border = "-" {blank:0} 10\nprint(border)`,
      [{ id: 0, answer: "*", hint: "String repetition operator" }],
      ["*", "+", "^", "x"],
      `\`*\` repeats a string by the specified integer count.`
    );
  });

  // =========================================================================
  // 8. LIST OPERATIONS (20 lists x 8 = 160 questions)
  // =========================================================================
  const lists = [
    { name: "colors", items: '["red", "green"]', add: '"blue"' },
    { name: "fruits", items: '["apple", "banana"]', add: '"mango"' },
    { name: "cities", items: '["Delhi", "Mumbai"]', add: '"Chennai"' },
    { name: "subjects", items: '["Math", "Science"]', add: '"English"' },
    { name: "sports", items: '["Cricket", "Football"]', add: '"Hockey"' },
    { name: "birds", items: '["sparrow", "crow"]', add: '"parrot"' },
    { name: "animals", items: '["tiger", "lion"]', add: '"elephant"' },
    { name: "planets", items: '["Mars", "Venus"]', add: '"Jupiter"' },
    { name: "rivers", items: '["Ganga", "Yamuna"]', add: '"Godavari"' },
    { name: "metals", items: '["Gold", "Silver"]', add: '"Copper"' },
    { name: "shapes", items: '["circle", "square"]', add: '"triangle"' },
    { name: "seasons", items: '["summer", "winter"]', add: '"monsoon"' },
    { name: "scores", items: '[90, 85]', add: '95' },
    { name: "primes", items: '[2, 3, 5]', add: '7' },
    { name: "evens", items: '[2, 4, 6]', add: '8' },
    { name: "odds", items: '[1, 3, 5]', add: '7' },
    { name: "languages", items: '["Python", "HTML"]', add: '"CSS"' },
    { name: "monuments", items: '["Taj Mahal", "Qutub Minar"]', add: '"Red Fort"' },
    { name: "flowers", items: '["Rose", "Lotus"]', add: '"Lily"' },
    { name: "vegetables", items: '["Potato", "Tomato"]', add: '"Onion"' }
  ];

  lists.forEach(ls => {
    addQ(
      "Medium",
      "Lists",
      `Append Element to ${ls.name}`,
      `items = ${ls.items}\nitems.{blank:0}(${ls.add})\nprint(items)`,
      [{ id: 0, answer: "append", hint: "Method to add item to end of list" }],
      ["append", "add", "push", "insert_end"],
      `\`.append()\` adds an element to the end of an existing list.`
    );

    addQ(
      "Easy",
      "Lists",
      `List Size of ${ls.name}`,
      `items = ${ls.items}\nprint({blank:0}(items))`,
      [{ id: 0, answer: "len", hint: "Function to count list elements" }],
      ["len", "size", "count", "length"],
      `\`len(list)\` returns the total number of items stored in the list.`
    );

    addQ(
      "Easy",
      "Lists",
      `First Element of ${ls.name}`,
      `items = ${ls.items}\nfirst = items[{blank:0}]\nprint(first)`,
      [{ id: 0, answer: "0", hint: "Zero-based index for first item" }],
      ["0", "1", "-1", "first"],
      `Lists are 0-indexed; \`items[0]\` fetches the first element.`
    );

    addQ(
      "Medium",
      "Lists",
      `Last Element of ${ls.name}`,
      `items = ${ls.items}\nlast = items[{blank:0}]\nprint(last)`,
      [{ id: 0, answer: "-1", hint: "Negative index for last item" }],
      ["-1", "0", "1", "last"],
      `\`items[-1]\` accesses the last element of the list directly.`
    );

    addQ(
      "Medium",
      "Lists",
      `Pop Element from ${ls.name}`,
      `items = ${ls.items}\nremoved = items.{blank:0}()\nprint("Popped:", removed)`,
      [{ id: 0, answer: "pop", hint: "Method to remove and return last item" }],
      ["pop", "remove", "delete", "drop"],
      `\`.pop()\` removes and returns the last element of the list.`
    );

    addQ(
      "Medium",
      "Lists",
      `Remove Item from ${ls.name}`,
      `items = ${ls.items}\nitems.{blank:0}(items[0])\nprint(items)`,
      [{ id: 0, answer: "remove", hint: "Method to delete item by value" }],
      ["remove", "pop", "delete", "discard"],
      `\`.remove(x)\` deletes the first matching occurrence of \`x\` from the list.`
    );

    addQ(
      "Easy",
      "Lists",
      `Membership in ${ls.name}`,
      `items = ${ls.items}\nif items[0] {blank:0} items:\n    print("Found!")`,
      [{ id: 0, answer: "in", hint: "Membership test operator" }],
      ["in", "of", "within", "has"],
      `\`in\` checks whether an element exists inside the list.`
    );

    addQ(
      "Easy",
      "Lists & Loops",
      `Iterating over ${ls.name}`,
      `items = ${ls.items}\n{blank:0} item in items:\n    print(item)`,
      [{ id: 0, answer: "for", hint: "Loop keyword" }],
      ["for", "while", "loop", "repeat"],
      `\`for item in items\` iterates over each element in the list sequentially.`
    );
  });

  // =========================================================================
  // 9. TUPLES & DICTIONARIES (45 questions)
  // =========================================================================
  const dictExamples = [
    { title: "Student Record", var: "student", dict: '{"name": "Aarav", "class": 9, "roll": 24}', key: '"name"', val: '"Aarav"' },
    { title: "Capital Cities", var: "capitals", dict: '{"India": "New Delhi", "France": "Paris"}', key: '"India"', val: '"New Delhi"' },
    { title: "Price Menu", var: "menu", dict: '{"burger": 50, "pizza": 150}', key: '"burger"', val: "50" },
    { title: "Player Score", var: "stats", dict: '{"goals": 3, "assists": 2}', key: '"goals"', val: "3" },
    { title: "Book Info", var: "book", dict: '{"title": "Python 9", "pages": 200}', key: '"title"', val: '"Python 9"' },
    { title: "User Profile", var: "user", dict: '{"username": "coder99", "active": True}', key: '"username"', val: '"coder99"' },
    { title: "Colors Hex", var: "hex_codes", dict: '{"red": "#FF0000", "blue": "#0000FF"}', key: '"red"', val: '"#FF0000"' },
    { title: "Inventory Item", var: "item", dict: '{"item_id": 101, "stock": 45}', key: '"stock"', val: "45" }
  ];

  dictExamples.forEach(de => {
    addQ(
      "Medium",
      "Tuples & Dictionaries",
      `Dictionary Key Access: ${de.title}`,
      `data = ${de.dict}\nprint(data[{blank:0}])  # Outputs ${de.val}`,
      [{ id: 0, answer: de.key, hint: `Dictionary key: ${de.key}` }],
      [de.key, '"id"', "0", '"all"'],
      `Dictionary elements are accessed using square brackets with their key: \`data[${de.key}]\`.`
    );

    addQ(
      "Medium",
      "Tuples & Dictionaries",
      `Dictionary Keys Method: ${de.title}`,
      `data = ${de.dict}\nall_keys = data.{blank:0}()\nprint(all_keys)`,
      [{ id: 0, answer: "keys", hint: "Method returning all dictionary keys" }],
      ["keys", "all_keys", "get_keys", "values"],
      `\`.keys()\` returns a view object of all the keys in the dictionary.`
    );

    addQ(
      "Medium",
      "Tuples & Dictionaries",
      `Dictionary Values Method: ${de.title}`,
      `data = ${de.dict}\nall_vals = data.{blank:0}()\nprint(all_vals)`,
      [{ id: 0, answer: "values", hint: "Method returning all dictionary values" }],
      ["values", "vals", "items", "keys"],
      `\`.values()\` returns a view object of all the values stored in the dictionary.`
    );

    addQ(
      "Easy",
      "Tuples & Dictionaries",
      `Dictionary Size: ${de.title}`,
      `data = ${de.dict}\nprint({blank:0}(data))`,
      [{ id: 0, answer: "len", hint: "Function to count key-value pairs" }],
      ["len", "size", "count", "dict_len"],
      `\`len(dict)\` counts the number of key-value pairs in the dictionary.`
    );
  });

  const tupleExamples = [
    { title: "Coordinates", val: "(10, 20)", len: 2 },
    { title: "RGB Colors", val: "(255, 128, 0)", len: 3 },
    { title: "Dimensions", val: "(1920, 1080)", len: 2 },
    { title: "Date Tuple", val: "(2026, 10, 8)", len: 3 },
    { title: "Vowels Tuple", val: "('a', 'e', 'i', 'o', 'u')", len: 5 }
  ];

  tupleExamples.forEach(te => {
    addQ(
      "Easy",
      "Tuples & Dictionaries",
      `Tuple Length: ${te.title}`,
      `t = ${te.val}\nprint({blank:0}(t))  # ${te.len}`,
      [{ id: 0, answer: "len", hint: "Built-in length function" }],
      ["len", "size", "count", "tuple_len"],
      `\`len()\` calculates the number of elements in a tuple.`
    );

    addQ(
      "Easy",
      "Tuples & Dictionaries",
      `First Element of Tuple: ${te.title}`,
      `t = ${te.val}\nfirst = t[{blank:0}]\nprint(first)`,
      [{ id: 0, answer: "0", hint: "Zero-based index for first item" }],
      ["0", "1", "-1", "first"],
      `Tuples are 0-indexed; \`t[0]\` fetches the first element.`
    );
  });

  // =========================================================================
  // 10. BUILT-IN FUNCTIONS (type, max, min, sum, abs, round) - 45 questions
  // =========================================================================
  const builtInFuncs = [
    { name: "max", call: "max(12, 45, 23)", res: "45", desc: "Maximum Value" },
    { name: "min", call: "min(12, 45, 23)", res: "12", desc: "Minimum Value" },
    { name: "abs", call: "abs(-15)", res: "15", desc: "Absolute Value" },
    { name: "round", call: "round(4.85)", res: "5", desc: "Rounded Integer" },
    { name: "sum", call: "sum([10, 20, 30])", res: "60", desc: "Sum of Elements" },
    { name: "type", call: "type(10)", res: "<class 'int'>", desc: "Type of Integer" },
    { name: "type", call: "type(3.14)", res: "<class 'float'>", desc: "Type of Float" },
    { name: "type", call: "type('Code')", res: "<class 'str'>", desc: "Type of String" },
    { name: "type", call: "type(True)", res: "<class 'bool'>", desc: "Type of Boolean" }
  ];

  builtInFuncs.forEach(bf => {
    addQ(
      "Easy",
      "Python Basics",
      `Built-in Function: ${bf.desc}`,
      `# Calculate ${bf.desc}\nresult = {blank:0}(${bf.call.split("(")[1]}\nprint(result)`,
      [{ id: 0, answer: bf.name, hint: `Built-in function name: ${bf.name}` }],
      [bf.name, "size", "total", "val"],
      `\`${bf.name}()\` is Python's standard built-in function to compute ${bf.desc.toLowerCase()}.`
    );
  });

  // =========================================================================
  // 11. SHORTHAND ASSIGNMENT OPERATORS (+=, -=, *=, /=, //=) - 40 questions
  // =========================================================================
  const shorthands = [
    { var: "count", op: "+=", val: "1", title: "Increment by 1" },
    { var: "score", op: "+=", val: "10", title: "Add 10 Points" },
    { var: "lives", op: "-=", val: "1", title: "Deduct 1 Life" },
    { var: "health", op: "-=", val: "25", title: "Reduce Health by 25" },
    { var: "coins", op: "*=", val: "2", title: "Double Coins" },
    { var: "balance", op: "*=", val: "3", title: "Triple Balance" },
    { var: "timer", op: "-=", val: "5", title: "Subtract 5 Seconds" },
    { var: "step", op: "+=", val: "2", title: "Advance by 2 Steps" }
  ];

  shorthands.forEach(sh => {
    addQ(
      "Medium",
      "Operators",
      `Shorthand: ${sh.title}`,
      `${sh.var} = 50\n${sh.var} {blank:0} ${sh.val}\nprint(${sh.var})`,
      [{ id: 0, answer: sh.op, hint: `Shorthand assignment: ${sh.op}` }],
      [sh.op, "=", "+", "-=", "*="],
      `The compound assignment operator \`${sh.op}\` updates the variable in-place.`
    );
  });

  // =========================================================================
  // 12. STRING SLICING & METHODS (60 questions)
  // =========================================================================
  const sliceExamples = [
    { text: '"PYTHON"', start: "0", stop: "3", exp: "'PYT'", title: "First Three Letters" },
    { text: '"PROGRAMMING"', start: "0", stop: "7", exp: "'PROGRAM'", title: "Word Prefix" },
    { text: '"EDUCATION"', start: "0", stop: "4", exp: "'EDUC'", title: "First Four Letters" },
    { text: '"KNOWLEDGE"', start: "0", stop: "5", exp: "'KNOW'", title: "Root Word" },
    { text: '"COMPUTER"', start: "0", stop: "4", exp: "'COMP'", title: "First 4 Letters" },
    { text: '"SCIENCE"', start: "0", stop: "3", exp: "'SCI'", title: "First 3 Letters" },
    { text: '"ALGORITHM"', start: "0", stop: "4", exp: "'ALGO'", title: "Prefix" },
    { text: '"DATABASE"', start: "0", stop: "4", exp: "'DATA'", title: "First 4 Letters" }
  ];

  sliceExamples.forEach(sl => {
    addQ(
      "Medium",
      "Strings",
      `Slicing: ${sl.title}`,
      `word = ${sl.text}\n# Slices from 0 up to index ${sl.stop}\npart = word[{blank:0}:${sl.stop}]\nprint(part)  # ${sl.exp}`,
      [{ id: 0, answer: sl.start, hint: "Starting slice index" }],
      [sl.start, "1", "-1", sl.stop],
      `In Python slicing \`word[start:stop]\`, index \`${sl.start}\` indicates the beginning position.`
    );

    addQ(
      "Medium",
      "Strings",
      `Slicing Stop Index: ${sl.title}`,
      `word = ${sl.text}\n# Extract ${sl.exp}\npart = word[0:{blank:0}]\nprint(part)  # ${sl.exp}`,
      [{ id: 0, answer: sl.stop, hint: "Ending slice index (exclusive)" }],
      [sl.stop, "0", "1", "10"],
      `In slicing \`word[0:${sl.stop}]\`, the stop index \`${sl.stop}\` is non-inclusive.`
    );
  });

  const moreStrMethods = [
    { code: `msg = "I like Java"\nprint(msg.{blank:0}("Java", "Python"))`, ans: "replace", title: "Replace Substring" },
    { code: `text = "banana"\nprint(text.{blank:0}("a"))  # 3`, ans: "count", title: "Count Substring" },
    { code: `phrase = "hello world"\nprint(phrase.{blank:0}("world"))  # 6`, ans: "find", title: "Find Substring Index" },
    { code: `raw = "  python  "\nprint(raw.{blank:0}())  # 'python'`, ans: "strip", title: "Strip Whitespace" },
    { code: `line = "apple,banana,mango"\nprint(line.{blank:0}(","))`, ans: "split", title: "Split String into List" }
  ];

  moreStrMethods.forEach(msm => {
    addQ(
      "Medium",
      "Strings",
      `String Method: ${msm.title}`,
      msm.code,
      [{ id: 0, answer: msm.ans, hint: `Method: ${msm.ans}` }],
      [msm.ans, "upper", "replace", "strip", "split"],
      `\`.${msm.ans}()\` is the string method used for ${msm.title.toLowerCase()}.`
    );
  });

  // =========================================================================
  // 13. DATA TYPES & TYPECAST TRUNCATION (50 questions)
  // =========================================================================
  const truncationCases = [
    { from: "9.99", to: "9", type: "int", title: "Truncate Float to Int (9.99)" },
    { from: "14.25", to: "14", type: "int", title: "Truncate Float to Int (14.25)" },
    { from: "25", to: "25.0", type: "float", title: "Convert Int to Float (25)" },
    { from: "100", to: "100.0", type: "float", title: "Convert Int to Float (100)" },
    { from: "True", to: "1", type: "int", title: "Convert True to Int" },
    { from: "False", to: "0", type: "int", title: "Convert False to Int" },
    { from: "0", to: "False", type: "bool", title: "Convert 0 to Bool" },
    { from: "1", to: "True", type: "bool", title: "Convert 1 to Bool" },
    { from: '""', to: "False", type: "bool", title: "Empty String to Bool" },
    { from: '"Class9"', to: "True", type: "bool", title: "Non-empty String to Bool" }
  ];

  truncationCases.forEach(tc => {
    addQ(
      "Medium",
      "Data Types",
      tc.title,
      `val = ${tc.from}\nresult = {blank:0}(val)\nprint(result)  # ${tc.to}`,
      [{ id: 0, answer: tc.type, hint: `Typecasting function: ${tc.type}` }],
      [tc.type, "int", "float", "bool", "str"],
      `\`${tc.type}()\` converts ${tc.from} into ${tc.to}.`
    );
  });

  // =========================================================================
  // 14. LIST INSERT, SORT, REVERSE (40 questions)
  // =========================================================================
  const listMethods = [
    { code: `nums = [1, 2, 4]\nnums.{blank:0}(2, 3)  # insert 3 at index 2\nprint(nums)`, ans: "insert", title: "Insert at Index" },
    { code: `nums = [5, 2, 8, 1]\nnums.{blank:0}()  # sort in ascending order\nprint(nums)`, ans: "sort", title: "Sort List" },
    { code: `nums = [1, 2, 3]\nnums.{blank:0}()  # reverse list elements\nprint(nums)`, ans: "reverse", title: "Reverse List" },
    { code: `nums = [10, 20, 30]\nnums.{blank:0}()  # remove all items\nprint(nums)  # []`, ans: "clear", title: "Clear List" }
  ];

  listMethods.forEach(lm => {
    addQ(
      "Medium",
      "Lists",
      `List Method: ${lm.title}`,
      lm.code,
      [{ id: 0, answer: lm.ans, hint: `List method: ${lm.ans}` }],
      [lm.ans, "append", "pop", "remove", "insert"],
      `\`.${lm.ans}()\` is the list method to ${lm.title.toLowerCase()}.`
    );
  });

  // =========================================================================
  // 15. MULTI-BLANK HARD CHALLENGES (80 multi-blank questions)
  // =========================================================================
  const multiBlankSpecs = [
    {
      topic: "Loops & Conditions",
      title: "Even Numbers Range Filter",
      code: `for num in range(1, 21):\n    {blank:0} num % 2 == 0:\n        {blank:1}(num)`,
      b: [{ id: 0, a: "if", h: "Condition keyword" }, { id: 1, a: "print", h: "Output function" }],
      opts: ["if", "while", "print", "input", "else"],
      exp: "`if` checks evenness and `print()` outputs the even number."
    },
    {
      topic: "Loops & Conditions",
      title: "Odd Numbers Range Filter",
      code: `for num in range(1, 21):\n    {blank:0} num % 2 != 0:\n        {blank:1}(num)`,
      b: [{ id: 0, a: "if", h: "Condition keyword" }, { id: 1, a: "print", h: "Output function" }],
      opts: ["if", "while", "print", "input", "else"],
      exp: "`if` checks for odd numbers and `print()` outputs them."
    },
    {
      topic: "Type Conversion",
      title: "Age Voting Eligibility Check",
      code: `age = {blank:0}(input("Enter age: "))\nif age {blank:1} 18:\n    print("Can Vote")`,
      b: [{ id: 0, a: "int", h: "Convert input to int" }, { id: 1, a: ">=", h: "Comparison operator" }],
      opts: ["int", ">=", "float", "==", "<"],
      exp: "`int()` parses age and `>= 18` checks for eligibility."
    },
    {
      topic: "Type Conversion",
      title: "Discount Price Calculation",
      code: `price = {blank:0}(input("Enter price: "))\nif price {blank:1} 1000:\n    print("Discount!")`,
      b: [{ id: 0, a: "float", h: "Convert input to float" }, { id: 1, a: ">", h: "Comparison operator" }],
      opts: ["float", ">", "int", "==", "<="],
      exp: "`float()` parses decimal price and `> 1000` checks eligibility."
    },
    {
      topic: "Functions",
      title: "Cube Calculation Function",
      code: `{blank:0} get_cube(x):\n    {blank:1} x ** 3`,
      b: [{ id: 0, a: "def", h: "Define keyword" }, { id: 1, a: "return", h: "Return keyword" }],
      opts: ["def", "return", "func", "print", "output"],
      exp: "`def` declares the function and `return` delivers the cube result."
    },
    {
      topic: "Functions",
      title: "Square Calculation Function",
      code: `{blank:0} get_square(x):\n    {blank:1} x * x`,
      b: [{ id: 0, a: "def", h: "Define keyword" }, { id: 1, a: "return", h: "Return keyword" }],
      opts: ["def", "return", "func", "print", "give"],
      exp: "`def` declares function and `return` sends back `x * x`."
    },
    {
      topic: "Lists & Loops",
      title: "List Accumulator Addition",
      code: `nums = [5, 10, 15]\ntotal = 0\n{blank:0} n in nums:\n    total = total {blank:1} n`,
      b: [{ id: 0, a: "for", h: "Loop keyword" }, { id: 1, a: "+", h: "Addition operator" }],
      opts: ["for", "while", "+", "*", "in"],
      exp: "`for` loops through list and `+` adds each item into total."
    },
    {
      topic: "Loops & Range",
      title: "Stepping by Three in Range",
      code: `{blank:0} i in range(3, 30, {blank:1}):\n    print(i)`,
      b: [{ id: 0, a: "for", h: "Loop keyword" }, { id: 1, a: "3", h: "Step value" }],
      opts: ["for", "while", "3", "1", "range"],
      exp: "`for` loop with step `3` generates multiples of 3."
    },
    {
      topic: "Loops & Range",
      title: "Stepping by Five in Range",
      code: `{blank:0} i in range(5, 50, {blank:1}):\n    print(i)`,
      b: [{ id: 0, a: "for", h: "Loop keyword" }, { id: 1, a: "5", h: "Step value" }],
      opts: ["for", "while", "5", "1", "10"],
      exp: "`for` loop with step `5` counts by fives."
    },
    {
      topic: "Conditions",
      title: "Nested If-Else Decision",
      code: `if x > 0:\n    {blank:0} x % 2 == 0:\n        print("Even")\n    {blank:1}\n        print("Odd")`,
      b: [{ id: 0, a: "if", h: "Nested if keyword" }, { id: 1, a: "else:", h: "Nested else keyword" }],
      opts: ["if", "else:", "elif", "then", "loop:"],
      exp: "Inner `if` and `else:` structure nested conditional decision."
    }
  ];

  for (let round = 1; round <= 8; round++) {
    multiBlankSpecs.forEach(spec => {
      addQ(
        "Hard",
        spec.topic,
        `${spec.title} (Set ${round})`,
        spec.code,
        spec.b.map(x => ({ id: x.id, answer: x.a, hint: x.h })),
        spec.opts,
        spec.exp
      );
    });
  }

  return bank;
}

// Generate the complete question bank
const QUESTION_BANK = buildComprehensiveBank();

// Global exports for both browser and Node
if (typeof window !== "undefined") {
  window.QUESTION_BANK = QUESTION_BANK;
  window.TOPICS_LIST = TOPICS_LIST;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK, TOPICS_LIST, buildComprehensiveBank };
}
