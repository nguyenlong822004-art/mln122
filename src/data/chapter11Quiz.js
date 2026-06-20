/** 10 câu trắc nghiệm ôn tập — Mục 1.1 Nguồn gốc của giá trị thặng dư */

export const chapter11QuizMeta = {
  title: 'Trắc nghiệm ôn tập — Mục 1.1',
  description:
    'Kiểm tra kiến thức từ mục 1.1.1 đến 1.1.6 (công thức tư bản, sức lao động, giá trị thặng dư, tiền công, chu chuyển).',
  excellent: '🌟 Xuất sắc! Bạn đã nắm vững Mục 1.1 — Nguồn gốc của giá trị thặng dư.',
  good: '👍 Khá tốt! Hãy xem lại các mục còn yếu để củng cố thêm.',
  needsWork: '📚 Cần ôn tập thêm. Hãy đọc lại lý thuyết các mục trong chương!',
}

export const chapter11QuizQuestions = [
  {
    question: 'Theo định nghĩa trong bài, tiền vừa là sản vật cuối cùng của lưu thông hàng hóa, vừa là:',
    options: [
      'Hình thức biểu hiện duy nhất của giá trị thặng dư',
      'Hình thức biểu hiện đầu tiên của tư bản',
      'Phương tiện sản xuất của công nhân',
      'Hàng hóa không thể trao đổi',
    ],
    correct: 1,
    explanation:
      'Tiền là sản vật cuối cùng của lưu thông hàng hóa, đồng thời là hình thức biểu hiện đầu tiên của tư bản khi bước vào lưu thông tư bản (T—H—T\').',
  },
  {
    question: 'Hai điều kiện ra đời sản xuất hàng hóa tư bản chủ nghĩa (TBCN) là:',
    options: [
      'Công hữu toàn dân tư liệu sản xuất và phân phối theo nhu cầu',
      'Tập trung tiền lớn và bóc lột sức lao động của người khác',
      'Tự cung tự cấp và trao đổi bằng hiện vật',
      'Quốc hữu hóa ngành công nghiệp và thuế tiến bộ',
    ],
    correct: 1,
    explanation:
      'TBCN cần: (1) một khoản tiền đủ lớn tập trung vào tay một số người; (2) những người đó bóc lột sức lao động của người lao động khác.',
  },
  {
    question: 'Trong lưu thông hàng hóa đơn giản (H—T—H), điểm khác biệt về biểu hiện bên ngoài so với T—H—T\' là:',
    options: [
      'H—T—H bắt đầu bằng Mua, kết thúc bằng Bán',
      'H—T—H bắt đầu bằng Bán, kết thúc bằng Mua',
      'H—T—H không có tiền tham gia',
      'H—T—H luôn thu về nhiều tiền hơn ban đầu',
    ],
    correct: 1,
    explanation:
      'H—T—H: Bán hàng (H→T) rồi Mua hàng (T→H) để thỏa mãn nhu cầu sử dụng. T—H—T\': ngược lại — Mua trước, Bán sau để thu T\' > T.',
  },
  {
    question: 'Công thức tư bản công nghiệp (có giai đoạn sản xuất trực tiếp) là:',
    options: ['T — H — T\'', 'T — T\'', 'T — H — H\' — T\'', 'H — T — H'],
    correct: 2,
    explanation:
      'Tư bản công nghiệp: T mua yếu tố sản xuất → sản xuất ra H\' → bán thu T\'. Công thức: T — H — H\' — T\'.',
  },
  {
    question: 'Hàng hóa sức lao động chỉ có thể tồn tại khi người lao động:',
    options: [
      'Sở hữu nhà máy và máy móc',
      'Tự do về thân thể và ở tình trạng vô sản',
      'Là chủ sở hữu tư liệu sản xuất',
      'Không cần bán sức lao động để sống',
    ],
    correct: 1,
    explanation:
      'Hai điều kiện: (1) tự do về thân thể — có quyền bán SLĐ như hàng hóa; (2) vô sản — không có TSLĐ, buộc phải bán SLĐ để kiếm sống.',
  },
  {
    question: 'Tư bản khả biến (v) khác tư bản bất biến (c) ở chỗ:',
    options: [
      'v gồm nguyên liệu và hao mòn máy móc',
      'v là tiền mua sức lao động — bộ phận tạo ra giá trị mới và làm tăng giá trị',
      'v không tham gia sản xuất',
      'v chuyển dần qua nhiều chu kỳ sản xuất',
    ],
    correct: 1,
    explanation:
      'c (TBCĐ + nguyên liệu): giá trị chỉ chuyển vào sản phẩm, không tự tăng. v (tiền mua SLĐ): tạo giá trị mới lớn hơn chính nó — nguồn gốc của m.',
  },
  {
    question: 'Theo ví dụ sản xuất 20kg sợi (c = $24, v = $3, W\' = $30), giá trị thặng dư m bằng:',
    options: ['$6', '$3', '$27', '$30'],
    correct: 1,
    explanation: 'm = W\' − (c + v) = 30 − (24 + 3) = $3. Đây là phần lao động không công bị nhà tư bản chiếm đoạt.',
  },
  {
    question: 'Bản chất tiền công (lương) trong chủ nghĩa tư bản là:',
    options: [
      'Khoản thưởng hào phóng cho toàn bộ ngày lao động',
      'Giá cả của hàng hóa sức lao động — không phải toàn bộ giá trị lao động tạo ra',
      'Phần lợi nhuận công bằng chia cho công nhân',
      'Tiền tài trợ từ nhà nước',
    ],
    correct: 1,
    explanation:
      'Tiền công = giá cả HH SLĐ (v). Công nhân tạo giá trị mới lớn hơn v; phần dôi ra (m) không được trả trong lương.',
  },
  {
    question: 'Tính chất đặc biệt của hàng hóa sức lao động là:',
    options: [
      'Giá trị không bao giờ thay đổi',
      'Chỉ có giá trị sử dụng, không có giá trị trao đổi',
      'Khi được tiêu dùng (lao động), tạo ra giá trị mới lớn hơn giá trị bản thân',
      'Không tham gia vào quá trình sản xuất',
    ],
    correct: 2,
    explanation:
      'Giá trị sử dụng của SLĐ thể hiện trong lao động thực tế — đây là nguồn gốc sinh ra giá trị mới, giải thích vì sao T\' có thể lớn hơn T.',
  },
  {
    question: 'Thời gian chu chuyển tư bản (ch) và tốc độ chu chuyển (N) được tính:',
    options: [
      'ch = ts − tl; N = ch / 365',
      'ch = ts + tl; N = CH / ch',
      'ch = 365 ngày; N = ts × tl',
      'ch chỉ gồm thời gian sản xuất',
    ],
    correct: 1,
    explanation:
      'ch = thời gian sản xuất (ts) + thời gian lưu thông (tl). N = CH/ch — số vòng chu chuyển trong một năm (CH thường là 365 ngày).',
  },
]
