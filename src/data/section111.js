export const section111Info = {
  section: 'Mục 1.1.1',
  title: 'Công thức chung của tư bản',
  parent: 'Mục 1.1 — Nguồn gốc của giá trị thặng dư',
  course: 'MLN122 · Kinh tế Chính trị Mác – Lênin · Session 8',
}

export const tbcnConditions = [
  {
    icon: '💰',
    title: 'Tập trung tiền lớn',
    desc: 'Một khoản tiền đủ lớn được tập trung và giao vào tay một số người.',
  },
  {
    icon: '⛓️',
    title: 'Bóc lột sức lao động',
    desc: 'Những người nắm giữ tiền bóc lột sức lao động của người khác.',
  },
]

export const moneyDefinition = {
  text: 'Tiền là sản vật cuối cùng của lưu thông hàng hóa, đồng thời cũng là hình thức biểu hiện đầu tiên của tư bản.',
  note: 'Khi tiền bước vào lưu thông tư bản, nó không còn chỉ là phương tiện trao đổi mà trở thành tư bản tiền tệ.',
}

export const moneyMotions = [
  {
    id: 'simple',
    title: 'Tiền thông thường',
    context: 'Trong lưu thông hàng hóa đơn giản',
    formula: 'H — T — H',
    formulaDesc: 'Hàng — Tiền — Hàng',
    start: 'Bán (H → T)',
    end: 'Mua (T → H)',
    purpose: 'Giá trị sử dụng — thỏa mãn nhu cầu',
    example: 'Bán hàng lấy tiền để mua lương thực, thực phẩm',
    color: 'blue',
  },
  {
    id: 'capital',
    title: 'Tiền tư bản',
    context: 'Trong lưu thông của tư bản',
    formula: "T — H — T'",
    formulaDesc: 'Tiền — Hàng — Tiền (nhiều hơn)',
    start: 'Mua (T → H)',
    end: "Bán (H → T')",
    purpose: 'Giá trị lớn hơn — T\' = T + ΔT',
    example: 'ΔT chính là giá trị thặng dư (m)',
    color: 'green',
  },
]

export const comparison = {
  same: [
    'Đều cấu thành từ hai yếu tố Hàng (H) và Tiền (T)',
    'Đều bao gồm hai hành vi đối lập: Mua và Bán',
  ],
  outside: {
    simple: { formula: 'H — T — H', start: 'Bán', end: 'Mua' },
    capital: { formula: "T — H — T'", start: 'Mua', end: 'Bán' },
  },
  inside: {
    simple: {
      formula: 'H — T — H',
      purpose: 'Giá trị sử dụng nhằm thỏa mãn nhu cầu',
      example: 'Bán hàng lấy tiền để mua lương thực, thực phẩm',
    },
    capital: {
      formula: "T — H — T'",
      purpose: 'Giá trị, và là giá trị lớn hơn',
      formulaExtra: "T' = T + ΔT (ΔT = giá trị thặng dư)",
    },
  },
}

/** Ảnh minh họa cho sơ đồ H — T — H (Unsplash, free license) */
export const hthVisual = {
  stations: [
    {
      id: 'cloth',
      label: 'H — Tấm vải',
      image: '/images/hth-cloth.jpg',
      alt: 'Cuộn vải dệt thủ công',
      credit: 'Unsplash',
      x: 12,
    },
    {
      id: 'money',
      label: 'T — Tiền',
      image: '/images/hth-money.jpg',
      alt: 'Tiền giấy và tiền xu',
      credit: 'Unsplash',
      x: 50,
    },
    {
      id: 'food',
      label: 'H — Lương thực',
      image: '/images/hth-food.jpg',
      alt: 'Rau củ quả tại chợ',
      credit: 'Unsplash',
      x: 88,
    },
  ],
  worker: {
    captions: ['Bán vải', 'Cầm tiền', 'Mua lương thực'],
    holding: ['cloth', 'money', 'food'],
  },
}

/** Ví dụ tư bản công nghiệp — sản xuất quần áo */
export const clothingExample = {
  capital: 27,
  revenue: 30,
  surplus: 3,
  fabric: 20,
  depreciation: 4,
  wage: 3,
  product: '100 bộ quần áo',
  productShort: 'Quần áo',
}

/** Ảnh minh họa cho sơ đồ T — H — H' — T' (sản xuất quần áo) */
export const thtVisual = {
  stations: [
    {
      id: 'T',
      label: `T — $${clothingExample.capital} vốn`,
      image: '/images/hth-money.jpg',
      alt: 'Vốn tiền tệ để mua nguyên liệu',
      x: 8,
    },
    {
      id: 'H',
      label: 'H — Nguyên liệu',
      image: '/images/tht-materials2.jpg',
      alt: 'Vải, phụ liệu và sức lao động',
      x: 32,
    },
    {
      id: 'Hprime',
      label: `H' — ${clothingExample.product}`,
      image: '/images/tht-clothing.jpg',
      alt: 'Thành phẩm quần áo sau sản xuất',
      x: 58,
    },
    {
      id: 'Tprime',
      label: `T' — $${clothingExample.revenue}`,
      image: '/images/tht-money-profit.jpg',
      alt: 'Tiền thu về nhiều hơn vốn ban đầu',
      x: 90,
    },
  ],
  capitalist: {
    captions: [
      `Cầm vốn T ($${clothingExample.capital})`,
      `MUA vải $${clothingExample.fabric} + SLĐ $${clothingExample.wage}`,
      `SX → ${clothingExample.product}`,
      `BÁN → T' ($${clothingExample.revenue})`,
    ],
  },
}

export const capitalFormulas = [
  {
    icon: '📐',
    name: 'Công thức chung của tư bản',
    formula: "T — H — T'",
    desc: 'Dạng cơ bản nhất của vận động tư bản',
  },
  {
    icon: '🛒',
    name: 'Tư bản thương nghiệp',
    formula: "T — H — T'",
    desc: 'Mua hàng hóa rồi bán lại với giá cao hơn',
  },
  {
    icon: '🏭',
    name: 'Tư bản công nghiệp',
    formula: "T — H — H' — T'",
    desc: 'Mua nguyên liệu (vải) + SLĐ → May quần áo → Bán thu T\'',
  },
  {
    icon: '🏦',
    name: 'Tư bản cho vay',
    formula: "T — T'",
    desc: 'Cho vay tiền, thu lại kèm lãi — không qua sản xuất',
  },
]
