export const electionTimeline = [
  {
    phase: "Pre-Election",
    title: "Announcement & MCC",
    description: "The Election Commission of India (ECI) announces the election schedule including dates for nominations, polling, and counting. The Model Code of Conduct (MCC) comes into effect immediately — it restricts the ruling party from announcing new policies or projects, ensures government resources are not misused, and mandates equal treatment for all political parties.",
    icon: "Megaphone",
    color: "#eab308",
    details: [
      "MCC is not a statutory law but is enforced by convention and ECI's powers under Article 324.",
      "No new government schemes or financial grants can be announced after MCC starts.",
      "Ministers cannot combine official visits with election campaigning."
    ]
  },
  {
    phase: "Pre-Election",
    title: "Nominations",
    description: "Candidates file their nomination papers with the Returning Officer. They must submit an affidavit (Form 26) detailing their assets, liabilities, criminal cases, and educational qualifications. The Returning Officer scrutinizes the nominations and may reject invalid ones. Candidates can withdraw within the specified period.",
    icon: "FileText",
    color: "#f97316",
    details: [
      "A candidate must be at least 25 years old for Lok Sabha and state assemblies.",
      "Security deposit: ₹25,000 for general candidates, ₹12,500 for SC/ST candidates.",
      "If a candidate fails to secure 1/6th of valid votes, the deposit is forfeited."
    ]
  },
  {
    phase: "Election",
    title: "Campaigning",
    description: "Political parties and candidates conduct public rallies, door-to-door campaigns, distribute manifestos, and advertise through media. The EC monitors all campaign spending and advertisements. Campaigning must stop 48 hours before polling (known as the 'silence period') to allow voters to make undisturbed decisions.",
    icon: "Users",
    color: "#3b82f6",
    details: [
      "Expenditure limit: ₹95 lakh per Lok Sabha candidate, ₹40 lakh for Assembly.",
      "No appeals on the basis of religion, caste, race, or language are allowed.",
      "Exit polls cannot be published until the last phase of voting ends."
    ]
  },
  {
    phase: "Election",
    title: "Polling Day",
    description: "Voters visit their designated polling booths to cast votes using Electronic Voting Machines (EVMs). Polling hours are typically 7 AM to 6 PM. Every voter standing in the queue at closing time is entitled to vote. Voters can also choose NOTA (None Of The Above) if they don't wish to vote for any candidate.",
    icon: "Vote",
    color: "#22c55e",
    details: [
      "India uses a 3-unit EVM system: Ballot Unit (BU), Control Unit (CU), and VVPAT.",
      "Voters must carry an approved photo ID (Voter ID, Aadhaar, Passport, etc.).",
      "Indelible ink is applied on the left forefinger to prevent duplicate voting.",
      "Polling booths are required to be within 2 km of every habitation."
    ]
  },
  {
    phase: "Post-Election",
    title: "Counting & Results",
    description: "After all phases of polling are complete, EVMs are transported to a central counting center under tight security with CCTV monitoring. On counting day, the Returning Officer opens EVMs, and postal ballots are counted first. Results are declared constituency by constituency, and trends are shown live.",
    icon: "BarChart",
    color: "#a855f7",
    details: [
      "VVPAT slips of 5 random booths per constituency are matched with EVM totals.",
      "Any candidate can demand a recount if the margin is very slim.",
      "Counting usually begins at 8 AM and most results are declared by evening."
    ]
  },
  {
    phase: "Post-Election",
    title: "Government Formation",
    description: "The party or coalition that wins more than 50% of total seats (272 out of 543 in Lok Sabha) is invited by the President to form the government. The leader of the majority party is sworn in as the Prime Minister. If no single party wins a majority, the President may invite the largest party or coalition to prove its majority on the floor of the House.",
    icon: "Landmark",
    color: "#ef4444",
    details: [
      "The Council of Ministers is appointed by the President on the PM's advice.",
      "A new government must prove its majority within the time set by the President.",
      "The entire process, from announcement to swearing-in, takes about 2-3 months."
    ]
  }
];

export const voterGuideSteps = [
  {
    id: 1,
    title: "Check Voter Registration",
    description: "Ensure your name is on the electoral roll. You can verify this online at the National Voters' Services Portal (NVSP) at voters.eci.gov.in, through the Voter Helpline App (available on Android and iOS), or by sending an SMS to 1950. If your name is missing, you can apply for inclusion using Form 6 online or at your nearest ERO (Electoral Registration Officer) office.",
    tips: [
      "You must be 18 years or older on the qualifying date (January 1 of the revision year).",
      "NRI citizens can also register under Section 20A of the Representation of People Act.",
      "Check your details well in advance — at least 2–3 months before the election."
    ]
  },
  {
    id: 2,
    title: "Get your EPIC (Voter ID)",
    description: "The EPIC (Electors Photo Identity Card) is your primary voter identification. If you are 18 or older, apply for a Voter ID card using Form 6 at NVSP or the Voter Helpline App. Upload a recent passport-size photo, proof of address (Aadhaar, utility bill, bank passbook), and proof of age (birth certificate, Class 10 mark sheet). The BLO (Booth Level Officer) may visit your residence for verification.",
    tips: [
      "E-EPIC (digital version) can be downloaded from the Voter Helpline App.",
      "If you've moved to a new address, fill Form 6A for address change within the same constituency, or Form 6 for a new constituency.",
      "12 other documents are accepted as ID at polling stations (Aadhaar, Passport, PAN, etc.)."
    ]
  },
  {
    id: 3,
    title: "Find your Polling Booth",
    description: "Every voter is assigned a specific polling booth based on their address in the electoral roll. You can find your booth online at eci.gov.in, the Voter Helpline App, or by calling the toll-free helpline 1950. The Election Commission also distributes voter slips (with booth number, address, and serial number) through BLOs before the election. Each booth serves a maximum of approximately 1,500 voters.",
    tips: [
      "Your serial number on the voter slip speeds up verification at the booth.",
      "Polling stations are required to have basic amenities: ramps for disabled voters, drinking water, and shade.",
      "Familiarize yourself with the booth location beforehand to avoid confusion on polling day."
    ]
  },
  {
    id: 4,
    title: "Go to the Polling Station",
    description: "On polling day, arrive at your assigned polling station with a valid photo ID. Stand in the queue — separate queues are maintained for men, women, and senior citizens/disabled persons. Senior citizens (80+) and persons with disabilities can opt for postal ballot or be assisted at the booth. The First Polling Officer will check your name against the voter list and verify your photo ID.",
    tips: [
      "Polling hours are usually 7:00 AM to 6:00 PM (may vary in some states).",
      "You are legally entitled to a paid holiday on polling day — ask your employer.",
      "Carrying mobile phones inside the polling booth is strictly prohibited.",
      "If you're in the queue by 6 PM, you will be allowed to vote even after closing time."
    ]
  },
  {
    id: 5,
    title: "Ink, Register & Receive Slip",
    description: "After your identity is verified, the Second Polling Officer applies indelible ink on the nail of your left index finger. This ink contains silver nitrate and remains visible for about 4–6 weeks, preventing anyone from voting twice. You then sign or give your thumb impression in the voter register. The Third Polling Officer will issue you a voter slip and direct you to the voting compartment.",
    tips: [
      "The indelible ink is manufactured exclusively by Mysore Paints & Varnish Ltd, a government company.",
      "If your left index finger is missing, ink is applied on the next available finger.",
      "Your signature/thumb impression in the register serves as legal proof of voting."
    ]
  },
  {
    id: 6,
    title: "Cast Your Vote on EVM",
    description: "Enter the voting compartment which ensures complete secrecy. The EVM (Electronic Voting Machine) has a Ballot Unit displaying candidate names and party symbols. Press the blue button next to the candidate of your choice. When the vote is recorded, a red light glows on the Ballot Unit, a long beep sounds from the Control Unit, and the VVPAT slip is generated. If you don't wish to vote for any candidate, press the NOTA button at the bottom of the ballot unit.",
    tips: [
      "EVMs are standalone machines with no internet, Wi-Fi, or Bluetooth connectivity.",
      "Each EVM can record a maximum of 2,000 votes.",
      "The EVM allows only one vote at a time — a 'busy' mode activates after each vote for a few seconds.",
      "EVMs undergo First Level Checking (FLC) and multiple mock polls before deployment."
    ]
  },
  {
    id: 7,
    title: "Verify via VVPAT",
    description: "After pressing the button on the EVM, the VVPAT (Voter Verifiable Paper Audit Trail) machine generates a printed slip that is visible through a transparent window for exactly 7 seconds. This slip displays the serial number, name, and party symbol of the candidate you voted for. After 7 seconds, the slip is automatically cut and drops into a sealed box inside the VVPAT. This serves as an independent verification mechanism and a paper trail for audits.",
    tips: [
      "VVPAT was made mandatory by the Supreme Court of India in 2013.",
      "In case of a dispute, VVPAT paper slips are counted and matched with EVM results.",
      "Since 2019, VVPAT slips of 5 randomly selected booths per constituency are verified.",
      "If VVPAT and EVM counts don't match, the VVPAT count is considered final."
    ]
  },
  {
    id: 8,
    title: "After Voting — What Happens Next",
    description: "After you cast your vote, your left index finger with indelible ink serves as proof of voting. The EVMs and VVPATs are sealed in the presence of polling agents and transported to a strong room under armed escort with CCTV surveillance. The strong rooms remain sealed until counting day. On counting day, EVMs are opened one booth at a time, and votes are tallied. The Returning Officer declares the winner for each constituency.",
    tips: [
      "You can track live election results on the ECI's official website: results.eci.gov.in.",
      "Postal ballots (used by service personnel, government officials on duty, and senior citizens) are counted first.",
      "Any candidate or their agent can challenge the result by filing an election petition in the High Court within 45 days."
    ]
  }
];
