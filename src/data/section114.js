import { courseInfo, parentSection } from './section112.js'

export const section114Info = {
  section: 'Mục 1.1.4',
  title: 'Tư bản bất biến và tư bản khả biến',
  parent: parentSection,
  course: courseInfo,
}

export const capitalParts = [
  {
    symbol: 'c',
    name: 'Tư bản bất biến',
    icon: '🏭',
    color: 'gray',
    what: 'Tiền dùng để mua nhà xưởng, máy móc, thiết bị, nguyên liệu, nhiên liệu.',
    trait: 'Giá trị chỉ chuyển dần hoặc chuyển hết vào sản phẩm trong quá trình sản xuất — không tự tăng lên về lượng.',
    examples: ['Nhà xưởng, công trình', 'Máy móc, thiết bị', 'Nguyên liệu, nhiên liệu, vật liệu phụ'],
    yarnValue: 24,
    yarnBreakdown: 'Bông $20 + Hao mòn máy $4',
  },
  {
    symbol: 'v',
    name: 'Tư bản khả biến',
    icon: '👷',
    color: 'blue',
    what: 'Tiền dùng để thuê sức lao động (trả lương cho công nhân).',
    trait: 'Bộ phận này làm tăng giá trị — sức lao động tạo ra giá trị mới lớn hơn số tiền lương ban đầu.',
    examples: ['Tiền công / tiền lương', 'Mua hàng hóa sức lao động'],
    yarnValue: 3,
    yarnBreakdown: 'Tiền mua SLĐ 12 giờ',
  },
]
