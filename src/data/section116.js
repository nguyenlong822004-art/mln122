import { courseInfo, parentSection } from './section112.js'

export const section116Info = {
  section: 'Mục 1.1.6',
  title: 'Tuần hoàn và chu chuyển tư bản',
  parent: parentSection,
  course: courseInfo,
}

export const circulation = {
  definition:
    'Tuần hoàn tư bản là sự vận động qua 3 giai đoạn: Mua yếu tố đầu vào → Sản xuất hàng hóa → Bán hàng thu tiền — biến đổi qua các hình thái rồi quay về tiền tệ ban đầu nhưng có thêm lời (T\' ).',
  diagram: "T — H ⟨ Sức lao động … Tư liệu sản xuất ⟩ … SX … H' — T'",
  turnover:
    'Chu chuyển tư bản là chu kỳ tuần hoàn được xét ở góc độ định kỳ, lặp đi lặp lại thường xuyên theo thời gian.',
}

export const circulationStages = [
  { id: 'T', icon: '💰', name: 'T — Tiền', desc: 'Vốn ban đầu' },
  { id: 'H', icon: '🛍️', name: 'T → H', desc: 'Mua SLĐ + TSLĐ' },
  { id: 'SX', icon: '🏭', name: 'Sản xuất', desc: 'Tiêu dùng SLĐ, tạo H\'' },
  { id: 'Hprime', icon: '📦', name: "H'", desc: 'Hàng hóa hoàn thành' },
  { id: 'Tprime', icon: '💵', name: "T'", desc: 'Thu tiền + lợi nhuận' },
]

export const turnoverFormulas = [
  { label: 'Thời gian chu chuyển (ch)', formula: 'ch = ts + tl' },
  { label: 'Tốc độ chu chuyển (N)', formula: 'N = CH / ch (vòng/năm)' },
  { label: 'CH', formula: 'Thời gian tư bản vận động trong 1 năm (365 ngày)' },
  { label: 'ch', formula: 'Thời gian một vòng quay' },
]

export const capitalByTransfer = [
  {
    icon: '🏗️',
    name: 'Tư bản cố định',
    desc: 'Máy móc, nhà xưởng... tham gia nhiều mùa sản xuất.',
    trait: 'Giá trị chuyển dần dần từng phần vào sản phẩm qua hao mòn.',
    example: 'Hao mòn máy móc $4/ngày (ví dụ sợi)',
    type: 'fixed',
  },
  {
    icon: '💧',
    name: 'Tư bản lưu động',
    desc: 'Nguyên liệu, vật liệu phụ, tiền lương...',
    trait: 'Tiêu hao hết trong một chu kỳ SX, chuyển toàn bộ giá trị vào sản phẩm khi bán xong.',
    example: 'Bông $20 + Lương $3 — hết trong 1 chu kỳ',
    type: 'fluid',
  },
]
