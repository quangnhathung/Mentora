import { type ChooseToFillTheBlanksQuizContent } from './choose-to-fil-blanks/types';
import { QuizType } from './enum';
import { type FindingErrorsQuizContent } from './finding-error/types';
import { type FindingSynonymQuizContent } from './finding-synonym/types';
import { type SingleChoiceQuizContent } from './single-choice/types';
import { type TrueFalseQuizContent } from './true-false/types';
import { type Quiz } from './types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    type: QuizType.SINGLE_CHOICE,
    instruction: 'What should Tony say?',
    content: {
      answers: [
        {
          id: 1,
          content: [
            {
              lang: 'en',
              text: 'How old are you?',
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/how-old-are-you.mp3',
            },
            {
              lang: 'vi',
              text: 'Bạn bao nhiêu tuổi?',
              audio: 'how_old_are_you_vi.mp3',
            },
            {
              lang: 'ar',
              text: 'كم عمرك؟',
              audio: 'how_old_are_you_ar.mp3',
            },
          ],
        },
        {
          id: 2,
          content: [
            {
              lang: 'en',
              text: "What's up, buddy?",
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/whats-up-buddy.mp3',
            },
            { lang: 'vi', text: 'Có gì mới không, bạn ơi?', audio: 'whats_up_buddy_vi.mp3' },
            { lang: 'ar', text: 'ما الأخبار يا صديقي؟', audio: 'whats_up_buddy_ar.mp3' },
          ],
        },
        {
          id: 3,
          content: [
            {
              lang: 'en',
              text: 'How do you do?',
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/how-do-you-do.mp3',
            },
            {
              lang: 'vi',
              text: 'Bạn có khỏe không?',
              audio: 'how_do_you_do_vi.mp3',
            },
            { lang: 'ar', text: 'كيف حالك؟', audio: 'how_do_you_do_ar.mp3' },
          ],
        },
      ],
      correctAnswer: 3,
    } as SingleChoiceQuizContent,
  },
  {
    id: 2,
    type: QuizType.TRUE_FALSE,
    content: {
      questions: [
        {
          id: 1,
          content: [
            {
              lang: 'en',
              text: 'John met Tony on the street.',
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/john-meet-on-the-street-callum.mp3',
            },
            { lang: 'vi', text: 'John gặp Tony trên đường.', audio: 'john_meet_tony_vi.mp3' },
            { lang: 'ar', text: 'جون قابل توني في الشارع.', audio: 'john_meet_tony_ar.mp3' },
          ],
          isTrue: true,
          sentence: '',
        },
        {
          id: 2,
          content: [
            {
              lang: 'en',
              text: 'Tony said he was feeling unwell.',
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/tony-unwell-bill.mp3',
            },
            {
              lang: 'vi',
              text: 'Tony nói rằng anh ấy cảm thấy không khỏe.',
              audio: 'tony_unwell_vi.mp3',
            },
            { lang: 'ar', text: 'قال توني إنه لا يشعر بصحة جيدة.', audio: 'tony_unwell_ar.mp3' },
          ],
          isTrue: false,
          sentence: '',
        },
        {
          id: 3,
          content: [
            {
              lang: 'en',
              text: 'John asked Tony if he was heading somewhere.',
              audio:
                'https://static.saoladigital.com/public/npvu1510/mtt-mobile-app-fake-data/audio/if-heading-somewhere-charlie.mp3',
            },
            {
              lang: 'vi',
              text: 'John hỏi Tony có đang đi đâu đó không.',
              audio: 'john_asked_vi.mp3',
            },
            {
              lang: 'ar',
              text: 'سأل جون توني إذا كان متجهًا إلى مكان ما.',
              audio: 'john_asked_ar.mp3',
            },
          ],
          isTrue: true,
          sentence: '',
        },
      ],
    } as TrueFalseQuizContent,
  },
  {
    id: 3,
    type: QuizType.FINDING_ERRORS,
    content: {
      questions: [
        // Câu 1: "I going" → thiếu "am"
        {
          id: 1,
          sentenceTexts: [
            { id: 1, text: 'Yes' },
            { id: 2, text: ',' },
            { id: 3, text: 'I' },
            { id: 4, text: 'going' },
            { id: 5, text: 'to' },
            { id: 6, text: 'the' },
            { id: 7, text: 'supermarket' },
            { id: 8, text: 'to' },
            { id: 9, text: 'buy' },
            { id: 10, text: 'some' },
            { id: 11, text: 'fruits' },
            { id: 12, text: '.' },
          ],
          hint: [
            { lang: 'en', text: 'The verb for the present continuous tense is missing.' },
            { lang: 'vi', text: 'Thiếu động từ để tạo thành thì hiện tại tiếp diễn.' },
            { lang: 'ar', text: 'الفعل المساعد لزمن المضارع المستمر مفقود.' },
          ],
          correctAnswer: 3,
          explanation: [
            {
              lang: 'en',
              text: 'The correct sentence is: "Yes, I am going to the supermarket…". The verb "am" is missing before "going".',
            },
            {
              lang: 'vi',
              text: 'Câu đúng: "Yes, I am going to the supermarket…". Động từ "am" bị thiếu trước "going".',
            },
            {
              lang: 'ar',
              text: 'الجملة الصحيحة: "Yes, I am going to the supermarket…". الفعل "am" مفقود قبل "going".',
            },
          ],
        },

        // Câu 2: "It very near" → thiếu "is"
        {
          id: 2,
          sentenceTexts: [
            { id: 1, text: 'It' },
            { id: 2, text: 'very' },
            { id: 3, text: 'near' },
            { id: 4, text: 'from' },
            { id: 5, text: 'here' },
            { id: 6, text: '.' },
          ],
          hint: [
            { lang: 'en', text: 'This sentence needs a linking verb.' },
            { lang: 'vi', text: 'Câu này cần thêm động từ nối (linking verb).' },
            { lang: 'ar', text: 'هذه الجملة تحتاج إلى فعل ربط.' },
          ],
          correctAnswer: 1,
          explanation: [
            {
              lang: 'en',
              text: 'The correct sentence is: "It is very near from here." The verb "is" is missing.',
            },
            {
              lang: 'vi',
              text: 'Câu đúng: "It is very near from here." Động từ "is" bị thiếu.',
            },
            {
              lang: 'ar',
              text: 'الجملة الصحيحة: "It is very near from here." الفعل "is" مفقود.',
            },
          ],
        },

        // Câu 3: "I need buy apple" → cần "to buy apples"
        {
          id: 3,
          sentenceTexts: [
            { id: 1, text: 'I' },
            { id: 2, text: 'need' },
            { id: 3, text: 'buy' },
            { id: 4, text: 'apple' },
            { id: 5, text: '.' },
          ],
          hint: [
            {
              lang: 'en',
              text: 'A word is missing to make the verb phrase correct, and the noun should match quantity.',
            },
            {
              lang: 'vi',
              text: 'Thiếu một từ để cụm động từ đúng hơn, và danh từ chưa đúng số nhiều.',
            },
            {
              lang: 'ar',
              text: 'هناك كلمة مفقودة لتصحيح العبارة الفعلية، والاسم يحتاج إلى صيغة الجمع.',
            },
          ],
          correctAnswer: 2,
          explanation: [
            {
              lang: 'en',
              text: 'The correct sentence is: "I need to buy apples." The word "to" is missing, and "apple" should be plural.',
            },
            {
              lang: 'vi',
              text: 'Câu đúng: "I need to buy apples." Thiếu từ "to" và danh từ phải ở dạng số nhiều.',
            },
            {
              lang: 'ar',
              text: 'الجملة الصحيحة: "I need to buy apples." الكلمة "to" مفقودة و"apple" يجب أن تكون جمع.',
            },
          ],
        },
      ],
    } as FindingErrorsQuizContent,
  },
  {
    id: 4,
    type: QuizType.FINDING_SYNONYM,
    content: {
      questions: [
        // Câu 1: synonym của "buy" → "purchase"
        {
          id: 1,
          sentenceTexts: [
            { id: 1, text: 'Oh' },
            { id: 2, text: ',' },
            { id: 3, text: 'I' },
            { id: 4, text: 'also' },
            { id: 5, text: 'need' },
            { id: 6, text: 'to' },
            { id: 7, text: 'buy' },
            { id: 8, text: 'some' },
            { id: 9, text: 'bread' },
            { id: 10, text: '.' },
          ],
          correctAnswer: 6,
          synonyms: ['purchase'],
        },

        // Câu 2: synonym của "mind" → "object"
        {
          id: 2,
          sentenceTexts: [
            { id: 1, text: 'Do' },
            { id: 2, text: 'you' },
            { id: 3, text: 'mind' },
            { id: 4, text: 'if' },
            { id: 5, text: 'I' },
            { id: 6, text: 'go' },
            { id: 7, text: 'with' },
            { id: 8, text: 'you' },
            { id: 9, text: '?' },
          ],
          correctAnswer: 3,
          synonyms: ['object', 'care', 'bother', 'dislike'],
        },
      ],
    } as FindingSynonymQuizContent,
  },
  {
    id: 5,
    type: QuizType.CHOOSE_TO_FILL_THE_BLANKS,
    content: {
      questions: [
        {
          id: 1,
          sentenceTexts: [
            { id: 1, text: 'Tony' },
            { id: 2, text: 'went' },
            { id: 3, text: 'to' },
            { id: 4, text: 'the' },
            { id: 5, text: 'to' },
            { id: 6, text: 'buy' },
            { id: 7, text: 'apples', isBlank: true },
            { id: 8, text: '.' },
          ],
          // correctWord: 4,
          hint: [
            { lang: 'en', text: 'Think of the place Tony is going to.' },
            { lang: 'vi', text: 'Tony đi tới đâu để mua táo?' },
            { lang: 'ar', text: 'إلى أين ذهب توني لشراء التفاح؟' },
          ],
          explanation: [
            { lang: 'en', text: '"supermarket" is the place mentioned in the conversation.' },
            { lang: 'vi', text: '"supermarket" là nơi được nhắc trong hội thoại.' },
            { lang: 'ar', text: '"supermarket" هو المكان المذكور في الحوار.' },
          ],
        },
        {
          id: 2,
          sentenceTexts: [
            { id: 1, text: 'John' },
            { id: 2, text: 'offered', isBlank: true },
            { id: 3, text: 'to' },
            { id: 4, text: 'Tony' },
            { id: 5, text: 'so' },
            { id: 6, text: 'they' },
            { id: 7, text: 'could' },
            { id: 8, text: 'go' },
            { id: 9, text: 'together.' },
          ],
          // correctWord: 3,
          hint: [
            {
              lang: 'en',
              text: 'Which verb connects "offered" and the person receiving the offer?',
            },
            { lang: 'vi', text: 'Động từ nào nối "offered" và người nhận lời mời?' },
            { lang: 'ar', text: 'أي فعل يربط "offered" بالشخص الذي يتلقى العرض؟' },
          ],
          explanation: [
            { lang: 'en', text: '"to" is needed to indicate who the offer is for.' },
            { lang: 'vi', text: '"to" cần thiết để chỉ người nhận lời đề nghị.' },
            { lang: 'ar', text: '"to" ضروري لتوضيح لمن العرض موجه.' },
          ],
        },
      ],
      wordList: [
        { id: 1, text: 'apples' },
        { id: 2, text: 'gave' },
        { id: 3, text: 'lemons' },
        { id: 4, text: 'oranges' },
        { id: 5, text: 'offered' },
        { id: 6, text: 'sent' },
        { id: 7, text: 'bananas' },
        { id: 8, text: 'showed' },
        { id: 9, text: 'mangoes' },
      ],
    } as ChooseToFillTheBlanksQuizContent,
  },
];
