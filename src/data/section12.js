import { courseInfo } from './section112.js'

export const section12Info = {
  section: 'Mục 1.2',
  title: 'Bản chất của giá trị thặng dư',
  parent: 'Chương 3 — Giá trị thặng dư trong nền kinh tế thị trường',
  course: courseInfo,
}

export const essenceIntro =
  'Bản chất của giá trị thặng dư phản ánh mối quan hệ bóc lột giữa nhà tư bản và công nhân làm thuê. Để đo lường bản chất này, C. Mác đưa ra hai chỉ số quan trọng: tỷ suất m\' và khối lượng M.'

export const mRateIndicator = {
  symbol: "m'",
  name: 'Tỷ suất giá trị thặng dư',
  meaning: 'Phản ánh trình độ bóc lột của nhà tư bản đối với công nhân.',
  formulas: [
    { expr: "m' = (m / v) × 100%", desc: 'Tỷ lệ giữa giá trị thặng dư và tư bản khả biến' },
    {
      expr: "m' = (Thời gian LĐ thặng dư / Thời gian LĐ tất yếu) × 100%",
      desc: 'Cùng một nội hàm, thể hiện qua thời gian lao động',
    },
  ],
  vars: [
    { symbol: 'm', desc: 'Giá trị thặng dư' },
    { symbol: 'v', desc: 'Tư bản khả biến (tiền công)' },
  ],
  yarnExample: { m: 3, v: 3, mRate: 100, necessaryH: 6, surplusH: 6 },
}

export const mMassIndicator = {
  symbol: 'M',
  name: 'Khối lượng giá trị thặng dư',
  meaning: 'Phản ánh quy mô bóc lột của nhà tư bản — tổng số lượng giá trị thặng dư chiếm đoạt được.',
  formulas: [
    { expr: "M = m' × V", desc: 'Tích số tỷ suất m\' và tổng tư bản khả biến' },
    { expr: "M = (m / v) × 100% × V", desc: 'Dạng tương đương' },
  ],
  vars: [{ symbol: 'V', desc: 'Tổng tư bản khả biến thuê toàn bộ công nhân' }],
}
