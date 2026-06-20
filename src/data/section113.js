import { courseInfo, parentSection } from './section112.js'

export const section113Info = {
  section: 'Mục 1.1.3',
  title: 'Sự sản xuất giá trị thặng dư',
  parent: parentSection,
  course: courseInfo,
}

export const productionElements = [
  {
    icon: '⚙️',
    title: 'Giá trị sử dụng của yếu tố đầu vào',
    desc: 'Tư liệu sản xuất (nguyên liệu, máy móc...) tham gia quá trình sản xuất.',
  },
  {
    icon: '👷',
    title: 'Sức lao động công nhân làm thuê',
    desc: 'Tiêu dùng sức lao động để tạo ra sản phẩm mới và giá trị mới.',
  },
]

export const yarnExample = {
  title: 'Sản xuất 20kg sợi trong 1 ngày (12 giờ)',
  costs: [
    { label: 'Tiền mua bông (nguyên liệu)', value: 20, key: 'cotton' },
    { label: 'Tiền hao mòn máy móc (TSLĐ)', value: 4, key: 'depreciation' },
    { label: 'Tiền mua sức lao động (12 giờ)', value: 3, key: 'wage' },
  ],
  outputs: [
    { label: 'Giá trị bông chuyển vào sợi', value: 20 },
    { label: 'Giá trị máy móc hao mòn vào sợi', value: 4 },
    { label: 'Giá trị LĐ tạo ra (12h × $0.5/h)', value: 6, computed: true },
  ],
  hours: 12,
  valuePerHour: 0.5,
  get c() { return this.costs[0].value + this.costs[1].value },
  get v() { return this.costs[2].value },
  get T() { return this.c + this.v },
  get newValue() { return this.valuePerHour * this.hours },
  get Tprime() { return this.c + this.newValue },
  get m() { return this.Tprime - this.T },
}

export const surplusDefinition = {
  points: [
    'Giá trị thặng dư (m) là một bộ phận của giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra.',
    'Bộ phận giá trị này bị nhà tư bản chiếm đoạt.',
    'Về bản chất, đây là phần lao động không công của người công nhân làm thuê cho nhà tư bản.',
  ],
  formula: "m = T' − T = W' − (c + v)",
  example: 'm = $30 − $27 = $3',
}
