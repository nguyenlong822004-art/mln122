/** Trò chơi Thử Thách Sản Xuất 12 Giờ — Mục 1.1.3 */

export const GAME = {
  standardHours: 12,
  necessaryHours: 6,
  wage: 3,
  valuePerHour: 0.5,
  minHours: 8,
  maxHours: 16,
  totalDays: 5,
  targetTotalM: 12,
  satisfactionStart: 100,
  satisfactionStrike: 0,
}

export const intensityLevels = [
  {
    id: 'normal',
    label: 'Bình thường',
    icon: '🐢',
    mult: 1,
    satCostPerHour: 1,
    desc: 'Năng suất chuẩn — công nhân ổn định',
  },
  {
    id: 'fast',
    label: 'Tăng tốc',
    icon: '⚡',
    mult: 1.2,
    satCostPerHour: 3,
    desc: 'Ép chuyển nhanh — thặng dư tăng, áp lực cao',
  },
  {
    id: 'extreme',
    label: 'Ép sản xuất',
    icon: '🔥',
    mult: 1.5,
    satCostPerHour: 6,
    desc: 'Tối đa hóa m — rủi ro đình công rất lớn',
  },
]

export const dayTips = [
  '6 giờ đầu tạo ra $3 — đúng bằng tiền công v. Đây là lao động cần thiết.',
  '6 giờ sau tạo thêm $3 — đó là giá trị thặng dư m, không được trả lương.',
  'Kéo dài giờ làm: lương v vẫn $3, mọi giờ thêm chủ yếu làm tăng m!',
  'Cường độ cao → giá trị/giờ tăng nhưng công nhân kiệt sức nhanh hơn.',
  'm = giá trị mới − v. Nhà tư bản chiếm đoạt phần lao động thặng dư.',
]

export function calcDayResult(hours, intensityId) {
  const level = intensityLevels.find((l) => l.id === intensityId) ?? intensityLevels[0]
  const effectiveValuePerHour = GAME.valuePerHour * level.mult
  const newValue = hours * effectiveValuePerHour
  const m = Math.max(0, newValue - GAME.wage)
  const necessaryValue = GAME.wage
  const surplusValue = m
  const necessaryHours = GAME.necessaryHours
  const surplusHours = Math.max(0, hours - necessaryHours)
  const overtimeHours = Math.max(0, hours - GAME.standardHours)

  let satDrain = 0
  if (hours > GAME.standardHours) satDrain += (hours - GAME.standardHours) * 4
  satDrain += hours * level.satCostPerHour * 0.15
  if (overtimeHours > 0) satDrain += overtimeHours * 2

  return {
    hours,
    level,
    newValue,
    v: GAME.wage,
    m,
    necessaryHours: Math.min(hours, necessaryHours),
    surplusHours,
    overtimeHours,
    necessaryValue: Math.min(newValue, necessaryValue),
    surplusValue,
    satDrain,
    mRate: GAME.wage > 0 ? ((m / GAME.wage) * 100).toFixed(0) : 0,
  }
}

export function getSatisfactionEmoji(value) {
  if (value >= 80) return '😊'
  if (value >= 60) return '😐'
  if (value >= 35) return '😓'
  if (value >= 15) return '😠'
  return '✊'
}

export function getWorkerMood(value) {
  if (value >= 80) return 'happy'
  if (value >= 50) return 'neutral'
  if (value >= 25) return 'tired'
  return 'angry'
}

export function getResultMessage(totalM, satisfaction, daysPlayed, strike) {
  if (strike) {
    return {
      type: 'strike',
      title: '✊ Đình công! Xưởng dừng hoạt động',
      body: 'Công nhân không chịu nổi áp lực. Hài lòng về 0 — bạn mất vốn ngày sản xuất. Giá trị thặng dư không thể sinh ra khi sức lao động từ chối bị bóc lột.',
    }
  }
  if (totalM >= GAME.targetTotalM && satisfaction >= 40) {
    return {
      type: 'excellent',
      title: '🏆 Hoàn thành tuần sản xuất!',
      body: `Bạn tích lũy m = $${totalM.toFixed(1)} trong ${daysPlayed} ngày. Công nhân nhận v = $${(GAME.wage * daysPlayed).toFixed(0)} — trong khi phần lao động thặng dư bị chiếm đoạt. m = T' − (c + v)!`,
    }
  }
  return {
    type: 'partial',
    title: '📊 Kết thúc tuần sản xuất',
    body: `Tổng m = $${totalM.toFixed(1)}. Hài lòng còn ${Math.round(satisfaction)}%. Thử cân bằng giữa tăng m và giữ sức lao động để hiểu mâu thuẫn TBCN.`,
  }
}
