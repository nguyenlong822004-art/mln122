import ChapterQuiz from './ChapterQuiz'
import { quizQuestions } from '../data/content'

export default function QuizSection() {
  return (
    <ChapterQuiz
      questions={quizQuestions}
      title="❓ Trắc nghiệm kiến thức"
      description="Kiểm tra hiểu biết về giá trị thặng dư, tư bản và tốc độ chu chuyển."
      excellent="🌟 Xuất sắc! Bạn đã nắm vững kiến thức giá trị thặng dư."
      good="👍 Khá tốt! Hãy xem lại phần lý thuyết để củng cố thêm."
      needsWork="📚 Cần ôn tập thêm. Hãy thử các trò chơi mô phỏng!"
    />
  )
}
