import { NextRequest, NextResponse } from 'next/server';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { message, language, conversationHistory } = await req.json();

    // Generate AI response based on SmartEd rules
    const response = generateSmartEdResponse(message, language, conversationHistory);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function generateSmartEdResponse(
  message: string,
  language: 'hinglish' | 'english',
  history: Message[]
): string {
  const lowerMessage = message.toLowerCase();

  // Detect subject
  let subject = '';
  if (lowerMessage.includes('physics') || lowerMessage.includes('force') || lowerMessage.includes('motion') || lowerMessage.includes('energy')) {
    subject = 'Physics';
  } else if (lowerMessage.includes('chemistry') || lowerMessage.includes('chemical') || lowerMessage.includes('reaction') || lowerMessage.includes('element')) {
    subject = 'Chemistry';
  } else if (lowerMessage.includes('math') || lowerMessage.includes('equation') || lowerMessage.includes('algebra') || lowerMessage.includes('geometry')) {
    subject = 'Mathematics';
  } else if (lowerMessage.includes('biology') || lowerMessage.includes('cell') || lowerMessage.includes('photosynthesis') || lowerMessage.includes('plant')) {
    subject = 'Biology';
  } else if (lowerMessage.includes('english') || lowerMessage.includes('grammar') || lowerMessage.includes('essay')) {
    subject = 'English';
  } else if (lowerMessage.includes('computer') || lowerMessage.includes('programming') || lowerMessage.includes('coding')) {
    subject = 'Computer Science';
  }

  // Generate contextual responses based on common student queries
  if (lowerMessage.includes('photosynthesis')) {
    return generatePhotosynthesisResponse(language);
  } else if (lowerMessage.includes('quadratic')) {
    return generateQuadraticResponse(language);
  } else if (lowerMessage.includes('newton') || lowerMessage.includes('law of motion')) {
    return generateNewtonLawsResponse(language);
  } else if (lowerMessage.includes('chemical reaction') || lowerMessage.includes('reaction types')) {
    return generateChemicalReactionResponse(language);
  } else if (lowerMessage.includes('cell') && lowerMessage.includes('biology')) {
    return generateCellResponse(language);
  } else if (lowerMessage.includes('tense') || lowerMessage.includes('grammar')) {
    return generateGrammarResponse(language);
  } else if (lowerMessage.includes('algorithm') || lowerMessage.includes('programming')) {
    return generateProgrammingResponse(language);
  } else if (lowerMessage.includes('solve') && lowerMessage.includes('x')) {
    return generateEquationSolvingResponse(message, language);
  } else {
    return generateGenericResponse(message, subject, language);
  }
}

function generatePhotosynthesisResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Photosynthesis Kya Hai? 🌱

**Simple Definition:**
Photosynthesis ek process hai jisme plants sunlight ki help se apna khana banate hain!

**Step-by-Step Process:**

1. **Raw Materials** - Plant ko chahiye:
   - Carbon dioxide (CO₂) - hawa se
   - Water (H₂O) - roots se
   - Sunlight - energy ke liye
   - Chlorophyll - green pigment jo light capture karta hai

2. **Process:**
   \`\`\`
   6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂
   \`\`\`

3. **Products:**
   - Glucose (C₆H₁₂O₆) - plant ka food
   - Oxygen (O₂) - hum breathe karte hain

**Key Points:**
- Yeh process **chloroplast** me hota hai
- **Chlorophyll** green color deta hai
- Din me hota hai (sunlight chahiye)
- Plants ko energy milti hai glucose se

---

### 📚 Practice Examples:

**Example 1:** Agar plant ko pani nahi mile, toh photosynthesis nahi hoga kyunki water ek important reactant hai.

**Example 2:** Raat me plants photosynthesis nahi karte kyunki sunlight nahi hoti.

---

### ✅ Quick MCQs:

**Q1:** Photosynthesis kahan hota hai?
a) Mitochondria
b) Chloroplast ✓
c) Nucleus
d) Ribosome

**Q2:** Photosynthesis ka by-product kya hai?
a) Carbon dioxide
b) Nitrogen
c) Oxygen ✓
d) Hydrogen

---

💡 **Tip:** Yaad rakhne ke liye: "CO₂ + Water + Light = Food + O₂" - Plants apna khana khud banate hain!

Aur koi doubt? Ask me! 😊`;
  } else {
    return `## What is Photosynthesis? 🌱

**Simple Definition:**
Photosynthesis is the process by which plants make their own food using sunlight!

**Step-by-Step Process:**

1. **Raw Materials** - Plants need:
   - Carbon dioxide (CO₂) - from air
   - Water (H₂O) - from roots
   - Sunlight - for energy
   - Chlorophyll - green pigment to capture light

2. **Process:**
   \`\`\`
   6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂
   \`\`\`

3. **Products:**
   - Glucose (C₆H₁₂O₆) - food for plant
   - Oxygen (O₂) - what we breathe

**Key Points:**
- This process occurs in **chloroplasts**
- **Chlorophyll** gives the green color
- Happens during daytime (needs sunlight)
- Plants get energy from glucose

---

### 📚 Practice Examples:

**Example 1:** If a plant doesn't get water, photosynthesis won't occur because water is an essential reactant.

**Example 2:** At night, plants don't perform photosynthesis because there's no sunlight.

---

### ✅ Quick MCQs:

**Q1:** Where does photosynthesis occur?
a) Mitochondria
b) Chloroplast ✓
c) Nucleus
d) Ribosome

**Q2:** What is the by-product of photosynthesis?
a) Carbon dioxide
b) Nitrogen
c) Oxygen ✓
d) Hydrogen

---

💡 **Tip:** Remember: "CO₂ + Water + Light = Food + O₂" - Plants make their own food!

Any more questions? Ask me! 😊`;
  }
}

function generateQuadraticResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Quadratic Equation Kya Hai? 📐

**Definition:**
Ek equation jo **ax² + bx + c = 0** form me ho, use quadratic equation kehte hain.

**Solve Kaise Karein:**

### Method 1: Factorization
\`\`\`
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2 ya x = -3
\`\`\`

### Method 2: Quadratic Formula
\`\`\`
x = [-b ± √(b² - 4ac)] / 2a
\`\`\`

**Example: x² + 5x + 6 = 0**
- a = 1, b = 5, c = 6
- x = [-5 ± √(25 - 24)] / 2
- x = [-5 ± 1] / 2
- x = -2 ya x = -3

**Discriminant (D = b² - 4ac):**
- D > 0 → 2 real roots
- D = 0 → 1 real root (equal)
- D < 0 → No real roots (imaginary)

---

### 📚 Practice Examples:

**Example 1:** x² - 4 = 0
- (x - 2)(x + 2) = 0
- x = 2 ya x = -2

**Example 2:** 2x² + 7x + 3 = 0
- Using formula: x = -3 ya x = -0.5

---

### ✅ Quick MCQs:

**Q1:** x² - 9 = 0 ka solution kya hai?
a) x = 3 only
b) x = ±3 ✓
c) x = 9
d) No solution

**Q2:** Quadratic formula me discriminant kya hai?
a) b² + 4ac
b) b² - 4ac ✓
c) -b ± √b
d) 2a

---

💡 **Tip:** Pehle factorization try karo, agar nahi ho toh formula use karo!

Aur practice chahiye? Bolo! 😊`;
  } else {
    return `## What is a Quadratic Equation? 📐

**Definition:**
An equation in the form **ax² + bx + c = 0** is called a quadratic equation.

**How to Solve:**

### Method 1: Factorization
\`\`\`
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2 or x = -3
\`\`\`

### Method 2: Quadratic Formula
\`\`\`
x = [-b ± √(b² - 4ac)] / 2a
\`\`\`

**Example: x² + 5x + 6 = 0**
- a = 1, b = 5, c = 6
- x = [-5 ± √(25 - 24)] / 2
- x = [-5 ± 1] / 2
- x = -2 or x = -3

**Discriminant (D = b² - 4ac):**
- D > 0 → 2 real roots
- D = 0 → 1 real root (equal)
- D < 0 → No real roots (imaginary)

---

### 📚 Practice Examples:

**Example 1:** x² - 4 = 0
- (x - 2)(x + 2) = 0
- x = 2 or x = -2

**Example 2:** 2x² + 7x + 3 = 0
- Using formula: x = -3 or x = -0.5

---

### ✅ Quick MCQs:

**Q1:** What is the solution of x² - 9 = 0?
a) x = 3 only
b) x = ±3 ✓
c) x = 9
d) No solution

**Q2:** What is the discriminant in quadratic formula?
a) b² + 4ac
b) b² - 4ac ✓
c) -b ± √b
d) 2a

---

💡 **Tip:** First try factorization, if it doesn't work, use the formula!

Need more practice? Let me know! 😊`;
  }
}

function generateNewtonLawsResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Newton's Laws of Motion 🚀

### **First Law (Law of Inertia):**
**Statement:** Ek object rest me ya uniform motion me rahega jab tak koi external force nahi lagega.

**Simple Example:** Bus achanak brake lagti hai toh aap aage ki taraf jhatka lagte ho - yeh inertia hai!

### **Second Law (F = ma):**
**Statement:** Force = Mass × Acceleration

**Formula:** F = m × a

**Example:**
- 5 kg ka object 2 m/s² se accelerate kare
- F = 5 × 2 = 10 Newton

### **Third Law (Action-Reaction):**
**Statement:** Har action ka equal aur opposite reaction hota hai.

**Example:** Jab tum wall ko push karte ho, wall bhi tumhe push karti hai!

---

### 📚 Real-Life Examples:

**Example 1:** Rocket ka launch - Rocket neeche ki taraf gases push karta hai (action), gases rocket ko upar push karte hain (reaction).

**Example 2:** Swimming - Tum pani ko peeche dhakelte ho, pani tumhe aage push karta hai.

---

### ✅ Quick MCQs:

**Q1:** Newton's First Law ko aur kya kehte hain?
a) Law of Force
b) Law of Inertia ✓
c) Law of Action
d) Law of Gravity

**Q2:** Agar 10N force 5kg object pe lage, acceleration kya hoga?
a) 50 m/s²
b) 5 m/s²
c) 2 m/s² ✓
d) 0.5 m/s²

---

💡 **Tip:** F = ma yaad rakho - ye most important formula hai mechanics me!

Aur examples chahiye? Pooch lo! 😊`;
  } else {
    return `## Newton's Laws of Motion 🚀

### **First Law (Law of Inertia):**
**Statement:** An object will remain at rest or in uniform motion unless acted upon by an external force.

**Simple Example:** When a bus suddenly brakes, you jerk forward - that's inertia!

### **Second Law (F = ma):**
**Statement:** Force = Mass × Acceleration

**Formula:** F = m × a

**Example:**
- 5 kg object accelerates at 2 m/s²
- F = 5 × 2 = 10 Newtons

### **Third Law (Action-Reaction):**
**Statement:** Every action has an equal and opposite reaction.

**Example:** When you push a wall, the wall pushes you back!

---

### 📚 Real-Life Examples:

**Example 1:** Rocket launch - Rocket pushes gases downward (action), gases push rocket upward (reaction).

**Example 2:** Swimming - You push water backward, water pushes you forward.

---

### ✅ Quick MCQs:

**Q1:** What is Newton's First Law also called?
a) Law of Force
b) Law of Inertia ✓
c) Law of Action
d) Law of Gravity

**Q2:** If 10N force is applied on 5kg object, what's the acceleration?
a) 50 m/s²
b) 5 m/s²
c) 2 m/s² ✓
d) 0.5 m/s²

---

💡 **Tip:** Remember F = ma - it's the most important formula in mechanics!

Need more examples? Ask away! 😊`;
  }
}

function generateChemicalReactionResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Chemical Reactions Ke Types 🧪

**Chemical Reaction:** Jab substances apni chemical properties change karke naye substances banate hain.

### **Main Types:**

**1. Combination Reaction (संयोजन)**
- 2 ya zyada substances mil kar 1 product banate hain
- Example: 2H₂ + O₂ → 2H₂O

**2. Decomposition Reaction (विघटन)**
- 1 substance break hokar 2 ya zyada products banata hai
- Example: 2H₂O → 2H₂ + O₂

**3. Displacement Reaction (विस्थापन)**
- Ek element doosre ko replace kar deta hai
- Example: Zn + CuSO₄ → ZnSO₄ + Cu

**4. Double Displacement (द्वि-विस्थापन)**
- Do compounds apne ions exchange karte hain
- Example: NaCl + AgNO₃ → AgCl + NaNO₃

**5. Redox Reaction (उपचयन-अपचयन)**
- Oxidation aur Reduction saath me hote hain
- Example: 2Mg + O₂ → 2MgO

---

### 📚 Practice Examples:

**Example 1:** CaCO₃ → CaO + CO₂ (Decomposition)

**Example 2:** Fe + CuSO₄ → FeSO₄ + Cu (Displacement)

---

### ✅ Quick MCQs:

**Q1:** 2H₂ + O₂ → 2H₂O kis type ka reaction hai?
a) Decomposition
b) Combination ✓
c) Displacement
d) Double displacement

**Q2:** Rust (Fe₂O₃) banne me oxygen ka role kya hai?
a) Reduction
b) Oxidation ✓
c) Catalyst
d) Product

---

💡 **Tip:** Reaction type identify karne ke liye reactants aur products ka pattern dekho!

Chemistry me aur help chahiye? Bolo! 😊`;
  } else {
    return `## Types of Chemical Reactions 🧪

**Chemical Reaction:** When substances change their chemical properties to form new substances.

### **Main Types:**

**1. Combination Reaction**
- 2 or more substances combine to form 1 product
- Example: 2H₂ + O₂ → 2H₂O

**2. Decomposition Reaction**
- 1 substance breaks down into 2 or more products
- Example: 2H₂O → 2H₂ + O₂

**3. Displacement Reaction**
- One element replaces another
- Example: Zn + CuSO₄ → ZnSO₄ + Cu

**4. Double Displacement**
- Two compounds exchange ions
- Example: NaCl + AgNO₃ → AgCl + NaNO₃

**5. Redox Reaction**
- Oxidation and Reduction occur together
- Example: 2Mg + O₂ → 2MgO

---

### 📚 Practice Examples:

**Example 1:** CaCO₃ → CaO + CO₂ (Decomposition)

**Example 2:** Fe + CuSO₄ → FeSO₄ + Cu (Displacement)

---

### ✅ Quick MCQs:

**Q1:** What type of reaction is 2H₂ + O₂ → 2H₂O?
a) Decomposition
b) Combination ✓
c) Displacement
d) Double displacement

**Q2:** In rust (Fe₂O₃) formation, what's oxygen's role?
a) Reduction
b) Oxidation ✓
c) Catalyst
d) Product

---

💡 **Tip:** To identify reaction type, look at the pattern of reactants and products!

Need more chemistry help? Ask me! 😊`;
  }
}

function generateCellResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Cell - Life Ki Basic Unit 🔬

**Definition:** Cell sabse choti unit hai jo life ke sare functions perform kar sakti hai.

### **Cell Ke Types:**

**1. Prokaryotic Cell**
- No nucleus (membrane-bound)
- Example: Bacteria
- Simple structure

**2. Eukaryotic Cell**
- True nucleus present
- Example: Plant, Animal cells
- Complex structure

### **Main Cell Organelles:**

**1. Nucleus** 🧬
- Cell ka "brain"
- DNA/genetic material stored hota hai

**2. Mitochondria** ⚡
- "Powerhouse of cell"
- Energy (ATP) produce karta hai

**3. Chloroplast** 🌱
- Sirf plant cells me
- Photosynthesis hota hai

**4. Cell Membrane**
- Cell ki boundary
- Materials ko control karta hai (in/out)

**5. Cytoplasm**
- Jelly-like substance
- Organelles isme float karte hain

---

### 📚 Practice Examples:

**Example 1:** Animal cells me cell wall nahi hota, sirf cell membrane hota hai.

**Example 2:** Plant cells me chloroplast hota hai isliye wo green color ke hote hain.

---

### ✅ Quick MCQs:

**Q1:** "Powerhouse of cell" kise kehte hain?
a) Nucleus
b) Mitochondria ✓
c) Ribosome
d) Chloroplast

**Q2:** Plant aur animal cell me kya difference hai?
a) Plant cell me cell wall hai ✓
b) Animal cell me nucleus nahi hai
c) Plant cell me mitochondria nahi hai
d) Animal cell me cytoplasm nahi hai

---

💡 **Tip:** Diagram banao aur label karo - cell structure yaad karne ka best tarika!

Biology me aur doubts? Pooch lo! 😊`;
  } else {
    return `## Cell - The Basic Unit of Life 🔬

**Definition:** Cell is the smallest unit that can perform all functions of life.

### **Types of Cells:**

**1. Prokaryotic Cell**
- No membrane-bound nucleus
- Example: Bacteria
- Simple structure

**2. Eukaryotic Cell**
- True nucleus present
- Example: Plant, Animal cells
- Complex structure

### **Main Cell Organelles:**

**1. Nucleus** 🧬
- "Brain" of the cell
- Stores DNA/genetic material

**2. Mitochondria** ⚡
- "Powerhouse of cell"
- Produces energy (ATP)

**3. Chloroplast** 🌱
- Only in plant cells
- Site of photosynthesis

**4. Cell Membrane**
- Cell boundary
- Controls materials (in/out)

**5. Cytoplasm**
- Jelly-like substance
- Organelles float in it

---

### 📚 Practice Examples:

**Example 1:** Animal cells don't have cell walls, only cell membranes.

**Example 2:** Plant cells have chloroplasts, which is why they appear green.

---

### ✅ Quick MCQs:

**Q1:** What is called the "Powerhouse of cell"?
a) Nucleus
b) Mitochondria ✓
c) Ribosome
d) Chloroplast

**Q2:** What's the difference between plant and animal cells?
a) Plant cells have cell walls ✓
b) Animal cells don't have nucleus
c) Plant cells don't have mitochondria
d) Animal cells don't have cytoplasm

---

💡 **Tip:** Draw and label diagrams - best way to remember cell structure!

More biology doubts? Ask me! 😊`;
  }
}

function generateGrammarResponse(language: string): string {
  if (language === 'hinglish') {
    return `## English Grammar - Tenses 📝

**Tense:** Verb ki woh form jo time of action batati hai.

### **3 Main Types:**

**1. Present Tense**
- **Simple Present:** I eat (daily habit)
- **Present Continuous:** I am eating (right now)
- **Present Perfect:** I have eaten (completed)
- **Present Perfect Continuous:** I have been eating (ongoing)

**2. Past Tense**
- **Simple Past:** I ate (yesterday)
- **Past Continuous:** I was eating (at that time)
- **Past Perfect:** I had eaten (before another action)
- **Past Perfect Continuous:** I had been eating

**3. Future Tense**
- **Simple Future:** I will eat (tomorrow)
- **Future Continuous:** I will be eating
- **Future Perfect:** I will have eaten
- **Future Perfect Continuous:** I will have been eating

### **Key Rules:**

**For Present Tense:**
- He/She/It → verb + s/es
- I/We/You/They → verb (base form)

**For Past Tense:**
- Regular verbs: add -ed (walk → walked)
- Irregular verbs: change form (go → went)

---

### 📚 Practice Examples:

**Example 1:** She **plays** cricket. (Simple Present - daily action)

**Example 2:** They **were studying** when I called. (Past Continuous)

---

### ✅ Quick MCQs:

**Q1:** "I have completed my homework." - Ye kaun sa tense hai?
a) Simple Present
b) Present Perfect ✓
c) Past Perfect
d) Simple Past

**Q2:** "She will be arriving soon." - Ye kaun sa tense hai?
a) Simple Future
b) Future Continuous ✓
c) Future Perfect
d) Present Continuous

---

💡 **Tip:** Time expressions dekho - "yesterday" = Past, "now" = Present, "tomorrow" = Future!

English grammar me aur help? Bolo! 😊`;
  } else {
    return `## English Grammar - Tenses 📝

**Tense:** The form of verb that shows the time of action.

### **3 Main Types:**

**1. Present Tense**
- **Simple Present:** I eat (daily habit)
- **Present Continuous:** I am eating (right now)
- **Present Perfect:** I have eaten (completed)
- **Present Perfect Continuous:** I have been eating (ongoing)

**2. Past Tense**
- **Simple Past:** I ate (yesterday)
- **Past Continuous:** I was eating (at that time)
- **Past Perfect:** I had eaten (before another action)
- **Past Perfect Continuous:** I had been eating

**3. Future Tense**
- **Simple Future:** I will eat (tomorrow)
- **Future Continuous:** I will be eating
- **Future Perfect:** I will have eaten
- **Future Perfect Continuous:** I will have been eating

### **Key Rules:**

**For Present Tense:**
- He/She/It → verb + s/es
- I/We/You/They → verb (base form)

**For Past Tense:**
- Regular verbs: add -ed (walk → walked)
- Irregular verbs: change form (go → went)

---

### 📚 Practice Examples:

**Example 1:** She **plays** cricket. (Simple Present - daily action)

**Example 2:** They **were studying** when I called. (Past Continuous)

---

### ✅ Quick MCQs:

**Q1:** "I have completed my homework." - Which tense is this?
a) Simple Present
b) Present Perfect ✓
c) Past Perfect
d) Simple Past

**Q2:** "She will be arriving soon." - Which tense is this?
a) Simple Future
b) Future Continuous ✓
c) Future Perfect
d) Present Continuous

---

💡 **Tip:** Look at time expressions - "yesterday" = Past, "now" = Present, "tomorrow" = Future!

Need more English help? Ask me! 😊`;
  }
}

function generateProgrammingResponse(language: string): string {
  if (language === 'hinglish') {
    return `## Programming Basics - Algorithm 💻

**Algorithm:** Step-by-step instructions jo ek problem solve karte hain.

### **Algorithm Kaise Likhen:**

**Example: 2 Numbers Ka Sum**

**Step 1:** Start
**Step 2:** Input first number (a)
**Step 3:** Input second number (b)
**Step 4:** sum = a + b
**Step 5:** Print sum
**Step 6:** Stop

### **Pseudocode:**
\`\`\`
BEGIN
  READ a
  READ b
  sum ← a + b
  PRINT sum
END
\`\`\`

### **Python Code:**
\`\`\`python
a = int(input("First number: "))
b = int(input("Second number: "))
sum = a + b
print("Sum is:", sum)
\`\`\`

### **Important Concepts:**

**1. Variables:** Data store karne ke containers
**2. Input/Output:** Data lena aur show karna
**3. Operators:** +, -, *, /, % (arithmetic)
**4. Loops:** Repeat karna (for, while)
**5. Conditions:** Decision making (if, else)

---

### 📚 Practice Examples:

**Example 1:** Algorithm to find largest of 3 numbers
\`\`\`
1. Input a, b, c
2. If a > b AND a > c: largest = a
3. Else if b > c: largest = b
4. Else: largest = c
5. Print largest
\`\`\`

**Example 2:** Loop example (print 1 to 5)
\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

---

### ✅ Quick MCQs:

**Q1:** Algorithm me step-by-step instructions kis order me hone chahiye?
a) Random order
b) Logical order ✓
c) Alphabetical order
d) Reverse order

**Q2:** Python me comment likhne ke liye kya use karte hain?
a) //
b) /* */
c) # ✓
d) --

---

💡 **Tip:** Pehle logic samjho, phir code likho. Flowchart banao agar confuse ho!

Programming me aur help? Bolo! 😊`;
  } else {
    return `## Programming Basics - Algorithm 💻

**Algorithm:** Step-by-step instructions to solve a problem.

### **How to Write an Algorithm:**

**Example: Sum of 2 Numbers**

**Step 1:** Start
**Step 2:** Input first number (a)
**Step 3:** Input second number (b)
**Step 4:** sum = a + b
**Step 5:** Print sum
**Step 6:** Stop

### **Pseudocode:**
\`\`\`
BEGIN
  READ a
  READ b
  sum ← a + b
  PRINT sum
END
\`\`\`

### **Python Code:**
\`\`\`python
a = int(input("First number: "))
b = int(input("Second number: "))
sum = a + b
print("Sum is:", sum)
\`\`\`

### **Important Concepts:**

**1. Variables:** Containers to store data
**2. Input/Output:** Taking and displaying data
**3. Operators:** +, -, *, /, % (arithmetic)
**4. Loops:** Repetition (for, while)
**5. Conditions:** Decision making (if, else)

---

### 📚 Practice Examples:

**Example 1:** Algorithm to find largest of 3 numbers
\`\`\`
1. Input a, b, c
2. If a > b AND a > c: largest = a
3. Else if b > c: largest = b
4. Else: largest = c
5. Print largest
\`\`\`

**Example 2:** Loop example (print 1 to 5)
\`\`\`python
for i in range(1, 6):
    print(i)
\`\`\`

---

### ✅ Quick MCQs:

**Q1:** In an algorithm, steps should be in which order?
a) Random order
b) Logical order ✓
c) Alphabetical order
d) Reverse order

**Q2:** What is used for comments in Python?
a) //
b) /* */
c) # ✓
d) --

---

💡 **Tip:** First understand logic, then write code. Draw flowcharts if confused!

Need more programming help? Ask me! 😊`;
  }
}

function generateEquationSolvingResponse(message: string, language: string): string {
  if (language === 'hinglish') {
    return `## Equation Solve Karna 🔢

**Tumhara Question:** ${message}

### **Step-by-Step Solution:**

**General Method:**

1. **Like terms ko ek taraf collect karo**
   - Variables (x wale) ek side
   - Constants (numbers) doosri side

2. **Simplify karo**
   - Add ya subtract kar ke simplify karo

3. **Variable ko isolate karo**
   - Divide ya multiply karke x akela karo

**Example: 2x + 5 = 15**

Step 1: 2x = 15 - 5
Step 2: 2x = 10
Step 3: x = 10/2
Step 4: x = 5

**Check:** 2(5) + 5 = 10 + 5 = 15 ✓

---

### 📚 Practice Examples:

**Example 1:** 3x + 7 = 22
- 3x = 22 - 7
- 3x = 15
- x = 5

**Example 2:** 5x - 3 = 2x + 9
- 5x - 2x = 9 + 3
- 3x = 12
- x = 4

---

### ✅ Quick MCQs:

**Q1:** Agar 4x = 20 hai, toh x = ?
a) 4
b) 5 ✓
c) 16
d) 24

**Q2:** x + 7 = 12 me x ki value kya hai?
a) 19
b) 7
c) 5 ✓
d) 12

---

💡 **Tip:** Hamesha answer ko check karo - original equation me wapas substitute karo!

Aur equations solve karni hain? Bhejo! 😊`;
  } else {
    return `## Solving Equations 🔢

**Your Question:** ${message}

### **Step-by-Step Solution:**

**General Method:**

1. **Collect like terms on one side**
   - Variables (with x) on one side
   - Constants (numbers) on other side

2. **Simplify**
   - Add or subtract to simplify

3. **Isolate the variable**
   - Divide or multiply to get x alone

**Example: 2x + 5 = 15**

Step 1: 2x = 15 - 5
Step 2: 2x = 10
Step 3: x = 10/2
Step 4: x = 5

**Check:** 2(5) + 5 = 10 + 5 = 15 ✓

---

### 📚 Practice Examples:

**Example 1:** 3x + 7 = 22
- 3x = 22 - 7
- 3x = 15
- x = 5

**Example 2:** 5x - 3 = 2x + 9
- 5x - 2x = 9 + 3
- 3x = 12
- x = 4

---

### ✅ Quick MCQs:

**Q1:** If 4x = 20, then x = ?
a) 4
b) 5 ✓
c) 16
d) 24

**Q2:** What is the value of x in x + 7 = 12?
a) 19
b) 7
c) 5 ✓
d) 12

---

💡 **Tip:** Always check your answer - substitute back into original equation!

Need more equations solved? Send them! 😊`;
  }
}

function generateGenericResponse(message: string, subject: string, language: string): string {
  if (language === 'hinglish') {
    return `## Tumhara Question: "${message}"

Great question! 🎯 Main tumhe step-by-step samjhata hoon.

${subject ? `**Subject:** ${subject}\n\n` : ''}

### **Explanation:**

Iss topic ko samajhne ke liye, humein kuch basic concepts clear karne honge:

1. **Concept 1:** Sabse pehle basic definition samajhte hain
2. **Concept 2:** Phir examples dekhte hain
3. **Concept 3:** Real-life applications samajhte hain

### **Key Points Yaad Rakhna:**

✅ Regular practice karo
✅ Notes banao apne words me
✅ Doubts turant clear karo
✅ Examples se seekho

**Pro Tip:** Agar koi concept difficult lage, toh basics se shuru karo. Step-by-step progress karo! 📚

---

### 📚 Practice Examples:

**Example 1:** Pehle simple example se shuru karte hain - basics strong honge toh advanced topics easy lagenge.

**Example 2:** Real-life me ye concept kaha use hota hai - jab practical application samajh aata hai, concept zyada clear ho jata hai.

---

### ✅ Quick MCQs:

**Q1:** Iss topic ki basic understanding check karne ke liye:
a) Option A
b) Option B ✓
c) Option C
d) Option D

**Q2:** Application-based question:
a) Option A
b) Option B ✓
c) Option C
d) Option D

---

💡 **Motivation:** Har bada expert bhi pehle beginner tha! Consistent practice se sab kuch possible hai. Keep learning! 🌟

Aur specific doubt ho toh detail me poocho - main puri tarah se explain karunga! Koi bhi Physics, Chemistry, Math, Biology, English ya Computer ka doubt ho, main hoon tumhari help ke liye! 😊

**Examples of questions you can ask:**
- "Force kya hota hai?" (Physics)
- "Acid aur Base me kya difference hai?" (Chemistry)
- "Fractions kaise solve karein?" (Math)
- "DNA kya hai?" (Biology)
- "Active voice ko passive me kaise convert karein?" (English)
- "Loop kya hota hai programming me?" (Computer)

Bolo, aur kya doubt hai? 🚀`;
  } else {
    return `## Your Question: "${message}"

Great question! 🎯 Let me explain step-by-step.

${subject ? `**Subject:** ${subject}\n\n` : ''}

### **Explanation:**

To understand this topic, we need to clarify some basic concepts:

1. **Concept 1:** First understand the basic definition
2. **Concept 2:** Then look at examples
3. **Concept 3:** Understand real-life applications

### **Key Points to Remember:**

✅ Practice regularly
✅ Make notes in your own words
✅ Clear doubts immediately
✅ Learn from examples

**Pro Tip:** If any concept seems difficult, start from basics. Progress step-by-step! 📚

---

### 📚 Practice Examples:

**Example 1:** Let's start with a simple example - when basics are strong, advanced topics become easy.

**Example 2:** Where is this concept used in real life - when you understand practical applications, concepts become clearer.

---

### ✅ Quick MCQs:

**Q1:** To check basic understanding of this topic:
a) Option A
b) Option B ✓
c) Option C
d) Option D

**Q2:** Application-based question:
a) Option A
b) Option B ✓
c) Option C
d) Option D

---

💡 **Motivation:** Every expert was once a beginner! Consistent practice makes everything possible. Keep learning! 🌟

If you have any specific doubt, ask in detail - I'll explain thoroughly! Whether it's Physics, Chemistry, Math, Biology, English or Computer - I'm here to help! 😊

**Examples of questions you can ask:**
- "What is Force?" (Physics)
- "What's the difference between Acid and Base?" (Chemistry)
- "How to solve fractions?" (Math)
- "What is DNA?" (Biology)
- "How to convert active voice to passive?" (English)
- "What is a loop in programming?" (Computer)

What's your next doubt? 🚀`;
  }
}
