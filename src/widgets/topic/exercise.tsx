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
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Ref để điều khiển scroll view nếu cần (ví dụ: auto scroll)
  const scrollViewRef = useRef<ScrollView>(null);

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

  // Render chấm tròn indicator (Dots)
  const renderPagination = () => {
    return (
      <View className="flex-row items-center justify-center gap-1">
        {[0, 1].map((index) => (
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

        <View style={{ width: SCREEN_WIDTH }} className="flex-1 bg-gray-50 px-5 pt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            {lesson.exercise?.questions.map((q, index) => (
              <View key={q.id} className="mb-6">
                <Text className="mb-3 text-base font-bold text-gray-800">
                  {index + 1}. {q.text}
                </Text>

                <View className="gap-1">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.id;
                    return (
                      <TouchableOpacity
                        key={opt.id}
                        activeOpacity={0.7}
                        onPress={() => handleSelectOption(q.id, opt.id)}
                        className={`rounded-xl border p-4 ${
                          isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'
                        }`}
                      >
                        <Text
                          className={`text-sm ${isSelected ? 'font-medium text-purple-700' : 'text-gray-600'}`}
                        >
                          {opt.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View className="px-4 pb-8">
        {renderPagination()}
        {currentPage === 1 && (
          <SecondaryButton
            title={'complete'}
            className={`my-2`}
            textStyle={`uppercase`}
            onPress={onComplete}
          />
        )}
        <View className="h-3" />
      </View>
    </View>
  );
}
