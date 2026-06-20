import { courseInfo, parentSection } from './section112.js'

export const section115Info = {
  section: 'Mục 1.1.5',
  title: 'Tiền công trong chủ nghĩa tư bản',
  parent: parentSection,
  course: courseInfo,
}

export const wageEssence = {
  truth: 'Tiền công (lương) chính là giá cả của hàng hóa sức lao động.',
  origin: 'Nó là một phần trong giá trị mới do chính công nhân cống hiến tạo ra trong quá trình làm việc.',
}

export const wageMisconceptions = [
  {
    wrong: 'Tiền công là khoản tiền ông chủ hào phóng trả cho "toàn bộ ngày lao động"',
    right: 'Tiền công chỉ bằng giá trị sức lao động (v) — phần tái sản xuất SLĐ, không phải toàn bộ giá trị lao động tạo ra',
  },
  {
    wrong: 'Lương trả cho "kết quả lao động" của công nhân',
    right: 'Công nhân tạo ra giá trị mới lớn hơn v; phần dôi ra (m) bị NTB chiếm đoạt, không trả trong lương',
  },
]

export const wageFlow = [
  { step: 'Công nhân lao động 12h', value: '$6 giá trị mới' },
  { step: 'NTB trả tiền công (v)', value: '$3' },
  { step: 'Phần dôi ra (m)', value: '$3 — lao động không công' },
]
