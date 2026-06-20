export const chapterInfo = {
  session: 'Session 8',
  chapter: 'Chương 3',
  title: 'Giá trị thặng dư trong nền kinh tế thị trường',
  subtitle: 'Kinh tế Chính trị Mác – Lênin',
  description:
    'Lý luận C. Mác về giá trị thặng dư, công thức chung của tư bản, hàng hóa sức lao động, tuần hoàn & chu chuyển tư bản — qua lý thuyết và trò chơi mô phỏng.',
}

export const tableOfContents = [
  'Lý luận của C. Mác về giá trị thặng dư',
  'Tích lũy tư bản',
  'Các hình thức biểu hiện của giá trị thặng dư trong nền kinh tế thị trường',
]

export const theoryParts = [
  {
    id: 'part1',
    part: 'Phần 1',
    title: 'Khái quát nguồn gốc giá trị thặng dư',
    sections: [
      {
        id: 'origin',
        icon: '📜',
        title: 'Mục 1.1 — Nguồn gốc của giá trị thặng dư',
        content: `**Mục 1.1.1. Công thức chung của tư bản**

Điều kiện ra đời sản xuất hàng hóa tư bản chủ nghĩa (TBCN):
- Tập trung một khoản **tiền lớn** và giao vào tay một số người
- **Bóc lột** sức lao động của người khác

**Tiền là gì?** Tiền là sản vật cuối cùng của lưu thông hàng hóa, đồng thời cũng là **hình thức biểu hiện đầu tiên của tư bản**.`,
      },
    ],
  },
  {
    id: 'part2',
    part: 'Phần 2',
    title: 'Công thức chung của tư bản & Sự khác biệt của tiền',
    sections: [
      {
        id: 'money-motion',
        icon: '🔄',
        title: 'Sự vận động của đồng tiền',
        content: `Trong **lưu thông hàng hóa đơn giản**: Tiền vận động theo **H — T — H** (Hàng — Tiền — Hàng).

Trong **lưu thông của tư bản**: Tiền vận động theo **T — H — T'** (Tiền — Hàng — Tiền).

**Giống nhau:** Đều có H và T; đều gồm hai hành vi đối lập Mua và Bán.

**Khác nhau — Biểu hiện bên ngoài:**
- Tiền thông thường: Bắt đầu **Bán** (H→T), kết thúc **Mua** (T→H)
- Tiền tư bản: Bắt đầu **Mua** (T→H), kết thúc **Bán** (H→T')

**Khác nhau — Bản chất bên trong:**
- H—T—H: Mục đích là **giá trị sử dụng** (VD: bán vải lấy tiền mua lương thực)
- T—H—T': Mục đích là **giá trị lớn hơn** → **T' = T + ΔT** (ΔT = giá trị thặng dư)`,
      },
      {
        id: 'capital-formulas',
        icon: '📐',
        title: 'Công thức chung của các loại tư bản',
        content: `**Công thức chung:** T — H — T'

- **Tư bản thương nghiệp:** T — H — T'
- **Tư bản công nghiệp:** T — H — H' — T'
- **Tư bản cho vay:** T — T'`,
      },
    ],
  },
  {
    id: 'part3',
    part: 'Phần 3',
    title: 'Hàng hóa sức lao động',
    sections: [
      {
        id: 'labor-power',
        icon: '👷',
        title: 'Khái niệm sức lao động & lao động',
        content: `**Sức lao động:** Toàn bộ năng lực thể chất và tinh thần tồn tại trong cơ thể con người đang sống, được đem vận dụng trong quá trình lao động.

**Lao động:** Sự vận dụng sức lao động vào quá trình sản xuất.

**Mục 1.1.2. Hàng hóa sức lao động**`,
      },
      {
        id: 'labor-conditions',
        icon: '⚖️',
        title: 'Điều kiện sức lao động trở thành hàng hóa',
        content: `- Người lao động **tự do về thân thể**, có quyền tự chủ và bán sức lao động như hàng hóa
- Người lao động **vô sản** (không có tư liệu sản xuất), buộc phải bán sức lao động để kiếm sống`,
      },
      {
        id: 'labor-value',
        icon: '💎',
        title: 'Giá trị hàng hóa sức lao động',
        content: `Quyết định bởi **thời gian lao động xã hội cần thiết** để sản xuất và tái sản xuất sức lao động.

**Ba bộ phận cấu thành giá trị sức lao động:**
- Giá trị tư liệu sinh hoạt cần thiết (vật chất, tinh thần) để **tái sản xuất** sức lao động
- **Phí tổn đào tạo** người lao động
- Giá trị tư liệu sinh hoạt để **nuôi con** người lao động

Bao hàm yếu tố **tinh thần** (văn hóa...) và **lịch sử** (phụ thuộc điều kiện từng nước).`,
      },
      {
        id: 'use-value',
        icon: '✨',
        title: 'Giá trị sử dụng của hàng hóa sức lao động',
        content: `Thể hiện trong quá trình **tiêu dùng sức lao động** (lao động của công nhân).

**Tính chất đặc biệt:** Là **nguồn gốc sinh ra giá trị**. Trong quá trình tiêu dùng, nó tạo ra giá trị mới **lớn hơn** giá trị bản thân — chìa khóa giải thích mâu thuẫn trong công thức T — H — T'.`,
      },
    ],
  },
  {
    id: 'part4',
    part: 'Phần 4',
    title: 'Sản xuất giá trị thặng dư & các khái niệm',
    sections: [
      {
        id: 'surplus-production',
        icon: '🧵',
        title: 'Mục 1.1.3 — Sự sản xuất giá trị thặng dư',
        content: `**Ví dụ:** Sản xuất 20kg sợi / 1 ngày (12 giờ)

**Chi phí (nhà tư bản bỏ ra):**
- Tiền mua bông: **$20**
- Hao mòn máy móc: **$4**
- Tiền mua sức lao động (12h): **$3**
- **Tổng chi phí: $27**

**Giá trị sản phẩm thu về (W'):**
- Giá trị bông chuyển vào sợi: $20
- Giá trị máy móc chuyển vào: $4
- Giá trị LĐ tạo ra (12h × $0.5/h): **$6**
- **Tổng W': $30**

**Kết luận: m = $30 − $27 = $3**

**Định nghĩa:** Giá trị thặng dư là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra và bị nhà tư bản chiếm đoạt — **lao động không công của công nhân**.`,
      },
      {
        id: 'c-and-v',
        icon: '⚙️',
        title: 'Mục 1.1.4 — Tư bản bất biến (c) & khả biến (v)',
        content: `**Tư bản bất biến (c):** Biến thành tư liệu sản xuất, giá trị **tái hiện** trong sản phẩm, **không thay đổi** về lượng.
- Nhà xưởng, máy móc, thiết bị
- Nguyên liệu, nhiên liệu, vật liệu phụ

**Tư bản khả biến (v):** Biến thành sức lao động, giá trị **tăng lên** trong sản xuất (giá trị sức lao động).`,
      },
      {
        id: 'wages',
        icon: '💵',
        title: 'Mục 1.1.5 — Tiền công trong CNTB',
        content: `**Bản chất:** Tiền công là **giá cả của hàng hóa sức lao động**.

Đó là bộ phận giá trị mới do chính hao phí lao động làm thuê tạo ra, nhưng thường bị hiểu lầm là do người mua sức lao động trả cho người làm thuê.`,
      },
    ],
  },
  {
    id: 'part5',
    part: 'Phần 5',
    title: 'Tuần hoàn, chu chuyển tư bản & đo lường bóc lột',
    sections: [
      {
        id: 'circulation',
        icon: '🔁',
        title: 'Mục 1.1.6 — Tuần hoàn và chu chuyển tư bản',
        content: `**Sơ đồ tuần hoàn:**
T — H ⟨ Sức lao động … Tư liệu sản xuất ⟩ … **SX** … H' — T'

**Chu chuyển tư bản:** Tuần hoàn được xét như quá trình **định kỳ, lặp đi lặp lại** và đổi mới theo thời gian.`,
      },
      {
        id: 'turnover-speed',
        icon: '⚡',
        title: 'Thời gian & Tốc độ chu chuyển',
        content: `**Thời gian chu chuyển** = Thời gian sản xuất + Thời gian lưu thông

**Tốc độ chu chuyển (N):** Số vòng quay trong 1 năm
**N = CH / ch** (vòng/năm)
- CH: Thời gian tư bản vận động trong 1 năm (365 ngày)
- ch: Thời gian một vòng quay`,
      },
      {
        id: 'fixed-fluid',
        icon: '🏭',
        title: 'Tư bản cố định & Tư bản lưu động',
        content: `**Tư bản cố định:** Tồn tại dưới hình thái tư liệu lao động (nhà xưởng, máy may...). Giá trị chỉ chuyển **dần dần** vào sản phẩm theo **hao mòn**.

**Tư bản lưu động:** Nguyên liệu, nhiên liệu, vật liệu phụ, tiền lương. Tiêu dùng **hoàn toàn** trong một chu kỳ, chuyển **toàn bộ** giá trị vào sản phẩm.`,
      },
      {
        id: 'm-rate',
        icon: '📊',
        title: 'Mục 1.2 — Tỷ suất giá trị thặng dư (m\')',
        content: `**Định nghĩa:** Tỷ số % giữa giá trị thặng dư với tư bản khả biến.

**m' = (m / v) × 100%**

**Hoặc:** m' = (Thời gian LĐ thặng dư / Thời gian LĐ tất yếu) × 100%

**Ý nghĩa:** Thể hiện **trình độ bóc lột** của nhà tư bản.

*Ví dụ sợi: m=3, v=3 → m'=100%*`,
      },
      {
        id: 'M-mass',
        icon: '📈',
        title: 'Khối lượng giá trị thặng dư (M)',
        content: `**Định nghĩa:** Tích số tỷ suất m' và tổng tư bản khả biến được sử dụng.

**M = m' × V** (V = tổng v)

**Ý nghĩa:** Thể hiện **quy mô** sự bóc lột.`,
      },
      {
        id: 'market-forms',
        icon: '🏛️',
        title: 'Biểu hiện trong nền kinh tế thị trường',
        content: `Giá trị thặng dư che đậy dưới hình thức **lợi nhuận, lãi suất, tiền thuê đất**.

Cạnh tranh → phân hóa tỷ suất lợi nhuận trung bình → **tích tụ và tập trung tư bản** → khủng hoảng thừa sản xuất định kỳ.`,
      },
    ],
  },
]

// Flat list for backward compatibility
export const theorySections = theoryParts.flatMap((p) =>
  p.sections.map((s) => ({ ...s, partTitle: p.title }))
)

export const formulas = [
  { symbol: "T'", name: 'Tiền tư bản sau chu kỳ', formula: "T' = T + ΔT" },
  { symbol: 'm', name: 'Giá trị thặng dư', formula: "m = W' − (c + v)" },
  { symbol: "m'", name: 'Tỷ suất giá trị thặng dư', formula: "m' = (m / v) × 100%" },
  { symbol: 'M', name: 'Khối lượng giá trị thặng dư', formula: "M = m' × V" },
  { symbol: 'N', name: 'Tốc độ chu chuyển', formula: 'N = CH / ch (vòng/năm)' },
  { symbol: 'ch', name: 'Thời gian chu chuyển', formula: 'ch = ts + tl' },
]

export const yarnExample = {
  title: 'Ví dụ sản xuất 20kg sợi (12 giờ)',
  cotton: 20,
  depreciation: 4,
  wage: 3,
  hours: 12,
  valuePerHour: 0.5,
  get c() { return this.cotton + this.depreciation },
  get v() { return this.wage },
  get cost() { return this.c + this.v },
  get newValue() { return this.valuePerHour * this.hours },
  get Wprime() { return this.c + this.newValue },
  get m() { return this.Wprime - this.cost },
  get mRate() { return this.v > 0 ? ((this.m / this.v) * 100).toFixed(0) : 0 },
}

export const capitalTypes = [
  {
    id: 'industrial',
    name: 'Tư bản công nghiệp',
    icon: '🏭',
    formula: 'T — H — H\' — T\'',
    description: 'Mua TSLĐ + TBCB → Sản xuất H\' → Bán thu T\'',
    hasProduction: true,
    defaultCotton: 20,
    defaultDepreciation: 4,
    valuePerHour: 0.5,
  },
  {
    id: 'commercial',
    name: 'Tư bản thương nghiệp',
    icon: '🛒',
    formula: 'T — H — T\'',
    description: 'Mua hàng (H) → Bán với giá cao hơn → T\'',
    hasProduction: false,
    markup: 0.15,
    purchaseRatio: 0.85,
  },
  {
    id: 'loan',
    name: 'Tư bản cho vay',
    icon: '🏦',
    formula: 'T — T\'',
    description: 'Cho vay tiền → Thu lãi → T\' (không qua sản xuất)',
    hasProduction: false,
    interestRate: 0.12,
  },
]

export const turnoverStages = [
  { id: 'T', name: 'T — Tiền ban đầu', type: 'start', icon: '💰', time: 0, desc: 'Nhà tư bản nắm giữ tư bản tiền tệ' },
  { id: 'buy-H', name: 'T → H: Mua SLĐ & TSLĐ', type: 'circulation', icon: '🛍️', time: 5, desc: 'Giai đoạn lưu thông: chuyển T thành H (sức lao động + tư liệu sản xuất)' },
  { id: 'SX', name: 'Sản xuất (SX)', type: 'production', icon: '🏭', time: 20, desc: 'Thời gian sản xuất: lao động tạo giá trị mới, sinh ra m' },
  { id: 'wear', name: 'Hao mòn tư bản cố định', type: 'obstacle', icon: '🔧', time: 0, desc: 'Máy móc hao mòn — giá trị c chuyển dần vào sản phẩm (tư bản cố định)' },
  { id: 'Hprime', name: "H' — Hàng hóa hoàn thành", type: 'production', icon: '📦', time: 3, desc: "W' = c + v + m — sản phẩm chứa giá trị thặng dư" },
  { id: 'sell', name: 'H\' → T\' : Bán hàng', type: 'circulation', icon: '🛒', time: 12, desc: 'Thời gian lưu thông: bán hàng hóa trên thị trường' },
  { id: 'collect', name: 'Thu tiền T\'', type: 'circulation', icon: '💵', time: 5, desc: "T' = T + ΔT — thu về nhiều tiền hơn ban đầu" },
  { id: 'repeat', name: 'Chu chuyển lặp lại', type: 'finish', icon: '🔁', time: 0, desc: 'Tuần hoàn định kỳ — N = CH/ch vòng/năm' },
]

export const quizQuestions = [
  {
    question: 'Điều kiện ra đời TBCN KHÔNG bao gồm:',
    options: ['Tập trung tiền lớn', 'Bóc lột sức lao động', 'Công hữu toàn dân TSLĐ', 'Giao tiền cho một số người'],
    correct: 2,
    explanation: 'TBCN cần tập trung tiền và bóc lột lao động; công hữu toàn dân TSLĐ là điều kiện xã hội chủ nghĩa.',
  },
  {
    question: 'Trong lưu thông hàng hóa đơn giản, tiền vận động theo:',
    options: ['T — H — T\'', 'H — T — H', 'T — T\'', 'H — H\''],
    correct: 1,
    explanation: 'Lưu thông hàng hóa đơn giản: H→T (bán) rồi T→H (mua) để thỏa mãn nhu cầu sử dụng.',
  },
  {
    question: 'Tiền tư bản khác tiền thông thường ở mục đích:',
    options: ['Giá trị sử dụng', 'Trao đổi tương đương', 'Giá trị lớn hơn (T\' > T)', 'Thanh toán nợ'],
    correct: 2,
    explanation: "T—H—T': mục đích là thu về T' = T + ΔT (giá trị thặng dư).",
  },
  {
    question: 'Công thức tư bản công nghiệp là:',
    options: ['T — H — T\'', 'T — T\'', 'T — H — H\' — T\'', 'H — T — H'],
    correct: 2,
    explanation: 'Tư bản công nghiệp có thêm giai đoạn sản xuất H\' trước khi bán.',
  },
  {
    question: 'Hàng hóa sức lao động có tính chất đặc biệt:',
    options: ['Giá trị không đổi', 'Nguồn gốc sinh ra giá trị mới', 'Không phải hàng hóa', 'Chỉ có giá trị sử dụng'],
    correct: 1,
    explanation: 'Sức lao động khi tiêu dùng (lao động) tạo giá trị mới lớn hơn giá trị bản thân.',
  },
  {
    question: 'Theo ví dụ sợi (c=24, v=3, W\'=30), giá trị thặng dư m = ?',
    options: ['$6', '$3', '$27', '$30'],
    correct: 1,
    explanation: 'm = W\' − (c+v) = 30 − 27 = $3.',
  },
  {
    question: 'Tư bản bất biến (c) bao gồm:',
    options: ['Tiền công', 'Nguyên liệu và hao mòn máy móc', 'Giá trị thặng dư', 'Lợi nhuận'],
    correct: 1,
    explanation: 'c gồm TSLĐ (nguyên liệu, máy móc...) — giá trị tái hiện, không tăng.',
  },
  {
    question: 'Bản chất tiền công trong CNTB là:',
    options: ['Phần thưởng từ nhà tư bản', 'Giá cả hàng hóa sức lao động', 'Tiền tài trợ', 'Thu nhập do may mắn'],
    correct: 1,
    explanation: 'Tiền công = giá cả của hàng hóa sức lao động, không phải toàn bộ giá trị lao động tạo ra.',
  },
  {
    question: 'Thời gian chu chuyển tư bản bằng:',
    options: ['Chỉ thời gian sản xuất', 'ts + tl (sản xuất + lưu thông)', '365 ngày', 'Thời gian nghỉ'],
    correct: 1,
    explanation: 'ch = thời gian sản xuất + thời gian lưu thông.',
  },
  {
    question: "Công thức tỷ suất m' đúng là:",
    options: ['m/c × 100%', 'm/v × 100%', 'v/m × 100%', 'M/V × 100%'],
    correct: 1,
    explanation: "m' = m/v × 100% — thể hiện trình độ bóc lột.",
  },
  {
    question: 'Khối lượng giá trị thặng dư M được tính:',
    options: ["M = m × v", "M = m' × V", 'M = c + v', 'M = T\' − T'],
    correct: 1,
    explanation: "M = m' × V — thể hiện quy mô bóc lột (V = tổng tư bản khả biến).",
  },
  {
    question: 'Tư bản cố định khác tư bản lưu động ở:',
    options: [
      'Chuyển toàn bộ giá trị ngay trong 1 chu kỳ',
      'Giá trị chuyển dần theo hao mòn',
      'Là tư bản khả biến',
      'Không tham gia sản xuất',
    ],
    correct: 1,
    explanation: 'TBCĐ (máy móc, nhà xưởng) hao mòn dần; TB lưu động chuyển hết giá trị mỗi chu kỳ.',
  },
]
