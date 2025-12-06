import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { type Lesson } from '@/entities/topic/type';
import { SecondaryButton } from '@/shared/ui/SecondaryButton';

// Lấy chiều rộng màn hình để chia trang
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  lesson: Lesson;
  onComplete: () => void;
};

export default function LessonDetailScreen({ lesson, onComplete }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  // answers: mapping questionId -> selectedOptionId
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Ref để điều khiển scroll view nếu cần (ví dụ: auto scroll)
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: any) => {
    // Tính toán trang hiện tại dựa trên vị trí scroll
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    setCurrentPage(pageIndex);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Helper: kiểm tra option có đúng không
  const isOptionCorrect = (questionId: string, optionId: string) => {
    const q = lesson.exercise?.questions.find((qq) => qq.id === questionId);
    if (!q) return false;
    return q.correctOptionId === optionId;
  };

  const totalQuestions = lesson.exercise?.questions.length ?? 0;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  // Render chấm tròn indicator (Dots)
  const renderPagination = () => {
    // Nếu chỉ 2 trang (passage + exercise) thì giữ như cũ, còn không thì sinh theo số trang
    const pages = lesson.exercise ? 2 : 1;
    return (
      <View className="flex-row items-center justify-center gap-1">
        {Array.from({ length: pages }).map((_, index) => (
          <View
            key={index}
            className={`size-2 rounded-full ${
              currentPage === index ? 'w-4 bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="w-full">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="h-[89%] w-full"
      >
        {/* PAGE 1: READING PASSAGE */}
        <View style={{ width: SCREEN_WIDTH }} className="flex-1 px-5 pt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="mb-4 text-lg font-bold text-gray-800">
              I. Read the passage and answer the questions below:
            </Text>
            <Text className="mb-8 text-justify text-base leading-6 text-gray-600">
              {lesson.passage}
            </Text>
          </ScrollView>
        </View>

        {/* PAGE 2: EXERCISE */}
        <View style={{ width: SCREEN_WIDTH }} className="flex-1 bg-gray-50 px-5 pt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            {lesson.exercise?.questions.map((q, index) => (
              <View key={q.id} className="mb-6">
                <Text className="mb-3 text-base font-bold text-gray-800">
                  {index + 1}. {q.text}
                </Text>

                <View className="gap-1">
                  {q.options.map((opt) => {
                    const selectedOptionId = answers[q.id];
                    const isSelected = selectedOptionId === opt.id;

                    // Nếu người dùng đã chọn thì hiện màu đúng/sai ngay
                    const showResult = typeof selectedOptionId !== 'undefined';

                    // Khi được chọn và đúng
                    const isCorrect = isSelected && isOptionCorrect(q.id, opt.id);
                    const isWrongSelected = isSelected && !isOptionCorrect(q.id, opt.id);

                    // Các class Tailwind (nativewind). Nếu đúng -> xanh lá, sai -> đỏ, ngược lại -> mặc định
                    const baseCardClass = 'rounded-xl border p-4';
                    const correctClass = 'border-green-600 bg-green-50';
                    const wrongClass = 'border-red-600 bg-red-50';
                    const normalClass = 'border-gray-300 bg-white';

                    const textBaseClass = 'text-sm';
                    const correctText = 'font-medium text-green-700';
                    const wrongText = 'font-medium text-red-700';
                    const normalText = 'text-gray-600';

                    const cardClass =
                      showResult && isCorrect
                        ? `${baseCardClass} ${correctClass}`
                        : showResult && isWrongSelected
                          ? `${baseCardClass} ${wrongClass}`
                          : `${baseCardClass} ${normalClass}`;

                    const textClass =
                      showResult && isCorrect
                        ? `${textBaseClass} ${correctText}`
                        : showResult && isWrongSelected
                          ? `${textBaseClass} ${wrongText}`
                          : `${textBaseClass} ${normalText}`;

                    return (
                      <TouchableOpacity
                        key={opt.id}
                        activeOpacity={0.8}
                        onPress={() => handleSelectOption(q.id, opt.id)}
                        className={cardClass}
                        // Nếu muốn không cho thay đổi sau lần chọn đầu tiên, uncomment dòng dưới
                        // disabled={typeof selectedOptionId !== 'undefined'}
                      >
                        <View className="flex-row items-center justify-between">
                          <Text className={textClass}>{opt.text}</Text>

                          {/* Hiển thị icon ✓ hoặc ✕ khi câu đã chọn */}
                          {isSelected && (
                            <Text
                              className={`ml-2 ${isCorrect ? 'text-green-700' : 'text-red-700'} text-lg`}
                            >
                              {isCorrect ? '✓' : '✕'}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}

            {/* Khoảng cách bottom để content không bị che */}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </ScrollView>

      <View className="px-4 pb-8">
        {renderPagination()}

        {/* Nút Complete chỉ enabled khi user đã trả lời hết các câu hỏi */}
        <SecondaryButton
          title={allAnswered ? 'COMPLETE' : `COMPLETE (${answeredCount}/${totalQuestions})`}
          className={`my-2`}
          textStyle={`uppercase`}
          onPress={() => {
            if (!allAnswered) return;
            onComplete();
          }}
          disabled={!allAnswered}
        />

        <View className="h-3" />
      </View>
    </View>
  );
}
