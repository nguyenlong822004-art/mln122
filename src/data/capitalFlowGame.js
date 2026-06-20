/** Dữ liệu trò chơi Dòng vốn — Mục 1.1.6 */

export const BASE_PROD_DAYS = 20
export const BASE_CIRC_DAYS = 10
export const PENALTY_PROD_DAYS = 15
export const PENALTY_CIRC_DAYS = 20
export const FREEZE_MS = 5000
export const CH_YEAR = 360

export const productionSteps = [
  { id: 'money-in', icon: '💰', label: 'Vốn T vào nhà xưởng', days: 2 },
  { id: 'fabric', icon: '🧵', label: 'Mua cuộn vải nguyên liệu', days: 4 },
  { id: 'wage', icon: '👷', label: 'Trả lương thợ may', days: 3 },
  { id: 'machine', icon: '🏭', label: 'Máy may sản xuất', days: 8, obstacle: 'machine' },
  { id: 'product', icon: '👕', label: "H' — Quần áo hoàn thành", days: 3 },
]

export const circulationSteps = [
  { id: 'pack', icon: '📦', label: 'Đóng thùng — vận chuyển', days: 3 },
  { id: 'store', icon: '🏪', label: 'Đại lý bán hàng', days: 5, obstacle: 'inventory' },
  { id: 'collect', icon: '💵', label: "Thu tiền mặt T' (+m)", days: 2 },
]

export const obstacles = {
  machine: {
    title: '⚠️ Máy may bị hỏng / Nhà xưởng xuống cấp!',
    insight: 'Đây là hiện tượng Hao mòn tư bản cố định. Giá trị máy móc đang chuyển dần vào quần áo.',
    question: 'Máy móc, nhà xưởng thuộc bộ phận tư bản nào và chuyển giá trị như thế nào vào sản phẩm?',
    options: [
      'Tư bản khả biến, chuyển hết ngay trong 1 ngày',
      'Tư bản cố định, chuyển dần dần từng phần',
      'Tư bản lưu động, không chuyển vào sản phẩm',
      'Không thuộc tư bản, chỉ là chi phí',
    ],
    correct: 1,
    success: '🔧 Máy được sửa! Dòng vốn tiếp tục chạy trên băng chuyền sản xuất.',
    fail: '❄️ Dòng vốn đóng băng 5 giây — thời gian sản xuất tăng, chu kỳ chậm lại!',
  },
  inventory: {
    title: '📦 Hàng bị tồn kho / Khách chưa trả tiền!',
    insight: 'Thời gian lưu thông (mua + bán) kéo dài — tư bản bị chôn chân, khó sinh lời.',
    question: 'Thời gian chu chuyển của tư bản (ch) gồm những thời gian nào?',
    options: [
      'Chỉ thời gian sản xuất',
      'Thời gian sản xuất + Thời gian lưu thông',
      'Chỉ thời gian bán hàng',
      '365 ngày cố định',
    ],
    correct: 1,
    success: '📣 Marketing thành công! Hàng được giải phóng, thu tiền về túi ngay!',
    fail: '❄️ Hàng vẫn tồn kho 5 giây — thời gian lưu thông tăng, N giảm!',
  },
}

export function getResultMessage(ch, wrongCount) {
  const N = (CH_YEAR / ch).toFixed(0)
  if (wrongCount === 0 && ch <= 35) {
    return {
      type: 'excellent',
      title: '🏆 Chúc mừng! Nhà tư bản tài ba!',
      body: `Thời gian 1 vòng quay (ch) của bạn chỉ mất ${ch} ngày. Trong 1 năm, tốc độ chu chuyển vốn đạt N = ${CH_YEAR}/${ch} = ${N} vòng/năm. Bạn thu về khối lượng giá trị thặng dư tối đa!`,
    }
  }
  if (wrongCount >= 2 || ch >= 70) {
    return {
      type: 'slow',
      title: '😰 Ồ không! Chu kỳ quá chậm...',
      body: `Do máy móc hỏng hóc và hàng tồn kho lâu, thời gian 1 vòng quay (ch) kéo dài tới ${ch} ngày. Một năm vốn chỉ quay được N = ${CH_YEAR}/${ch} = ${N} vòng. Bạn tích lũy được rất ít giá trị thặng dư.`,
    }
  }
  return {
    type: 'good',
    title: '👍 Hoàn thành vòng quay!',
    body: `ch = ${ch} ngày → N = ${CH_YEAR}/${ch} ≈ ${N} vòng/năm. Trả lời đúng thêm ở các chướng ngại sẽ giúp vốn quay nhanh hơn và thu m nhiều hơn!`,
  }
}
